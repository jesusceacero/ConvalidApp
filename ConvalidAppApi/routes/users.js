var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user');

const authMiddleware = require("../middleware/auth");
const adminrMiddleware = require('../middleware/has_role_admin');

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/admin', UserController.loginAdmin);
router.get('/',authMiddleware.ensureAuthenticated, UserController.findAll);
router.get('/profesor',authMiddleware.ensureAuthenticated, UserController.findAllProfesor);
router.get('/users',authMiddleware.ensureAuthenticated, UserController.findAllUser);
router.get('/:id',authMiddleware.ensureAuthenticated, UserController.findOne);
router.get('/:id/profesor', authMiddleware.ensureAuthenticated, UserController.findAllUserConvProfesor);
router.get('/:id/img', authMiddleware.ensureAuthenticated, UserController.getImage);
router.post('/',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin, UserController.addUser);
router.put('/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin, UserController.updateUser);
router.put('/:id/password', authMiddleware.ensureAuthenticated, UserController.updatePassword);
router.put('/:id/img', authMiddleware.ensureAuthenticated, upload.single('photo'), UserController.updateImg);
router.delete('/:id',authMiddleware.ensureAuthenticated,adminrMiddleware.ensureAdmin, UserController.deleteUser);
router.delete('/:id/img', authMiddleware.ensureAuthenticated, UserController.deleteImg);
router.get('/register/:id', UserController.getregister);
router.post('/register/end/:id', UserController.registerEnd);

module.exports = router;
