import express from 'express';
import {
  submitContact,
  getContacts,
  getContactById,
  markContactAsRead,
  deleteContact,
} from '../controllers/contactController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a contact form
// @access  Public
router.post('/', submitContact);

// @route   GET /api/contact
// @desc    Get all contact submissions
// @access  Private/Admin
router.get('/', protect, admin, getContacts);

// @route   GET /api/contact/:id
// @desc    Get contact by ID
// @access  Private/Admin
router.get('/:id', protect, admin, getContactById);

// @route   PUT /api/contact/:id/read
// @desc    Mark contact as read
// @access  Private/Admin
router.put('/:id/read', protect, admin, markContactAsRead);

// @route   DELETE /api/contact/:id
// @desc    Delete a contact
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteContact);

export default router; 