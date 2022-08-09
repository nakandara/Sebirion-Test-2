import React from 'react'
import Sidebar from '../../sidebar/Sidebar'
import Topbar from '../../topbar/Topbar'
import "./apphome.css";
import { Outlet } from 'react-router-dom';

export default function AppHome() {
    return (
        <div>
            <Topbar />
            <div className='container'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}
