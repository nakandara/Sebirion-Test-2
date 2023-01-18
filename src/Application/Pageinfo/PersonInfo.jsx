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

import CrudActions from "../../app/components/CrudActions";
import Header from "../../app/components/Header";
import { tokens } from "../../theme";

const PersonInfo = () => {
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
      <Header title="Person Info" subTitle="" />
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
                label="Person Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.personId}
                InputProps={{ sx: { height: 40 } }}
                name="personId"
                error={!!touched.personId && !!errors.personId}
                helperText={touched.personId && errors.personId}
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
                label="Nic No"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nicNo}
                name="nicNo"
                error={!!touched.nicNo && !!errors.nicNo}
                helperText={touched.nicNo && errors.nicNo}
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
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
                label="Initials"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.initials}
                name="initials"
                error={!!touched.initials && !!errors.initials}
                helperText={touched.initials && errors.initials}
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
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
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
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
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
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
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
                label="Party Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.partyType}
                name="partyType"
                error={!!touched.partyType && !!errors.partyType}
                helperText={touched.partyType && errors.partyType}
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
                label="UserI d"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userId}
                name="userId"
                error={!!touched.userId && !!errors.userId}
                helperText={touched.userId && errors.userId}
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
                label="Date Of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.datedateOfBirth}
                name="datedateOfBirth"
                error={!!touched.datedateOfBirth && !!errors.datedateOfBirth}
                helperText={touched.datedateOfBirth && errors.datedateOfBirth}
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
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
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
                label="Married"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.married}
                name="married"
                error={!!touched.married && !!errors.married}
                helperText={touched.married && errors.married}
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
                label="Picture URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pictureURL}
                name="pictureURL"
                error={!!touched.pictureURL && !!errors.pictureURL}
                helperText={touched.pictureURL && errors.pictureURL}
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
  personId: yup.string().required("Person Id  is required"),
  nicNo: yup.string().required("Nic No  is required"),
  name: yup.string().required(""),
  fullName: yup.string().required(""),
  title: yup.string().required(""),
  initials: yup.string().required(""),
  firstName: yup.string().required(""),
  middleName: yup.string().required(""),
  lastName: yup.string().required(""),
  partyType: yup.string().required(""),
  userId: yup.string().required(""),
  datedateOfBirth: yup.string().required(""),
  gender: yup.string().required(""),
  married: yup.string().required(""),
  pictureURL: yup.string().required(""),
});

const initialValues = {
  personId: "",
  nicNo: "",
  name: "",
  fullName: "",
  title: "",
  initials: "",
  firstName: "",
  middleName: "",
  lastName: "",
  partyType: "",
  userId: "",
  datedateOfBirth: "",
  gender: "",
  married: "",
  pictureURL: "",
};

export default PersonInfo;
