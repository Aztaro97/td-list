import asyncHandler from 'express-async-handler'
import { IUser } from '../@types/types'
import User from '../models/userModel'
import generateToken from '../utils/generateToken'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email }) as IUser

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user.id) as string,
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
})
