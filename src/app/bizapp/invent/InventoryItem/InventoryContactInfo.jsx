import { Box, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import { tokens } from "../../../../theme";

function InventoryContactInfo() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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

  const [addrList, setAddrList] = useState([initialValue]);

  const columns = [
    { field: "id", headerName: "ID" },
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
      <CrudActions
        handleNew={handleNew}
        isNewEnabled={isNewEnabled}
        handleEdit={handleEdit}
        isEditEnabled={isEditEnabled}
        handleSave={handleSave}
        isSaveEnabled={isSaveEnabled}
        handleDelete={handleDelete}
        isDeleteEnabled={isDeleteEnabled}
      />
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
      </Box>
    </Box>
  );
}

export default InventoryContactInfo;
