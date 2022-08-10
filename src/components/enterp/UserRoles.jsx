import React, { useState, useEffect, useRef,useMemo } from 'react'
import useAxiosPrivate from '../../Application/fndbas/hooks/useAxiosPrivate';
import PageHeader from '../Application/Fndfw/PageHeader/PageHeader';
import './userRoles.css';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const API_URL = 'v1/UserRole/'

export default function UserRoles() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100, sortable: true, filter: true },
        { field: 'roleId', headerName: 'User Role', width: 200, sortable: true, filter: true, editable: true },
        { field: 'description', headerName: 'Description', width: 300, sortable: true, filter: true, editable: true }
    ]

    const [userRoles, setUserRoles] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserRolles = async () => {
            try {
                const response = await axiosPrivate.get(API_URL,
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                console.log(response.data);
                isMounted && setUserRoles(response.data);
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getUserRolles();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate])    

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true
    }), []);


    return (
        <div className='user-roles'>
            <PageHeader title="User Roles" />
            {userRoles?.length ?
                <AgGridReact
                    className="ag-theme-alpine"
                    animateRows="true"
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    enableRangeSelection="true"
                    rowData={userRoles}
                    rowSelection="multiple"
                    suppressRowClickSelection="true"
                />
                : <p>No Data Found.</p>
            }</div>
    )
}
