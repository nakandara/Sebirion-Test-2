import { AgGridReact } from "ag-grid-react";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useTheme, Box } from "@mui/material";
import Header from "../../../components/Header";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { tokens } from "../../../../theme";
import { Link } from "react-router-dom";

const PersonList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [personList, setPersonList] = useState([]);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      checkboxSelection: true,
    },
    {
      field: "personId",
      headerName: "Person Id",
      flex: 1,
      cellRenderer: (params) => {
        return <Link to={`/association/${params.value}`}>{params.value}</Link>;
      },
    },
    {
      field: "associationName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "contact1",
      headerName: "Contact 1",
      flex: 1,
    },
    {
      field: "contact2",
      headerName: "Contact 2",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);
  
  return (
    <Box m="5px" p="5px" backgroundColor={colors.primary[400]}>
      <Header title="Person List" subTitle=""></Header>
      <Box sx={{ height: 500, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={personList}
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
};

export default PersonList;
