const express = require('express')
const router = express.Router()
const adminController = require('../controller/admin-controller')

router.get('/users' , adminController.getUsers)  

module.exports = router 