import {
  Autocomplete,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
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
import { useEffect } from "react";

const API_URL = "invent/v1/ItemCatalog/";
const UNITS_API_URL = "appsrv/v1/IsoUnit/";

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
  const [infoText, setInfoText] = useState("");
  const [unitCode, setUnitCode] = useState({});
  const [unitCodes, setUnitCodes] = useState([]);
  const [inputUnitCode, setInputUnitCode] = useState({});
  const [configurable, setConfigurable] = useState(false);
  const [weightNet, setWeightNet] = useState("");
  const [uomForWeightNet, setUomForWeightNet] = useState({});
  const [volumeNet, setVolumeNet] = useState("");
  const [uomForVolumeNet, setUomForVolumeNet] = useState({});

  const [uomForWeightNets, setValueuomForWeightNets] = useState(null);

  useEffect(() => {
    const getUnits = async () => {
      const controller = new AbortController();
      try {
        const latestId = await axiosPrivate.get(UNITS_API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });
        setUnitCodes(latestId.data);
      } catch (err) {}
    };
    getUnits();
  });

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

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Item Catalog" subTitle="" />
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

      <Paper className="pageContent mb-3">
        <form onSubmit={handleSave} className="prospect-form">
          <fieldset  className="form-group">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  id="prospectId"
                  autoComplete="off"
                  name="prospectId"
                  label="Prospect Id"
                  type="text"
                  // value={prospectId}
                  // onChange={(e) => setProspectId(e.target.value)}
                  // required
                  // aria-invalid={validProspectId ? "false" : "true"}
                  margin="normal"
                  inputProps={{ style: { textTransform: "uppercase" } }}
                />
              </Grid>
            </Grid>
          </fieldset>
        </form>
      </Paper>

      <form onSubmit={handleSave}>
        <fieldset disabled={!newClicked} style={{ border: "0" }}>
          <Box
            display="grid"
            gap="15px"
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
                gridColumn: "span 3",
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
                gridColumn: "span 5",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <Autocomplete
              {...defaultProps}
              id="controlled-demo"
              value={unitCode}
              variant="outlined"
              onChange={(event, newValue) => {
                setUnitCode(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Unit Code: " variant="standard" />
              )}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="number"
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
                <TextField {...params} label="Unit Code: " variant="outlined" />
              )}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Volumn Net (l)"
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
              value={uomForWeightNets}
              onChange={(event, newValue) => {
                setValueuomForWeightNets(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Uom For WeightNet: "
                  variant="outlined"
                />
              )}
            />
          </Box>
        </fieldset>
      </form>
      <ToastContainer />
    </Box>
  );
};

const isoUnit = {
  unitCode: "",
  description: "",
  baseUnit: "",
  multiFactor: "",
  divFactor: "",
  tenPower: "",
  userDefined: "",
  unitType: "",
};

const initialValues = {
  itemCode: "",
  description: "",
  infoText: "",
  unitCode: isoUnit,
  configurable: true,
  weightNet: "",
  uomForWeightNet: isoUnit,
  volumeNet: "",
  uomForVolumeNet: isoUnit,
  pictureUrl: "",
};

export default Itemcatalog;
