import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";


const Header = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector(state=> state.theme);
  const dispatch = useDispatch();

  const [searchTerm,setSearchTerm] = useState('');


  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm');
    
  },[searchTerm])
  
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

  const handleSubmit =(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
    
  }

  const handleSearchClick = ()=>{
    navigate('/search')
  }
  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 to via-purple-500 to-pink-500 rounded-lg text-white">
            Rahul's
          </span>
          Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
          />
        </form>
        <Button className="h-10 w-12 lg:hidden " pill color="gray" onClick={handleSearchClick}>
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2 ">
          <Button
            className="w-12 h-10  sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon /> : <FaSun/> }
            
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user avatar"
                  img={currentUser.profilePicture || currentUser.updatedUser.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm mt-2 mb-2">
                  @{currentUser.username || currentUser.updatedUser?.username}
                </span>
                <span className="block text-sm font-medium truncate mt-3">
                  {currentUser.email || currentUser.updatedUser?.email}
                </span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to={"/sign-in"}>
              <Button gradientDuoTone={"purpleToBlue"} outline>
                Sign In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to={"/"}>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to={"/about"}>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to={"/projects"}>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
