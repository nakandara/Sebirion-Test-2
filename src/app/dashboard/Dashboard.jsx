import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import {
  Box,
  Button,
  createTheme,
  Divider,
  Drawer,
  IconButton,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Header from "../components/Header";
import StatBox from "../components/StatBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../components/LineChart";
import { mockTransactions } from "../../data/mockData";
import ProgressCircle from "../components/ProgressCircle";
// import BarChart from '../components/BarChart';
import GeographyChart from "../components/GeographyChart";
import useAxiosPrivate from "../../Application/fndbas/hooks/useAxiosPrivate";
import MainCard from "./Home/MainCard";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import { Copyright } from "@mui/icons-material";
import { SideCardAlert, DebitCArd, EnjoyCart } from "./Home/SideCardAlert";
import CardLandAsso from "./Home/CardLandAsso";

const API_URL = "util/v1/Dashboard/admin";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mdTheme = createTheme();

  const axiosPrivate = useAxiosPrivate();

  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchDashboardValues = async () => {
      const controller = new AbortController();
      try {
        const dashValues = await axiosPrivate.get(API_URL, {
          headers: {
            signal: controller.signal,
          },
        });

        setValues(dashValues.data);
      } catch (err) {}
    };
    fetchDashboardValues();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <MainCard />
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <div className="rounded">
                  {DebitCArd}
                  <Divider />
                  {SideCardAlert}
                  <Divider />
                  {EnjoyCart}
                  <Divider />
                </div>
              </Grid>

              {/* Recent Orders */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
