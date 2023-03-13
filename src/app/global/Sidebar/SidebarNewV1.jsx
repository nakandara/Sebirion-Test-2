import { useState } from "react";

import { Avatar, Box, CardMedia, ListItemIcon, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import useAuth from "../../../Application/fndbas/hooks/useAuth";
import image1 from "../../accets/mmg.PNG";

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
  FaArchway,
  FaRegLaughWink,
  FaHeart,
  FaDatabase,
  FaUnity,
  FaRegBuilding,
  FaLaptopHouse,
  FaUserAlt,
  FaBuilding,
  FaUserFriends,
  FaCogs,
  FaUsersCog,
} from "react-icons/fa";

import {
  AutoAwesome,
  Grid4x4,
  Home,
  NearMe,
  Person4,
  Style,
  ViewAgenda,
} from "@mui/icons-material";

const SidebarNewV1 = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const { auth } = useAuth();
  const [role, setRole] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box
        className="font-ui-sans-serif "
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar
          className="drop-shadow-2xl"
          collapsed={collapsed}
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint="md"
          style={{
            zIndex: "387456378853",

            color: "black",
          }}
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
                  <div style={{ height: "80px" }}>
                    <CardMedia
                      component="img"
                      height="10%"
                      image={image1}
                      alt="scene"
                    />
                  </div>
                </MenuItem>
              )}
            </Menu>
          </SidebarHeader>
          {/* Content */}
          <SidebarContent>
            <Menu
              iconShape="circle"
              style={{
                padding: "5px",
                textTransform: "uppercase",
                fontSize: 6,
                letterSpacing: "1px",
              }}
            >
              <MenuItem style={{ fontSize: 14 }} icon={<Home />}>
                Home
                <NavLink to="/" />
              </MenuItem>

              <MenuItem style={{ fontSize: 14 }} icon={<NearMe />}>
                Actions
                <NavLink to="/Actions" />
              </MenuItem>

              <MenuItem style={{ fontSize: 14 }} icon={<Grid4x4 />}>
                Spaces
                <NavLink to="/Spaces" />
              </MenuItem>

              <MenuItem style={{ fontSize: 14 }} icon={<Style />}>
                Cards
                <NavLink to="/Cards" />
              </MenuItem>

              <MenuItem style={{ fontSize: 14 }} icon={<Style />}>
                Products
                <NavLink to="/Products" />
              </MenuItem>

              <MenuItem style={{ fontSize: 14 }} icon={<Person4 />}>
                spendings
                <NavLink to="/spendings" />
              </MenuItem>
              <MenuItem style={{ fontSize: 14 }} icon={<Person4 />}>
                My Account
                <NavLink to="/spendings" />
              </MenuItem>

              <MenuItem style={{ fontSize: 14 }}>
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"
                  />
                  <div className="m-2"> John Doe</div>
                  <NavLink to="/My Account" />
                </ListItemIcon>
              </MenuItem>

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
          {/* <SidebarFooter style={{ textAlign: "center" }}>
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
        </SidebarFooter> */}
        </ProSidebar>
      </Box>
    </>
  );
};

export default SidebarNewV1;
