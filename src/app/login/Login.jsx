import {
    Button,
    Paper,
    TextField,
    Checkbox,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Application/fndbas/api/axios";
import useAuth from "../../Application/fndbas/hooks/useAuth";
//import logo from '../../assets/logo.png';

import { PASSWORD, TEXT } from "./consts";
import './login.css';
import { tokens } from '../../theme';
import { useEffect } from 'react';

const LOGIN_URL = 'v1/login';
const GET_ROLES_URL = 'v1/FndUser/'

const sheet = {
    mainTopic: {
        fontSize: 50
    }
}

function Login() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [type, setType] = useState(PASSWORD)

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.access_token;
            const refreshToken = response?.data?.refresh_token;

            const userRoles = await axios.get(GET_ROLES_URL + "get_role_ids/" + username,
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(userRoles?.data));
            const roles = userRoles?.data;

            setAuth({ username, password, roles, accessToken, refreshToken });
            setUsername('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized Access');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

  return (
    <div className="full-page d-flex">
      <div
        style={{ width: "70%", height: "100vh" }}
        className="d-center login-back flex-column"
      >
        <div className="mb-2">
          <img width={30} className="img-fluid w-100" alt="" />
        </div>
        <h1
          style={sheet.mainTopic}
          className="text-purple f-shippori text-shadow-sm"
        >
          WELCOME TO SIPSAYURI
        </h1>
        {/* <h2 className='mt-1 f-courgette text-purple'>GMB Window coverings</h2> */}
      </div>
      <div className="h-100" style={{ width: "30%" , height: "100vh"}}>
        <Paper elevation={5} className="login-paper h-100 d-center flex-column">
          <hr></hr>
          <div className="w-75 mb-4">
            <h1 className="text-left text-large mt-2 mb-2 text-purple m-0 p-0">
              Login
            </h1>
            <p>Use your credentials to login</p>
          </div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>


                    <form className='w-75' onSubmit={handleSubmit}>
                        <div className='w-100'>
                            <div className='mb-2'>
                                <label className='text-small mb-1'>Username</label>
                                <TextField
                                    type="text"
                                    align="center"
                                    ref={userRef}
                                    fullWidth
                                    placeholder="User Name"
                                    name="username"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoFocus
                                    autoComplete='off'
                                />
                            </div>
                            <div className='mb-2'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label className='text-small-extra'>Password</label>
                                </div>
                                <TextField
                                    type={type}
                                    placeholder="Password"
                                    fullWidth
                                    name="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className='d-flex align-items-center'>
                                    <p className='text-small'>show password</p>
                                    <Checkbox onChange={() => setType(type === PASSWORD ? TEXT : PASSWORD)} />
                                </div>
                            </div>
                            <div className='d-flex justify-content-right'>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="info"
                                    type="submit">
                                    <Typography color="white" fontSize="14px">Log In</Typography>
                                </Button>
                            </div>
                        </div>
                    </form>
                </Paper>
            </div>
        </div >
    )
}

export default Login