import { Box, useTheme } from "@mui/material";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { tokens } from "../../../../theme";
import { axiosPrivate } from "../../../../Application/fndbas/api/axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const API_URL = "v1/Company/";

function CompanyAddress({ row }) {
  const theme = useTheme();
  const gridRef = useRef();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [isNewEnabled, setIsNewEnabled] = useState(row);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const [address, setAddress] = useState([]);

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

  const [tableValues, setTableValues] = useState(initialValue);
  const [newClicked, setNewClicked] = useState(false);

  const [columnDefs] = useState([
    {
      field: "addressId",
      headerName: "Address ID",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "address1",
      headerName: "Address 1",
      flex: 1,
    },
    {
      field: "address2",
      headerName: "Address 2",
      flex: 1,
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      editable: true,
    },
    {
      field: "district",
      headerName: "District",
      flex: 1,
      editable: true,
    },
    {
      field: "province",
      headerName: "Province",
      flex: 1,
      editable: true,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      editable: true,
    },
  ]);

  const addItems = useCallback((addIndex) => {
    const newItems = [{}];
    gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
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

  const handleNew = (e) => {
    setTableValues(initialValue);
    setNewClicked(true);
    addItems(undefined);
  };

  const handleEdit = (e) => {};

  const handleSave = async (e) => {
    // addrList(initialValue);
    e.preventDefault();
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        // JSON.stringify(addrList),

        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);
      // response.data && setCurrentObject(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDelete = (e) => {
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
            rowData={address}
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

export default CompanyAddress;
