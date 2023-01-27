import { Box, useTheme } from "@mui/material";
import React, { useState, useRef } from "react";
import { tokens } from "../../../../theme";
import { axiosPrivate } from "../../../../Application/fndbas/api/axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CustomAgGrid from "../../../components/CustomAgGrid";
import { DataGrid } from "@mui/x-data-grid";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { ToastContainer, toast } from 'react-toastify';


const API_URL = "v1/Company/";

function CompanyAddress({row}) {
  const theme = useTheme();
  const gridRef = useRef();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
 

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


    const columnDef = [
        // { field: "id", headerName: "ID" },
        {
            field: "addressId",
            headerName: "Address ID",
            flex: 1,
            // cellClassName: "name-column--cell",
            editable: true
        },
        {
            field: "address1",
            headerName: "Address 1",
            flex: 1,
            editable: true 
        },
        {
            field: "address2",
            headerName: "Address 2",
            flex: 1,
            editable: true 
        },
        {
            field: "city",
            headerName: "City",
            flex: 1,
            editable: true 
        },
        {
            field: "district",
            headerName: "District",
            flex: 1,
            editable: true 
        },
        {
            field: "province",
            headerName: "Province",
            flex: 1,
            editable: true 
        },
      ]

  const [addrList, setAddrList] = useState([]);

  

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

  const [isNewEnabled, setIsNewEnabled] = useState(row);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const handleNew = (e) => {
    setAddrList((prevRows) => [...prevRows, initialValue()]);
  };
  const handleEdit = (e) => {};

  const handleSave = async (e) => {
    addrList(initialValue);
    e.preventDefault();
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify(addrList),

        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);
      // response.data && setCurrentObject(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.")
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message)
      console.log(err);
    }
  };

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
        <DataGrid checkboxSelection rows={addrList} columns={columnDef} />
      </Box>
    </Box>
  );
}

export default CompanyAddress;
