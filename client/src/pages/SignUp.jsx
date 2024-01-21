import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      const data = await res.json();

      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
      if (data?.success === false) {
        return setErrorMessage(data?.message);
      }
    } catch (error) {
      setErrorMessage("User alerady exist");
      setLoading(false);
    }
  };

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
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username"></Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="example@mail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign UP"
              )}
            </Button>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Have an account ?</span>
            <Link to={"/sign-in"} className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color={"failure"}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
