import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { blogAPI } from '../../services/api';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import { Plus, Edit, Trash2, FileText } from 'lucide-react';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogAPI.getAll();
      setBlogs(data || []);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
      toast.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.delete(id);
        await fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
    });
    if (blog.image) {
      setPreviewUrl(blog.image);
    }
    setModalOpen(true);
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title.trim());
    formDataToSend.append('content', formData.content.trim());
    if (selectedImage) {
      formDataToSend.append('image', selectedImage);
    }

    try {
      if (editingId) {
        await blogAPI.update(editingId, formDataToSend);
      } else {
        await blogAPI.create(formDataToSend);
      }

      await fetchBlogs();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '' });
    setSelectedImage(null);
    setPreviewUrl('');
    setEditingId(null);
    setModalOpen(false);
    // Reset file input
    setTimeout(() => {
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
    }, 100);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Create Blog
        </button>
      </div>

      {/* Blog Form Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Blog' : 'Create New Blog'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content (Markdown Supported)
            </label>
            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Markdown Syntax Guide:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600">
                <div>
                  <div><code className="bg-gray-100 px-1 rounded"># Heading 1</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">## Heading 2</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">**Bold text**</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">*Italic text*</code></div>
                </div>
                <div>
                  <div><code className="bg-gray-100 px-1 rounded">[Link text](URL)</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">`inline code`</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">```language</code> for code blocks</div>
                  <div><code className="bg-gray-100 px-1 rounded">> Blockquote</code></div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Lists: <code className="bg-gray-100 px-1 rounded">- item</code> or <code className="bg-gray-100 px-1 rounded">1. item</code> |
                Tables: <code className="bg-gray-100 px-1 rounded">| Header | Header |</code>
              </div>
            </div>
            <textarea
              placeholder="# Your Blog Title

Write your blog content here using markdown formatting...

## Section Heading

This is a paragraph with **bold text** and *italic text*.

### Code Example

```javascript
const example = 'Hello World';
console.log(example);
```

> This is a blockquote for important information.

- List item 1
- List item 2
- List item 3"
              value={formData.content || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg h-80 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm resize-y"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-48 w-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              {submitting && <ClipLoader size={16} color="white" />}
              {submitting ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
            </button>
          </div>
        </form>
      </Modal>

      {/* Blogs Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <ClipLoader size={50} color="#f97316" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FileText size={64} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
          <p className="text-gray-600 mb-6">Create your first blog post to get started</p>
          <button
            onClick={openCreateModal}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 flex items-center gap-2 mx-auto transition-colors"
          >
            <Plus size={20} />
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-3 text-gray-900 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit blog"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete blog"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
