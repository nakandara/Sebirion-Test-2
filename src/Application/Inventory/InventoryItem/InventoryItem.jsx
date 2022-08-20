import { Grid, Paper, TextField } from '@mui/material';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../fndbas/hooks/useAxiosPrivate';
import PageHeader from '../../fndbas/PageHeader/PageHeader';
import ItemTypeAutoComplete from '../ItemType/ItemTypeAutoComplete';
import "./inventoryItem.css";

const API_URL = "v1/inventoryItem/";


export default function InventoryItem() {
    const itemCodeRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const { objId } = useParams();

    const initState = {
        id: null,
        itemCode: "",
        description: "",
        itemType: {
            id: null,
            typeId: "",
            description: ""
        },
        itemDiscount: "",
        weight: "",
        reorderLevel: "",
        availableQuantity: "",
        status: ""
    }

    const [setObjId] = useState();

    const [itemCode, setItemCode] = useState(initState.itemCode);
    const [validItemCode, setValidItemCode] = useState(false);

    const [description, setDescription] = useState(initState.description);
    const [validDescription, setValidDescription] = useState(false);

    const [itemType, setItemType] = useState(initState.itemType);
    const [itemDiscount, setItemDiscount] = useState(initState.itemDiscount);
    const [weight, setWeight] = useState(initState.weight);
    const [reorderLevel, setReorderLevel] = useState(initState.reorderLevel);
    const [availableQuantity, setAvailableQuantity] = useState(initState.availableQuantity);
    const [status, setStatus] = useState(initState.status);

    const [itemCount, setItemCount] = useState(0);
    const [currObj, setCurrObj] = useState(initState);

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        itemCodeRef.current.focus();
    }, []);

    useEffect(() => {
        const getCount = async () => {
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.get(API_URL + "count", {
                    headers: {
                        signal: controller.signal,
                    },
                });
                setItemCount(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getCount();
    }, [currObj, axiosPrivate])

    const handleSave = async (e) => {
        e.preventDefault();
    }


    return (
        <div className="inventory-item">
            <PageHeader title="Inventory Item" itemCount={itemCount} isMaster={true} />
            <Paper className="pageContent">
                <form onSubmit={handleSave} className="prospect-form">
                    <fieldset disabled={isDisabled} className="form-group">
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="itemCode"
                                    ref={itemCodeRef}
                                    autoComplete="off"
                                    name="itemCode"
                                    label="Item Code"
                                    type="text"
                                    value={itemCode}
                                    onChange={(e) => setItemCode(e.target.value)}
                                    required
                                    aria-invalid={validItemCode ? "false" : "true"}
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
                                <ItemTypeAutoComplete
                                    itemType={itemType}
                                    setItemType={setItemType} />
                            </Grid>
                        </Grid>
                    </fieldset>
                </form>
            </Paper>
        </div>
    )
}
