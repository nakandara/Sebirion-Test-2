import { Box, useTheme } from "@mui/material";
import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import Header from "../../../components/Header";
import { tokens } from "../../../../theme";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { Link } from "react-router-dom";

const API_URL = "enterp/v1/SupplierInfo/";

function Suppliers() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const gridRef = useRef();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

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
        let suppliers = response.data;
        const dataArray = suppliers.map((item, idx) => ({
          id: idx + 1,
          supplierId: item.supplierId,
          supplierName: item.supplierName,          
          createdBy: item.createdBy && item.createdBy.userName,
          createdAt: item.createdAt,
          paymentTerm: item.paymentTerm.termId + "-" + item.paymentTerm.description,
          creditLimit: item.creditLimit,
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
    { field: "id", headerName: "ID", width: 40, checkboxSelection: true },
    {
      field: "supplierId",
      headerName: "Supplier ID",
      flex: 1,
      cellRenderer: (params) => {
        return <Link to={`/supplier/${params.value}`}>{params.value}</Link>;
      },
    },
    {
      field: "supplierName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "paymentTerm",
      headerName: "Payment Term",
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

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  return (
    <Box m="5px" backgroundColor={colors.primary[400]}>
      <Header title="Suppliers" subTitle="" />

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

export default Suppliers;
