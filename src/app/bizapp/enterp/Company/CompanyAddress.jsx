import {
  Box,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { tokens } from "../../../../theme";
import { axiosPrivate } from "../../../../Application/fndbas/api/axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const API_URL = "enterp/v1/Company/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

// export default function CompanyAddress({

// })

function CompanyAddress({ addCompanyAddressForm, setAddCompanyAddressForm }) {
  const theme = useTheme();
  const gridRef = useRef();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const [address, setAddress] = useState([]);
  const [isItemKeyDisabled, setIsItemKeyDisabled] = useState(false);

  const [openNewItemDlg, setOpenNewItemDlg] = useState(false);

  const [addressId, setAddressId] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  let idCounter = 0;
  const initialValue = () => {
    idCounter += 1;
    return {
      id: "",
      addressId: "",
      address1: "",
      address2: "",
      city: "",
      district: "",
      province: "",
      country: "",
    };
  };

  const [tableValues, setTableValues] = useState(initialValue);
  const [newClicked, setNewClicked] = useState(false);

  const [columnDefs] = useState([
    {
      field: "addressId",
      headerName: "Address ID",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "address1",
      headerName: "Address 1",
      flex: 1,
    },
    {
      field: "address2",
      headerName: "Address 2",
      flex: 1,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      editable: true,
    },
    {
      field: "province",
      headerName: "Province",
      flex: 1,
      editable: true,
    },
  ]);

  const addItems = useCallback((addIndex) => {
    const newItems = [{}];
    gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);

  const handleNewItemClose = () => {
    setOpenNewItemDlg(false);
  };

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
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
    e.preventDefault();
    setOpenNewItemDlg(true);

  };

  const handleAddressForm = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    try {
      const itemResponse = await axiosPrivate.post(
        API_URL + "save",
        JSON.stringify({
          addressId: addressId,
          address1: address1,
          address2: address2,
          city: city,
          province: province,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );

      const item = itemResponse.data;
      const responseItem = {
        addressId: item.addressId,
        address1: item.address1,
        address2: item.address2,
        city: item.city,
        province: item.province,
      };

      setAddCompanyAddressForm([...addCompanyAddressForm, responseItem]);

      setOpenNewItemDlg(false);
    } catch (err) {}
  };

  const handleEdit = (e) => {};

  // const handleSave = async (e) => {
  //   // addrList(initialValue);
  //   e.preventDefault();
  //   const controller = new AbortController();
  //   try {
  //     const response = await axiosPrivate.post(
  //       API_URL + "create",
  //       // JSON.stringify(addrList),

  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           signal: controller.signal,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     // response.data && setCurrentObject(response.data);
  //     showAllToasts("SUCCESS", "Successfully Saved.");
  //   } catch (err) {
  //     showAllToasts("ERROR", err.response.data.apiError.message);
  //     console.log(err);
  //   }
  // };

  const handleDelete = (e) => {};

  return (
    <div className="mt-5">
      <Paper elevation={0}>
        <div className="p-2 d-flex w-100 align-items-center">
          <CrudActions
            handleNew={handleNew}
            isNewEnabled={true}
            handleEdit={handleEdit}
            // handleSave={handleSave}
            handleDelete={handleDelete}
          />
        </div>
        <Box sx={{ height: 500, margin: "10px" }}>
          <div
            className="ag-theme-alpine"
            style={{ height: 500, width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={address}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={"single"}
              animateRows={true}
              onSelectionChanged={onSelectionChanged}
            ></AgGridReact>
          </div>
        </Box>
      </Paper>
      <Dialog
        open={openNewItemDlg}
        onClose={handleNewItemClose}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "750px", // Set your width here
            },
          },
        }}
      >
        <DialogTitle>Add Company Address</DialogTitle>
        <DialogContent>
          <form className="inquiry-item-form" onClick={handleAddressForm}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  disabled={isItemKeyDisabled}
                  size="small"
                  fullWidth
                  id="addressId"
                  autoComplete="off"
                  name="addressId"
                  label="Address ID"
                  type="text"
                  value={addressId}
                  onChange={(e) => setAddressId(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  disabled={isItemKeyDisabled}
                  size="small"
                  fullWidth
                  id="address1"
                  autoComplete="off"
                  name="address1"
                  label="Address 1"
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  disabled={isItemKeyDisabled}
                  size="small"
                  fullWidth
                  id="address2"
                  autoComplete="off"
                  name="address2"
                  label="Address 2"
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  disabled={isItemKeyDisabled}
                  size="small"
                  fullWidth
                  id="city"
                  autoComplete="off"
                  name="city"
                  label="City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  disabled={isItemKeyDisabled}
                  size="small"
                  fullWidth
                  id="province"
                  autoComplete="off"
                  name="province"
                  label="Province"
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewItemClose}>Cancel</Button>
          <Button onClick={handleAddressForm}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CompanyAddress;
