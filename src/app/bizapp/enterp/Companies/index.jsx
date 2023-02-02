import { Box, Typography, useTheme } from "@mui/material";
import React, {useRef, useMemo, useState, useCallback} from "react";
import Header from "../../../components/Header";
import { tokens } from "../../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataInvoices } from "../../../../data/mockData";
import { useEffect } from "react";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";


const API_URL = "enterp/v1/Company/";

function Companies() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const gridRef = useRef();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const initialValue = {
    id: "",
    companyId: "",
    companyName: "",
    associationNo: "",
    webAddress: "",
    businessNature: "",
    createdAt: "",
    createdBy: "",
  };
  const [companies, setCompanies] = useState([]);


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCompanies = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });
        console.log(response.data);
        let companies = response.data;
        const dataArray = companies.map((company, idx) => ({
          id: idx + 1,
          companyId: company.companyId,
          companyName: company.companyName,
          createdBy: company.createdBy,
          createdAt: company.createdAt,
          associationNo: company.associationNo,
          businessNature: company.businessNature,
          webAddress: company.webAddress,
        }));

        console.log(dataArray);

        isMounted && setCompanies(dataArray);
      } catch (err) {}
    };
    getCompanies();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const [columnDefs] = useState([
    { field: "id", headerName: "ID" },
    {
      field: "companyId",
      headerName: "Company ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "companyName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "associationNo",
      headerName: "Association No",
      flex: 1,
    },
    {
      field: "webAddress",
      headerName: "Web Address",
      flex: 1,
    },
    {
      field: "businessNature",
      headerName: "Nature of Business",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      // editable: true,
      filter: true,
      sortable: true,
      floatingFilter: true,


    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Companies" subTitle="" />

      <Box sx={{ height: 500, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={companies}
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

export default Companies;
