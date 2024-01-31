import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck,FaTimes } from 'react-icons/fa';

const DashUsers = () => {
  const { currentUser } = useSelector((state)=>state.user);
  const userId = currentUser._id || currentUser.updatedUser?._id;
  const isUserAdmin = currentUser.isAdmin || currentUser.updatedUser?.isAdmin;
  const [users,setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModel,setShowModel] = useState(false);
  const [userIdToDelete,setUserIdToDelete]= useState(null)


  const fethUsers = async()=>{
    try {
      const res = await fetch(`/api/user/getusers`);
      const data = await res.json();
      
      if(res.ok){
        setUsers(data.users)
        if(data.users.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(isUserAdmin){
      fethUsers();
    }
  },[userId]);

  const handleShowMore = async()=>{
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
      const data = await res.json();
      
      if(res.ok){
        setUsers((prev)=>[...prev,...data.users])
        if(data.users.length < 9){
          setShowMore(false)
        }
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = ()=>{

  };

 
  return (
    <>
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {isUserAdmin && users?.length > 0 ? (
          <>
            <Table 
              hoverable
              className='shadow-md'
            >
              <Table.Head>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {users.map((user,i)=>(
                
                <Table.Body className='divide-y' key={i}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className='w-10 h-10 bg-gray-500 object-cover rounded-full'
                        />
                    </Table.Cell>
                    <Table.Cell>
                       {user.username}
                     
                    </Table.Cell>
                    <Table.Cell>
                        {user.email}
                    </Table.Cell>
                    <Table.Cell>
                        {user.isAdmin ? (<FaCheck className='text-green-400'/>) : (<FaTimes className='text-red-500'/>)}
                    </Table.Cell>
                    <Table.Cell>
                      <span className='font-medium text-red-500 cursor-pointer hover:underline'
                        onClick={()=>{
                          setShowModel(true)
                          setUserIdToDelete(user.id)
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
          <p>There is no Users yet </p>
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
              <h3 className=" text-center mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
              <div className=" flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser} >
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

export default DashUsers;