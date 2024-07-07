const db = require('../models/db');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.user.findMany();
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await db.booking.findMany({
      include: {
        user: true,
        hairstyle: true,
        guest: true
      }
    });
    // console.log(bookings)
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

exports.getHairStyle = async (req, res, next) => {
  try {
    const hairstyle = await db.hairstyle.findMany();
    res.json({ hairstyle });
  } catch (err) {
    next(err);
  }
};

exports.getUserBooking = async (req, res, next) => {
  try {
    const UserBooking = await db.hairstyle.findMany();
    res.json({ UserBooking });
  } catch (err) {
    next(err);
  }
};

exports.getStatusUser = async (req, res, next) => {
  try {
    const StatusUser = await db.booking.findMany({
      include: {
        guest: true,
        hairstyle: true,
        user: true,
      }
    });
    res.json({ StatusUser });
  } catch (err) {
    next(err);
  }
};

exports.deleteUsers = async (req, res, next) => {
  const { user_id } = req.params
  try {
    const rs = await db.user.delete({ where: { user_id: +user_id } })
    res.json({ msg: 'Delete Ok', result: rs })
  } catch (err) {
    next(err)
  }
};

exports.deleteBooking = async (req, res, next) => {
  const { booking_id } = req.params
  try {
    const rs = await db.booking.delete({ where: { booking_id: +booking_id } })
    res.json({ msg: 'Delete Ok', result: rs })
  } catch (err) {
    next(err)
  }
};

exports.deleteHairstyle = async (req, res, next) => {
  const { hairstyle_id } = req.params
  try {
    const rs = await db.hairstyle.delete({ where: { hairstyle_id: +hairstyle_id } })
    res.json({ msg: 'Delete Ok', result: rs })
  } catch (err) {
    next(err)
  }
};

exports.createHairStyle = async (req, res, next) => {
  try {
    const { hairstyle_name, hairstyle_price, hairstyle_img, } = req.body;
    console.log(req.body)

    const HairStyle = await db.hairstyle.create({
      data: {
        hairstyle_name,
        hairstyle_img,
        hairstyle_price: Number(hairstyle_price),
      }
    });

    res.json({ msg: 'HairStyle created successfully', HairStyle });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.updateHairStyle = async (req, res, next) => {
  try {
    const { hairstyle_id } = req.params
    const { hairstyle_name, hairstyle_price, hairstyle_img, } = req.body;
    console.log(req.body)

    const HairStyle = await db.hairstyle.update({
      where: {
        hairstyle_id: +hairstyle_id
      },
      data: {
        hairstyle_name,
        hairstyle_img,
        hairstyle_price: Number(hairstyle_price),
      }
    });

    res.json({ msg: 'HairStyle created successfully', HairStyle });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.updateHairstyle = async (req, res, next) => {
  const { hairstyle_id } = req.params;
  const {
    hairstyle_name,
    hairstyle_img,
    hairstyle_price
  } = req.body;

  console.log(req.body);

  try {
    const rs = await db.table.update({
      data: {
        hairstyle_name,
        hairstyle_img,
        hairstyle_price
      },
      where: { hairstyle_id: Number(hairstyle_id) },
    });
    res.json({ message: "UPDETE", result: rs });
  } catch (err) {
    next(err);
    console.log(err)
  }
}

exports.getUserBooking = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await db.booking.findMany({
      where: {
        datetime: {
          gte: startOfDay.toISOString(),
          lt: endOfDay.toISOString(),
        },
      },
    });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

exports.createUserbooking = async (req, res, next) => {
  const { datetime, hairstyle_id, guest_id } = req.body;
  console.log(datetime)

  function convertToISO(time24) {
    // แยกส่วนชั่วโมงและนาทีออกจากกัน
    const [hours, minutes] = time24.split(':');

    // สร้างวันที่ปัจจุบัน
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    // แปลงเป็นรูปแบบ ISO 8601
    return now.toISOString();
  }

  const date = convertToISO(datetime)
  // const user_id  req.user.user_id
  try {

    const checkuser = await db.booking.findFirst({
      where: {
        AND: {
          userID: req.user.user_id,
          status: "NOT_CANCEL"
        }
      }
    })

    console.log(checkuser)

    if (checkuser) {
      return res.status(400).json({ message: "ไม่สามารถจองได้" })
    }

    const booking = await db.booking.create({
      data: {
        datetime: date,
        hairstyle: {
          connect: {
            hairstyle_id: +hairstyle_id,
          }
        },
        user: {
          connect: {
            user_id: req.user.user_id
          }
        },
        guest: {
          connect: {
            guest_id: +guest_id,
          }
        }

      }
    })
    res.json({ booking })
  } catch (err) {
    next(err)
    console.log(err)
  }
}

exports.createguest = async (req, res, next) => {
  const { nickname, age_range } = req.body;
  console.log(req.body)
  try {
    const createGuest = await db.guest.create({
      data: {
        nickname,
        age_range,
      }
    })
    res.json({ createGuest })
  } catch (err) {
    next(err)
    console.log(err)
  }
}

