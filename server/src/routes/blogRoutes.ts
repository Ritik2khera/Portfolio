import express from 'express';
import {
  getBlogs,
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all published blogs
// @access  Public
router.get('/', getBlogs);

// @route   GET /api/blogs/admin
// @desc    Get all blogs (including unpublished)
// @access  Private/Admin
router.get('/admin', protect, admin, getAllBlogs);

// @route   GET /api/blogs/:slug
// @desc    Get blog by slug
// @access  Public
router.get('/:slug', getBlogBySlug);

// @route   POST /api/blogs
// @desc    Create a blog
// @access  Private/Admin
router.post('/', protect, admin, createBlog);

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private/Admin
router.put('/:id', protect, admin, updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteBlog);

export default router; 