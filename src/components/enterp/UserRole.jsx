import React, { useState, useRef, useEffect } from 'react';
import './userRole.css';

import { Grid, TextField, Button, Paper } from '@mui/material';
import useAxiosPrivate from '../../Application/fndbas/hooks/useAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeader from '../../Application/fndbas/PageHeader/PageHeader';

const API_URL = 'v1/UserRole/';

export default function UserRole() {
    const userRoleRef = useRef(); // allow to set the focus on user role field when the component loadsfor accessability

    const [userRole, setUserRole] = useState(''); // tight to the user input
    const [validUserRole, setValidUserRole] = useState(false); // check wether the user role validate or not

    const [description, setDescription] = useState('');
    const [validDescription, setValidDescription] = useState(false);

    // set the forcus to user role field when the component loads
    useEffect(() => {
        userRoleRef.current.focus();
    }, []);

    // validations for user role field
    useEffect(() => {
        const result = userRole.length > 0;
        setValidUserRole(result);
    }, [userRole]);

    // Validate description field
    useEffect(() => {
        const result = description.length > 0;
        setValidDescription(result);
    }, [description]);

    // Clear the error message when the user reads and do the changes to the inputs acording to the error message
    useEffect(() => {
    }, [userRole, description])

    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post(API_URL + "save", JSON.stringify({ roleId: userRole, description: description }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        signal: controller.signal
                    }
                }
            );
            console.log(response.data);
            setUserRole(response.data.roleId);
            setDescription(response.data.description);
            toast.success('Successfully Saved.', {
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
                toast.error('Server not response.', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (err.response?.status === 409) {
                toast.error('User Role exists.', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Error Saving.', {
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

    return (
        <div className='user-role'>
            <PageHeader title="User Role"/>
            <Paper className="pageContent">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} margin>
                        <Grid item xs={4}>
                            <TextField
                                variant='outlined'
                                size='small'
                                fullWidth
                                id="userRole"
                                ref={userRoleRef}
                                autoComplete="off"
                                name="userRole"
                                label="User Role"
                                type="text"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                                required
                                aria-invalid={validUserRole ? "false" : "true"}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant='outlined'
                                size='small'
                                fullWidth
                                id="description"
                                autoComplete='off'
                                name="description"
                                label="Description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                aria-invalid={validDescription ? "false" : "true"}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button disabled={!validUserRole || !validDescription ? true : false}
                                variant="contained"
                                color="primary"
                                type='submit'
                                margin="normal">
                                Save
                            </Button>
                        </Grid>
                        <ToastContainer position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover />
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}
