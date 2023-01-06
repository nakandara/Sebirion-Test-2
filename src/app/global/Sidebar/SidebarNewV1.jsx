import { useState, useEffect, useCallback, useContext } from "react";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
// import { tokens } from "../../theme";

//import { userAuthContext } from "../../base/context/UserAuthContext";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
// import downloadl from "../../assets/p2.jpg";
// const Item = ({ title, to, icon, selected, setSelected }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <MenuItem
//       active={selected === title}
//       style={{
//         color: colors.blueAccent[100],
//       }}
//       onClick={() => setSelected(title)}
//       icon={icon}
//     >
//       <Typography>{title}</Typography>
//       <Link to={to} />
//     </MenuItem>
//   );
// };

const SidebarNewV1 = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const [role, setRole] = useState("");

  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
      >
        {/* Header */}
        <SidebarHeader>
          <Menu iconShape="circle">
            {collapsed ? (
              <MenuItem
                icon={<FaAngleDoubleRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FaAngleDoubleLeft />}
                onClick={handleCollapsedChange}
              >
                <div
                  style={{
                    padding: "9px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 15,
                    letterSpacing: "1px",
                  }}
                >
                  DInidu
                </div>
              </MenuItem>
            )}
          </Menu>
        </SidebarHeader>
        {/* Content */}
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">NEW</span>}
            >
              Dashboard
              <NavLink to="/dashboard" />
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
            <MenuItem icon={<FaGem />}>
              company <Link to="/company" />
            </MenuItem>
            {/* 
            <MenuItem icon={<FaGem />}>
              Schools <Link to="/schools" />
            </MenuItem> */}

            <SubMenu
              suffix={<span className="badge yellow">3</span>}
              title={"Order"}
              icon={<FaRegLaughWink />}
            >
              <MenuItem>
                Sales Rep Order <Link to="/Salesreporder" />
              </MenuItem>
              <MenuItem>
                Issue Note <Link to="/Issuenote" />
              </MenuItem>
              {/* <MenuItem>Submenu 3</MenuItem> */}
            </SubMenu>
            {/* <SubMenu
              prefix={<span className="badge gray">3</span>}
              title={"With Prefix"}
              icon={<FaHeart />}
            >
              <MenuItem>Submenu 1</MenuItem>
              <MenuItem>Submenu 2</MenuItem>
              <MenuItem>Submenu 3</MenuItem>
            </SubMenu> */}
            {/* <SubMenu title={"Multi Level"} icon={<FaList />}>
              <MenuItem>Submenu 1 </MenuItem>
              <MenuItem>Submenu 2 </MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1 </MenuItem>
                <MenuItem>Submenu 3.2 </MenuItem>
              </SubMenu>
            </SubMenu> */}
            {/* <SubMenu title={"Multi Level"} icon={<FaList />}>
              <MenuItem>Submenu 1 </MenuItem>
              <MenuItem>Submenu 2 </MenuItem>
              <SubMenu title={"Submenu 3"}>
                <MenuItem>Submenu 3.1 </MenuItem>
                <MenuItem>Submenu 3.2 </MenuItem>
              </SubMenu>
            </SubMenu> */}
          </Menu>
        </SidebarContent>
        {/* Footer */}
        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{ padding: "16px", height: "330px" }}
          >
            <Link
              className="sidebar-btn"
              style={{ cursor: "pointer" }}
              to="/profile"
            >
              <FaUser />
              <span>My Account</span>
            </Link>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SidebarNewV1;
