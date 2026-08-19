import express from 'express';
import Event from '../models/Event.js';
import multer from 'multer';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'temp/uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});
const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new event
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = null;
    let imagePublicId = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.path, 'skillora/events');
      imageUrl = cloudinaryResult.url;
      imagePublicId = cloudinaryResult.publicId;
    }

    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      image: imageUrl,
      imagePublicId: imagePublicId
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update event
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    // Find the existing event first
    const existingEvent = await Event.findById(req.params.id);
    if (!existingEvent) return res.status(404).json({ message: 'Event not found' });

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
    };

    // Handle image update
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (existingEvent.imagePublicId) {
        try {
          await deleteFromCloudinary(existingEvent.imagePublicId);
        } catch (deleteError) {
          console.warn('Failed to delete old image from Cloudinary:', deleteError.message);
        }
      }

      // Upload new image to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(req.file.path, 'skillora/events');
      updateData.image = cloudinaryResult.url;
      updateData.imagePublicId = cloudinaryResult.publicId;
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Delete image from Cloudinary if it exists
    if (event.imagePublicId) {
      try {
        await deleteFromCloudinary(event.imagePublicId);
      } catch (deleteError) {
        console.warn('Failed to delete image from Cloudinary:', deleteError.message);
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
