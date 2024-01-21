import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left-side */}
        <div className="flex-1">
          <Link
            to={"/"}
            className="font-bold  sm:text-xl  dark:text-white text-4xl"
          >
            <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 to via-purple-500 to-pink-500 rounded-lg text-white">
              Rahul's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">
            This is a blog project. You can signup with your email and passwords
            or with Google.
          </p>
        </div>
        {/* right-side */}
        <div className="flex gap-4 flex-col flex-1">
          <form className="flex flex-col gap-2">
            <div>
              <Label value="Your Username"></Label>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Email"></Label>
              <TextInput type="email" placeholder="example@mail.com" id="email" />
            </div>
            <div>
              <Label value="Your Password"></Label>
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone={"purpleToPink"} type="submit">
              Sign UP
            </Button>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Have an account ?</span>
            <Link to={"/sign-in"} className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
