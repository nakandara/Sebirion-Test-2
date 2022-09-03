import React, { useRef, useState, useEffect } from 'react';
import useAxiosPrivate from '../../../../Application/fndbas/hooks/useAxiosPrivate';
import CustomAgGrid from '../../Fndfw/GridList/AgGridTable/CustomAgGrid';
import PageHeader from '../../../../Application/fndbas/PageHeader/PageHeader';
import './materialGroup.css';

const API_URL = "v1/MaterialGroup/";

export default function MaterialGroup() {
    const gridRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const isMounted = useRef(true);

    const [materialGroups, setMaterialGroups] = useState([]);
    const [objId] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const getMaterialGroups = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + "get_all",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                const matGroups = response.data.map((materialGroup, idx) => ({
                    index: idx + 1,
                    id: materialGroup.id,
                    materialGroup: materialGroup.materialGroup,
                    description: materialGroup.description,
                    unitPrice: materialGroup.unitPrice,
                    unitCost: materialGroup.unitCost
                }));
                isMounted.current && setMaterialGroups(matGroups);
            } catch (err) {
                console.error(err);
            }
        }
        getMaterialGroups();
        return () => {
            controller.abort();
            isMounted.current = false;
        }
    }, [axiosPrivate, objId, isMounted])

    const handleSave = async (e) => {
        e.preventDefault();
        gridRef.current.api.stopEditing();

        const selectedData = gridRef.current.api.getSelectedRows();

        await selectedData.forEach(materialGroup => {
            try {
                axiosPrivate.post(
                    API_URL + "save",
                    JSON.stringify({
                        id: materialGroup.id,
                        materialGroup: materialGroup.materialGroup.toUpperCase(),
                        description: materialGroup.description,
                        unitPrice: materialGroup.unitPrice,
                        unitCost: materialGroup.unitCost
                    })
                );
            }
            catch (err) { }
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
        { field: "materialGroup", headerName: "Material Group", width: 150, valueFormatter: stringFormatter },
        { field: "description", headerName: "Description", width: 250 },
        { field: "unitPrice", headerName: "Unit Price", width: 250, type: 'numericColumn' },
        { field: "unitCost", headerName: "Unit Cost", width: 250, type: 'numericColumn' }
    ]);

    function stringFormatter(params) {
        var paramVal = params.value;
        return paramVal && paramVal.toUpperCase();
    }

    return (
        <div className='material-group'>
            <PageHeader title="Material Groups" />
            <CustomAgGrid api_url={API_URL} handleSave={handleSave} gridRef={gridRef} items={materialGroups} columnDefs={columnDefs} />
        </div >
    )
}
