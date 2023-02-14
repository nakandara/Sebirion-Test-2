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
import moment from "moment";

const API_URL = "invent/v1/ItemCatalog/";

function PriceHistory({ itemCatalogId, priceItems, setPriceItems }) {
  const priceGridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [openPriceItemDel, setPriceItemDel] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [price, setPrice] = useState(initPriceHist);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 40,
      checkboxSelection: true,
    },
    {
      field: "dateCreated",
      headerName: "Created",
      width: 250,
      cellRenderer: (data) => {
        return moment(data.dateCreated).format("MM/DD/YYYY HH:mm");
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      cellStyle: { "textAlign": "right" },  
      cellRenderer: CurrencyCellRenderer
    },
  ]);

  function CurrencyCellRenderer(params) {
    var lkrFormate = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2
    });
    return lkrFormate.format(params.value);
}

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const handlePriceItemNew = (e) => {
    setPrice(initPriceHist);
  };

  const handleEdit = (e) => {};

  const handleItemPriceSave = async (e) => {
    e.preventDefault();

    let isMounted = true;
    const controller = new AbortController();
    try {
      const priceRes = await axiosPrivate.post(
        API_URL + itemCatalogId + "/price/create",
        JSON.stringify(price),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(priceRes.data);

      isMounted && setPriceItems([...priceItems, priceRes.data]);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.priceRes.data.apiError.message);
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
        API_URL + itemCatalogId + "/price/delete/" + price.id
      );      
      setPriceItems(
        priceItems.filter(function (it) {
          return it.id !== price.id;
        })
      );
      setPriceItemDel(false);
      setPrice(initPriceHist);
      showAllToasts("SUCCESS", "Successfully Deleted.");
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = priceGridRef.current.api.getSelectedRows();

    setPrice({
      id: selectedRows[0].id,
      price: selectedRows[0].price,
    });
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, price);
    updated[key] = value;
    setPrice(updated);
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
      <Paper elevation={2} style={{ padding: "5px", margin: "10px" }}>
        <Box m="10px">
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
                    value={price.id}
                    onChange={(e) => onFormInputChange("id", e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="price"
                    autoComplete="off"
                    name="price"
                    label="Price Amount"
                    type="number"
                    value={price.price}
                    onChange={(e) => onFormInputChange("price", e.target.value)}
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
            ref={priceGridRef}
            className="ag-theme-balham"
            rowData={priceItems}
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

const initPriceHist = {
  id: "",
  price: "",
};

export default PriceHistory;
