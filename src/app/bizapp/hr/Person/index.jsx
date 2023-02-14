import { Box, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import Header from "../../../components/Header";
import { tokens } from "../../../../theme";
import CrudActions from "../../../components/CrudActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

  const [formValues, setFormValues] = useState(initialValues);

  const { id } = useParams();
  const [reqObjId, setReqObjId] = useState(id);

  const [openDel, setOpenDel] = useState(false);

  const handleNew = (e) => {
    setFormValues(initialValues);
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
      response.data && setFormValues(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reqObjId && reqObjId !== "null" && getObj();
  }, [reqObjId, axiosPrivate]);

  const handleSave = async (e) => {
    setFormValues(initialValues);
    e.preventDefault();
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);
      response.data && setFormValues(response.data);
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
      await axiosPrivate.delete(API_URL + "delete/" + formValues.personId);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setFormValues(initialValues);
    } catch (err) {}
  };

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, formValues);
    updated[key] = value;
    setFormValues(updated);
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
    <Box m="5px" backgroundColor={colors.primary[400]} p="10px">
      <Header title="Person" subTitle="" />
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
        ></Grid>
      </Grid>
      <Paper elevation={2} style={{ padding: "5px" }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="personId"
                autoComplete="off"
                name="personId"
                label="Person ID"
                type="text"
                value={formValues.personId}
                onChange={(e) => onFormInputChange("personId", e.target.value)}
                required
                margin="normal"
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="nicNo"
                autoComplete="off"
                name="nicNo"
                label="NIC"
                type="text"
                value={formValues.nicNo}
                onChange={(e) => onFormInputChange("nicNo", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="name"
                autoComplete="off"
                name="name"
                label="Name"
                type="text"
                value={formValues.name}
                onChange={(e) => onFormInputChange("name", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel id="titlelbl">Title</InputLabel>
                <Select
                  size="small"
                  margin="normal"
                  labelId="titlelbl"
                  id="title"
                  value={formValues.title}
                  label="Title"
                  onChange={(e) => onFormInputChange("title", e.target.value)}
                >
                  <MenuItem value="MR">Mr</MenuItem>
                  <MenuItem value="MISS">Miss</MenuItem>
                  <MenuItem value="MRS">Mrs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="firstName"
                autoComplete="off"
                name="firstName"
                label="First Name"
                type="text"
                value={formValues.firstName}
                onChange={(e) => onFormInputChange("firstName", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="middleName"
                autoComplete="off"
                name="middleName"
                label="Middle Name"
                type="text"
                value={formValues.middleName}
                onChange={(e) =>
                  onFormInputChange("middleName", e.target.value)
                }
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="lastName"
                autoComplete="off"
                name="lastName"
                label="Last Name"
                type="text"
                value={formValues.lastName}
                onChange={(e) => onFormInputChange("lastName", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="fullName"
                autoComplete="off"
                name="fullName"
                label="Full Name"
                type="text"
                value={formValues.fullName}
                onChange={(e) => onFormInputChange("fullName", e.target.value)}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel id="titlelbl">Gender</InputLabel>
                <Select
                  size="small"
                  margin="normal"
                  labelId="titlelbl"
                  id="gender"
                  value={formValues.gender}
                  label="Gender"
                  onChange={(e) => onFormInputChange("gender", e.target.value)}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="NOT_MENTIONED">Not Mentioned</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formValues.dateOfBirth}
                  onChange={(e) => onFormInputChange("dateOfBirth", e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={4} direction="column">
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  id="address1"
                  autoComplete="off"
                  name="address1"
                  label="Address 1"
                  type="text"
                  value={formValues.address1}
                  onChange={(e) =>
                    onFormInputChange("address1", e.target.value)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  id="address2"
                  autoComplete="off"
                  name="address2"
                  label="Address 2"
                  type="text"
                  value={formValues.address2}
                  onChange={(e) =>
                    onFormInputChange("address2", e.target.value)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  id="city"
                  autoComplete="off"
                  name="city"
                  label="City"
                  type="text"
                  value={formValues.city}
                  onChange={(e) => onFormInputChange("city", e.target.value)}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item xs={4} direction="column">
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  id="contact1"
                  autoComplete="off"
                  name="contact1"
                  label="Contact 1"
                  type="text"
                  value={formValues.contact1}
                  onChange={(e) =>
                    onFormInputChange("contact1", e.target.value)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  id="contact2"
                  autoComplete="off"
                  name="contact2"
                  label="Contact 2"
                  type="text"
                  value={formValues.contact2}
                  onChange={(e) =>
                    onFormInputChange("contact2", e.target.value)
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  id="email"
                  autoComplete="off"
                  name="email"
                  label="Email"
                  type="text"
                  value={formValues.email}
                  onChange={(e) => onFormInputChange("email", e.target.value)}                  
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
        <DeleteModal
          open={openDel}
          handleClose={handleClose}
          Delete={deleteObj}
        />
        <ToastContainer />
      </Paper>
      <ToastContainer />
      {/* <OrderLine orderLines={orderLines} /> */}
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
  dateOfBirth: new Date(),
  gender: "",
  title: "",
  married: false,
  pictureURL: "",
};

export default Person;
