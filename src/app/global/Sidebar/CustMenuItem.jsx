import { Typography, useTheme } from '@mui/material'
import React from 'react'
import { MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { tokens } from '../../../theme';


function CustMenuItem({ title, to, icon, selected, setSelected }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100], }}
            onClick={() => setSelected(title)}
            icon={icon}
            routerLink={<Link to={{ to }} />}>
            <Typography>{title}</Typography>
        </MenuItem>
    )
}

export default CustMenuItem