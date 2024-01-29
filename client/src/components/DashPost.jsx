import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashPost = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const userId = currentUser._id || currentUser.updatedUser?._id;
  const isUserAdmin = currentUser.isAdmin || currentUser.updatedUser?.isAdmin;
  const [userPosts,setUserPosts] = useState([]);
console.log(userPosts);

  const fetchPosts = async()=>{
    try {
      const res = await fetch(`/api/post/getposts?userId=${userId}`);
      const data = await res.json();
      
      if(res.ok){
        setUserPosts(data.posts)
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    if(isUserAdmin){
      fetchPosts();
    }
  },[userId])
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {isUserAdmin && userPosts.length > 0 ? (
          <>
            <Table 
              hoverable
              className='shadow-md'
            >
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {userPosts.map((post)=>(
                <Table.Body className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-20 h-10 bg-gray-500 object-cover '
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                        {post.category}
                    </Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-500 cursor-pointer hover:underline'>
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`} className='font-medium text-teal-500 hover:underline'>
                      <span>
                        Edit
                      </span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}

            </Table>
          </>
        ):(
          <p>There is no posts yet </p>
        )}
      </div>
    </>
  )
}

export default DashPost;