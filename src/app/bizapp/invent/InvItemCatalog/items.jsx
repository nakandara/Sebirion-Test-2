import { Box, useTheme } from "@mui/material";
import React, { useRef, useMemo, useState, useCallback } from "react";
import { tokens } from "../../../../theme";
import { useEffect } from "react";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

const API_URL = "invent/v1/ItemCatalog/";

function CatalogItems() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const gridRef = useRef();

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [catItems, setCatItems] = useState([]);

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
        let catalogitems = response.data;
        const dataArray = catalogitems.map((catitem, idx) => ({
          id: idx + 1,
          itemCode: catitem.itemCode,
          description: catitem.description,
          infoText: catitem.infoText,
          unitCode: catitem.unitCode ? catitem.unitCode.description : null,
          configurable: catitem.configurable,
          weightNet: catitem.weightNet ? catitem.weightNet : null,
          uomWeightNet: catitem.uomForWeightNet
            ? catitem.uomForWeightNet.description
            : null,
          volumeNet: catitem.volumeNet,
          uomVolumeNet: catitem.uomForVolumeNet
            ? catitem.uomForVolumeNet.description
            : null,
        }));

        isMounted && setCatItems(dataArray);
      } catch (err) {}
    };
    getItems();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const [columnDefs] = useState([
    { field: "id", headerName: "ID", width: 40, checkboxSelection: true },
    {
      field: "itemCode",
      headerName: "Item Code",
      flex: 1,
      cellRenderer: (params) => {
        return <Link to={`/itemcatalog/${params.value}`}>{params.value}</Link>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "infoText",
      headerName: "Info Text",
      flex: 1,
    },
    {
      field: "unitCode",
      headerName: "Unit",
      flex: 1,
    },
    {
      field: "configurable",
      headerName: "Configurable",
      flex: 1,
    },
    {
      field: "weightNet",
      headerName: "Net Weight",
      flex: 1,
    },
    {
      field: "uomWeightNet",
      headerName: "Net Weight Unit",
      flex: 1,
    },
    {
      field: "volumeNet",
      headerName: "Net Volume",
      flex: 1,
    },
    {
      field: "uomVolumeNet",
      headerName: "Net Volume Unit",
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
      <Header title="Items" subTitle="" />

      <Box sx={{ height: 500, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={catItems}
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

export default CatalogItems;
