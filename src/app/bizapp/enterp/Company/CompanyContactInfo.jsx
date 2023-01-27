
import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useState } from 'react';
import CrudActions from '../../../../Application/fndbas/CrudActions/CrudActions';
import { tokens } from '../../../../theme';
import { ToastContainer, toast } from 'react-toastify';



function CompanyContactInfo({row}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const showAllToasts = (type, msg) => {
    type === "SUCCESS" && toast.success(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    type === "ERROR" && toast.error(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    type === "WARNING" && toast.warning(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    type === "INFO" && toast.info(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  }

  const [addrList, setAddrList] = useState([]);

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

  const [isNewEnabled, setIsNewEnabled] = useState(row);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const handleNew = (e) => {
    setAddrList((prevRows) => [...prevRows, initialValue()]);
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
        <DataGrid checkboxSelection rows={addrList} columns={columns} />
      </Box>
    </Box>
  );
}

export default CompanyContactInfo;
