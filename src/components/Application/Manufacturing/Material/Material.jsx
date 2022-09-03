import React, { useRef, useState, useEffect } from 'react';
import CrudActions from '../../../../Application/fndbas/CrudActions/CrudActions';
import PageHeader from '../../../../Application/fndbas/PageHeader/PageHeader';
import useAxiosPrivate from '../../../../Application/fndbas/hooks/useAxiosPrivate';
import './material.css';
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Paper, TextField, ListItem, List } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { ToastContainer, toast } from "react-toastify";

const MATERIAL_TYPE_URL = "v1/MaterialType/";
const MATERIAL_GROUP_URL = "v1/MaterialGroup/";
const ISO_UNIT_URL = "v1/IsoUnit/";
const API_URL = "v1/Material/";

export default function Material() {
    const axiosPrivate = useAxiosPrivate();
    const materialIdRef = useRef();
    const isMounted = useRef(true);

    const initialState = {
        id: null,
        materialId: "",
        description: "",
        materialType: {
            id: "",
            description: ""
        },
        materialGroup: {
            id: "",
            description: ""
        },
        isoUnit: {
            id: "",
            description: ""
        },
        unitCost: "",
        unitPrice: ""
    };

    const [currentObject, setCurrentObject] = useState(initialState);
    const [objId, setObjId] = useState('');
    const [isNewEnabled, setIsNewEnabled] = useState(false);
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [keyDisabled, setKeyDisabled] = useState(false);
    const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

    const [isDeleteDlgOpen, setIsDeleteDlgOpen] = useState(false);

    const [materialId, setMaterialId] = useState('');
    const [validMaterialId, setValidMaterialId] = useState(true);

    const [description, setDescription] = useState('');
    const [validDescription, setValidDescription] = useState(true);

    const [materialType, setMaterialType] = useState('');
    const [validMaterialType, setValidMaterialType] = useState(true);

    const [inputMaterialType, setInputMaterialType] = useState('');

    const [materialTypes, setMaterialTypes] = useState([]);

    const [materialGroup, setMaterialGroup] = useState('');
    const [materialGroups, setMaterialGroups] = useState([]);
    const [inputMaterialGroup, setInputMaterialGroup] = useState('');

    const [isoUnit, setIsoUnit] = useState('');
    const [isoUnits, setIsoUnits] = useState([]);
    const [inputIsoUnit, setInputIsoUnit] = useState('');

    const [unitCost, setUnitCost] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    const [requestObjId, setRequestObjId] = useState(null);

    const [itemCount, setItemCount] = useState(0);

    // useEffect(() => {
    //     const result = materialId.length > 0;
    //     setValidMaterialId(result);
    // }, [materialId]);

    // useEffect(() => {
    //     const result = description.length > 0;
    //     setValidDescription(result);
    // }, [description]);

    useEffect(() => {
        const fetchLatestObjId = async () => {
            const controller = new AbortController();
            try {
                const latestId = await axiosPrivate.get(API_URL + "latest_id", {
                    headers: {
                        signal: controller.signal,
                    },
                });
                console.log("Latedst id-->" + latestId.data);
                isMounted.current && setRequestObjId(latestId.data);
            } catch (err) { }
        };
        requestObjId == null && fetchLatestObjId();
        return () => {
            controller.abort();
            isMounted.current = false;
        }
    }, [requestObjId, axiosPrivate]);

    useEffect(() => {
        const getCustomerProspect = async () => {
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.get(
                    API_URL + "get_material/" + requestObjId,
                    {
                        headers: {
                            signal: controller.signal,
                        },
                    }
                );
                console.log(response.data);
                isMounted.current && response.data && setCurrentObject(response.data);
                isMounted.current && response.data && setIsDeleteEnabled(true);
                isMounted.current && response.data && setIsEditEnabled(true);
            } catch (err) {
                console.error(err);
            }
        };
        requestObjId && getCustomerProspect();
    }, [requestObjId, axiosPrivate, isMounted]);

    useEffect(() => {
        const setValues = () => {
            currentObject.id === null && fetchDefaults();

            setObjId(currentObject.id ? currentObject.id : null);
            setMaterialId(currentObject.id ? currentObject.material : "");
            setDescription(currentObject.id ? currentObject.description : "");
            setMaterialType(currentObject.materialType ? currentObject.materialType.description : "");
            setMaterialGroup(currentObject.materialGroup ? currentObject.materialGroup.description : "");
            setIsoUnit(currentObject.isoUnit ? currentObject.isoUnit.description : "");
            setUnitCost(currentObject.id ? currentObject.unitCost : null);
            setUnitPrice(currentObject.id ? currentObject.unitPrice : null);

        };
        isMounted.current && setValues();
        return () => {
            controller.abort();
            isMounted.current = false;
        }
    }, [currentObject, isMounted]);

    const fetchDefaults = async () => {
        const controller = new AbortController();

        try {
            const resMaterialType = await axiosPrivate.get(MATERIAL_TYPE_URL + "get_material_types", {
                headers: {
                    signal: controller.signal,
                },
            });

            const resMaterialGroup = await axiosPrivate.get(
                MATERIAL_GROUP_URL + "get_all",
                {
                    headers: {
                        signal: controller.signal,
                    },
                }
            );

            const resIsoUnit = await axiosPrivate.get(
                ISO_UNIT_URL + "get_all",
                {
                    headers: {
                        signal: controller.signal,
                    },
                }
            );


            console.log(resMaterialType.data);
            isMounted.current && setMaterialTypes(resMaterialType.data);

            console.log(resMaterialGroup.data);
            isMounted.current && setMaterialGroups(resMaterialGroup.data);

            console.log(resIsoUnit.data);
            isMounted.current && setIsoUnits(resIsoUnit.data);
        } catch (err) { }
        return () => {
            controller.abort();
            isMounted.current = false;
        }
    }

    useEffect(() => {
        // const validSave = materialId.length > 0 && description.length > 0;
        setIsSaveEnabled(true);
    }, [materialId, description]);

    useEffect(() => {
        const getCount = async () => {
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.get(API_URL + "count", {
                    headers: {
                        signal: controller.signal,
                    },
                });
                isMounted.current && setItemCount(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getCount();
        return () => {
            controller.abort();
            isMounted.current = false;
        }
    }, [currentObject, axiosPrivate, isMounted])

    const handleNew = async (e) => {
        e.preventDefault();
        setIsEditEnabled(false);
        setIsDeleteEnabled(false);
        setCurrentObject(initialState);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsDisabled(false);
        setKeyDisabled(true);
        setIsNewEnabled(false);
        setIsDeleteEnabled(false);
    };

    const handleDelete = (e) => {
        setIsDeleteDlgOpen(true);
    };

    useEffect(() => {
        const setCrudActions = () => {
            setIsNewEnabled(true);
            requestObjId && setIsEditEnabled(true);
            setIsSaveEnabled(false);
            requestObjId && setIsDeleteEnabled(true);
        };
        setCrudActions();
    }, [requestObjId]);

    const handleSave = async (e) => {
        e.preventDefault();

        const controller = new AbortController();
        try {
            const response = await axiosPrivate.post(
                API_URL + "save",
                JSON.stringify({
                    id: objId,
                    material: materialId.toUpperCase(),
                    description: description,
                    materialType: materialType,
                    materialGroup: materialGroup,
                    isoUnit: isoUnit,
                    unitCost: unitCost,
                    unitPrice: unitPrice
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        signal: controller.signal,
                    },
                }
            );
            console.log(response.data);
            response.data && setCurrentObject(response.data);
            setIsDeleteEnabled(true);

            toast.success("Successfully Saved.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            if (!err?.response) {
                toast.error("Server not response.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (err.response?.status === 409) {
                toast.error("Customer Prospect already exists.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("Error Saving.", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };


    return (
        <div className='material'>
            <PageHeader title="Material" itemCount={itemCount} />
            <CrudActions handleNew={handleNew} isNewEnabled={isNewEnabled}
                handleEdit={handleEdit} isEditEnabled={isEditEnabled}
                handleSave={handleSave} isSaveEnabled={isSaveEnabled}
                handleDelete={handleDelete} isDeleteEnabled={isDeleteEnabled} />

            <Paper className="pageContent">
                <form onSubmit={handleSave} className="material-form">
                    <fieldset disabled={isDisabled}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    variant='outlined'
                                    disabled={keyDisabled}
                                    size="small"
                                    fullWidth
                                    id="materialId"
                                    ref={materialIdRef}
                                    autoComplete="off"
                                    name="materialId"
                                    label="Material Id"
                                    type="text"
                                    value={materialId}
                                    onChange={(e) => setMaterialId(e.target.value)}
                                    required
                                    aria-invalid={validMaterialId ? "false" : "true"}
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
                            <Grid item xs={3}>
                                <Autocomplete
                                    variant="outlined"
                                    disablePortal
                                    isOptionEqualToValue={(option, value) =>
                                        option.materialType === value.materialType
                                    }
                                    id="materialType"
                                    value={materialType}
                                    inputValue={inputMaterialType}
                                    onInputChange={(event, newInputValue) => {
                                        setInputMaterialType(newInputValue);
                                    }}
                                    options={materialTypes}
                                    onChange={(event, newValue) => {
                                        setMaterialType(newValue);
                                    }}
                                    getOptionLabel={(option) => option.materialType || " "}
                                    renderOption={(props, option) => (
                                        <List {...props}>
                                            <ListItem>
                                                <ListItemText primary={"Material Type - " + option.materialType}
                                                    secondary={"Description - " + option.description} />
                                            </ListItem>
                                        </List>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Material Type"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    variant="outlined"
                                    disablePortal
                                    isOptionEqualToValue={(option, value) =>
                                        option.materialGroup === value.materialGroup
                                    }
                                    id="materialGroup"
                                    value={materialGroup}
                                    inputValue={inputMaterialGroup}
                                    onInputChange={(event, newInputValue) => {
                                        setInputMaterialGroup(newInputValue);
                                    }}
                                    options={materialGroups}
                                    onChange={(event, newValue) => {
                                        setMaterialGroup(newValue);
                                    }}
                                    getOptionLabel={(option) => option.materialGroup || " "}
                                    renderOption={(props, option) => (
                                        <List {...props}>
                                            <ListItem>
                                                <ListItemText primary={"Material Group - " + option.materialGroup}
                                                    secondary={"Description - " + option.description} />
                                            </ListItem>
                                        </List>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Material Group"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    variant="outlined"
                                    disablePortal
                                    isOptionEqualToValue={(option, value) =>
                                        option.isoUnit === value.isoUnit
                                    }
                                    id="isoUnit"
                                    value={isoUnit}
                                    inputValue={inputIsoUnit}
                                    onInputChange={(event, newInputValue) => {
                                        setInputIsoUnit(newInputValue);
                                    }}
                                    options={isoUnits}
                                    onChange={(event, newValue) => {
                                        setIsoUnit(newValue);
                                    }}
                                    getOptionLabel={(option) => option.unitCode || " "}
                                    renderOption={(props, option) => (
                                        <List {...props}>
                                            <ListItem>
                                                <ListItemText primary={"Iso Unit - " + option.unitCode}
                                                    secondary={"Description - " + option.description} />
                                            </ListItem>
                                        </List>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Iso Unit"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    variant='outlined'
                                    size="small"
                                    fullWidth
                                    id="unitCost"
                                    autoComplete="off"
                                    name="unitCost"
                                    label="Unit Cost"
                                    type="number"
                                    value={unitCost}
                                    onChange={(e) => setUnitCost(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    variant='outlined'
                                    size="small"
                                    fullWidth
                                    id="unitPrice"
                                    autoComplete="off"
                                    name="unitPrice"
                                    label="Unit Price"
                                    type="number"
                                    value={unitPrice}
                                    onChange={(e) => setUnitPrice(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </fieldset>
                </form>
            </Paper>

        </div >
    )
}
