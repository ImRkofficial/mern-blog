import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck,FaTimes } from 'react-icons/fa';

const DashComments = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const userId = currentUser._id || currentUser.updatedUser?._id;
  const isUserAdmin = currentUser?.isAdmin || currentUser?.updatedUser?.isAdmin;
  const [comments,setComments] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModel,setShowModel] = useState(false);
  const [commentIdToDelete,setCommentIdToDelete]= useState(null)


  const fethComments = async()=>{
    try {
      const res = await fetch(`/api/comment/getcomments`);
      const data = await res.json();
      
      if(res.ok){
        setComments(data.comments)
        if(data.comments.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(isUserAdmin){
      fethComments();
    }
  },[userId]);

  const handleShowMore = async()=>{
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
      const data = await res.json();
      
      if(res.ok){
        setUsers((prev)=>[...prev,...data.comments])
        if(data.comments.length < 9){
          setShowMore(false)
        }
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async ()=>{
    try {
      const res= await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
        method:"DELETE"
      });
      const data = await res.json();
      if(res.ok){
        setComments((prev=>prev.filter((comment)=>comment._id !== commentIdToDelete)));
        setShowModel(false);
      }else{
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {isUserAdmin && comments?.length > 0 ? (
          <>
            <Table 
              hoverable
              className='shadow-md'
            >
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Number Of Likes</Table.HeadCell>
                <Table.HeadCell>Post Id</Table.HeadCell>
                <Table.HeadCell>User Id</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {comments.map((comment,i)=>(
                
                <Table.Body className='divide-y' key={i}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                        {comment.content}
                    </Table.Cell>
                    <Table.Cell>
                       {comment.numberOfLikes}
                     
                    </Table.Cell>
                    <Table.Cell>
                        {comment.postId}
                    </Table.Cell>
                    <Table.Cell>
                        {comment.userId }
                    </Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-500 cursor-pointer hover:underline'
                        onClick={()=>{
                          setShowModel(true)
                          setCommentIdToDelete(comment._id)
                        }}
                      >
                        Delete
                      </span>
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
          <p>There is no Comments yet </p>
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
              <h3 className=" text-center mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment?</h3>
              <div className=" flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteComment} >
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

export default DashComments;