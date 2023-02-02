import { Box, Checkbox, Tab, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import Header from "../../../components/Header";
import * as yup from "yup";
import { tokens } from "../../../../theme";
import CrudActions from "../../../components/CrudActions";
import { axiosPrivate } from "../../../../Application/fndbas/api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const API_URL = "enterp/v1/Person/";

function Person() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const personIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const [newClicked, setNewClicked] = useState(false);
  const [addNewRow, setAddNewRow] = useState(false);
  const [values, setValues] = useState(initialValues);

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const [checked, setChecked] = React.useState(false);

  const handleChangecheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const showAllToasts = (type, msg) => {
    type === "SUCCESS" &&
      toast.success(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "ERROR" &&
      toast.error(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "WARNING" &&
      toast.warning(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "INFO" &&
      toast.info(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };

  const handleNew = (e) => {
    setValues(initialValues);
    setNewClicked(true);
  };
  const handleEdit = (e) => {
    personIdRef.current.focus();
  };
  const handleSave = async (e) => {
    setValues(initialValues);
    e.preventDefault();
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      setAddNewRow(true);
      console.log(response.data);
      // response.data && setCurrentObject(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };
  const handleDelete = (e) => {
    personIdRef.current.focus();
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
  };

  return (
    <Box m="20px" backgroundColor={colors.primary[400]}>
      <Header title="Person" subTitle="" />
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
        <fieldset disabled={!newClicked} style={{ border: "0" }}>
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
              ref={personIdRef}
              type="text"
              label="Person Id"
              onChange={(e) => onFormInputChange("personId", e.target.value)}
              value={values.small}
              InputProps={{ sx: { height: 40 } }}
              name="personId"
              size="small"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                  background: "#ffbaba",
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Nic No"
              onChange={(e) => onFormInputChange("nicNo", e.target.value)}
              value={values.nicNo}
              name="nicNo"
              sx={{
                gridColumn: "span 2",
                "& .MuiInputBase-root": {
                  height: 40,
                  background: "#ffbaba",
                },
              }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Name"
              onChange={(e) => onFormInputChange("name", e.target.value)}
              value={values.name}
              name="name"
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
              label="FullName"
              onChange={(e) => onFormInputChange("fullName", e.target.value)}
              value={values.fullName}
              name="fullName"
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
              label="Initials"
              onChange={(e) => onFormInputChange("initials", e.target.value)}
              value={values.initials}
              name="initials"
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
              label="First Name"
              onChange={(e) => onFormInputChange("firstName", e.target.value)}
              value={values.firstName}
              name="firstName"
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
              label="Last Name"
              onChange={(e) => onFormInputChange("lastName", e.target.value)}
              value={values.lastName}
              name="lastName"
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
              label="Middle Name"
              onChange={(e) => onFormInputChange("middleName", e.target.value)}
              value={values.middleName}
              name="middleName"
              sx={{
                gridColumn: "span 2",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack
                spacing={3}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    height: 40,
                  },
                }}
              >
                <DesktopDatePicker
                  label="Date Of Birth"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Gender"
              onChange={(e) => onFormInputChange("gender", e.target.value)}
              value={values.gender}
              name="gender"
              sx={{
                gridColumn: "span 2",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              disabled
              id="standard-disabled"
              defaultValue="Married"
              variant="standard"
            />
            <Checkbox
              checked={checked}
              onChange={handleChangecheck}
              inputProps={{ "aria-label": "controlled" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Picture URL"
              onChange={(e) => onFormInputChange("pictureURL", e.target.value)}
              value={values.pictureURL}
              name="pictureURL"
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
    </Box>
  );
}
const initialValues = {
  personId: "",
  nicNo: "",
  name: "",
  fullName: "",
  initials: "",
  firstName: "",
  lastName: "",
  middleName: "",
  dateOfBirth: "",
  gender: "",
  married: true,
  pictureURL: "",
};

export default Person;
