const express = require('express')
const router = express.Router()
const adminController = require('../controller/admin-controller')
const authenticate = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')

// เรียกข้อมูล
router.get('/users' , adminController.getUsers)
router.get('/bookings' , adminController.getBookings)
router.get('/search/bookings*', adminController.SearchHistory)
router.get('/hairstyle' , adminController.getHairStyle)
router.get('/statususer' , adminController.getStatusUser)
router.get('/getBook', adminController.getUserBooking)
router.get('/allBook', adminController.allBooking)
router.get('/hairstyle/:id' , adminController.getHairStyleByid)
router.get('/checkBooking*', adminController.checkDateBooking)
router.get('/hairstyle/:id' , adminController.getHairStatusByid)

//เพิ่ม
router.post('/createhairstyle', upload.array('image', 1), adminController.createHairStyle)
router.post('/bookings' , authenticate, adminController.createUserbooking)
router.post('/guest' , authenticate, adminController.createguest)

// ลบ
router.delete('/deleteUsers/:user_id' , adminController.deleteUsers) 
router.delete('/deleteBooking/:booking_id' , adminController.deleteBooking)
router.delete('/deleteHairstyle/:hairstyle_id' , adminController.deleteHairstyle)

// แก้ไข
router.patch('/updateHairstyle/:hairstyle_id',adminController.updateHairStyle)
router.patch('/booking/:id*', adminController.updateStatus)

module.exports = router 