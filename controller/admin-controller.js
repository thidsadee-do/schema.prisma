const db = require('../models/db');
const axios = require('axios')
const cloudUpload = require("../utils/cloudpload");

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
      },
      where: {
        status: 0
      },
      // orderBy: {
      //   datetime: 'asc'
      // },
    });
    // console.log(bookings)
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};

exports.checkDateBooking = async (req, res, next) => {
  try {
    const { checkDate } = req.query

    const startOfDay = new Date(checkDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(checkDate);
    endOfDay.setHours(23, 59, 59, 999);

    const check = await db.booking.findMany({
      where: {
        datetime: {
          gte: startOfDay.toISOString(),
          lt: endOfDay.toISOString(),
        },
        status: 0
      },
    });

    res.json({ check })
  } catch (err) {
    next(err)
    console.log(err)
  }
}

exports.getHairStyleByid = async (req, res, next) => {
  try {
    const { id } = req.params
    const gethairid = await db.hairstyle.findFirst({
      where: {
        hairstyle_id: Number(id)
      }
    })
    res.json({ gethairid })
  } catch (err) {
    next(err);
  }
};

exports.getHairStatusByid = async (req, res, next) => {
  try {
    const { id1 } = req.params
    const getstatusimgid = await db.hairstyle.findFirst({
      where: {
        hairstyle_id: Number(id1)
      }
    })
    res.json({ getstatusimgid })
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

// exports.getUserBooking = async (req, res, next) => {
//   try {
//     const UserBooking = await db.hairstyle.findMany();
//     res.json({ UserBooking });
//   } catch (err) {
//     next(err);
//   }
// };

exports.getStatusUser = async (req, res, next) => {
  try {
    const StatusUser = await db.booking.findMany({
      include: {
        guest: true,
        hairstyle: true,
        user: true,
      },
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

exports.  createHairStyle = async (req, res, next) => {
  try {
    const { hairstyle_name, hairstyle_price } = req.body;

    console.log(req.files)

    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);

    console.log(req.body)

    const HairStyle = await db.hairstyle.create({
      data: {
        hairstyle_name,
        hairstyle_img: imageUrlArray[0],
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
    const { hairstyle_name, hairstyle_price } = req.body;
    console.log(req.body)
    
    const imagePromise = req.files.map((file) => {
      return cloudUpload(file.path);
    });

    const imageUrlArray = await Promise.all(imagePromise);

    const HairStyle = await db.hairstyle.update({
      where: {
        hairstyle_id: +hairstyle_id
      },
      data: {
        hairstyle_name,
        hairstyle_img: imageUrlArray,
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
  const { datetime, hairstyle_id, guest_id, checkDate } = req.body;
  console.log(datetime)

  function convertToISO(time24, date) {

    const [hours, minutes] = time24.split(':');
    const now = new Date(date);
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    return now.toISOString();
  }
  const date = convertToISO(datetime, checkDate)
  try {
    const checkuser = await db.booking.findFirst({
      where: {
        AND: {
          userID: req.user.user_id,
          status: 0
        }
      }
      
    })
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
      },
    })

    const params = new URLSearchParams({
      message: `มีการจองคิว ${booking.booking_id} \nสถานะ${booking.status === 0 ? "รอยืนยัน" : booking.status === 1 ? "ยืนยันแล้ว" : "ยกเลิก"}`
    })

    const token = process.env.TokonLine
    const response = await axios.post('https://notify-api.line.me/api/notify', params.toString(), {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    res.json({ booking })
  } catch (err) {
    next(err)
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
      },
    })
    res.json({ createGuest })
  } catch (err) {
    next(err)
    console.log(err)
  }
}

exports.allBooking = async (req, res, next) => {
  try {
    const allBook = await db.booking.findMany({
      where: {
        status: {
          not: 0
        }
      },
      include: {
        user: true,
        hairstyle: true,
        guest: true
      },
      orderBy: {
        booking_id: 'desc'
      },
      
      
    })
    res.json({ allBook, status: 200, result: "success!" })
  } catch (err) {
    next(err)
    console.log(err)
  }
}

exports.SearchHistory = async (req, res, next) => {
  try {
    const { search } = req.query
    const Searchoder = await db.booking.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                hairstyle: {
                  hairstyle_name: {
                    contains: search
                  }
                }
              },
              {
                user: {
                  OR: [
                    {
                      username: {
                        contains: search
                      }
                    },
                    {
                      phone: {
                        contains: search
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      include: {
        hairstyle: true,
        user: true,
        guest: true
      }
    })

    if (Searchoder.length === 0) {
      return res.status(400).json({ message: "ไม่พบข้อมูลที่ค้นหา", status: 400, result: "Error" })
    }

    res.json({ Searchoder, status: 200, result: "success!" })
  } catch (err) {
    next(err)
    console.log(err)
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const update = await db.booking.update({
      where: {
        booking_id: Number(id)
      },
      
      data: {
        status: Number(status)
      },
      
    })
    

    const params = new URLSearchParams({
      message: `สถานะการจอง ${update.booking_id} \nสถานะถูก\n${update.status === 0 ? "รอยืนยัน" : update.status === 1 ? "ยืนยันแล้ว" : "ยกเลิก"}`
    })
    const token = process.env.TokonLine
    const response = await axios.post('https://notify-api.line.me/api/notify', params.toString(), {
      headers: {
        Authorization: "Bearer " + token,
      },
      
    });

    res.json({ update, status: 200, result: "success!" })
  } catch (err) {
    next(err)
    console.log(err)
  }
};


