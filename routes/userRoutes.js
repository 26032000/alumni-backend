const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const { uploadImage, passImageString } = require('../middlewares/multer_mid')
const auth_middleware=require('../middlewares/auth_mid')

router.post('/signup', uploadImage,passImageString ,userController.createUser);
router.post('/login',userController.loginUser);

router.get('/getalluser',userController.getAllUser);
router.put('/updateuser',userController.updateUser);
router.put('/promoteadmin',userController.promoteAdmin);
router.put('/demoteadmin',userController.demoteAdmin); 
router.post('/reset',userController.resetPasswod); 
router.get('/profile',auth_middleware,userController.getProfile);
router.get('/self',auth_middleware,userController.getMyUser);

module.exports=router;