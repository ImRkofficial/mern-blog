import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashPost = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const userId = currentUser._id || currentUser.updatedUser?._id;
  const isUserAdmin = currentUser.isAdmin || currentUser.updatedUser?.isAdmin;
  const [userPosts,setUserPosts] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModel,setShowModel] = useState(false);
  const [postIdToDelete,setPostIdToDelete]= useState(null)


  const fetchPosts = async()=>{
    try {
      console.log(userId);
      const res = await fetch(`/api/post/getposts?userId=${userId}`);
      const data = await res.json();
      console.log(data);
      if(res.ok){
        setUserPosts(data.posts)
        if(data.posts.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(isUserAdmin){
      fetchPosts();
    }
  },[userId]);

  const handleShowMore = async()=>{
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${userId}&startIndex=${startIndex}`)
      const data = await res.json();
      
      if(res.ok){
        setUserPosts((prev)=>[...prev,...data.posts])
        if(data.posts.length < 9){
          setShowMore(false)
        }
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async ()=>{
    setShowModel(false);
    
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${userId}`,{
        method:"DELETE"
      });

      const data = await res.json();

      if(!res.ok){
        console.log(data.message);
      }else{
        setUserPosts((prev)=>{
         return prev.filter((post)=>post._id !== postIdToDelete)
        });
      }

    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {isUserAdmin && userPosts?.length > 0 ? (
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
              {userPosts.map((post,i)=>(
                <Table.Body className='divide-y' key={i}>
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
                      <span className='font-medium text-red-500 cursor-pointer hover:underline'
                        onClick={()=>{
                          setShowModel(true)
                          setPostIdToDelete(post._id)
                        }}
                      >
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
            {showMore && (
              <button className='w-full text-teal-500 text-center text-sm py-7'
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </>
        ):(
          <p>There is no posts yet </p>
        )}
        <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size={"md"}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-conter">
            <HiOutlineExclamationCircle
             className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"
              />
              <h3 className=" text-center mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
              <div className=" flex justify-center gap-4">
                <Button color="failure" onClick={handleDeletePost} >
                Yes I'am sure
                </Button>
                <Button color="gray" onClick={()=>setShowModel(false)}>
                  No, cancel
                </Button>
              </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </>
  )
}

export default DashPost;