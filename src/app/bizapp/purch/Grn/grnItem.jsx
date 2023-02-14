import { Autocomplete, Box, Grid, Paper, TextField } from "@mui/material";
import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListCrudActions from "../../../components/ListCrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import DeleteModal from "../../../components/DeleteModal";

const API_URL = "/purch/v1/Grn/";
const SITE_API_URL = "enterp/v1/Site/";
const ITEM_API_URL = "invent/v1/ItemCatalog/";

function GrnItems({ grnId, lineItems, setLineItems }) {
  const gridRef = useRef();
  const termIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [openDel, setOpenDel] = useState(false);
  const [rePopulate, setRePopulate] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [values, setValues] = useState(initState);

  const [inputSite, setInputSite] = useState(initialSite);
  const [inputItemCatalog, setInputItemCatalog] = useState(initialItemCatalog);

  const [sites, setSites] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 40,
      checkboxSelection: true,
    },
    {
      field: "site",
      headerName: "Site",
      width: 350,
    },
    {
      field: "itemCatalog",
      headerName: "Item",
      width: 350,
    },
    {
      field: "batchNo",
      headerName: "Batch",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

   const handleNew = (e) => {
    setValues(initState);
  };

  const handleEdit = (e) => {};

  const handleSave = async (e) => {
    e.preventDefault();

    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL +grnId+ "/GrnItem/create",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);
      setValues(initState);

      let resItems = response.data;

      const dataObject = {
        site: resItems.site.site +" - "+ resItems.site.description,
        itemCatalog: resItems.itemCatalog.itemCode +" - "+ resItems.itemCatalog.description,
        batchNo: resItems.batchNo,
        price: resItems.price,
        quantity: resItems.quantity,
      };

      isMounted && setLineItems([...lineItems, dataObject]);
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
      await axiosPrivate.delete(API_URL + "delete/" + values.termId);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setValues(initState);
      setRePopulate(true);
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();

    setValues({
      termId: selectedRows[0].termId,
      description: selectedRows[0].description,
      termValue: selectedRows[0].termValue,
      payTermType: selectedRows[0].payTermType.toUpperCase(),
    });
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
  };

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
  return (
    <Box>
      <Paper elevation={2} style={{ padding: "5px", margin: "10px" }}>
        <Box m="10px">
          <ListCrudActions
            addItems={handleNew}
            handleSave={handleSave}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          <form onSubmit={handleSave}>
            <fieldset style={{ border: "0" }}>
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
                    onChange={(e, newValue) =>
                      onFormInputChange("site", newValue)
                    }
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
                <Grid item xs={3}>
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
                    id="batchNo"
                    autoComplete="off"
                    name="batchNo"
                    label="Batch"
                    type="text"
                    value={values.batchNo}
                    onChange={(e) => onFormInputChange("batchNo", e.target.value)}
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="price"
                    autoComplete="off"
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={(e) => onFormInputChange("price", e.target.value)}
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="quantity"
                    autoComplete="off"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={values.quantity}
                    onChange={(e) =>
                      onFormInputChange("quantity", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </fieldset>
          </form>
        </Box>
        <Box sx={{ height: 400, margin: "5px" }}>
          <AgGridReact
            ref={gridRef}
            className="ag-theme-balham"
            rowData={lineItems}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            animateRows={true}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </Box>
      </Paper>
      <ToastContainer />
      <DeleteModal
        open={openDel}
        handleClose={handleClose}
        Delete={deleteObj}
      />
    </Box>
  );
}

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

const initState = {
  site: initialSite,
  itemCatalog: initialItemCatalog,
  batchNo: "",
  price: "",
  quantity: "",
};

export default GrnItems;
