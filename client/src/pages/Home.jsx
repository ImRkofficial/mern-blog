import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import CallToAction from './../components/CallToAction';
import PostCard from './../components/PostCard';

const Home = () => {
  const [posts,setPosts] = useState([]);

  const fetchPosts = async()=>{
    try {
      const res = await fetch(`/api/post/getposts?limit=9`);
      const data = await res.json();
      if(res.ok){
        setPosts(data.posts)
      }
    } catch (error) {
      console.log(error.message); 
    }
  }
  useEffect(()=>{
    fetchPosts();
  },[])
  return (
    <>
      <div className="">
        <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
          <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my blog</h1>
          <p className='text-gray-500 sm:text-sm text-xs'> Welcome to our blog website, where words come alive and ideas thrive! Dive into a world of creativity, inspiration, and       knowledge as we embark on a journey through captivating stories, insightful reflections, and engaging content. Whether you're here to discover new passions, gain valuable insights, or simply unwind with a good read, our blog welcomes you with open arms.

          </p>
        <Link to={'/search'} className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View all posts
        </Link>
        </div>
        <div className="p-3 bg-amber-50 dark:bg-slate-700">
          <div className="max-w-6xl mx-auto">
           <CallToAction />
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div className="flex  flex-col gap-6">
              <h2 className='text-2xl font-semiblod text-center'>Recent Posts</h2>
              <div className="flex mt-5 flex-wrap gap-4 justify-center ">
                {posts.map((post,i)=>(
                  <PostCard key={i} post={post}/>
                ))}
              </div>
              <Link to={`/search`} className='text-lg text-teal-500 hover:underline text-center'>
                  View All Posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home;