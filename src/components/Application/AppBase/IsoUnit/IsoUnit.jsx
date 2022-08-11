import React, { useRef, useEffect, useState, useMemo } from 'react';
import './isoUnit.css';
import PageHeader from '../../../../Application/fndbas/PageHeader/PageHeader';
import useAxiosPrivate from '../../../../Application/fndbas/hooks/useAxiosPrivate';
import CrudActions from '../../../../Application/fndbas/CrudActions/CrudActions';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { AgGridReact } from "ag-grid-react";
import DeleteModal from '../../Fndfw/DeleteModal';


const API_URL = "v1/IsoUnit/";
const TYPE_API_URL = "v1/IsoUnitType/";

export default function IsoUnit() {
    const initialState = {
        id: null,
        unitCode: "",
        description: "",
        unitType: {
            id: "",
            description: ""
        },
        multiFactor: 1,
        divFactor: 1
    };

    const gridRef = useRef();
    const unitCodeRef = useRef();
    const axiosPrivate = useAxiosPrivate();

    const [isoUnits, setIsoUnits] = useState([]);
    const [isoUnitTypes, setIsoUnitTypes] = useState([]);
    const [objId,setObjId] = useState('');
    const [currentObject, setCurrentObject] = useState(initialState);
    const [openNewItemDlg, setOpenNewItemDlg] = useState(false);
    const [openDeleteDlg, setOpenDeleteDlg] = useState(false);
    const [isKeyDisabled, setIsKeyDisabled] = useState(false);

    const [unitCode, setUnitCode] = useState('');
    const [validUnitCode, setValidUnitCode] = useState(false);

    const [description, setDescription] = useState('');
    const [validDescription, setValidDescription] = useState(false);

    const [unitType, setUnitType] = useState('');
    const [inputUnitType, setInputUnitType] = useState('');

    const [multiFactor, setMultiFactor] = useState('');
    const [divFactor, setDivFactor] = useState('');

    useEffect(() => {
        const setValues = () => {
            setObjId(currentObject.id ? currentObject.id : null);
            setUnitCode(currentObject.id ? currentObject.unitCode : "");
            setDescription(currentObject.id ? currentObject.description : "");
            setUnitType(currentObject.unitType ? currentObject.unitType.description : "");
            setMultiFactor(currentObject.id ? currentObject.multiFactor : 1);
            setDivFactor(currentObject.id ? currentObject.divFactor : 1);
        }
        setValues();
    }, [currentObject]);

    useEffect(() => {
        const controller = new AbortController();

        const getIsoUnits = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + "get_all",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                const isoUnits = response.data.map((isoUnit, idx) => ({
                    index: idx + 1,
                    id: isoUnit.id,
                    unitCode: isoUnit.unitCode,
                    description: isoUnit.description,
                    unitType: isoUnit.unitType && isoUnit.unitType.description,
                    multiFactor: isoUnit.multiFactor,
                    divFactor: isoUnit.divFactor
                }));
                setIsoUnits(isoUnits);
            } catch (err) {
                console.error(err);
            }
        }
        getIsoUnits();
        return () => {
            controller.abort();
        }
    }, [axiosPrivate, objId]);

    useEffect(() => {
        const controller = new AbortController();

        const getUnitTypes = async () => {
            try {
                const response = await axiosPrivate.get(TYPE_API_URL + "get_all",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                console.log(response.data);
                setIsoUnitTypes(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        !isoUnitTypes.length && getUnitTypes();
        return () => {
            controller.abort();
        }

    }, [isoUnitTypes]);

    const handleSave = async () => {
        try {
            const newItem = await axiosPrivate.post(
                API_URL + "save",
                JSON.stringify({
                    id: objId,
                    unitCode: unitCode.toUpperCase(),
                    description: description,
                    unitType: unitType,
                    multiFactor: multiFactor,
                    divFactor: divFactor
                })
            );
            console.log(newItem)
            setCurrentObject(newItem.data);
            setIsoUnits([...isoUnits, currentObject])
        }
        catch (err) { }
        setOpenNewItemDlg(false);
    };

    const [columnDefs] = useState([
        {
            field: "index",
            headerName: "ID",
            width: 5,
            checkboxSelection: true
        },
        {
            field: "id",
            hide: true
        },
        {
            field: "unitCode",
            headerName: "Unit Code",
            width: 150,
            valueFormatter: stringFormatter
        },
        { field: "description", headerName: "Description", width: 250 },
        {
            field: "unitType",
            headerName: "Unit Type",
            width: 150,

        },
        { field: "multiFactor", headerName: "Multi Factor", width: 150, type: 'numericColumn' },
        { field: "divFactor", headerName: "Division Factor", width: 150, type: 'numericColumn' }
    ]);

    function stringFormatter(params) {
        var paramVal = params.value;
        return paramVal && paramVal.toUpperCase();
    };
    const handleNew = (e) => {
        e.preventDefault();
        setOpenNewItemDlg(true);
        setCurrentObject(initialState);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setOpenNewItemDlg(true);
        const selectedData = gridRef.current.api.getSelectedRows();
        
    }

    const handleDelete = (e) => {
        setOpenDeleteDlg(true);
    };

    const handleNewItemClose = (e) => {
        setOpenNewItemDlg(false);
    };

    const handleClose = (e) => {
        setOpenDeleteDlg(false);
    };

    const defaultColDef = useMemo(() => {
        return {
            resizable: true,
            sortable: true,
            filter: true,
            editable: true,
        };
    }, []);

    const Delete = async () => {
        const selectedData = gridRef.current.api.getSelectedRows();
        let filtereditems = isoUnits;

        await selectedData.forEach(selectedObj => {
            try {
                axiosPrivate.delete(API_URL + "delete/" + selectedObj.id);
                setOpenDeleteDlg(false);
                const res = gridRef.current.api.applyTransaction({ remove: selectedData });
                printResult(res);

                filtereditems = filtereditems.filter((isoUnit) => isoUnit.id !== selectedObj.id);

            } catch (err) { }
        });
        setIsoUnits(filtereditems);
    };

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

    return (
        <div className='iso-unit'>
            <PageHeader title="Unit of Measure" />
            <CrudActions handleNew={handleNew} isNewEnabled={true}
                handleEdit={handleEdit} isEditEnabled={true}
                handleSave={handleSave} isSaveEnabled={true}
                handleDelete={handleDelete} isDeleteEnabled={true} />

            <div className="ag-theme-alpine" style={{ height: 300, width: "100%" }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={isoUnits}
                    rowSelection={"multiple"}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows="true"
                ></AgGridReact>
            </div>
            <Dialog open={openNewItemDlg} onClose={handleNewItemClose}>
                <DialogTitle>New Item</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSave} className="prospect-form">
                        <Grid container spacing={1} direction="row">
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    disabled={isKeyDisabled}
                                    size="small"
                                    fullWidth
                                    id="unitCode"
                                    ref={unitCodeRef}
                                    autoComplete="off"
                                    name="unitCode"
                                    label="Unit Code"
                                    type="text"
                                    value={unitCode}
                                    onChange={(e) => setUnitCode(e.target.value)}
                                    required
                                    aria-invalid={validUnitCode ? "false" : "true"}
                                    margin="normal"
                                    inputProps={{ style: { textTransform: "uppercase" } }}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="description"
                                    autoComplete="off"
                                    name="description"
                                    label="Description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    aria-invalid={validDescription ? "false" : "true"}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    variant="outlined"
                                    disablePortal
                                    isOptionEqualToValue={(option, value) =>
                                        option.country === value.country
                                    }
                                    id="country"
                                    value={unitType}
                                    inputValue={inputUnitType}
                                    onInputChange={(event, newInputValue) => {
                                        setInputUnitType(newInputValue);
                                    }}
                                    options={isoUnitTypes}
                                    onChange={(event, newValue) => {
                                        setUnitType(newValue);
                                    }}
                                    getOptionLabel={(option) => option.description || ""}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Unit Type"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="multiFactor"
                                    autoComplete="off"
                                    name="multiFactor"
                                    label="Multi Factor"
                                    type="number"
                                    value={multiFactor}
                                    onChange={(e) => setMultiFactor(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="divFactor"
                                    autoComplete="off"
                                    name="divFactor"
                                    label="Division Factor"
                                    type="number"
                                    value={divFactor}
                                    onChange={(e) => setDivFactor(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNewItemClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
            <DeleteModal open={openDeleteDlg} handleClose={handleClose} Delete={Delete} />
        </div >
    )
}
