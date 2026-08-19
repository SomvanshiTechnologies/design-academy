import express from 'express';
import Blog from '../models/Blog.js';
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

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new blog
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = null;
    let imagePublicId = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      const cloudinaryResult = await uploadToCloudinary(req.file.path, 'skillora/blogs');
      imageUrl = cloudinaryResult.url;
      imagePublicId = cloudinaryResult.publicId;
    }

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
      imagePublicId: imagePublicId,
      author: 'Admin' // Or get from auth token
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update blog
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    // Find the existing blog first
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) return res.status(404).json({ message: 'Blog not found' });

    const updateData = {
      title: req.body.title,
      content: req.body.content,
    };

    // Handle image update
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (existingBlog.imagePublicId) {
        try {
          await deleteFromCloudinary(existingBlog.imagePublicId);
        } catch (deleteError) {
          console.warn('Failed to delete old image from Cloudinary:', deleteError.message);
        }
      }

      // Upload new image to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(req.file.path, 'skillora/blogs');
      updateData.image = cloudinaryResult.url;
      updateData.imagePublicId = cloudinaryResult.publicId;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Delete image from Cloudinary if it exists
    if (blog.imagePublicId) {
      try {
        await deleteFromCloudinary(blog.imagePublicId);
      } catch (deleteError) {
        console.warn('Failed to delete image from Cloudinary:', deleteError.message);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
