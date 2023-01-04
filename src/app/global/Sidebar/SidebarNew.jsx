import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import {
  ProSidebar,
  MenuItem,
  SubMenu,
  Menu,
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
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { BuildCircleOutlined } from "@mui/icons-material";
//import ProfileImg from '../../../assets/dinidu.jpg';

function SidebarNew() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
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
      <ProSidebar backgroundColor={colors.primary[400]} collapsedWidth="10%">
        <Menu iconShape="squre">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  SIPSAYURI ERP
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  // src={ProfileImg}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Dinidu Hewage
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  ADMIN
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "25%"}>
            <MenuItem
              active={selected === "Dashboard"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Dashboard")}
              icon={<HomeOutlinedIcon />}
              routerLink={<Link to={"/"} />}
            >
              <Typography>Dashboard</Typography>
            </MenuItem>
            <SubMenu
              label={
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "5px 0 5px 10px" }}
                  icon={<BuildCircleOutlined />}
                >
                  Enterprise
                </Typography>
              }
            >
              <MenuItem
                active={selected === "Company"}
                style={{ color: colors.grey[100] }}
                onClick={() => setSelected("Company")}
                icon={<BuildCircleOutlined />}
                routerLink={<Link to={"/company"} />}
              >
                <Typography>Company</Typography>
              </MenuItem>
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default SidebarNew;
