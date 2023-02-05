import { Box, Checkbox, Tab, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from "react-router-dom";
import DeleteModal from "../../../components/DeleteModal";

const API_URL = "hr/v1/PersonaInfo/";

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
  const [gender, setGender] = React.useState('M')

  const { id } = useParams();
  const [reqObjId, setReqObjId] = useState(id);

  const [openDel, setOpenDel] = useState(false);

  const handleChangecheck = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSelect = (event) => {
    setGender(event.target.value);
  }
  

  const handleNew = (e) => {
    setValues(initialValues);
    setNewClicked(true);
  };
  const handleEdit = (e) => {
    personIdRef.current.focus();
  };


  useEffect(() => {
    const fetchLatestObjId = async () => {
      const controller = new AbortController();
      try {
        const latestId = await axiosPrivate.get(API_URL + "latest_id", {
          headers: {
            signal: controller.signal,
          },
        });
        setReqObjId(latestId.data);
      } catch (err) {}
    };
    reqObjId === "null" && fetchLatestObjId();
  }, [reqObjId, axiosPrivate]);

  const getObj = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(API_URL + "get/" + reqObjId, {
        headers: {
          signal: controller.signal,
        },
      });
      console.log(response.data);
      response.data && setValues(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reqObjId && reqObjId !== "null" && getObj();
  }, [reqObjId, axiosPrivate]);


  const handleSave = async (e) => {
      setValues(initialValues);
    e.preventDefault();
    const controller = new AbortController();
    try {
      values.dateOfBirth = value;
      values.married = checked;
      values.gender = gender;
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
      // console.log(response.data);
      console.log(response.data);
      // response.data && setCurrentObject(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpenDel(false);
  };
  
  const handleDelete = (e) => {
    setOpenDel(true);
  };

  const deleteObj = async () => {
    try {
      await axiosPrivate.delete(API_URL + "delete/" + values.personId);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setValues(initialValues);
    } catch (err) {}
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
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
              id="personId"
              label="Person Id"
              onChange={(e) => onFormInputChange("personId", e.target.value)}
              value={values.personId}
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
              id="nicNo"
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
              id="name"
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
              id="fullName"
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
              id="initials"
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
              id="firstName"
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
              label="Middle Name"
              id="middleName"
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
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Last Name"
              id="lastName"
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
                  id="dateOfBirth"
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  value={value.dateOfBirth}
                />
              </Stack>
            </LocalizationProvider>
            
            <TextField
              disabled
              id="married"
              defaultValue="Married"
              variant="standard"
              
            />
            <Checkbox
              checked={checked}
              onChange={handleChangecheck}
              inputProps={{ "aria-label": "controlled" }}
              value={values.married}
            />
            <FormControl sx={{ minWidth: 120, gridColumn: "span 1", }} size="small">
              <InputLabel id="demo-select-small">Gender</InputLabel>
              <Select
                labelId="demo-select-small"
                id="gender"
                value={gender}
                label="Gender"
                onChange={handleSelect}
              >

                <MenuItem value={'M'}>Male</MenuItem>
                <MenuItem value={'F'}>Female</MenuItem>
                <MenuItem value={'N'}>Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Picture URL"
              id="pictureURL"
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
      <DeleteModal
          open={openDel}
          handleClose={handleClose}
          Delete={deleteObj}
        />
      <ToastContainer />
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
  married: false,
  pictureURL: "",
};

export default Person;
