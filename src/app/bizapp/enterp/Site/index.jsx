import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, TextField } from "@mui/material";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import Header from "../../../components/Header";
import ListCrudActions from "../../../components/ListCrudActions";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../../components/DeleteModal";

const API_URL = "enterp/v1/Site/";

function Site() {
  const axiosPrivate = useAxiosPrivate();

  const [newClicked, setNewClicked] = useState(false);
  const [values, setValues] = useState(initialState);

  const { id } = useParams();
  const [reqObjId, setReqObjId] = useState(id);

  const [openDel, setOpenDel] = useState(false);

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
      await axiosPrivate.delete(API_URL + "delete/" + values.site);
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
      <Header title="Site" subTitle="" />
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
                id="site"
                autoComplete="off"
                name="site"
                label="Site"
                type="text"
                value={values.site}
                onChange={(e) => onFormInputChange("site", e.target.value)}
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
                id="description"
                autoComplete="off"
                name="description"
                label="Description"
                type="text"
                value={values.description}
                onChange={(e) =>
                  onFormInputChange("description", e.target.value)
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
}

const initialState = {
  site: "",
  description: "",
  address1: "",
  address2: "",
  city: "",
  district: "",
  province: "",
  country: "",
  contact1: "",
  contact2: "",
  email: "",
};

export default Site;
