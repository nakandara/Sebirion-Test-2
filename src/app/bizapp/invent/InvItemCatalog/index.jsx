import {
  Autocomplete,
  Box,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Tab,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";

import CrudActions from "../../../components/CrudActions";
import Header from "../../../components/Header";
import { tokens } from "../../../../theme";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CostHistory from "./costhistory";
import PriceHistory from "./pricehistory";

const API_URL = "invent/v1/ItemCatalog/";
const UNITS_API_URL = "appsrv/v1/IsoUnit/";

const Itemcatalog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const companyIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);
  const [values, setValues] = useState(initItemCatalog);
  const [newClicked, setNewClicked] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  const [requestObjId, setRequestObjId] = useState(id);

  const [itemCode, setItemCode] = useState("");
  const [description, setDescription] = useState("");
  const [infoText, setInfoText] = useState("");
  const [unitCode, setUnitCode] = useState({});
  const [unitCodes, setUnitCodes] = useState([]);
  const [inputUnitCode, setInputUnitCode] = useState({});
  const [configurable, setConfigurable] = useState(false);
  const [weightNet, setWeightNet] = useState("");
  const [uomForWeightNet, setUomForWeightNet] = useState({});
  const [inputUomForWeightNet, setInputUomForWeightNet] = useState({});
  const [volumeNet, setVolumeNet] = useState("");
  const [uomForVolumeNet, setUomForVolumeNet] = useState({});
  const [inputUomForVolumeNet, setInputUomForVolumeNet] = useState({});

  const [uomForWeightNets, setUomForWeightNets] = useState([]);
  const [uomForVolumeNets, setUomForVolumeNets] = useState([]);

  const [costItems, setCostItems] = useState([]);
  const [priceItems, setPriceItems] = useState([]);

  const [openDel, setOpenDel] = useState(false);

  useEffect(() => {
    const fetchLatestObjId = async () => {
      const controller = new AbortController();
      try {
        const latestId = await axiosPrivate.get(API_URL + "latest_id", {
          headers: {
            signal: controller.signal,
          },
        });
        setRequestObjId(latestId.data);
      } catch (err) {}
    };
    requestObjId === "null" && fetchLatestObjId();
  }, [requestObjId, axiosPrivate]);

  const getItemCatalog = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(API_URL + "get/" + requestObjId, {
        headers: {
          signal: controller.signal,
        },
      });

      console.log(response.data);
      response.data && setValues(response.data);
      response.data && setCostItems(response.data.itemCosts);
      response.data && setPriceItems(response.data.itemPrices);
      response.data && setIsDeleteEnabled(true);
      response.data && setIsEditEnabled(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const setValues = () => {
      setItemCode(values ? values.itemCode : initItemCatalog.itemCode);
      setDescription(values ? values.description : initItemCatalog.description);
      setInfoText(values ? values.infoText : initItemCatalog.infoText);
      setUnitCode(values ? values.unitCode : initItemCatalog.unitCode);
      setConfigurable(
        values ? values.configurable : initItemCatalog.configurable
      );
      setWeightNet(values ? values.weightNet : initItemCatalog.weightNet);
      setUomForWeightNet(
        values ? values.uomForWeightNet : initItemCatalog.uomForWeightNet
      );
      setVolumeNet(values ? values.volumeNet : initItemCatalog.volumeNet);
      setUomForVolumeNet(
        values ? values.uomForVolumeNet : initItemCatalog.uomForVolumeNet
      );
    };
    setValues();
  }, [values]);

  useEffect(() => {
    requestObjId && requestObjId !== "null" && getItemCatalog();
  }, [requestObjId, axiosPrivate]);

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
        setUomForWeightNets(latestId.data);
        setUomForVolumeNets(latestId.data);
      } catch (err) {}
    };
    getUnits();
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
  const handleNew = (e) => {
    setValues(initItemCatalog);
    setCostItems([]);
    setPriceItems([]);
    setNewClicked(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
          itemCode: itemCode,
          description: description,
          infoText: infoText,
          unitCode: unitCode,
          configurable: configurable,
          weightNet: weightNet,
          uomForWeightNet: uomForWeightNet,
          volumeNet: volumeNet,
          uomForVolumeNet: uomForVolumeNet,
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
      setValues(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setOpenDel(true);
  };

  const handleClose = () => {
    setOpenDel(false);
  };

  const deleteObj = async () => {
    try {
      await axiosPrivate.delete(API_URL + "delete/" + itemCode);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setValues(null);
    } catch (err) {}
  };

  return (
    <Box m="5px" p="5px" backgroundColor={colors.primary[400]}>
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

      <Paper elevation={2} style={{ padding: "5px" }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="itemCode"
                autoComplete="off"
                name="itemCode"
                label="Item Code"
                type="text"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                variant="outlined"
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                id="unitCode"
                value={unitCode}
                inputValue={inputUnitCode.itemCode}
                onInputChange={(event, newInputValue) => {
                  setInputUnitCode(newInputValue);
                }}
                options={unitCodes}
                onChange={(event, newValue) => {
                  setUnitCode(newValue);
                }}
                getOptionLabel={(option) => option.description || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Unit Code"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="infoText"
                autoComplete="off"
                name="infoText"
                label="infoText"
                type="text"
                value={infoText}
                onChange={(e) => setInfoText(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <FormControlLabel control={<Switch />} label="Configurable" />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="weightNet"
                autoComplete="off"
                name="weightNet"
                label="weightNet"
                type="number"
                value={weightNet}
                onChange={(e) => setWeightNet(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                variant="outlined"
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                id="uomForWeightNet"
                value={uomForWeightNet}
                inputValue={inputUomForWeightNet}
                onInputChange={(event, newInputValue) => {
                  setInputUomForWeightNet(newInputValue);
                }}
                options={uomForWeightNets}
                onChange={(event, newValue) => {
                  setUomForWeightNet(newValue);
                }}
                getOptionLabel={(option) => option.description || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Weight Net Unit"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="volumeNet"
                autoComplete="off"
                name="volumeNet"
                label="volumeNet"
                type="number"
                value={volumeNet}
                onChange={(e) => setVolumeNet(e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                variant="outlined"
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                id="uomForVolumeNet"
                value={uomForVolumeNet}
                inputValue={inputUomForVolumeNet}
                onInputChange={(event, newInputValue) => {
                  setInputUomForVolumeNet(newInputValue);
                }}
                options={uomForVolumeNets}
                onChange={(event, newValue) => {
                  setUomForVolumeNet(newValue);
                }}
                getOptionLabel={(option) => option.description || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Volume Net Unit"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                )}
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
              <TabList onChange={handleTabChange} aria-label="Item Catalog">
                <Tab label="Price Hist." value="1" />
                <Tab label="Cost Hist" value="2" />
                <Tab label="Batches" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <PriceHistory
                itemCatalogId={values.itemCode}
                priceItems={priceItems}
                setPriceItems={setPriceItems}
              />
            </TabPanel>
            <TabPanel value="2">
              <CostHistory
                itemCatalogId={values.itemCode}
                costItems={costItems}
                setCostItems={setCostItems}
              />
            </TabPanel>
            <TabPanel value="3">
              <Typography>adasfasd</Typography>
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
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

const initItemCatalog = {
  itemCode: "",
  description: "",
  infoText: "",
  unitCode: isoUnit,
  configurable: true,
  weightNet: "",
  uomForWeightNet: isoUnit,
  volumeNet: "",
  uomForVolumeNet: isoUnit,
  itemCosts: [],
  itemPrices: [],
  pictureUrl: "",
};

export default Itemcatalog;
