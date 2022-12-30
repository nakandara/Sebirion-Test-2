import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Paper, Grid, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './login.css';

const LOGIN_URL = 'v1/login';
const GET_ROLES_URL = 'v1/FndUser/'

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

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
    <div className="login">
      <Paper elevation={5} className="login-paper">
        <div className="logo">
          <img className="img-fluid w-100" src={logo} alt="" />
        </div>
        <hr></hr>
        <Typography align='center' component="h1" variant="h5">Log In</Typography>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} margin>
            <Grid item xs={10}>
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
            </Grid>
            <Grid item xs={10}>
              <TextField
                type="password"
                placeholder="Password"
                fullWidth
                name="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit">
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
