import {
  Box,
  Chip,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../../../../theme";
import Header from "../../../components/Header";
import CrudActions from "../../../components/CrudActions";
import { useRef } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import OrderLine from "./OrderLine";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";

const API_URL = "/order/v1/saleRepOrder/";

function SalesRepOrder() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const orderIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const initialValues = {
    orderId: "",
    description: "",
    sdo: "",
    createdAt: "",
    createdBy: "",
    status: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);
  const [orderLines, setOrderLines] = useState([]);

  const [formValues, setFormValues] = useState(initialValues);

  const handleNew = (e) => {
    orderIdRef.current.focus();
    setFormValues(initialValues);    
  };
  const handleEdit = (e) => {
    orderIdRef.current.focus();
  };

  const handleSave = async (e) => {
    console.log(formValues);
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL +"create",
        JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );

      isMounted && setFormValues(response.data);
    } catch (err) {}
  };
  const handleDelete = (e) => {
    orderIdRef.current.focus();
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, formValues);
    updated[key] = value;
    setFormValues(updated);
  };

  return (
    <Box m="5px" backgroundColor={colors.primary[400]} p="10px">
      <Header title="Sales Rep Order" subTitle="" />
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
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
        </Grid>
        <Grid
          item
          xs={6}
          md={4}
          direction="row"
          alignItems="center"
          container
          justifyContent="flex-end"
        >
          <Chip label="Created" color="success" />
        </Grid>
      </Grid>
      <form onSubmit={handleSave}>
        <Box
          display="grid"
          gap="20px"
          mt="5px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            ref={orderIdRef}
            type="text"
            label="Order ID"
            focused
            onChange={(e) => onFormInputChange("orderId", e.target.value)}
            value={formValues.orderId}
            InputProps={{ sx: { height: 40 } }}
            name="orderId"
            sx={{
              gridColumn: "span 1",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            focused
            label="Description"
            onChange={(e) => onFormInputChange("description", e.target.value)}
            value={formValues.description}
            name="description"
            sx={{
              gridColumn: "span 2",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="SDO"
            focused
            onChange={(e) => onFormInputChange("sdo", e.target.value)}
            value={formValues.sdo}
            name="sdo"
            sx={{
              gridColumn: "span 1",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            type="date"
            label="Created At"
            focused
            onChange={(e) => onFormInputChange("createdAt", e.target.value)}
            value={formValues.createdAt}
            disabled
            name="createdAt"
            sx={{
              gridColumn: "span 1",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Created By"
            onChange={(e) => onFormInputChange("createdBy", e.target.value)}
            value={formValues.createdBy}
            name="createdBy"
            disabled
            sx={{
              gridColumn: "span 1",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />
        </Box>
      </form>
      <ToastContainer />
      <OrderLine orderLines={orderLines} />
    </Box>
  );
}

export default SalesRepOrder;
