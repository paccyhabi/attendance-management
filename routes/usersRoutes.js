const userController = require('../controller/userController.js')
const {checkToken} = require('../auth/tokenValidation.js')
const router = require('express').Router()
router.post('/addUser',userController.addUser)
router.post('/login', userController.loginUser)
router.get('/allUsers',userController.getAllUsers)


router.get('/:id', checkToken, userController.getOneUser)
router.put('/:id', checkToken, userController.updateUser)
router.patch('/:id', checkToken, userController.updateUserr)
router.delete('/:id', checkToken, userController.deleteUser)
module.exports = router