import { Box, TextField, useMediaQuery, useTheme } from '@mui/material'
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import Header from '../../components/Header';
import * as yup from "yup";

import { tokens } from '../../../theme';
import CrudActions from '../../components/CrudActions';

function Company() {
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
        <Box m="20px"
            backgroundColor={colors.primary[400]}>
            <Header title="Company" subTitle="" />
            <CrudActions handleNew={handleNew} isNewEnabled={isNewEnabled}
                handleEdit={handleEdit} isEditEnabled={isEditEnabled}
                handleSave={handleSave} isSaveEnabled={isSaveEnabled}
                handleDelete={handleDelete} isDeleteEnabled={isDeleteEnabled} />
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
                                label="Company ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.companyId}
                                InputProps={{ sx: { height: 40 } }}
                                name="companyId"
                                error={!!touched.companyId && !!errors.companyId}
                                helperText={touched.companyId && errors.companyId}
                                sx={{
                                    gridColumn: "span 1", "& .MuiInputBase-root": {
                                        height: 40
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.companyName}
                                name="companyName"
                                error={!!touched.companyName && !!errors.companyName}
                                helperText={touched.companyName && errors.companyName}
                                sx={{
                                    gridColumn: "span 2", "& .MuiInputBase-root": {
                                        height: 40
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Association No"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.associationNo}
                                name="associationNo"
                                error={!!touched.associationNo && !!errors.associationNo}
                                helperText={touched.associationNo && errors.associationNo}
                                sx={{
                                    gridColumn: "span 1", "& .MuiInputBase-root": {
                                        height: 40
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Web Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.webAddress}
                                name="webAddress"
                                error={!!touched.webAddress && !!errors.webAddress}
                                helperText={touched.webAddress && errors.webAddress}
                                sx={{
                                    gridColumn: "span 2", "& .MuiInputBase-root": {
                                        height: 40
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                label="Nature of Business"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.businessNature}
                                name="businessNature"
                                error={!!touched.businessNature && !!errors.businessNature}
                                helperText={touched.businessNature && errors.businessNature}
                                sx={{
                                    gridColumn: "span 2", "& .MuiInputBase-root": {
                                        height: 40
                                    }
                                }}
                            />

                        </Box>
                    </form>
                )}


            </Formik>

        </Box>
    )
}

const checkoutSchema = yup.object().shape({
    companyId: yup.string().required("required"),
    companyName: yup.string().required("required"),
});

const initialValues = {
    companyId: "",
    companyName: "",
    associationNo: "",
    webAddress: "",
    businessNature: ""
};

export default Company