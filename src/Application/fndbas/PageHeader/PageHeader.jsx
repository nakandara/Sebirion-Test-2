import React from 'react'
import { Paper, Typography } from '@mui/material'



export default function PageHeader({ title, itemCount, isMaster }) {   
    let countStr = "";
    return (
        <Paper elevation={0} square >
            <div>
                <Typography
                    variant="h5"
                    component="div">
                    {title} {isMaster && countStr.concat(" - (", itemCount, ")")}
                </Typography>
            </div>
        </Paper>
    )
}