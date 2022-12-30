import React from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Topbar from '../../topbar/Topbar';
import "./apphome.css";
import { Outlet } from 'react-router-dom';
import TopbarNew from '../../../app/global/Topbar/TopbarNew';
import SidebarNew from '../../../app/global/Sidebar/SidebarNew';
import { useState } from 'react';

export default function AppHome() {
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <div className='app'>
            <SidebarNew isSidebar={isSidebar} />
            <main className='content'>
                <TopbarNew setIsSidebar={setIsSidebar} />
                <Outlet />
            </main>
        </div>
    )
}
