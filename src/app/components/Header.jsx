import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';

function Header({ title, subTitle }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="20px">
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}>
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]}>
                {subTitle}
            </Typography>
        </Box>
    )
}

export default Header