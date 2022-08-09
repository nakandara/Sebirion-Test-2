import React from 'react';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  return (    
    toast.success("Successfully Saved.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
  )
}
