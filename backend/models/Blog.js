import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  imagePublicId: {
    type: String,
    required: false
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Blog', blogSchema);
