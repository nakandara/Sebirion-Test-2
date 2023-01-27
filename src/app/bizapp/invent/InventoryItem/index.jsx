import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  OutlinedInput,
  Tab,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useRef, useState } from "react";

import * as yup from "yup";

import CrudActions from "../../../components/CrudActions";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../../components/Header";
import { tokens } from "../../../../theme";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import InventoryAddress from "./InventoryAddress";
import InventoryContactInfo from "./InventoryContactInfo";
const API_URL = "enterp/v1/Inventory/";

const InventoryItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const companyIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);
  const [values, setValues] = useState(initialValues);
  const [newClicked, setNewClicked] = useState(false);
  const [tabValue, setTabValue] = useState("1");

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

  const handleNew = (e) => {
    setValues(initialValues);
    setNewClicked(true);
  };
  const handleEdit = (e) => {
    companyIdRef.current.focus();
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
      // response.data && setCurrentObject(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };
  const handleDelete = (e) => {
    companyIdRef.current.focus();
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Inventory Item" subTitle="" />
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

      <form onSubmit={handleSave}>
        <fieldset disabled={!newClicked} style={{ border: "0" }}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(6, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              ref={companyIdRef}
              type="text"
              label="Item Code"
              onChange={(e) => onFormInputChange("itemCode", e.target.value)}
              value={values.itemCode}
              InputProps={{ sx: { height: 40 } }}
              name="itemCode"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Description"
              onChange={(e) => onFormInputChange("description", e.target.value)}
              value={values.description}
              name="description"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Item Type"
              onChange={(e) => onFormInputChange("itemType", e.target.value)}
              value={values.itemType}
              name="itemType"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Created By"
              onChange={(e) => onFormInputChange("createdBy", e.target.value)}
              value={values.createdBy}
              name="createdBy"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Item Discount"
              onChange={(e) =>
                onFormInputChange("itemDiscount", e.target.value)
              }
              value={values.itemDiscount}
              name="itemDiscount"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Weight (kg)"
              onChange={(e) =>
                onFormInputChange("reorderLevel", e.target.value)
              }
              value={values.weight}
              name="reorderLevel"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Reorder Level"
              onChange={(e) =>
                onFormInputChange("reorderLevel", e.target.value)
              }
              value={values.reorderLevel}
              name="reorderLevel"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Curr AvgPrice"
              onChange={(e) =>
                onFormInputChange("currAvgPrice", e.target.value)
              }
              value={values.currAvgPrice}
              name="currAvgPrice"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Curr AvgCost"
              onChange={(e) => onFormInputChange("currAvgCost", e.target.value)}
              value={values.currAvgCost}
              name="currAvgCost"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Available Quantity"
              onChange={(e) =>
                onFormInputChange("availableQuantity", e.target.value)
              }
              value={values.availableQuantity}
              name="availableQuantity"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Date CreatedAt"
              onChange={(e) =>
                onFormInputChange("datecreatedAt", e.target.value)
              }
              value={values.datecreatedAt}
              name="datecreatedAt"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Datelast Edited At"
              onChange={(e) =>
                onFormInputChange("datelastEditedAt", e.target.value)
              }
              value={values.datelastEditedAt}
              name="datelastEditedAt"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Status"
              onChange={(e) => onFormInputChange("status", e.target.value)}
              value={values.status}
              name="status"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
          </Box>
        </fieldset>
      </form>
      <ToastContainer />
      <Box sx={{ width: "100%", typography: "body1", pt: "10px" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Address" value="1" />
              <Tab label="Contact Info" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <InventoryAddress />
          </TabPanel>
          <TabPanel value="2">
            <InventoryContactInfo />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

const initialValues = {
  itemCode: "",
  description: "",
  itemType: "",
  createdBy: "",
  itemDiscount: "",
  weight: "",
  reorderLevel: "",
  currAvgPrice: "",
  currAvgCost: "",
  availableQuantity: "",
  datecreatedAt: "",
  datelastEditedAt: "",
  status: "",
};

export default InventoryItem;
