import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogDetailForCourse = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
        const data = await response.json();
        const sortedBlogs = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-left font-semibold text-gray-900 mb-10">
          Latest Blogs & Articles
        </h2>

        <div className="grid grid-cols-1 gap-10">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col rounded-2xl overflow-hidden">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-xl"
                />
              )}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  &nbsp; | &nbsp; Blogs
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-lg font-semibold text-gray-900 hover:underline hover:text-orange-500 transition"
                >
                  {blog.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailForCourse;
