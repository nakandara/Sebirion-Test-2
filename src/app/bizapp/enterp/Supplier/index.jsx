import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import Header from "../../../components/Header";
import ListCrudActions from "../../../components/ListCrudActions";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../../components/DeleteModal";
import {
  DatePicker,
  LocalizationProvider,
  TabContext,
  TabList,
  TabPanel,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const API_URL = "enterp/v1/SupplierInfo/";
const PAYTERM_API_URL = "accrul/v1/PaymentTerm/";

function Supplier() {
  const axiosPrivate = useAxiosPrivate();

  const [values, setValues] = useState(initialState);

  const { id } = useParams();
  const [reqObjId, setReqObjId] = useState(id);

  const [openDel, setOpenDel] = useState(false);

  const [paymentTerms, setPaymentTerms] = useState([]);
  const [inputPaymentTerm, setInputPaymentTerm] = useState({});

  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchLatestObjId = async () => {
      const controller = new AbortController();
      try {
        const latestId = await axiosPrivate.get(API_URL + "latest_id", {
          headers: {
            signal: controller.signal,
          },
        });
        setReqObjId(latestId.data);
      } catch (err) {}
    };
    reqObjId === "null" && fetchLatestObjId();
  }, [reqObjId, axiosPrivate]);

  useEffect(() => {
    const getPayTerms = async () => {
      const controller = new AbortController();
      try {
        const payTerms = await axiosPrivate.get(PAYTERM_API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });
        setPaymentTerms(payTerms.data);
      } catch (err) {}
    };
    getPayTerms();
  }, []);

  const getObj = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(API_URL + "get/" + reqObjId, {
        headers: {
          signal: controller.signal,
        },
      });
      console.log(response.data);
      response.data && setValues(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reqObjId && reqObjId !== "null" && getObj();
  }, [reqObjId, axiosPrivate]);

  const handleNew = (e) => {
    setValues(initialState);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);
      response.data && setValues(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };
  const handleEdit = (e) => {};

  const handleDelete = (e) => {
    setOpenDel(true);
  };

  const handleClose = () => {
    setOpenDel(false);
  };

  const deleteObj = async () => {
    try {
      await axiosPrivate.delete(API_URL + "delete/" + values.SupplierId);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setValues(initialState);
    } catch (err) {}
  };

  const showAllToasts = (type, msg) => {
    type === "SUCCESS" &&
      toast.success(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "ERROR" &&
      toast.error(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "WARNING" &&
      toast.warning(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "INFO" &&
      toast.info(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
  };

  return (
    <Box m="10px">
      <Header title="Supplier" subTitle="" />
      <ListCrudActions
        addItems={handleNew}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Paper elevation={2} style={{ padding: "5px" }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="supplierId"
                autoComplete="off"
                name="supplierId"
                label="Supplier ID"
                type="text"
                value={values.supplierId}
                onChange={(e) =>
                  onFormInputChange("supplierId", e.target.value)
                }
                required
                margin="normal"
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="supplierName"
                autoComplete="off"
                name="supplierName"
                label="Supplier Name"
                type="text"
                value={values.supplierName}
                onChange={(e) =>
                  onFormInputChange("supplierName", e.target.value)
                }
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                variant="outlined"
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.paymentTerm === value.paymentTerm
                }
                id="paymentTerm"
                value={values.paymentTerm}
                inputValue={inputPaymentTerm}
                onInputChange={(event, newInputValue) => {
                  setInputPaymentTerm(newInputValue);
                }}
                options={paymentTerms}
                onChange={(e, newValue) =>
                  onFormInputChange("paymentTerm", newValue)
                }
                getOptionLabel={(option) =>
                  `${option.termId} - ${option.description}` || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Payment Term"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>            
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="createdAt"
                autoComplete="off"
                name="createdAt"
                label="Created At"
                type="date"
                value={values.createdAt}
                onChange={(e) => onFormInputChange("createdAt", e.target.value)}
                InputLabelProps={{ shrink: values.createdAt }}
                disabled
                margin="normal"
              />
              <LocalizationProvider dataAdapter={AdapterDateFns}>
                <DatePicker
                  label="Created"
                  value={values.createdAt}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                    />
                  )}
                  disabled
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="createdBy"
                autoComplete="off"
                name="createdBy"
                label="Created By"
                type="text"
                value={values.createdBy.userName}
                onChange={(e) => onFormInputChange("createdBy", e.target.value)}
                InputLabelProps={{ shrink: values.createdBy }}
                disabled
                margin="normal"
              />
            </Grid>
          </Grid>
        </form>
        <DeleteModal
          open={openDel}
          handleClose={handleClose}
          Delete={deleteObj}
        />
        <ToastContainer />
        <Box sx={{ width: "100%", typography: "body1", pt: "10px" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Address" value="1" />
                <Tab label="Communication" value="2" />
                <Tab label="Associations" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Typography>adasfasd</Typography>
            </TabPanel>
            <TabPanel value="2">
              <Typography>adasfasd</Typography>
            </TabPanel>
            <TabPanel value="3">
              <Typography>adasfasd</Typography>
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </Box>
  );
}

const initialState = {
  supplierId: "",
  supplierName: "",
  paymentTerm: [],
  createdAt: new Date(),
  createdBy: {},
};

export default Supplier;
