import { Box, useTheme } from "@mui/material";
import React, { useState, useRef } from "react";
import { tokens } from "../../../theme";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { DataGrid } from "@mui/x-data-grid";

const API_URL = "v1/Company/";

function SalesRepOrderAddress() {
  const theme = useTheme();
  const gridRef = useRef();
  const colors = tokens(theme.palette.mode);
  const initialValue = {
    id: "",
    StringmaterialId: "",
    quantity: "",
    price: "",
    lineTotal: "",
  };

  const [addrList, setAddrList] = useState([initialValue]);

  const columnDef = [
    { field: "id", headerName: "ID" },
    {
      field: "StringmaterialId",
      headerName: "String material Id",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      editable: true,
    },
    {
      field: "lineTotal",
      headerName: "LineTotal",
      flex: 1,
      editable: true,
    },
  ];

  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const handleNew = (e) => {};
  const handleEdit = (e) => {};

  const handleSave = async (e) => {};

  const handleDelete = (e) => {};

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Box
        m="10px 0 0 0"
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={addrList} columns={columnDef} />
      </Box>
    </Box>
  );
}

export default SalesRepOrderAddress;
