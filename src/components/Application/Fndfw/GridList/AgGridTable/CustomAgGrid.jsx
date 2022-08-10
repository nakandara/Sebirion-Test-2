import React, { useMemo, useState, useCallback } from 'react';
import useAxiosPrivate from '../../../../../Application/fndbas/hooks/useAxiosPrivate';
import { Paper } from '@mui/material';
import { AgGridReact } from "ag-grid-react";
import ListCrudActions from '../ListCrudButtons/ListCrudActions';
import DeleteModal from '../../DeleteModal';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function CustomAgGrid({ api_url, handleSave, gridRef, items, columnDefs }) {

    const axiosPrivate = useAxiosPrivate();
    const [openDeleteDlg, setOpenDeleteDlg] = useState(false);

    const addItems = useCallback(() => {
        const res = gridRef.current.api.applyTransaction({
            add: [{}],
            addIndex: 0,
        });
        printResult(res);
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            filter: true,
            editable: true,
        };
    }, []);

    const printResult = (res) => {
        if (res.add) {
            res.add.forEach(function (rowNode) {
                console.log('Added Row Node', rowNode);
            });
        }
        if (res.remove) {
            res.remove.forEach(function (rowNode) {
                console.log('Removed Row Node', rowNode);
            });
        }
        if (res.update) {
            res.update.forEach(function (rowNode) {
                console.log('Updated Row Node', rowNode);
            });
        }
    };

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
                printResult(res);
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
