import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Grid, Paper, ListItem, List, ListItemText, TextField } from "@mui/material";
import PageHeader from '../../../../Application/fndbas/PageHeader/PageHeader';
import CrudActions from '../../../../Application/fndbas/CrudActions/CrudActions';
import useAxiosPrivate from '../../../../Application/fndbas/hooks/useAxiosPrivate';
import { ToastContainer, toast } from "react-toastify";
import Autocomplete from "@mui/material/Autocomplete";
import "./project.css";

const API_URL = "v1/project/";
const PROSPECT_URL = "v1/CustomerProspect/";

export default function Project() {
  const axiosPrivate = useAxiosPrivate();

  const projectIdRef = useRef();
  const [objId, setObjId] = useState(null);

  const [prospectId, setProspectId] = useState('');
  const [inputProspectId, setInputProspectId] = useState('');
  const [validProspectId, setValidProspectId] = useState(false);
  const [prospects, setProspects] = useState([]);

  const [projectId, setProjectId] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [planStartDate, setPlanStartDate] = useState(new Date());
  const [planEndDate, setPlanEndDate] = useState(new Date());

  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

  const [isDeleteDlgOpen, setIsDeleteDlgOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [keyDisabled, setKeyDisabled] = useState(false);

  const [requestObjId, setRequestObjId] = useState(null);

  const handleNew = async (e) => {
    e.preventDefault();

    const controller = new AbortController();
    try {
      const prospects = await axiosPrivate.get(PROSPECT_URL + "get_all", {
        headers: {
          signal: controller.signal,
        },
      });
      console.log(prospects.data)
      prospects.data && setProspects(prospects.data);
    } catch (err) {

    }
    setIsEditEnabled(false);
    setIsDeleteEnabled(false);

  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsDisabled(false);
    setKeyDisabled(true);
    setIsNewEnabled(false);
    setIsDeleteEnabled(false);
  };

  const handleDelete = (e) => {
    setIsDeleteDlgOpen(true);
  };

  const handleClose = () => {
    setIsDeleteDlgOpen(false);
  };

  const Delete = async () => {
    try {
      await axiosPrivate.delete(API_URL + "delete/" + objId);
      setIsDeleteDlgOpen(false);
      toast.error("Successfully Deleted.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setRequestObjId(null);
    } catch (err) { }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await axiosPrivate.post()
  }

  //   const controller = new AbortController();
  //   try {
  //     const response = await axiosPrivate.post(
  //       API_URL + "save",
  //       JSON.stringify({
  //         id: objId,
  //         // prospectId: prospectId.toUpperCase(),
  //         // description: description,
  //         // prospectDate: createDate,
  //         // address1: address1,
  //         // address2: address2,
  //         // city: city,
  //         // country: country,
  //         // contactType: contactType,
  //         // contactValue: contactValue,
  //         // person: person,
  //         // designation: designation,
  //         // company: company,
  //         // objVersion: objVersion,
  //       }),
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           signal: controller.signal,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     response.data && setCurrentObject(response.data);
  //     setIsDeleteEnabled(true);
  //     setIsDeleteEnabled(true);
  //     setRefreshHistory(true);

  //     toast.success("Successfully Saved.", {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } catch (err) {
  //     if (!err?.response) {
  //       toast.error("Server not response.", {
  //         position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     } else if (err.response?.status === 409) {
  //       toast.error("Customer Prospect already exists.", {
  //         position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     } else {
  //       toast.error("Error Saving.", {
  //         position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //   }
  // };


  return (
    <div className='project'>
      <PageHeader title="Project" />
      <CrudActions handleNew={handleNew} isNewEnabled={isNewEnabled}
        handleEdit={handleEdit} isEditEnabled={isEditEnabled}
        handleSave={handleSave} isSaveEnabled={isSaveEnabled}
        handleDelete={handleDelete} isDeleteEnabled={isDeleteEnabled} />

      <Paper className="pageContent">
        <form onSubmit={handleSave} className="project-form">
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Autocomplete
                variant="outlined"
                disablePortal
                isOptionEqualToValue={(option, value) =>
                  option.prospectId === value.prospectId
                }
                id="prospectId"
                value={prospectId}
                inputValue={inputProspectId}
                onInputChange={(event, newInputValue) => {
                  setInputProspectId(newInputValue);
                }}
                options={prospects}
                onChange={(event, newValue) => {
                  setProspectId(newValue);
                }}
                getOptionLabel={(option) => option.prospectId? `${option.prospectId} - ${option.description}` || " ":" "}
                renderOption={(props, option) => (
                  <List {...props}>
                    <ListItem>
                      <ListItemText primary={"Prospect Id - " + option.prospectId}
                        secondary={"Description - " + option.description} />
                    </ListItem>
                  </List>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ref Prospect"
                    fullWidth
                    margin="normal"
                    size="small"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                disabled={keyDisabled}
                size="small"
                fullWidth
                id="projectId"
                ref={projectIdRef}
                autoComplete="off"
                name="projectId"
                label="Project Id"
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required
                aria-invalid={validProspectId ? "false" : "true"}
                margin="normal"
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}
