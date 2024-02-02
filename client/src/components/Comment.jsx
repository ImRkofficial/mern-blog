import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  console.log("this is a comment", comment);
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <>
      <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
          <img
            className="w-10 h-10 bg-gray-200 rounded-full"
            src={user?.profilePicture}
            alt={user?.username}
          />
        </div>
        <div className="flex-1 mb-1 items-center">
          <div className="font-bold mr-1 text-xs truncate">
            <span>{user ? `@${user.username}` : "anonymous user"}</span>
            <span className="text-gray-500 text-xs ml-2">
              {moment(comment?.createdAt).fromNow()}
            </span>
          </div>
          <p className="text-gray-500 pb-2">{comment.content}</p>
          <div className="pt-2 text-xs flex items-center border-t dark:border-gray-700 max-w-fit gap-2">
            <button
              className={`text-gray-400 hover:text-blue-500 ${
                currentUser &&
                comment.likes.includes(
                  currentUser._id || currentUser?.updatedUser?._id
                ) &&
                "!text-blue-500"
              }`}
              type="button"
              onClick={() => onLike(comment._id)}
            >
              <FaThumbsUp className="text-sm" />
            </button>
            <p className="text-gray-400">
              {comment.numberOfLikes > 0 &&
                comment.numberOfLikes +
                  " " +
                  (comment.numberOfLikes === 1 ? "Like" : "Likes")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
