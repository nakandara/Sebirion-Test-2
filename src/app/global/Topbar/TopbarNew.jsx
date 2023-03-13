import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";
import Logout from "../../logout/Logout";
import AppBar from "../../dashboard/Home/AppBar";

function TopbarNew() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      className="drop-shadow-2xl"
      position="sticky"
      justifyContent="space-between"
      backgroundColor={colors.primary[400]}
      sx={{ height: "80px" }}
    >
      <Box display="flex" backgroundColor={colors.primary[400]}></Box>
      <Box display="flex" backgroundColor={colors.primary[400]}>
        <AppBar />
      </Box>
    </Box>
  );
}

export default TopbarNew;
