const express = require('express')
const router = express.Router()
const adminController = require('../controller/admin-controller')
const authenticate = require('../middlewares/authenticate')

router.get('/users' , adminController.getUsers)  
router.get('/bookings' , adminController.getBookings)
router.get('/hairstyle' , adminController.getHairStyle)
router.get('/statususer' , adminController.getStatusUser)

router.delete('/deleteUsers/:user_id' , adminController.deleteUsers) 
router.delete('/deleteBooking/:booking_id' , adminController.deleteBooking)
router.delete('/deleteHairstyle/:hairstyle_id' , adminController.deleteHairstyle)


router.post('/createhairstyle',adminController.createHairStyle)
router.post('/bookings' , authenticate, adminController.createUserbooking)
router.post('/guest' , authenticate, adminController.createguest)


router.patch('/updateHairstyle/:hairstyle_id',adminController.updateHairStyle)

module.exports = router 