import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import '../styles/markdown.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return (
    <div className='w-full h-screen flex items-center justify-center '>
      <GridLoader color='#FF7E38' />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{blog.title} - Skillora Design Academy</title>
        <meta name="description" content={blog.content.substring(0, 160) + '...'} />
        <meta name="keywords" content={`${blog.title}, Design Blog, Creative Article, Skillora Academy, Design Education`} />
        <link rel="canonical" href={`https://skilloraacademy.com/blog/${blog._id}`} />
        <meta property="og:title" content={`${blog.title} - Skillora Design Academy`} />
        <meta property="og:description" content={blog.content.substring(0, 160) + '...'} />
        <meta property="og:url" content={`https://skilloraacademy.com/blog/${blog._id}`} />
        <meta property="og:type" content="article" />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} - Skillora Design Academy`} />
        <meta name="twitter:description" content={blog.content.substring(0, 160) + '...'} />
        {blog.image && <meta name="twitter:image" content={blog.image} />}
        <meta property="article:published_time" content={blog.createdAt} />
        <meta property="article:author" content="Skillora Design Academy" />
      </Helmet>
      <div className="max-w-7xl mx-auto p-5 md:p-20 mt-8">
        <div className='pl-4 border-l-4 py-1 mb-8 border-blue-600'>
          <h1 className="text-2xl md:text-4xl text-start font-semibold dm-sans">{blog.title}</h1>
          <p className="text-gray-700 text-base text-start">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
          />
        )}

        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({children}) => <h1 className="group">{children}</h1>,
              h2: ({children}) => <h2 className="group">{children}</h2>,
              h3: ({children}) => <h3 className="group">{children}</h3>,
              h4: ({children}) => <h4 className="group">{children}</h4>,
              h5: ({children}) => <h5 className="group">{children}</h5>,
              h6: ({children}) => <h6 className="group">{children}</h6>,
              code: ({inline, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative">
                    <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-bl-lg">
                      {match[1]}
                    </div>
                    <pre className={className} {...props}>
                      <code>{children}</code>
                    </pre>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              blockquote: ({children}) => (
                <blockquote className="relative">
                  <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                  {children}
                </blockquote>
              ),
              table: ({children}) => (
                <div className="overflow-x-auto my-8">
                  <table>{children}</table>
                </div>
              )
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BlogDetail;
