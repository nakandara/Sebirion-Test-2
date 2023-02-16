import { Autocomplete, Box, Grid, Paper, TextField } from "@mui/material";
import React, { useState, useRef, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListCrudActions from "../../../components/ListCrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import DeleteModal from "../../../components/DeleteModal";
import { useEffect } from "react";

const API_URL = "enterp/v1/CustomerInfo/";
const ASSOC_API_URL = "enterp/v1/Association/";

function AssociationList({ customerId, associationList, setAssociationList }) {
  const assocGridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [openAssociationDel, setAssociationDel] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [assocForm, setAssocForm] = useState({});
  const [inputAssociation, setInputAssociation] = useState();

  const [associations, setAssociations] = useState([]);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 40,
      checkboxSelection: true,
    },
    {
      field: "associationId",
      headerName: "Assoc. ID",
      width: 150,
    },
    {
      field: "associationName",
      headerName: "Assoc. Name",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 400,
    },
    {
      field: "contact1",
      headerName: "Contact 1",
      width: 100,
    },
    {
      field: "contact2",
      headerName: "Contact 2",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
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

  const handleAssociationNew = (e) => {
    setAssocForm({});
  };

  const handleAssociationEdit = (e) => {};

  const handleAssociationSave = async (e) => {
    e.preventDefault();

    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + customerId + "/association/create",
        JSON.stringify(assocForm),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);

      isMounted && setAssociationList([...associationList, response.data]);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDeleteAssociation = (e) => {
    e.preventDefault();
    setAssociationDel(true);
  };

  const handleAssociationClose = (e) => {
    setAssociationDel(false);
  };

  const deleteAssocObj = async () => {
    try {
      await axiosPrivate.delete(
        API_URL + customerId + "/association/delete/" + assocForm.id
      );
      setAssociationList(
        associationList.filter(function (it) {
          return it.id !== assocForm.id;
        })
      );
      setAssociationDel(false);
      setAssocForm({});
      showAllToasts("SUCCESS", "Successfully Deleted.");
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = assocGridRef.current.api.getSelectedRows();

    setAssocForm({
      id: selectedRows[0].id,
    });
  };

  useEffect(() => {
    const getMetaData = async () => {
      const controller = new AbortController();
      try {
        const res = await axiosPrivate.get(ASSOC_API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });

        setAssociations(res.data);
      } catch (err) {}
    };
    getMetaData();
  }, []);

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, assocForm);
    updated[key] = value;
    setAssocForm(updated);
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
            addItems={handleAssociationNew}
            handleSave={handleAssociationSave}
            handleEdit={handleAssociationEdit}
            handleDelete={handleDeleteAssociation}
          />
          <form onSubmit={handleAssociationSave}>
            <fieldset style={{ border: "0" }}>
              <Grid container spacing={2}>
                <TextField
                  sx={{ display: { xl: "none", xs: "block" } }}
                  id="id"
                  name="id"
                  type="number"
                  value={assocForm.id}
                  onChange={(e) => onFormInputChange("id", e.target.value)}
                />
                <Grid item xs={6}>
                  <Autocomplete
                    variant="outlined"
                    disablePortal
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    id="association"
                    value={assocForm.associationId}
                    inputValue={inputAssociation}
                    onInputChange={(event, newInputValue) => {
                      setInputAssociation(newInputValue);
                    }}
                    options={associations}
                    onChange={(e, newValue) =>
                      onFormInputChange("association", newValue)
                    }
                    getOptionLabel={(option) =>
                      `${option.associationId} - ${option.associationName}` ||
                      ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Association"
                        size="small"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </form>
        </Box>
        <Box sx={{ height: 400, margin: "5px" }}>
          <AgGridReact
            ref={assocGridRef}
            className="ag-theme-balham"
            rowData={associationList}
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
        open={openAssociationDel}
        handleClose={handleAssociationClose}
        Delete={deleteAssocObj}
      />
    </Box>
  );
}

export default AssociationList;
