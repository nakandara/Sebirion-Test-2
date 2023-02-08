import { useTheme } from "@mui/material";
import React, { useRef } from "react";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { tokens } from "../../../../theme";

function PriceHistory({priceHistItems}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const gridRef = useRef();

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

//   const [priceHistItems, setPriceHistItems] = useState([]);

  const [columnDefs] = useState([
    { field: "id", headerName: "ID" },
    {
      field: "dateCreated",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
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
    <Box m="5px" p="5px" backgroundColor={colors.primary[400]}>
      <Header title="Price List" subTitle="" />

      <Box sx={{ height: 500, margin: "5px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={priceHistItems}
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

export default PriceHistory;
