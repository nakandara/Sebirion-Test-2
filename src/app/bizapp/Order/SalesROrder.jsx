import {
  Box,
  TextField,
  useMediaQuery,
  useTheme,
  Grid,
  Chip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { tokens } from "../../../theme";
import CrudActions from "../../components/CrudActions";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useCallback } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import ListCrudActions from "../../components/ListCrudActions";

const SalesROrder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const orderIdRef = useRef();
  const gridRef = useRef();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);
  const [orderLines, setOrderLines] = useState([]);

  const [formValues, setFormValues] = useState(initialValues);

  const handleNew = (e) => {
    orderIdRef.current.focus();
  };
  const handleEdit = (e) => {
    orderIdRef.current.focus();
  };
  const handleSave = (values) => {
    console.log(values);
  };
  const handleDelete = (e) => {
    orderIdRef.current.focus();
  };
  const handleTabChange = (event, newValue) => {
    setOrderLines(newValue);
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, formValues);
    updated[key] = value;
    setFormValues(updated);
  };

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  const [columnDefs] = useState([
    {
      field: "unitCode",
      headerName: "Unit Code",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 110,
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

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);

  return (
    <Box m="5px" backgroundColor={colors.primary[400]} p="10px">
      <Header title="Sales Rep Order" subTitle="" />

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

      <form onSubmit={handleSave}>
        <Box
          display="grid"
          gap="20px"
          mt="5px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            ref={orderIdRef}
            type="text"
            label="Order ID"
            focused
            onChange={(e) => onFormInputChange("orderId", e.target.value)}
            value={formValues.orderId}
            InputProps={{ sx: { height: 40 } }}
            name="orderId"
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
            focused
            label="Description"
            onChange={(e) => onFormInputChange("description", e.target.value)}
            value={formValues.description}
            name="description"
            sx={{
              gridColumn: "span 2",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="SDO"
            focused
            onChange={(e) => onFormInputChange("sdo", e.target.value)}
            value={formValues.sdo}
            name="sdo"
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
            type="date"
            label="Created At"
            focused
            onChange={(e) => onFormInputChange("createdAt", e.target.value)}
            value={formValues.createdAt}
            disabled
            name="createdAt"
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
            value={formValues.createdBy}
            name="createdBy"
            disabled
            sx={{
              gridColumn: "span 1",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />
        </Box>
      </form>
      <ToastContainer />

      <Box mt="30px">
        <ListCrudActions
          addItems={handleNew}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>
      <Box
        sx={{ height: "400px", width: "100%"}}
      >
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={orderLines}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            animateRows={true}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </Box>
    </Box>
  );
};

const initialValues = {
  orderId: "",
  description: "",
  sdo: "",
  createdAt: "",
  createdBy: "",
  status: "",
};

export default SalesROrder;
