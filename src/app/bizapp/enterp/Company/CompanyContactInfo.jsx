import { Box, useTheme,   Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  Grid,
  TextField

 } from "@mui/material";
import React, { useState, useRef, useMemo, useCallback } from "react";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import { tokens } from "../../../../theme";
import { ToastContainer, toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const API_URL = "v1/Company/";

function CompanyContactInfo({addCompanyContactForm, setAddCompanyContactForm}) {
  const axiosPrivate = useAxiosPrivate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);


  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const [contacts, setContacts] = useState([])
  const [isItemKeyDisabled, setIsItemKeyDisabled] = useState(false);

  const [openNewItemDlg, setOpenNewItemDlg] = useState(false);
  const [commId, setCommId] = useState("");
  const [commType, setCommType] = useState("");
  const [commValue, setCommValue] = useState("");
  const [description, setDescription] = useState("");
  const [defaultMethod, setDefaultMethod] = useState("");
  const [addressId, setAddressId] = useState("");


  const initialValue = {
    id: "",
    addressId: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    province: "",
    country: "",
  };

  const [tableValues, setTableValues] = useState(initialValue);
  const [newClicked, setNewClicked] = useState(false);

  const [columnDefs] = useState([
    // { field: "id", headerName: "ID" },
    {
      field: "commId",
      headerName: "Comm. ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "commType",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "commValue",
      headerName: "Value",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "defaultMethod",
      headerName: "Default",
      flex: 1,
    },
    {
      field: "addressId",
      headerName: "Address ID",
      flex: 1,
    },
  ]);

  const addItems = useCallback((addIndex) => {
    const newItems = [{}];
    gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex
    })
    
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);


  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  const handleNew = (e) => {
    setOpenNewItemDlg(true);
 
  
  }

  const handleContactForm = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    try {
      const itemResponse = await axiosPrivate.post(
        API_URL + "/save",
        JSON.stringify({
          commId: commId,
          commType: commType,
          commValue: commValue,
          description: description,
          defaultMethod: defaultMethod,
          addressId:addressId
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
        commId: item.commId,
        commType: item.commType,
        commValue: item.commValue,
        description: item.description,
        defaultMethod: item.defaultMethod,
        addressId: item.addressId
      };

      setAddCompanyContactForm([...addCompanyContactForm, responseItem]);

      setOpenNewItemDlg(false);
    } catch (err) {}
  }



  let idCounter = 0;

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

  const [addrList, setAddrList] = useState([]);

  const handleNewItemClose = () => {
    setOpenNewItemDlg(false);
  };


  const handleEdit = (e) => {};

  const handleSave = async (e) => {};

  const handleDelete = (e) => {
    setAddrList((prevRows) => {
      const rowToDeleteIndex = prevRows.length - 1;
      return [
        ...addrList.slice(0, rowToDeleteIndex),
        ...addrList.slice(rowToDeleteIndex + 1),
      ];
    });
  };

  return (
    <Box backgroundColor={colors.primary[400]}>
      <CrudActions
        handleNew={handleNew}
        isNewEnabled={true}
        handleEdit={handleEdit}
        // isEditEnabled={isEditEnabled}
        handleSave={handleSave}
        // isSaveEnabled={isSaveEnabled}
        handleDelete={handleDelete}
        // isDeleteEnabled={isDeleteEnabled}
      />

      <Box sx={{ height: 500, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={contacts}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            animateRows={true}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </Box>
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
        <DialogTitle>Add Company Contact Info</DialogTitle>
        <DialogContent>
          <form className="inquiry-item-form" onClick={handleContactForm}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  disabled={isItemKeyDisabled}
                  size="small"
                  fullWidth
                  id="commId"
                  autoComplete="off"
                  name="commId"
                  label="Comm. ID"
                  type="text"
                  value={commId}
                  onChange={(e) => setCommId(e.target.value)}
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
                  id="commType"
                  autoComplete="off"
                  name="commType"
                  label="Address 1"
                  type="text"
                  value={commType}
                  onChange={(e) => setCommType(e.target.value)}
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
                  id="commValue"
                  autoComplete="off"
                  name="commValue"
                  label="Comm Value"
                  type="text"
                  value={commValue}
                  onChange={(e) => setCommValue(e.target.value)}
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
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  disabled={isItemKeyDisabled}
                  size="small"
                  fullWidth
                  id="defaultMethod"
                  autoComplete="off"
                  name="defaultMethod"
                  label="Defaul tMethod"
                  type="text"
                  value={defaultMethod}
                  onChange={(e) => setDefaultMethod(e.target.value)}
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
                  id="addressId"
                  autoComplete="off"
                  name="addressId"
                  label="AddressId"
                  type="text"
                  value={addressId}
                  onChange={(e) => setAddressId(e.target.value)}
                  required
                  margin="normal"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewItemClose}>Cancel</Button>
          <Button onClick={handleContactForm}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CompanyContactInfo;
