import { Box } from "@mui/material";
import React from "react";
import ListCrudActions from "../../../components/ListCrudActions";
import { AgGridReact } from "ag-grid-react";
import { useState,useMemo,useCallback,useRef } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

function OrderLine({orderLines}) {
    const gridRef = useRef();
  const [columnDefs] = useState([
    {
      field: "inventoryItem",
      headerName: "Item",
      width: 220,
    },    
    {
      field: "price",
      headerName: "Price",
      width: 50,
    },
    {
        field: "quantity",
        headerName: "Quantity",
        width: 50,
      },
    {
      field: "lineTotal",
      headerName: "Amount",
      width: 50,
    },
    
  ]);

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const handleNew = (e) => {
  };
  const handleEdit = (e) => {
  };
  const handleSave = (values) => {
    console.log(values);
  };
  const handleDelete = (e) => {}

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <Box mt="30px">
      <ListCrudActions
        addItems={handleNew}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <Box sx={{ height: "400px", width: "100%" }}>
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
}

export default OrderLine;
