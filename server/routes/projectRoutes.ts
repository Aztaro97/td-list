import express from 'express'
import { createProject, deleteProject, getAllProject, getProjectById, updateProject, updateStatusProject } from '../controllers/projectController'
import { protect, admin } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/all').get(getAllProject)
router.route('/create').post(createProject)
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject)
router.route("/status/:id").put(updateStatusProject)

export default router