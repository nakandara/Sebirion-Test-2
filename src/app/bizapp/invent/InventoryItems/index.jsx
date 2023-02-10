import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import Header from "../../../components/Header";
import { tokens } from "../../../../theme";
import { useEffect } from "react";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { useState } from "react";

const API_URL = "enterp/v1/InventoryItem/";

function InventoryItems() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();

  const initialValue = {
    id: "",
    itemCode: "",
    description: "",
    itemType: "",
    createdBy: "",
    itemDiscount: "",
    weight: "",
    reorderLevel: "",
    currAvgPrice: "",
    currAvgCost: "",
    availableQuantity: "",
    datecreatedAt: "",
    datelastEditedAt: "",
    status: "",
  };
  const [companies, setCompanies] = useState([initialValue]);

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
        let inventories = response.data;
        const dataArray = inventories.map((inventory, idx) => ({
          id: idx + 1,
          itemCode: inventories.itemCode,
          description: inventory.description,
          itemType: inventory.itemType,
          createdBy: inventory.createdBy,
          itemDiscount: inventory.itemDiscount,
          weight: inventory.weight,
          reorderLevel: inventory.reorderLevel,
          currAvgPrice: inventory.currAvgPrice,
          currAvgCost: inventory.currAvgCost,
          availableQuantity: inventory.availableQuantity,
          datecreatedAt: inventory.datecreatedAt,
          datelastEditedAt: inventory.datelastEditedAt,
          status: inventory.status,
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

  const columns = [
    {
      field: "itemCode",
      headerName: "Item Code",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "itemType",
      headerName: "Item Type",
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Create dBy",
      flex: 1,
    },
    {
      field: "itemDiscount",
      headerName: "Item Discount",
      flex: 1,
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
    },
    {
      field: "reorderLevel",
      headerName: "ReorderLevel",
      flex: 1,
    },
    {
      field: "currAvgPrice",
      headerName: "Curr Avg Price",
      flex: 1,
    },
    {
      field: "currAvgCost",
      headerName: "Curr Avg Cost",
      flex: 1,
    },
    {
      field: "availableQuantity",
      headerName: "Available Quantity",
      flex: 1,
    },
    {
      field: "datecreatedAt",
      headerName: "Date CreatedAt",
      flex: 1,
    },
    {
      field: "datelastEditedAt",
      headerName: "Date last Edited At",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];

  return (
    <Box m="5px" backgroundColor={colors.primary[400]}>
      <Header title="Inventory Items" subTitle="" />

      <Box
        m="10px 0 0 0"
        height="75vh"
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
      </Box>
    </Box>
  );
}

export default InventoryItems;
