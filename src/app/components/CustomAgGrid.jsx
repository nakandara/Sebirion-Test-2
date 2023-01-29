import React, { useMemo, useState, useCallback } from 'react';
import useAxiosPrivate from '../../Application/fndbas/hooks/useAxiosPrivate';
import {Paper} from '@mui/material';
import { AgGridReact } from "ag-grid-react";
import ListCrudActions from './ListCrudActions';
import DeleteModal from './DeleteModal';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function CustomAgGrid({ api_url, handleSave, gridRef, items, columnDefs }) {

    const axiosPrivate = useAxiosPrivate();
    const [openDeleteDlg, setOpenDeleteDlg] = useState(false);

    const addItems = useCallback((addIndex) => {
        gridRef.current.api.applyTransaction({
            add: [{}],
            addIndex: addIndex,
        });
    }, [gridRef]);

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

    const handleNew = (e) => {
        addItems(0);
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
            <div className='p-2 d-flex align-items-center'>
                <ListCrudActions addItems={handleNew} handleSave={handleSave} handleEdit={handleEdit} handleDelete={handleDelete} />                
            </div>
            
                <AgGridReact
                    ref={gridRef}
                    rowData={items}
                    rowSelection={"multiple"}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows="true"
                />
            <DeleteModal open={openDeleteDlg} handleClose={handleClose} Delete={Delete} />
        </Paper>
    )
}
