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

exports.createUserbooking = async (req, res, next) => {
  const { datatime, hairstyle_id, guest_id } = req.body;
  // const user_id  req.user.user_id
  try {
    const dateTime = new Date(datatime)
      const booking = await db.booking.create({
          data: {
              datetime: dateTime,
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
  }catch(err){
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
  }catch(err){
    next(err)
    console.log(err)
  }
}