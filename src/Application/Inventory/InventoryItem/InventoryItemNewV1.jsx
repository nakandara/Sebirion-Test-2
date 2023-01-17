import {
  Box,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  OutlinedInput,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useRef, useState } from "react";

import * as yup from "yup";

import CrudActions from "../../../app/components/CrudActions";
import Header from "../../../app/components/Header";
import { tokens } from "../../../theme";

const InventoryItemNewV1 = () => {
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
      <Header title="Inventory Item" subTitle="" />
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
                label="Item Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemCode}
                InputProps={{ sx: { height: 40 } }}
                name="itemCode"
                error={!!touched.itemCode && !!errors.itemCode}
                helperText={touched.itemCode && errors.itemCode}
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
                label="Item Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemType}
                name="itemType"
                error={!!touched.itemType && !!errors.itemType}
                helperText={touched.itemType && errors.itemType}
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
                label="Item Discount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.itemDiscount}
                name="itemDiscount"
                error={!!touched.itemDiscount && !!errors.itemDiscount}
                helperText={touched.itemDiscount && errors.itemDiscount}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
              />

              <FormControl
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
              >
                <FormHelperText id="outlined-weight-helper-text">
                  Weight
                </FormHelperText>
                <OutlinedInput
                  variant="outlined"
                  type="text"
                  label="Weight"
                  value={values.weight}
                  onChange={handleChange("weight")}
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Reorder Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reorderLevel}
                name="reorderLevel"
                error={!!touched.reorderLevel && !!errors.reorderLevel}
                helperText={touched.reorderLevel && errors.reorderLevel}
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
                label="Curr AvgPrice"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currAvgPrice}
                name="currAvgPrice"
                error={!!touched.currAvgPrice && !!errors.currAvgPrice}
                helperText={touched.currAvgPrice && errors.currAvgPrice}
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
                label="Curr AvgCost"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currAvgCost}
                name="currAvgCost"
                error={!!touched.currAvgCost && !!errors.currAvgCost}
                helperText={touched.currAvgCost && errors.currAvgCost}
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
                label="Available Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.availableQuantity}
                name="availableQuantity"
                error={
                  !!touched.availableQuantity && !!errors.availableQuantity
                }
                helperText={
                  touched.availableQuantity && errors.availableQuantity
                }
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
                label="Date CreatedAt"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.datecreatedAt}
                name="datecreatedAt"
                error={!!touched.datecreatedAt && !!errors.datecreatedAt}
                helperText={touched.datecreatedAt && errors.datecreatedAt}
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
                label="Datelast Edited At"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.datelastEditedAt}
                name="datelastEditedAt"
                error={!!touched.datelastEditedAt && !!errors.datelastEditedAt}
                helperText={touched.datelastEditedAt && errors.datelastEditedAt}
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
  itemCode: yup.string().required("Item Code  is required"),
  description: yup.string().required("Description  is required"),
  itemType: yup.string().required(""),
  createdBy: yup.string().required(""),
  itemDiscount: yup.string().required(""),
  weight: yup.string().required(""),
  reorderLevel: yup.string().required(""),
  currAvgPrice: yup.string().required(""),
  currAvgCost: yup.string().required(""),
  availableQuantity: yup.string().required(""),
  datecreatedAt: yup.string().required(""),
  datelastEditedAt: yup.string().required(""),
  status: yup.string().required(""),
});

const initialValues = {
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

export default InventoryItemNewV1;
