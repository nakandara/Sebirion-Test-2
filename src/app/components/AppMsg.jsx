import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppMsg = ( type, msg ) => {
    type === "SUCCESS" && toast.success( msg , {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}




export default AppMsg