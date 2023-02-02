import {
  Autocomplete,
  Box,
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
import InventoryAddress from "../InventoryItem/InventoryAddress";

const API_URL = "invent/v1/ItemCatalog/";

const Itemcatalog = () => {
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
  const [description, setDescription] = useState("");

  const [unitCode, setUnitCode] = useState(null);
  const [uomForWeightNets, setValueuomForWeightNets] = useState(null);

  const unitCodes = [
    { unitCode: "meter", description: description, baseUnit: "meter" },
  ];

  const defaultProps = {
    options: unitCodes,
    getOptionLabel: (option) => option.unitCode,
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
    console.log(values.uomForWeightNet);
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify({
          itemCode: values.itemCode,
          description: description,
          infoText: values.infoText,
          unitCode: unitCode,
          configurable: values.configurable,
          weightNet: values.weightNet,
          uomForWeightNet: uomForWeightNets,
          // volumeNet: values.configurable,
          // uomForVolumeNet: values.uomForVolumeNet,
          // pictureUrl: values.weightNet,
        }),
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

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Item Catalogs" subTitle="" />
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
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
              label="Info Text"
              onChange={(e) => onFormInputChange("infoText", e.target.value)}
              value={values.infoText}
              name="infoText"
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
              label="WeightNet (kg)"
              onChange={(e) => onFormInputChange("weightNet", e.target.value)}
              value={values.weight}
              name="weightNet"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />

            <Autocomplete
              {...defaultProps}
              id="controlled-demo"
              value={unitCode}
              onChange={(event, newValue) => {
                setUnitCode(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Unit Code: " variant="standard" />
              )}
            />
            <Autocomplete
              {...defaultProps}
              id="controlled-demo"
              value={uomForWeightNets}
              onChange={(event, newValue) => {
                setValueuomForWeightNets(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Uom For WeightNet: "
                  variant="standard"
                />
              )}
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
            </TabList>
          </Box>
          <TabPanel value="1">
            <InventoryAddress />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

const initialValues = {
  itemCode: "",
  description: "",
  infoText: "",
  unitCode: {
    unitCode: "meter",
    description: "",
    baseUnit: "meter",
    multiFactor: "",
    divFactor: "",
    tenPower: "",
    userDefined: true,

    unitType: "",
  },
  configurable: true,
  weightNet: "",

  uomForWeightNet: {
    unitCode: "meter",
    description: "",
    baseUnit: "meter",
    multiFactor: "",
    divFactor: "",
    tenPower: "",
    userDefined: "",
    unitType: "",
  },
};

export default Itemcatalog;
