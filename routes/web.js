const express = require('express')
const BlogController = require('../controllers/BlogController')
const UserController = require('../controllers/UserController')
const router = express.Router()

//blog  route
router.post('/create', BlogController.create)
router.get('/display', BlogController.display)
router.get('/view/:id', BlogController.view)
router.post('/update/:id', BlogController.update)
router.get('/delete/:id', BlogController.delete)

// Frant route 
router.post('/userRegister',UserController.userRegister)
router.post('/veryfyLogin', UserController.veryfyLogin)














module.exports = router