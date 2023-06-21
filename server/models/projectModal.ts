import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isDone: {
			type: Boolean,
			required: true,
			default: false
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

const Project = mongoose.model('Project', projectSchema)

export default Project