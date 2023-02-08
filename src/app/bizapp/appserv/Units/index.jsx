import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";

import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select,  TextField, useMediaQuery, useTheme } from "@mui/material";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Header from "../../../components/Header";
import ListCrudActions from "../../../components/ListCrudActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../../components/DeleteModal";

const API_URL = "/appsrv/v1/IsoUnit/";

function BasicData() {
  const gridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const initialValues = {
    unitCode: "",
    description: "",
    baseUnit: "",
    multiFactor: "",
    divFactor: "",
    tenPower: "",
    unitType: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [newClicked, setNewClicked] = useState(false);

  const [formValues, setFormValues] = useState(initialValues);
  const [rePopulate, setRePopulate] = useState(false);

  const [openDel, setOpenDel] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [isoUnits, setIsoUnits] = useState([]);
  const [columnDefs] = useState([
    { field: "id", headerName: "ID", width: 40,checkboxSelection: true, },
    {
      field: "unitCode",
      headerName: "Unit Code",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    {
      field: "baseUnit",
      headerName: "Base Unit",
      width: 110,
    },
    {
      field: "multiFactor",
      headerName: "Multi Factor",
      width: 110,
    },
    {
      field: "divFactor",
      headerName: "Div Factor",
      width: 110,
      type: "numericColumn",
    },
    {
      field: "tenPower",
      headerName: "Ten Power",
      width: 110,
    },
    {
      field: "userDefined",
      headerName: "User Defined",
      width: 110,
    },
    {
      field: "unitType",
      headerName: "Unit Type",
      width: 110,
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

  const handleClose = () => {
    setOpenDel(false);
  };

  const deleteObj = async () => {
    try {
      await axiosPrivate.delete(API_URL + "delete/" + formValues.unitCode);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setFormValues(initialValues);
      setRePopulate(true);
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();

    setFormValues({
      unitCode: selectedRows[0].unitCode,
      description: selectedRows[0].description,
      baseUnit: selectedRows[0].baseUnit,
      multiFactor: selectedRows[0].multiFactor,
      divFactor: selectedRows[0].divFactor,
      tenPower: selectedRows[0].tenPower,
      userDefined: selectedRows[0].userDefined,
      unitType: (selectedRows[0].unitType).toUpperCase(),
    })
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUnits = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });

        rePopulate || (isMounted && setIsoUnits)(response.data);
      } catch (err) {}
    };
    getUnits();
    return () => {
      isMounted = false;
      controller.abort();
      setRePopulate(false);
    };
  }, [rePopulate]);

  const handleNew = (e) => {
    setFormValues(initialValues);
    setNewClicked(true);
  };
  const handleEdit = (e) => {};

  const handleSave = async (e) => {
    e.preventDefault();
    setFormValues(initialValues);
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
      console.log(response.data);
      let resObj = response.data;

      const responseItem={
        id: resObj.id,
        unitCode: resObj.unitCode,
        description: resObj.description,
        baseUnit: resObj.baseUnit,
        multiFactor: resObj.multiFactor,
        divFactor: resObj.divFactor,
        tenPower: resObj.tenPower,
        userDefined: resObj.userDefined,
        unitType: resObj.unitType,
      }      

      response.data && setIsoUnits([... isoUnits,responseItem]);
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

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, formValues);
    updated[key] = value;
    setFormValues(updated);
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

  return (
    <Box>
      <Box m="10px">
        <Header title="ISO Units" subTitle="" />
        <ListCrudActions
          addItems={handleNew}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      <Paper elevation={1} style={{ padding: "5px" }}>
          <form onSubmit={handleSave}>
            <fieldset style={{ border: "0" }}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="unitCode"
                    autoComplete="off"
                    name="unitCode"
                    label="Unit Code"
                    type="text"
                    value={formValues.unitCode}
                    onChange={(e) =>
                      onFormInputChange("unitCode", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="baseUnit"
                    autoComplete="off"
                    name="baseUnit"
                    label="Base Unit"
                    type="text"
                    value={formValues.baseUnit}
                    onChange={(e) =>
                      onFormInputChange("baseUnit", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="multiFactor"
                    autoComplete="off"
                    name="multiFactor"
                    label="Multi. Factor"
                    type="number"
                    value={formValues.multiFactor}
                    onChange={(e) =>
                      onFormInputChange("multiFactor", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="divFactor"
                    autoComplete="off"
                    name="divFactor"
                    label="Div. Factor"
                    type="number"
                    value={formValues.divFactor}
                    onChange={(e) =>
                      onFormInputChange("divFactor", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="tenPower"
                    autoComplete="off"
                    name="tenPower"
                    label="Ten Power"
                    type="number"
                    value={formValues.tenPower}
                    onChange={(e) =>
                      onFormInputChange("tenPower", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormControl
                    sx={{ minWidth: 120, gridColumn: "span 1" }}
                    size="small"
                  >
                    <InputLabel id="unitType">Unit Type</InputLabel>
                    <Select
                      labelId="unitType"
                      id="unitType"
                      value={formValues.unitType}
                      label="Unit Type"
                      onChange={(e) =>
                        onFormInputChange("unitType", e.target.value)
                      }
                    >
                      <MenuItem value={"NOT_USED"}>Not Used</MenuItem>
                      <MenuItem value={"WEIGHT"}>Weight</MenuItem>
                      <MenuItem value={"VOLUME"}>Volume</MenuItem>
                      <MenuItem value={"LENGTH"}>Length</MenuItem>
                      <MenuItem value={"TEMPERATURE"}>Temperature</MenuItem>
                      <MenuItem value={"DISCRETE"}>Discrete</MenuItem>
                      <MenuItem value={"DENSITY"}>Density</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </fieldset>
          </form>
        </Paper>

      <Box sx={{ height: 400, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={isoUnits}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            animateRows={true}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </Box>
      <DeleteModal
          open={openDel}
          handleClose={handleClose}
          Delete={deleteObj}
        />
      <ToastContainer/>
    </Box>
  );
}

export default BasicData;
