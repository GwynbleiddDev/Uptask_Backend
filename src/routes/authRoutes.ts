import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";


const router: Router = Router()

router.post('/create-account', 
  body('name')
  .notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password')
  .isLength({min: 8}).withMessage('El Password debe ser de al menos 8 caracteres'),
  body('password_confirmation').custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error('Los Passwords no son iguales')
    }
    return true
  }),
  body('email')
  .isEmail().withMessage('E-mail no válido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post('/confirm-account', 
  body('token')
  .notEmpty().withMessage('El token es obligatorio'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post('/login',
  body('email')
  .isEmail().withMessage('E-mail no valido'),
  body('password')
  .notEmpty().withMessage('El Password no puede ir vacio'),
  handleInputErrors,
  AuthController.login
)


router.post('/request-code',
  body('email')
  .isEmail().withMessage('E-mail no valido'),
  handleInputErrors,
  AuthController.requestConfirmationCode
)


router.post('/forgot-password',
  body('email')
  .isEmail().withMessage('E-mail no valido'),
  handleInputErrors,
  AuthController.forgotPassword
)


router.post('/validate-token',
  body('token')
  .notEmpty().withMessage('El token es obligatorio'),
  handleInputErrors,
  AuthController.validateToken
)


router.post('/update-password',
  param('token')
  .notEmpty().withMessage('token no válido'),
  body('password')
  .isLength({min: 8}).withMessage('El Password debe ser de al menos 8 caracteres'),
  body('password_confirmation').custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error('Los Passwords no son iguales')
    }
    return true
  }),
  handleInputErrors,
  AuthController.validateToken
)


router.get('/user',
  authenticate,
  AuthController.user
)


// ============================= PROFILE =============================
router.put('/profile',
  authenticate,
  body('name')
  .notEmpty().withMessage('El nombre no puede ir vacio'),
  body('email')
  .isEmail().withMessage('E-mail no valido'),
  handleInputErrors,
  AuthController.updateProfile
)


router.post('/profile/update-password',
  authenticate,
  body('current_password')
  .notEmpty().withMessage('El Password actual no puede ir vacio'),
  body('password')
  .isLength({min: 8}).withMessage('El Password debe ser de al menos 8 caracteres'),
  body('password_confirmation').custom((value, {req}) => {
    if(value !== req.body.password) {
      throw new Error('Los Passwords no son iguales')
    }
    return true
  }),
  handleInputErrors,
  AuthController.updateCurrentUserPassword
)


router.post('/check-password',
  authenticate,
  body('password')
  .notEmpty().withMessage('El Password actual no puede ir vacio'),
  handleInputErrors,
  AuthController.checkPassword
)


export default router