import { Request, Response } from 'express';
import Contact, { IContact } from '../models/Contact';

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      isRead: false,
    });

    const createdContact = await contact.save();
    res.status(201).json({
      message: 'Your message has been sent successfully!',
      contact: createdContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Mark contact as read
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
export const markContactAsRead = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      contact.isRead = true;
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Contact removed' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 