import { Box, TextField, useMediaQuery, useTheme, Tab } from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { tokens } from "../../../theme";
import CrudActions from "../../components/CrudActions";
import InventoryAddress from "../invent/InventoryItem/InventoryContactInfo";
import InventoryContactInfo from "../invent/InventoryItem/InventoryContactInfo";
import SalesRepOrderAddress from "./SalesRepOrderAddress";

const SalesROrder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const companyIdRef = useRef();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);
  const [tabValue, setTabValue] = useState("1");

  const handleNew = (e) => {
    companyIdRef.current.focus();
  };
  const handleEdit = (e) => {
    companyIdRef.current.focus();
  };
  const handleSave = (values) => {
    console.log(values);
  };
  const handleDelete = (e) => {
    companyIdRef.current.focus();
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Sales Rep Order" subTitle="" />
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
      <Formik
        onSubmit={handleSave}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                ref={companyIdRef}
                type="text"
                label="Oder ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oderId}
                InputProps={{ sx: { height: 40 } }}
                name="oderId"
                error={!!touched.oderId && !!errors.oderId}
                helperText={touched.oderId && errors.oderId}
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
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sdo}
                name="sdo"
                error={!!touched.sdo && !!errors.sdo}
                helperText={touched.sdo && errors.sdo}
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
                label="Created At"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.createdAt}
                name="createdAt"
                error={!!touched.createdAt && !!errors.createdAt}
                helperText={touched.createdAt && errors.createdAt}
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
                label="Created By"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.createdBy}
                name="createdBy"
                error={!!touched.createdBy && !!errors.createdBy}
                helperText={touched.createdBy && errors.createdBy}
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
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
              />
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
      <Box sx={{ width: "100%", typography: "body1", pt: "10px" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            ></TabList>
          </Box>
          <TabPanel value="1">
            <SalesRepOrderAddress />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  oderId: yup.string().required("Issue Oder Id  is required"),
  description: yup.string().required("Description  is required"),
  sdo: yup.string().required(""),
  createdAt: yup.string().required(""),
  createdBy: yup.string().required(""),
  status: yup.string().required(""),
});

const initialValues = {
  oderId: "",
  description: "",
  sdo: "",
  createdAt: "",
  createdBy: "",
  status: "",
};

export default SalesROrder;
