import React, { useMemo, useState, useCallback } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Paper } from '@mui/material';
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ListCrudActions from '../ListCrudActions/ListCrudActions';
import DeleteModal from '../DeleteModal/DeleteModal';

export default function 

CustomAgGrid({ api_url, handleSave, gridRef, items, columnDefs }) {

    const axiosPrivate = useAxiosPrivate();
    const [openDeleteDlg, setOpenDeleteDlg] = useState(false);

    const addItems = useCallback(() => {
        const res = gridRef.current.api.applyTransaction({
            add: [{}],
            addIndex: 0,
        });
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            filter: true,
            editable: true,
        };
    }, []);
    
    const handleEdit = async (e) => {
        e.preventDefault();
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setOpenDeleteDlg(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpenDeleteDlg(false);
    };

    const Delete = async () => {
        const selectedData = gridRef.current.api.getSelectedRows();

        await selectedData.forEach(selectedObj => {
            try {
                axiosPrivate.delete(api_url + "delete/" + selectedObj.id);
                setOpenDeleteDlg(false);
                const res = gridRef.current.api.applyTransaction({ remove: selectedData });
            } catch (err) { }
        });
    };

    return (
        <Paper className='tableContent'>
            <ListCrudActions addItems={addItems} handleSave={handleSave} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={items}
                    rowSelection={"multiple"}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows="true"
                ></AgGridReact>
            </div>
            <DeleteModal open={openDeleteDlg} handleClose={handleClose} Delete={Delete} />
        </Paper>
    )
}
