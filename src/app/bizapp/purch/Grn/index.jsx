import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { tokens } from "../../../../theme";
import Header from "../../../components/Header";
import CrudActions from "../../../components/CrudActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import OrderLine from "./OrderLine";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import DeleteModal from "../../../components/DeleteModal";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/lab";

const API_URL = "purch/v1/Grn/";
const SUPPLIER_API_URL = "enterp/v1/SupplierInfo/";

function Grn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const orderIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const initialState = {
    grnId: "",
    description: "",
    supplier: "",
    createdAt: "",
    createdBy: "",
    status: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);
  const [orderLines, setOrderLines] = useState([]);

  const [formValues, setFormValues] = useState(initialState);
  const [suppliers, setSuppliers] = useState([]);
  const [inputSupplier, setInputSupplier] = useState([]);

  const [openDel, setOpenDel] = useState(false);

  const handleClose = () => {
    setOpenDel(false);
  };

  const deleteObj = async () => {
    try {
      await axiosPrivate.delete(API_URL + "delete/" + formValues.grnId);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setFormValues(initialState);
    } catch (err) {}
  };

  const handleNew = (e) => {
    orderIdRef.current.focus();
    setFormValues(initialState);
  };
  const handleEdit = (e) => {
    orderIdRef.current.focus();
  };

  const handleSave = async (e) => {
    console.log(formValues);
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );

      isMounted && setFormValues(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
    }
  };
  const handleDelete = (e) => {
    orderIdRef.current.focus();
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSuppliers = async () => {
      try {
        const response = await axiosPrivate.get(SUPPLIER_API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });
        console.log(response.data);
        isMounted && setSuppliers(response.data);
      } catch (err) {}
    };
    getSuppliers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
    const updated = Object.assign({}, formValues);
    updated[key] = value;
    setFormValues(updated);
  };

  return (
    <Box m="5px" backgroundColor={colors.primary[400]} p="10px">
      <Header title="GRN" subTitle="" />
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <CrudActions
            handleNew={handleNew}
            isNewEnabled={isNewEnabled}
            handleEdit={handleEdit}
            isEditEnabled={isEditEnabled}
            handleSave={handleSave}
            isSaveEnabled={isSaveEnabled}
            handleDelete={handleDelete}
            isDeleteEnabled={isDeleteEnabled}
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={4}
          direction="row"
          alignItems="center"
          container
          justifyContent="flex-end"
        >
          <Chip label="Created" color="success" />
        </Grid>
      </Grid>
      <Paper elevation={2} style={{ padding: "5px" }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="grnId"
                autoComplete="off"
                name="grnId"
                label="GRN ID"
                type="text"
                value={formValues.grnId}
                onChange={(e) => onFormInputChange("grnId", e.target.value)}
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
                id="description"
                autoComplete="off"
                name="description"
                label="Description"
                type="text"
                value={formValues.description}
                onChange={(e) =>
                  onFormInputChange("description", e.target.value)
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
                  option.supplier === value.supplier
                }
                id="supplier"
                value={formValues.supplier}
                inputValue={inputSupplier}
                onInputChange={(event, newInputValue) => {
                  setInputSupplier(newInputValue);
                }}
                options={suppliers}
                onChange={(e, newValue) =>
                  onFormInputChange("supplier", newValue)
                }
                getOptionLabel={(option) =>
                  `${option.supplierId} - ${option.supplierName}` || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Supplier"
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Created"
                  value={formValues.createdAt}
                  onChange={(e) =>
                    onFormInputChange("createdAt", e.target.value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                    />
                  )}
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
                value={formValues.createdBy && formValues.createdBy.userName}
                onChange={(e) => onFormInputChange("createdBy", e.target.value)}
                InputLabelProps={{ shrink: formValues.createdBy }}
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
      </Paper>
      <ToastContainer />
      {/* <OrderLine orderLines={orderLines} /> */}
    </Box>
  );
}

export default Grn;
