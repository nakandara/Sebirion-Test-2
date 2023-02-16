import { Box, Grid, Paper, TextField } from "@mui/material";
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

function CustomerAddressList({ customerId, addressList, setAddressList }) {
  const priceGridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [openPriceItemDel, setPriceItemDel] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [address, setAddress] = useState(initAddress);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 40,
      checkboxSelection: true,
    },
    {
      field: "addressId",
      headerName: "Addr. ID",
      width: 150,
    },
    {
      field: "addressType",
      headerName: "Addr. Type",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
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

  const handlePriceItemNew = (e) => {
    setAddress(initAddress);
  };

  const handleEdit = (e) => {};

  const handleItemPriceSave = async (e) => {
    e.preventDefault();

    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + customerId + "/address/create",
        JSON.stringify(address),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);

      isMounted && setAddressList([...addressList, response.data]);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDeletePriceItem = (e) => {
    e.preventDefault();
    setPriceItemDel(true);
  };

  const handlePriceItemClose = (e) => {
    setPriceItemDel(false);
  };

  const deletePriceItemObj = async () => {
    try {
      await axiosPrivate.delete(
        API_URL + customerId + "/address/delete/" + address.id
      );      
      setAddressList(
        addressList.filter(function (it) {
          return it.id !== address.id;
        })
      );
      setPriceItemDel(false);
      setAddress(initAddress);
      showAllToasts("SUCCESS", "Successfully Deleted.");
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = priceGridRef.current.api.getSelectedRows();

    setAddress({
      id: selectedRows[0].id,
      address: selectedRows[0].address,
    });
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, address);
    updated[key] = value;
    setAddress(updated);
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
      <Paper elevation={2} style={{ padding: "2px" }}>
        <Box m="5px">
          <ListCrudActions
            addItems={handlePriceItemNew}
            handleSave={handleItemPriceSave}
            handleEdit={handleEdit}
            handleDelete={handleDeletePriceItem}
          />
          <form onSubmit={handleItemPriceSave}>
            <fieldset style={{ border: "0" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    sx={{ display: { xl: "none", xs: "block" } }}
                    id="id"
                    name="id"
                    type="number"
                    value={address.id}
                    onChange={(e) => onFormInputChange("id", e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="addressId"
                    autoComplete="off"
                    name="addressId"
                    label="Addr. ID"
                    type="text"
                    value={address.addressId}
                    onChange={(e) => onFormInputChange("addressId", e.target.value)}
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="address1"
                    autoComplete="off"
                    name="address1"
                    label="Address 1"
                    type="text"
                    value={address.address1}
                    onChange={(e) => onFormInputChange("address1", e.target.value)}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="address2"
                    autoComplete="off"
                    name="address2"
                    label="Address 2"
                    type="text"
                    value={address.address2}
                    onChange={(e) => onFormInputChange("address2", e.target.value)}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="city"
                    autoComplete="off"
                    name="city"
                    label="City"
                    type="text"
                    value={address.city}
                    onChange={(e) => onFormInputChange("city", e.target.value)}
                    margin="normal"
                  />
                </Grid>
                
              </Grid>
            </fieldset>
          </form>
        </Box>
        <Box sx={{ height: 400, margin: "5px" }}>
          <AgGridReact
            ref={priceGridRef}
            className="ag-theme-balham"
            rowData={addressList}
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
        open={openPriceItemDel}
        handleClose={handlePriceItemClose}
        Delete={deletePriceItemObj}
      />
    </Box>
  );
}

const initAddress = {
  id: "",
  addressId:"",
  address1: "",
  address2: "",
  city: "",
  defaultMethod: true,
  addressType:"DOCUMENT"
};

export default CustomerAddressList;
