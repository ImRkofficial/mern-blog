import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComponent from "../components/DashboardComponent";

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
       {/* Dashboard */}
       {tab === "dashboard" && <DashboardComponent/>}
      {/* Profile and other things */}
      {tab === "profile" && <DashProfile/>}
      
      {/* Posts */}
      {tab === "posts" && <DashPost/>}

      {/* Users */}
      {tab === "users" && <DashUsers/>}
      {/* Comments */}
      {tab === "comments" && <DashComments/>}
    </div>
  );
};

export default Dashboard;
