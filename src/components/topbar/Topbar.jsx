import React from 'react';
import "./topbar.css";
import { MessageOutlined, NotificationsNone, Settings } from '@mui/icons-material';
import userPic from '../../assets/dinidu.jpg';
import logo from '../../assets/logo.png';
import { Stack,Avatar } from '@mui/material';


export default function Topbar() {

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <div className='Topbar'>
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Stack direction="row" spacing={2}>
                        <img className='topbar-logo' src={logo} alt="Logo" />
                        <span className="company-name">Sipsayuri ERP</span>
                    </Stack>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <MessageOutlined />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Avatar {...stringAvatar('Tim Neutkens')} alt='DH' src={userPic} sx={{ width: 24, height: 24 }} />
                    </div>
                </div>
            </div>
        </div>
    );
}