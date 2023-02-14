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

function CostHistory({ itemCatalogId, costItems, setCostItems }) {
  const costGridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [openCostItemDel, setCostItemDel] = useState(false);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [cost, setCost] = useState(initCostHist);

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
      field: "cost",
      headerName: "Cost",
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

  const handleCostItemNew = (e) => {
    setCost(initCostHist);
  };

  const handleEdit = (e) => {};

  const handleItemCostSave = async (e) => {
    e.preventDefault();

    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + itemCatalogId + "/cost/create",
        JSON.stringify(cost),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);

      isMounted && setCostItems([...costItems, response.data]);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDeleteCostItem = (e) => {
    e.preventDefault();
    setCostItemDel(true);
  };

  const handleCostItemClose = (e) => {
    setCostItemDel(false);
  };

  const deleteCostItemObj = async () => {
    try {
      await axiosPrivate.delete(
        API_URL + itemCatalogId + "/cost/delete/" + cost.id
      );      
      setCostItems(
        costItems.filter(function (it) {
          return it.id !== cost.id;
        })
      );
      setCostItemDel(false);
      setCost(initCostHist);
      showAllToasts("SUCCESS", "Successfully Deleted.");
    } catch (err) {}
  };

  const onSelectionChanged = () => {
    const selectedRows = costGridRef.current.api.getSelectedRows();

    setCost({
      id: selectedRows[0].id,
      cost: selectedRows[0].cost,
    });
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, cost);
    updated[key] = value;
    setCost(updated);
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
            addItems={handleCostItemNew}
            handleSave={handleItemCostSave}
            handleEdit={handleEdit}
            handleDelete={handleDeleteCostItem}
          />
          <form onSubmit={handleItemCostSave}>
            <fieldset style={{ border: "0" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    sx={{ display: { xl: "none", xs: "block" } }}
                    id="id"
                    name="id"
                    type="number"
                    value={cost.id}
                    onChange={(e) => onFormInputChange("id", e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="cost"
                    autoComplete="off"
                    name="cost"
                    label="Cost Amount"
                    type="number"
                    value={cost.cost}
                    onChange={(e) => onFormInputChange("cost", e.target.value)}
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
            ref={costGridRef}
            className="ag-theme-balham"
            rowData={costItems}
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
        open={openCostItemDel}
        handleClose={handleCostItemClose}
        Delete={deleteCostItemObj}
      />
    </Box>
  );
}

const initCostHist = {
  id: "",
  cost: "",
};

export default CostHistory;
