import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import InventoryAddress from "./InventoryAddress";
import InventoryContactInfo from "./InventoryContactInfo";
import DeleteModal from "../../../components/DeleteModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "invent/v1/inventoryItem/";
const SITE_API_URL = "enterp/v1/Site/";
const ITEM_API_URL = "invent/v1/ItemCatalog/";

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
  const [values, setValues] = useState(initialState);
  const [newClicked, setNewClicked] = useState(false);
  
  const [inputSite, setInputSite] = useState(initialSite);
  const [inputItemCatalog, setInputItemCatalog] = useState(initialItemCatalog);

  const [sites, setSites] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);

  const[createdBy,setCreatedBy] = useState("");
  const[createdAt,setCreatedAt] = useState(new Date());
  const[modifiedAt,setModifiedAt] = useState(new Date());
  const[modifiedBy,setModifiedBy] = useState("");

  const [openDel, setOpenDel] = useState(false);

  useEffect(() => {
    const getMetaData = async () => {
      const controller = new AbortController();
      try {
        const sites = await axiosPrivate.get(SITE_API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });

        const catItems = await axiosPrivate.get(ITEM_API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });

        setSites(sites.data);
        setCatalogItems(catItems.data);
      } catch (err) {}
    };
    getMetaData();
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
    setValues(initialState);
    setNewClicked(true);
  };
  const handleEdit = (e) => {
    companyIdRef.current.focus();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    try {
      console.log(values);
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
      // response.data && setCreatedAt(response.createdAt);
      // response.data && setCreatedBy(response.createdBy.userName);
      // response.data && setModifiedAt(response.modifiedAt);
      // response.data && setModifiedBy(response.modifiedBy.userName);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const onFormInputChange = (key, value) => {
    console.log(value);
    const updated = Object.assign({}, values);
    if (key === "reorderLevel" || key === "availableQuantity") {
      updated[key] = Number(value);
    } else if (key === "createdAt" || key === "modifiedAt") {
      updated[key] = Date(value);
    } else {
      updated[key] = value;
    }

    setValues(updated);
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
      await axiosPrivate.delete(API_URL + "delete/" + values.site);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setValues(null);
    } catch (err) {}
  };

  return (
    <Box m="5px">
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
      <Paper elevation={2} style={{ padding: "5px" }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Autocomplete
                variant="outlined"
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                id="site"
                value={values.site}
                inputValue={inputSite}
                onInputChange={(event, newInputValue) => {
                  setInputSite(newInputValue);
                }}
                options={sites}
                onChange={(e, newValue) => onFormInputChange("site", newValue)}
                getOptionLabel={(option) =>
                  `${option.site} - ${option.description}` || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Site"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                variant="outlined"
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                id="itemCatalog"
                value={values.itemCatalog}
                inputValue={inputItemCatalog}
                onInputChange={(event, newInputValue) => {
                  setInputItemCatalog(newInputValue);
                }}
                options={catalogItems}
                onChange={(e, newValue) =>
                  onFormInputChange("itemCatalog", newValue)
                }
                getOptionLabel={(option) =>
                  `${option.itemCode} - ${option.description}` || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Item Catalog"
                    size="small"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="reorderLevel"
                autoComplete="off"
                name="reorderLevel"
                label="Reorder Level"
                type="number"
                value={values.reorderLevel}
                onChange={(e) =>
                  onFormInputChange("reorderLevel", e.target.value)
                }
                sx={{
                  "& .MuiInputBase-root": {
                    "& input": {
                      textAlign: "right",
                    },
                  },
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="availableQuantity"
                autoComplete="off"
                name="availableQuantity"
                label="Quantity"
                type="number"
                value={values.availableQuantity}
                onChange={(e) =>
                  onFormInputChange("availableQuantity", e.target.value)
                }
                sx={{
                  "& .MuiInputBase-root": {
                    "& input": {
                      textAlign: "right",
                    },
                  },
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="statuslbl">Status</InputLabel>
                <Select
                  size="small"
                  margin="normal"
                  labelId="statuslbl"
                  id="status"
                  value={values.status}
                  label="Status"
                  onChange={(e) => onFormInputChange("status", e.target.value)}
                >
                  <MenuItem value="AVAILABLE">Available</MenuItem>
                  <MenuItem value="NOT_AVAILABLE">Not Available</MenuItem>
                  <MenuItem value="RESTRICTED">Restricted</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
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
                value={createdBy}
                InputLabelProps={{ shrink: createdBy }}
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Created"
                  value={createdAt}
                  onChange={(e) => onFormInputChange("createdAt", e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      disabled
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
                id="modifiedBy"
                name="modifiedBy"
                label="Modified By"
                type="text"
                value={modifiedBy}
                InputLabelProps={{ shrink: modifiedBy }}
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Modified"
                  value={modifiedAt}
                  onChange={(e) => onFormInputChange("modifiedAt", e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                      disabled
                    />
                  )}
                />
              </LocalizationProvider>              
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
    </Box>
  );
};

const initialSite = {
  site: "",
  description: "",
  address1: "",
  address2: "",
  city: "",
  district: "",
  province: "",
  country: "",
  contact1: "",
  contact2: "",
  email: "",
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

const initialItemCatalog = {
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

const initialState = {
  site: initialSite,
  itemCatalog: initialItemCatalog,
  reorderLevel: "",
  availableQuantity: "",
  status: "",
};

export default InventoryItem;
