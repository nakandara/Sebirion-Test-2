import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useRef, useState } from "react";
import Header from "../../app/components/Header";
import * as yup from "yup";

import { tokens } from "../../theme";
import CrudActions from "../../app/components/CrudActions";

const IssueNote = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const companyIdRef = useRef();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

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

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Issue Note" subTitle="" />
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
                label="Issue Note ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.IssueNoteID}
                InputProps={{ sx: { height: 40 } }}
                name="IssueNoteID"
                error={!!touched.IssueNoteID && !!errors.IssueNoteID}
                helperText={touched.IssueNoteID && errors.IssueNoteID}
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
                label="Order Ref"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.orderRef}
                name="orderRef"
                error={!!touched.orderRef && !!errors.orderRef}
                helperText={touched.orderRef && errors.orderRef}
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
                label="Sales Rep"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salesRep}
                name="salesRep"
                error={!!touched.salesRep && !!errors.salesRep}
                helperText={touched.salesRep && errors.salesRep}
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
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  IssueNoteID: yup.string().required("Issue Note ID  is required"),
  description: yup.string().required("description  is required"),
  orderRef: yup.string().required(""),
  sdo: yup.string().required(""),
  salesRep: yup.string().required(""),
  createdAt: yup.string().required(""),
  createdBy: yup.string().required(""),
  status: yup.string().required(""),
});

const initialValues = {
  IssueNoteID: "",
  description: "",
  orderRef: "",
  sdo: "",
  salesRep: "",
  createdAt: "",
  createdBy: "",
  status: "",
};


export default IssueNote;


