import axios from "axios";

const BASE_URL = "http://43.205.23.46:9090/api/";
// const BASE_URL = "http://localhost:8080/api/";

export default axios.create({baseURL:BASE_URL});

export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-type':'application/json'},
    withCredentials:true
});