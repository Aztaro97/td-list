import express from 'express'
import {
	authUser,
	registerUser,
} from '../controllers/userController'
import { protect, admin } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/register').post(registerUser)
router.post('/login', authUser)

export default router