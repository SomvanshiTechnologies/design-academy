import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Calendar, User, ArrowRight, Eye, Heart, Share2, Clock, Tag, BookOpen, TrendingUp } from 'lucide-react';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

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
        console.error('Error fetching blogs:', error);
        // Fallback data for demo
        setBlogs([
          {
            _id: '1',
            title: 'The Future of Design Education',
            content: 'Exploring how technology is reshaping the way we learn and teach design...',
            image: null,
            createdAt: new Date().toISOString(),
          },
          {
            _id: '2',
            title: 'Building Your Design Portfolio',
            content: 'Essential tips for creating a portfolio that stands out to employers...',
            image: null,
            createdAt: new Date().toISOString(),
          },
          {
            _id: '3',
            title: 'Industry Trends in 2024',
            content: 'What design trends are shaping the industry this year...',
            image: null,
            createdAt: new Date().toISOString(),
          }
        ]);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (isInView && blogs.length > 0) {
      const ctx = gsap.context(() => {
        // Animate blog cards
        gsap.fromTo(".blog-card",
          {
            opacity: 0,
            y: 80,
            scale: 0.9,
            rotateX: -10
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2,
            delay: 0.3
          }
        );

        // Animate floating elements
        gsap.to(".blog-float", {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          stagger: 0.5
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isInView, blogs]);

  const blogStats = [
    { icon: Eye, value: "12K", label: "Views" },
    { icon: Heart, value: "2.5K", label: "Likes" },
    { icon: Share2, value: "890", label: "Shares" },
  ];

  return (
    <section ref={containerRef} className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blog-float absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 rounded-full blur-xl"></div>
        <div className="blog-float absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-blue-500/10 rounded-full blur-lg"></div>
        <motion.div
          className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-purple-400 rounded-full"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Latest Insights
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold font-inter text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Latest Blogs  & <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">articles</span>
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Stay informed and inspired with the latest blogs and articles from Skillora. Our dedicated team of experts and industry leaders regularly curate insightful content to help you stay ahead in your creative journey.
          </motion.p>

          {/* Stats Row */}
          {/* <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {blogStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-lg">{stat.value}</span>
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </motion.div> */}
        </motion.div>

        {/* Enhanced Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="blog-card group relative"
            >
              <div className="glass-blue rounded-2xl overflow-hidden shadow-md border border-blue-200/50 group-shadow-lg transition-all duration-500 relative">

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-600 flex items-center justify-center">
                      <div className="text-white text-6xl font-bold opacity-20">
                        {blog.title.charAt(0)}
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div> */}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Blog
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      5 min read
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      className="glass rounded-full p-3 shadow-md"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>Skillora Team</span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link
                    to={`/blog/${blog._id}`}
                    className="block"
                  >
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {blog.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-gray-600 line-clamp-3 leading-relaxed">
                    {blog.content?.substring(0, 120)}...
                  </p>

                  {/* Action Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>1.2K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>89</span>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors flex items-center gap-1 group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/blogs">
            <motion.button
              className="group bg-gradient-to-r from-blue-600 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-5 h-5" />
              View All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;