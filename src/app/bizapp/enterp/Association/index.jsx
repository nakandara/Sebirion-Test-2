import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Header from "../../../components/Header";
import ListCrudActions from "../../../components/ListCrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import DeleteModal from "../../../components/DeleteModal";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "enterp/v1/Association/";

const Association = () => {
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const axiosPrivate = useAxiosPrivate();

  const [newClicked, setNewClicked] = useState(false);
  const [values, setValues] = useState(initialState);

  const { id } = useParams();
  const [reqObjId, setReqObjId] = useState(id);

  const [openDel, setOpenDel] = useState(false);

  const addItems = useCallback((addIndex) => {
    const newItems = [{}];
    gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

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



  const handleNew = (e) => {
    setValues(initialState);
    setNewClicked(true);
    addItems(undefined);
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
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };
  const handleEdit = (e) => {};

  const handleDelete = (e) => {
    setOpenDel(true);
  };

  const handleClose = () => {
    setOpenDel(false);
  };

  const deleteObj = async () => {
    try {
      await axiosPrivate.delete(API_URL + "delete/" + values.associationId);
      setOpenDel(false);
      showAllToasts("SUCCESS", "Successfully Deleted.");

      setValues(initialState);
    } catch (err) {}
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

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
  };

  return (
    <Box m="10px">
      <Header title="ASSOCIATION" subTitle="" />
      <ListCrudActions
        addItems={handleNew}
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Paper elevation={2} style={{ padding: "5px" }}>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="associationId"
                autoComplete="off"
                name="associationId"
                label="Association ID"
                type="text"
                value={values.associationId}
                onChange={(e) =>
                  onFormInputChange("associationId", e.target.value)
                }
                required
                margin="normal"
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                id="associationName"
                autoComplete="off"
                name="associationName"
                label="Association Name"
                type="text"
                value={values.associationName}
                onChange={(e) =>
                  onFormInputChange("associationName", e.target.value)
                }
                required
                margin="normal"
              />
            </Grid>
          </Grid>
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
                    value={values.address1}
                    onChange={(e) =>
                      onFormInputChange("address1", e.target.value)
                    }
                    required
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
                    value={values.address2}
                    onChange={(e) =>
                      onFormInputChange("address2", e.target.value)
                    }
                    required
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
                    value={values.city}
                    onChange={(e) => onFormInputChange("city", e.target.value)}
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="province"
                    autoComplete="off"
                    name="province"
                    label="Province"
                    type="text"
                    value={values.province}
                    onChange={(e) =>
                      onFormInputChange("province", e.target.value)
                    }
                    required
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
                  value={values.contact1}
                  onChange={(e) =>
                    onFormInputChange("contact1", e.target.value)
                  }
                  required
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
                  value={values.contact2}
                  onChange={(e) =>
                    onFormInputChange("contact2", e.target.value)
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
                  id="email"
                  autoComplete="off"
                  name="email"
                  label="Email"
                  type="text"
                  value={values.email}
                  onChange={(e) => onFormInputChange("email", e.target.value)}
                  required
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
    </Box>
  );
};

const initialState = {
  associationId: "",
  associationName: "",
  address1: "",
  address2: "",
  city: "",
  district: "",
  province: "",
  country: "",
  contact1: "",
  contact2: "",
  email: "",
  associations: [],
};

export default Association;
