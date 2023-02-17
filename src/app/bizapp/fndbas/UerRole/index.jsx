import React, { useMemo, useState, useRef, useEffect } from "react";

import {
  Box,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Header from "../../../components/Header";
import ListCrudActions from "../../../components/ListCrudActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../../components/DeleteModal";

const API_URL = "v1/FndUser/";

function UserRoles() {
  const gridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const initialValues = {
    roleId: "",
    description: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [newClicked, setNewClicked] = useState(false);

  const [formValues, setFormValues] = useState(initialValues);
  const [rePopulate, setRePopulate] = useState(false);

  const [openDel, setOpenDel] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [userRoles, setUserRoles] = useState([]);
  const [columnDefs] = useState([
    { field: "id", headerName: "ID", width: 40, checkboxSelection: true },
    {
      field: "roleId",
      headerName: "Unit Code",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 350,
      editable: true,
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
      await axiosPrivate.delete(API_URL + "delete/" + formValues.roleId);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setFormValues(initialValues);
      setRePopulate(true);
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();

    setFormValues({
      roleId: selectedRows[0].roleId,
      description: selectedRows[0].description,
    });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUnits = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "user_roles", {
          headers: {
            signal: controller.signal,
          },
        });

        rePopulate || (isMounted && setUserRoles)(response.data);
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

      const responseItem = {
        id: resObj.id,
        roleId: resObj.roleId,
        description: resObj.description,
      };

      response.data && setUserRoles([...userRoles, responseItem]);
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
        <Header title="User Roles" subTitle="" />
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
                  id="roleId"
                  autoComplete="off"
                  name="roleId"
                  label="Role Id"
                  type="text"
                  value={formValues.roleId}
                  onChange={(e) => onFormInputChange("roleId", e.target.value)}
                  required
                  margin="normal"
                  inputProps={{ style: { textTransform: "uppercase" } }}
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
            </Grid>
          </fieldset>
        </form>
      </Paper>

      <Box sx={{ height: 400, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={userRoles}
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
      <ToastContainer />
    </Box>
  );
}

export default UserRoles;
