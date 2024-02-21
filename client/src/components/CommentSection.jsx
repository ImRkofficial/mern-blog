import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import Comment from './Comment';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const CommentSection = ({postId}) => {
    const navigate = useNavigate();
    const {currentUser} = useSelector((state)=> state.user);
    const userId = currentUser?._id || currentUser?.updatedUser?._id;
    const [comment,setComment] = useState('');
    const [commentError ,setCommentError] = useState(null);
    const [comments,setComments]= useState(null);
    const [showModel,setShowModel] = useState(false);
    const [commentToDelete,setCommentToDelete] = useState(null);

    const handleSubmit =async (e)=>{
        e.preventDefault();

        if(comment?.length > 200){
            return;
        }

       try {
        const res = await fetch(`/api/comment/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({content:comment,userId,postId})
        });

        const data = await res.json();

        if(res.ok){
            setComment('');
            setCommentError(null);
            setComments([data,...comments])
        }
        if(!res.ok){
            setCommentError("Something went wrong")
        }
       } catch (error) {
        setCommentError(error.message);
       }
    };

    const getComments = async ()=>{
        try {
            const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();

        if(res.ok){
            setComments(data.comments);
        }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getComments();
    },[postId]);

    const handleLike = async (commentId)=>{
        try {
            if(!currentUser){
                navigate('/sign-in')
                return
            };

            const res = await fetch(`/api/comment/likeComment/${commentId}`,{
                method:"PUT"
            });

            
            if(res.ok){
                const data = await res.json();
                setComments(comments.map((comment)=>
                    comment?._id === commentId ? {
                        ...comment,
                        likes:data.likes,
                        numberOfLikes:data.likes?.length
                    } : comment
                ))
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = async(comment,editedContent)=>{
        setComments(
            comments.map((c)=>(
                c._id === comment._id ? {...c ,content:editedContent} : c  
            ))
        )
    };

    const handleDeleteComment = async(commentId)=>{
        setShowModel(false);
        try {
            if(!currentUser){
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`,{
                method:"DELETE"
            });

            if(res.ok){
                const data = await res.json();
                    setComments(
                        comments.filter((comment)=> comment._id !== commentId)
                    )
            }
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div className='max-w-2xl mx-auto w-full p-3 '>
    {currentUser ? (
        <>
            <div className="flex gap-3 items-center text-gray-500 my-5 text-sm">
                <p>Signed in as:</p>
                <img
                className='h-5 w-5 object-cover rounded-full'
                src={currentUser?.profilePicture || currentUser.updatedUser?.profilePicture} 
                alt={currentUser.username || currentUser.updatedUser?.username} />
                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-500 hover:underline'>
                    @{currentUser.username || currentUser.updatedUser?.username}
                </Link>
            </div>
        </>
    ):(
        <>
            <div className="text-sm text-teal-500 my-5">
                You must be signed in to comment
                <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                    Sign In
                </Link>
            </div>
        </>
    )}
    {currentUser && (
        <form className='border-teal-500 rounded-md p-3'
            onSubmit={handleSubmit}
        >
            <Textarea
                rows='3'
                maxLength="200"
                placeholder='Add a comment?...'
                onChange={(e)=>setComment(e.target.value)}
                value={comment}
            />
            <div className="flex justify-between items-center mt-5 ">
                <p className='text-gray-500 text-xs'>{200 - comment?.length} characters remaining</p>
                <Button outline gradientDuoTone={'purpleToBlue'} type='submit'>
                    Submit
                </Button>
            </div>
            {commentError && (
                <Alert className='mt-5' color="failure">{commentError}</Alert>
            )}
        </form>
    )}
    {comments?.length === 0 ? (
        <p className='text-sm my-5'>
            No comments yet!
        </p>
    ) : (
        <>
            <div className="flex items-center gap-2 text-sm my-5">
            <p className='text-xl'>Comments</p>
            <div className="border-gray-400 ">
                <p className='text-xl'>{comments?.length}</p>
            </div>
        </div>
        {comments?.map((comment)=>(
            <Comment
             key={comment._id} 
             comment={comment} 
             onLike={handleLike}
             onEdit={handleEdit} 
             onDelete={(commentId)=>{
                setShowModel(true);
                setCommentToDelete(commentId)
             }} 
             
             />
        ))}
        </>
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
                <Button color="failure" onClick={()=>handleDeleteComment(commentToDelete)} >
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
  )
}

export default CommentSection;