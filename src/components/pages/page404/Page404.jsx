import { Grid, styled, Paper } from '@mui/material';
import React from 'react';

export default function Page404() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <Grid container justifyContent="center">
            <Grid item md={6}>
                <Item>
                    <div className="clearfix">
                        <h1 className="float-start display-3 me-4">404</h1>
                        <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
                        <p className="text-medium-emphasis float-start">
                            The page you are looking for was not found.
                        </p>
                    </div>
                </Item>
            </Grid>
        </Grid>
    )
}
