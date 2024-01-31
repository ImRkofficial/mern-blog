import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";

const Dashboard = () => {
  const loaction = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search);
    const tabUrl = urlParams.get("tab");
    if(tabUrl){
      setTab(tabUrl);
    }
  }, [location.search]);
  return(
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* SideBar */}
        <DashSidebar/>
      </div>
      {/* Profile and other things */}
      {tab === "profile" && <DashProfile/>}
      
      {/* Posts */}
      {tab === "posts" && <DashPost/>}

      {/* Users */}
      {tab === "users" && <DashUsers/>}
    </div>
  );
};

export default Dashboard;
