import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import CustomAgGrid from '../../fndbas/AgGridTable/CustomAgGrid';
import useAxiosPrivate from '../../fndbas/hooks/useAxiosPrivate';
import PageHeader from '../../fndbas/PageHeader/PageHeader';
import './itemType.css';

const API_URL = "v1/inventoryItemType/";

export default function ItemType() {
    const gridRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const isMounted = useRef(true);

    const [objId] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const getItems = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + "get_all",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                const its = response.data.map((item, idx) => ({
                    index: idx + 1,
                    id: item.id,
                    itemType: item.itemType,
                    description: item.description
                }));
                setItems(its);
            } catch (err) {
                console.error(err);
            }
        }
        isMounted.current && getItems();
        return () => {
            isMounted.current = false;
            controller.abort();
        }
    }, [axiosPrivate, objId, isMounted]);

    const handleSave = async (e) => {
        gridRef.current.api.stopEditing();
        const selectedData = gridRef.current.api.getSelectedRows();
        console.log(selectedData)

        await selectedData.forEach(item => {
            try {
                axiosPrivate.post(
                    API_URL + "save",
                    {
                        id: item.id,
                        itemType: item.itemType.toUpperCase(),
                        description: item.description
                    }
                );
            }
            catch (err) {
                console.log(err)
            }
        });
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
        { field: "itemType", headerName: "Item Type", width: 350, valueFormatter: stringFormatter },
        { field: "description", headerName: "Description", width: 500 }
    ]);

    function stringFormatter(params) {
        var paramVal = params.value;
        return paramVal && paramVal.toUpperCase();
    }

    return (
        <div className='item-type'>
            <PageHeader title="Inventory Item Type" />
            <CustomAgGrid api_url={API_URL} handleSave={handleSave} gridRef={gridRef} items={items} columnDefs={columnDefs} />
        </div>
    )
}
