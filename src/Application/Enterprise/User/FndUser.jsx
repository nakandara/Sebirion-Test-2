import React, { useState, useEffect,  useRef } from 'react'
import useAxiosPrivate from '../../fndbas/hooks/useAxiosPrivate';
import PageHeader from '../../fndbas/PageHeader/PageHeader';
import CrudActions from '../../fndbas/CrudActions/CrudActions';
import { Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./fndUser.css"

const API_URL = 'v1/FndUser/'

export default function FndUser() {
    const axiosPrivate = useAxiosPrivate();
    const userNameRef = useRef();
    const [objId, setObjId] = useState(null);

    const [itemCount, setItemCount] = useState();
    const [currentObject, setCurrentObject] = useState();

    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validProspectId, setValidateProspectId] = useState(false);

    const [description, setDescription] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [userRoles, setUserRoles] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState();

    const [isNewEnabled, setIsNewEnabled] = useState(false);
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

    const [keyDisabled, setKeyDisabled] = useState(false);
    const [requestObjId, setRequestObjId] = useState(null);

    const [isDisabled, setIsDisabled] = useState(true);

    const initialState = {
        id: null,
        userName: "",
        description: "",
        password: "",
        userRoles: [],
        isActive: false,
        profilePicUrl: ""
    };

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    useEffect(() => {
        const getCount = async () => {
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.get(API_URL + "count", {
                    headers: {
                        signal: controller.signal,
                    },
                });
                setItemCount(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getCount();
    }, [currentObject, axiosPrivate]);


    const handleSave = async (e) => {
        e.preventDefault();

        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post(
                API_URL + "save",
                JSON.stringify({
                    id: objId,
                    userName: userName.toUpperCase(),
                    description: description,
                    password: password,
                    userRoles: userRoles,
                    profilePicUrl: profilePicUrl
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        signal: controller.signal,
                    },
                }
            );
            console.log(response.data);
            response.data && setCurrentObject(response.data);
            setIsDeleteEnabled(true);

            toast.success("Successfully Saved.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            if (!err?.response) {
                toast.error("Server not response.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (err.response?.status === 409) {
                toast.error("Customer Prospect already exists.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("Error Saving.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const handleNew = async (e) => {
        e.preventDefault();
        setIsDisabled(false);
        setKeyDisabled(false);
        setCurrentObject(initialState);
        setIsEditEnabled(false);
        setIsDeleteEnabled(false);

        userNameRef.current.focus();
    };

    const [open, setOpen] = useState(false);
    const [modifyHistOpen, setModifyHistOpen] = useState(false);

    const handleDelete = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Delete = async () => {
        try {
            await axiosPrivate.delete(API_URL + "delete/" + objId);
            setOpen(false);
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

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsDisabled(false);
        setKeyDisabled(true);
        setIsNewEnabled(false);
        setIsDeleteEnabled(false);
    };

    return (
        <div className='fnd-user'>
            <PageHeader title="User" itemCount={itemCount} isMaster={true} linkTo="/customer_prospects" />
            <CrudActions handleNew={handleNew} isNewEnabled={isNewEnabled}
                handleEdit={handleEdit} isEditEnabled={isEditEnabled}
                handleSave={handleSave} isSaveEnabled={isSaveEnabled}
                handleDelete={handleDelete} isDeleteEnabled={isDeleteEnabled} />

            <Paper className="pageContent">
                <form onSubmit={handleSave} className="user-form">
                    <fieldset disabled={isDisabled}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    disabled={keyDisabled}
                                    size="small"
                                    fullWidth
                                    id="userName"
                                    ref={userNameRef}
                                    autoComplete="off"
                                    name="userName"
                                    label="User Name"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    aria-invalid={validProspectId ? "false" : "true"}
                                    margin="normal"
                                    inputProps={{ style: { textTransform: "uppercase" } }}
                                />
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
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    aria-invalid={validProspectId ? "false" : "true"}
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
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    aria-invalid={validProspectId ? "false" : "true"}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </fieldset>
                </form>
            </Paper>
        </div>
    )
}
