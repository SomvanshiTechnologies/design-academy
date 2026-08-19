import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Tag, TrendingUp, BookOpen, Users, Award, Star, Clock, Eye, Heart, Share2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta.jsx";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const pageMetaTags = usePageMeta('allBlogs');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
        const data = await response.json();
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sorted);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchBlogs();
  }, []);

  const featuredBlog = blogs[0];
  const latestBlogs = blogs.slice(1, visibleCount);
  const popularPosts = blogs.slice(0, 5); // Mock popular posts

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
    // Strip markdown formatting for preview
    const stripMarkdown = (markdown) => {
      return markdown
        .replace(/#+\s+/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/>\s+/g, '') // Remove blockquotes
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();
    };

    const strippedText = stripMarkdown(text);
    return strippedText.length > maxLength
      ? strippedText.substring(0, maxLength) + "..."
      : strippedText;
  };

  const categories = [
    { name: "Web Development", color: "bg-blue-100 text-blue-700" },
    { name: "Design", color: "bg-purple-100 text-purple-700" },
    { name: "JavaScript", color: "bg-yellow-100 text-yellow-700" },
    { name: "React", color: "bg-cyan-100 text-cyan-700" },
    { name: "Career Tips", color: "bg-green-100 text-green-700" },
    { name: "Tutorials", color: "bg-orange-100 text-orange-700" }
  ];

  const stats = [
    { icon: BookOpen, value: "50+", label: "Articles", color: "text-blue-500" },
    { icon: Users, value: "2.5K", label: "Readers", color: "text-green-500" },
    { icon: Award, value: "15", label: "Authors", color: "text-purple-500" }
  ];

  return (
    <>
      {pageMetaTags}
      <div className="max-w-7xl mx-auto px-4 py-16 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content - Wider */}
          <div className="lg:col-span-2">
            {/* Featured Blog */}
            {featuredBlog && (
              <div className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
                    Featured Article
                  </span>
                </div>

                <a
                  href={`/blog/${featuredBlog._id}`}
                  className="block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-md transition-all duration-300 group border border-orange-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <div className="flex items-center gap-2 mb-4 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredBlog.createdAt)}</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-3 line-clamp-2">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-gray-200 line-clamp-2 text-lg">
                        {truncateText(featuredBlog.content, 120)}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            )}

            {/* Latest Articles Header */}
            <div className="mb-4">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Latest Articles
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-4">
              {latestBlogs.map((blog) => (
                <Link
                  to={`/blog/${blog._id}`}
                  // href={`/blog/${blog._id}`}
                  key={blog._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    {blog.image && (
                      <div className="sm:w-72 h-48 sm:h-full overflow-hidden flex-shrink-0">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-8">
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {blog.title}
                      </h4>

                      <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                        {truncateText(blog.content, 150)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{Math.floor(Math.random() * 1000) + 100}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-orange-500 font-medium hover:gap-3 transition-all">
                          <span>Read more</span>
                          <ArrowRight className="w-4 h-4 hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < blogs.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* About Section */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-3xl border border-orange-200 shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    About Skillora
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  Discover insightful courses, expert tips, and inspiration to
                  elevate your creative journey. Join our community of learners
                  and professionals.
                </p>
              </div>

              {/* Stats Section */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Our Community</h4>
                <div className="space-y-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-gray-600 text-sm">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              {/* <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Popular Posts</h4>
                <div className="space-y-6">
                  {popularPosts.map((post, index) => (
                    <Link
                      key={post._id}
                      to={`/blog/${post._id}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${post.image}`}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {post.title}
                        </h5>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>{formatDate(post.createdAt)}</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{Math.floor(Math.random() * 500) + 50}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div> */}

              {/* Categories */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Categories</h4>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBlogs;