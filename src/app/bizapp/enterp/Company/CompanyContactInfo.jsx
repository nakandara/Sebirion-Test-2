import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useRef, useMemo, useCallback } from "react";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import { tokens } from "../../../../theme";
import { ToastContainer, toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

function CompanyContactInfo({row}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [isNewEnabled, setIsNewEnabled] = useState(row);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const [contacts, setContacts] = useState([])

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
    setTableValues(initialValue);
    setNewClicked(true)
    addItems(undefined)
  
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
        isNewEnabled={isNewEnabled}
        handleEdit={handleEdit}
        isEditEnabled={isEditEnabled}
        handleSave={handleSave}
        isSaveEnabled={isSaveEnabled}
        handleDelete={handleDelete}
        isDeleteEnabled={isDeleteEnabled}
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
    </Box>
  );
}

export default CompanyContactInfo;
