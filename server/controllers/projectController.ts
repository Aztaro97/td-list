import asyncHandler from 'express-async-handler'
import { IUser } from '../@types/types'
import Project from '../models/projectModal'




// @desc    Fetch single project
// @route   GET /api/project/:id
// @access  Public
export const getProjectById = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)

	if (project) {
		res.json(project)
	} else {
		res.status(404)
		throw new Error('Project not found')
	}
})


// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
	const project = await Project.findById(req.params.id)

	if (project) {
		await project.deleteOne()
		res.json({ message: 'Project removed', _id: project._id })
	} else {
		res.status(404)
		throw new Error('Project not found')
	}
})


// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req: any, res: any) => {
	const { title, description, isDone } = req.body
	const project = new Project({
		title,
		description,
		isDone
	})

	const createdProject = await project.save()
	res.status(201).json(createdProject)
})



// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
	const { title, description } = req.body

	const project = await Project.findById(req.params.id)

	if (project) {
		project.title = title
		project.description = description
		const updatedProject = await project.save()
		res.json(updatedProject)
	} else {
		res.status(404)
		throw new Error('Project not found')
	}
})


// @desc    Fetch all project
// @route   GET /api/project/all
// @access  Public
export const getAllProject = asyncHandler(async (req, res) => {
	try {
		const project = await Project.find({});
		res.status(200).json(project)

	} catch (error: any) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc    Updated the status project
// @route   DELETE /api/projects/status/:id
// @access  Public/Admin
export const updateStatusProject = asyncHandler(async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		if (project) {
			project.isDone = !project.isDone
			const updatedProject = await project.save()
			res.json(updatedProject)
		} else {
			res.status(404)
			throw new Error('Project not found')
		}
	} catch (error: any) {
		res.status(404)
		throw new Error(error)
	}
})