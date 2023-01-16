import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import Header from "../../../components/Header";
import * as yup from "yup";

import { tokens } from "../../../../theme";
import CrudActions from "../../../components/CrudActions";
import { axiosPrivate } from "../../../../Application/fndbas/api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";

const API_URL = "v1/Company/";

function Company() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const companyIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const[newClicked, setNewClicked]=useState(false);

  const [values, setValues] = useState(initialValues);
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const showAllToasts = (type, msg) => {
    type === "SUCCESS" && toast.success(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    type === "ERROR" && toast.error(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    type === "WARNING" && toast.warning(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    type === "INFO" && toast.info(msg, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  }

  const handleNew = (e) => {
    setValues(initialValues);
    setNewClicked(true);
  };
  const handleEdit = (e) => {
    companyIdRef.current.focus();
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);
      // response.data && setCurrentObject(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.")
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message)
      console.log(err);
    }
  };
  const handleDelete = (e) => {
    companyIdRef.current.focus();
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
  };

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Company" subTitle="" />
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

      <form onSubmit={handleSave}>
        <fieldset disabled={!newClicked} style={{border:"0"}} >
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
              onChange={(e) => onFormInputChange('companyId', e.target.value)}
              value={values.companyId}
              InputProps={{ sx: { height: 40 } }}
              name="companyId"
              size="small"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                  background:"#ffbaba"
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Name"
              onChange={(e) => onFormInputChange('companyName', e.target.value)}
              value={values.companyName}
              name="companyName"
              sx={{
                gridColumn: "span 2",
                "& .MuiInputBase-root": {
                  height: 40,
                  background:"#ffbaba"
                },
              }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Association No"
              onChange={(e) => onFormInputChange('associationNo', e.target.value)}
              value={values.associationNo}
              name="associationNo"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Web Address"
              onChange={(e) => onFormInputChange('webAddress', e.target.value)}
              value={values.webAddress}
              name="webAddress"
              sx={{
                gridColumn: "span 2",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Nature of Business"
              onChange={(e) => onFormInputChange('businessNature', e.target.value)}
              value={values.businessNature}
              name="businessNature"
              sx={{
                gridColumn: "span 2",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
          </Box>
        </fieldset>
      </form>
      <ToastContainer />
    </Box>

  );
}

const checkoutSchema = yup.object().shape({
  companyId: yup.string().required("Company Id is required"),
  companyName: yup.string().required("Company Name is required"),
  associationNo: yup.string().required(""),
  webAddress: yup.string().required(""),
  businessNature: yup.string().required(""),
});

const initialValues = {
  companyId: "",
  companyName: "",
  associationNo: "",
  webAddress: "",
  businessNature: "",
};

export default Company;