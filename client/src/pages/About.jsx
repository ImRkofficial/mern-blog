import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font font-semibold text-center mb-3'>About Us</h1>
          <h1 className='text-3xl font font-semibold text-center mb-3'>
            Contact Us On: <a href='mailto:rkbagra0490@gmail.com' className='text-purple-500'>rkbagra0490@gmail.com</a>
          </h1>
           <div className="text-gray-500 font-medium ">
            <p>Welcome to our blog, where we strive to provide valuable insights, tips, and resources on a wide range of topics to help you navigate the digital world with ease. Whether you're a seasoned professional looking to stay updated on the latest trends or a curious beginner eager to explore the vast realms of technology, our platform is designed to cater to all levels of expertise.</p>
           </div>
        </div>
      </div>
    </div>
  )
}

export default About