import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import React, { useState, useRef, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListCrudActions from "../../../components/ListCrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import DeleteModal from "../../../components/DeleteModal";

const API_URL = "enterp/v1/CustomerInfo/";

function CommMethodList({ customerId, commList, setCommList }) {
  const custContactGridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [openCommDel, setCommDel] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [custContact, setCustContact] = useState(initCustContact);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 40,
      checkboxSelection: true,
    },
    {
      field: "commId",
      headerName: "Comm. ID",
      width: 150,
    },
    {
      field: "commType",
      headerName: "Comm. Type",
      width: 200,
    },
    {
      field: "commValue",
      headerName: "Value",
      width: 400,
    },
    {
      field: "defaultMethod",
      headerName: "Default",
      width: 100,
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

  const handleCustContactNew = (e) => {
    setCustContact(initCustContact);
  };

  const handleCustContactEdit = (e) => {};

  const handleCustContactSave = async (e) => {
    e.preventDefault();

    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + customerId + "/contact/create",
        JSON.stringify(custContact),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);

      isMounted && setCommList([...commList, response.data]);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDeleteCustContact = (e) => {
    e.preventDefault();
    setCommDel(true);
  };

  const handleCommDeleteClose = (e) => {
    setCommDel(false);
  };

  const deleteCustCommObj = async () => {
    try {
      await axiosPrivate.delete(
        API_URL + customerId + "/contact/delete/" + custContact.id
      );
      setCommList(
        commList.filter(function (it) {
          return it.id !== custContact.id;
        })
      );
      setCommDel(false);
      setCustContact(initCustContact);
      showAllToasts("SUCCESS", "Successfully Deleted.");
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = custContactGridRef.current.api.getSelectedRows();

    setCustContact({
      id: selectedRows[0].id,
      commId: selectedRows[0].commId,
      commType: (selectedRows[0].commType).toUpperCase(),
      commValue: selectedRows[0].commValue,
      description: selectedRows[0].description,
      defaultMethod: selectedRows[0].defaultMethod,
    });
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, custContact);
    updated[key] = value;
    setCustContact(updated);
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
      <Paper elevation={2} style={{ padding: "5px"}}>
        <Box m="5px">
          <ListCrudActions
            addItems={handleCustContactNew}
            handleSave={handleCustContactSave}
            handleEdit={handleCustContactEdit}
            handleDelete={handleDeleteCustContact}
          />
          <form onSubmit={handleCustContactSave}>
            <fieldset style={{ border: "0" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    sx={{ display: { xl: "none", xs: "block" } }}
                    id="id"
                    name="id"
                    type="number"
                    value={custContact.id}
                    onChange={(e) => onFormInputChange("id", e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="commId"
                    autoComplete="off"
                    name="commId"
                    label="Comm. ID"
                    type="text"
                    value={custContact.commId}
                    onChange={(e) =>
                      onFormInputChange("commId", e.target.value)
                    }
                    required
                    margin="normal"
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <InputLabel id="commTypelbl">Comm. Type</InputLabel>
                    <Select
                      size="small"
                      margin="normal"
                      labelId="commTypelbl"
                      id="commType"
                      value={custContact.commType}
                      label="Comm. Type"
                      onChange={(e) =>
                        onFormInputChange("commType", e.target.value)
                      }
                    >
                      <MenuItem value="PHONE">Phone</MenuItem>
                      <MenuItem value="EMAIL">Email</MenuItem>
                      <MenuItem value="WHATSAPP">Whats App</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="commValue"
                    autoComplete="off"
                    name="commValue"
                    label="Value"
                    type="text"
                    value={custContact.commValue}
                    onChange={(e) =>
                      onFormInputChange("commValue", e.target.value)
                    }
                    margin="normal"
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
                    value={custContact.description}
                    onChange={(e) =>
                      onFormInputChange("description", e.target.value)
                    }
                    margin="normal"
                  />
                </Grid>                
              </Grid>
            </fieldset>
          </form>
        </Box>
        <Box sx={{ height: 400, margin: "5px" }}>
          <AgGridReact
            ref={custContactGridRef}
            className="ag-theme-balham"
            rowData={commList}
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
        open={openCommDel}
        handleClose={handleCommDeleteClose}
        Delete={deleteCustCommObj}
      />
    </Box>
  );
}

const initCustContact = {
  id: "",
  commId: "",
  commType: "",
  commValue: "",
  description: "",
  defaultMethod: true,
};

export default CommMethodList;
