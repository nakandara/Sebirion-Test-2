import React from "react";
import { Outlet } from "react-router-dom";
import TopbarNew from "../../../app/global/Topbar/TopbarNew";
import SidebarNew from "../../../app/global/Sidebar/SidebarNew";
import { useState } from "react";
import SidebarNewV1 from "../../../app/global/Sidebar/SidebarNewV1";
import { FaBars } from "react-icons/fa";
import "../../../styles.scss";
export default function AppHome() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  //   const handleImageChange = (checked) => {
  //     setImage(checked);
  //   };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <SidebarNewV1
        image={image}
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <main className="content">
        <div className="topbar">
          <TopbarNew setIsSidebar={setIsSidebar} />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
