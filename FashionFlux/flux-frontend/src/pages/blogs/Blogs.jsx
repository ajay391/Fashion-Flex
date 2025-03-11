import React from 'react';
import blogData from '../../data/blogs.json';

const Blogs = () => {
  return (
    <section className='section__container blog__container py-10'>
      <h2 className="text-center text-4xl font-bold mb-6 uppercase text-gray-800">
        Latest From Blog
      </h2>
      <p className='text-center text-gray-500 mb-10'>
        Get the latest fashion trends, tips, and insights!
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {blogData.map((blog) => (
          <div key={blog.id} className='blog__card cursor-pointer hover:scale-105 transition-all duration-300 bg-white rounded-lg shadow-lg overflow-hidden'>
            <img src={blog.imageUrl} alt="blog_image" className='w-full h-56 object-cover' />
            <div className='py-4'>
              <h6 className='text-sm text-gray-500 py-2'>{blog.subtitle}</h6>
              <h4 className='text-xl font-medium text-gray-800 '>{blog.title}</h4>
              <p className='text-gray-600 text-sm mt-2'>{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
