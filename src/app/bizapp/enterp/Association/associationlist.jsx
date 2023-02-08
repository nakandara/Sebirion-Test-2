import { useTheme, Box } from "@mui/material";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { tokens } from "../../../../theme";
import Header from "../../../components/Header";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const API_URL = "enterp/v1/Association/";

function AssociationList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const gridRef = useRef();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getItems = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });
        console.log(response.data);
        let assItems = response.data;
        const dataArray = assItems.map((item, idx) => ({
          id: idx + 1,
          associationId: item.associationId,
          associationName: item.associationName,
          address:
            item.address1 &&
            item.address1.concat(
              " , ",
              item.address2,
              " , ",
              item.city,
              " , ",
              item.province
            ),
          contact1: item.contact1,
          contact2: item.contact2,
          email: item.email,
        }));

        isMounted && setAssociations(dataArray);
      } catch (err) {}
    };
    getItems();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const [columnDefs] = useState([
    { field: "id", headerName: "ID", width: 40,checkboxSelection: true, },
    {
      field: "associationId",
      headerName: "Association",
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
    <Box m="5px" p="5px" backgroundColor={colors.primary[400]}>
      <Header title="Associations" subTitle="" />

      <Box sx={{ height: 500, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={associations}
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

export default AssociationList;
