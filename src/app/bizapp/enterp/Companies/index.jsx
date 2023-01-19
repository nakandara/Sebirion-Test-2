import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import Header from '../../../components/Header';
import { tokens } from '../../../../theme';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataInvoices } from '../../../../data/mockData';
import { useEffect } from 'react';
import useAxiosPrivate from '../../../../Application/fndbas/hooks/useAxiosPrivate';
import { useState } from 'react';

const API_URL = "v1/Company/";

function Companies() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();

    const initialValue = {
        id: "",
        companyId: "",
        companyName: "",
        associationNo: "",
        webAddress: "",
        businessNature: "",
        createdAt: "",
        createdBy: ""
    }
    const [companies, setCompanies] = useState([initialValue]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getCompanies = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + "get_all",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                console.log(response.data);
                let companies = response.data;
                const dataArray = companies.map((company, idx) => ({
                    id: idx + 1,
                    companyId: company.companyId,
                    companyName: company.companyName,
                    createdBy: company.createdBy,
                    createdAt: company.createdAt,
                    associationNo: company.associationNo,
                    businessNature: company.businessNature,
                    webAddress: company.webAddress,
                }));

                console.log(dataArray);

                isMounted && setCompanies(dataArray);
            }
            catch (err) {

            }
        }
        getCompanies();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);


    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "companyId",
            headerName: "Company ID",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "companyName",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "associationNo",
            headerName: "Association No",
            flex: 1,
        },
        {
            field: "webAddress",
            headerName: "Web Address",
            flex: 1,
        },
        {
            field: "businessNature",
            headerName: "Nature of Business",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1,
        },
        {
            field: "createdBy",
            headerName: "Created By",
            flex: 1,
        },
    ];

    return (
        <Box m="20px" backgroundColor={colors.primary[400]}>
            <Header title="Companies" subTitle="" />

            <Box
                m="10px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={companies} columns={columns} />
            </Box>
        </Box>
    )
}

export default Companies