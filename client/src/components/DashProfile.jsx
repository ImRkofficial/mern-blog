import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./../../src/firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFail,
  updateSuccess,
  updateStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashProfile = () => {
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less then 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for image upload");
      return;
    }

    try {
      dispatch(updateStart);
      const res = await fetch(
        `/api/user/update/${currentUser._id || currentUser.updatedUser?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFail(data.message));
        setUpdateUserError(data.message);
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFail(error?.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser =async ()=>{
      setShowModel(false);
      try {
        dispatch(deleteUserStart());

        const res = await fetch(`/api/user/delete/${currentUser._id || currentUser.updatedUser?._id}`,{
          method:"DELETE"
        });

        const data = await res.json();

        if(!res.ok){
          dispatch(deleteUserFailure(data.message))
        }else{
          dispatch(deleteUserSuccess(data))
        }
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
  };

  const handleSignOut = async ()=>{
    try {
      const res = await fetch(`/api/user/signout`,{
        method:"POST"
      });

      const data = await res.json();

      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signOutSuccess());
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="font-semibold text-3xl my-7 text-center">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          ref={fileRef}
        />

        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => fileRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress} %`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={
              imageUrl ||
              currentUser.profilePicture ||
              currentUser.updatedUser?.profilePicture
            }
            alt="user"
            className={`rounded-full w-full object-cover border-4 h-full border-[lightgray] 
              ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-55"
              }
            `}
          />
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={
            currentUser.username || currentUser.updatedUser?.username
          }
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email || currentUser.updatedUser?.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline disabled={loading || imageFileUploading}>
          {loading ? "Loading..." : "Update" }
        </Button>
       
        {(currentUser.isAdmin || currentUser?.updatedUser?.isAdmin) &&  
          <Link to={'/create-post'}>
            <Button 
            type="button"
            gradientDuoTone={'purpleToPink'}
            className="w-full"
          >
            Create A Post
          </Button>
           </Link>
        }
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModel(true)}>
          Delete Account
        </span>
        <span
         className="cursor-pointer"
         onClick={handleSignOut}
         >Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color={"success"} className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color={"failure"} className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color={"failure"} className="mt-5">
          {error}
        </Alert>
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
              <h3 className=" text-center mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your account?</h3>
              <div className=" flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
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
  );
};

export default DashProfile;
