import React from 'react';
import { toast } from 'react-toastify'


const appMsg = ({type,msg}) => {
    type = "SUCCESS" && toast.success({ msg }, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
    });
};




