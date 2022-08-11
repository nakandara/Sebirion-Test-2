import React, { useState, useEffect, useMemo } from 'react'
import useAxiosPrivate from '../../fndbas/hooks/useAxiosPrivate';
import './fndUsers.css';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../fndbas/PageHeader/PageHeader';
import { AgGridReact } from 'ag-grid-react';
import moment from "moment";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GET_USERS_URL = 'v1/FndUser/'

export default function Users() {

    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [columnDef] = useState([
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userName', headerName: 'User Name', width: 130 },
        { field: 'roles', headerName: 'Roles', width: 330 },
        { field: 'isActive', headerName: 'Active', width: 90, },
        {
            field: "created",
            headerName: "Created",
            valueFormatter: dateFormatter,
            width: 150,
        },
        {
            field: "modifiedDate",
            headerName: "Last Modified",
            valueFormatter: dateFormatter,
            width: 150
        },
    ]);

    function dateFormatter(params) {
        return moment(params.value).format("MM/DD/YYYY HH:mm");
    }    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(GET_USERS_URL + "get_users",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                let fndUsers = response.data;
                let dataArray = [];
                let idx = 0;

                fndUsers.forEach((fndUser) => {
                    let userRoles = fndUser.roles;
                    let userRoleStr = null;
                    idx = idx + 1;

                    userRoles.forEach((role) => {
                        userRoleStr = userRoleStr ? userRoleStr + " , " + role.description : role.description;
                    });

                    const dataElement = {
                        id: idx,
                        userName: fndUser.userName,
                        roles: userRoleStr,
                        isActive: fndUser.isActive ? "True" : "False",
                        created: fndUser.created,
                        modifiedDate: fndUser.modifiedDate
                    };

                    dataArray = [...dataArray, dataElement]
                });

                isMounted && setUsers(dataArray);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, navigate, location])

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true
    }), []);

    return (
        <div className='users'>
            <PageHeader title="Users" />
            {users?.length ?
                <AgGridReact
                    className="ag-theme-alpine"
                    animateRows="true"
                    columnDefs={columnDef}
                    defaultColDef={defaultColDef}
                    enableRangeSelection="true"
                    rowData={users}
                    rowSelection="multiple"
                    suppressRowClickSelection="true"
                />
                : <p>No Data Found.</p>
            }
        </div>
    )
}
