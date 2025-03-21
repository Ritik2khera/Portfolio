import express from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', getProjects);

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', getFeaturedProjects);

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', getProjectById);

// @route   POST /api/projects
// @desc    Create a project
// @access  Private/Admin
router.post('/', protect, admin, createProject);

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private/Admin
router.put('/:id', protect, admin, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteProject);

export default router; 