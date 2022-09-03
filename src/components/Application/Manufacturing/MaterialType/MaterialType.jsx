import React, { useState, useRef, useEffect } from 'react';
import PageHeader from '../../Fndfw/PageHeader/PageHeader';

import './materialType.css';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import CustomAgGrid from '../../Fndfw/GridList/AgGridTable/CustomAgGrid';

const API_URL = "v1/MaterialType/";

export default function MaterialType() {

    const gridRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const isMounted = useRef(true);

    const [materialTypes, setMaterialTypes] = useState([]);
    const [objId] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const getMaterialTypes = async () => {
            try {
                const response = await axiosPrivate.get(API_URL + "get_material_types",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                const matTypes = response.data.map((materialType, idx) => ({
                    index: idx + 1,
                    id: materialType.id,
                    materialType: materialType.materialType,
                    description: materialType.description
                }));
                isMounted.current && setMaterialTypes(matTypes);
            } catch (err) {
                console.error(err);
            }
        }
        getMaterialTypes();
        return () => {
            isMounted.current = false;
            controller.abort();
        }
    }, [axiosPrivate, objId]);

    const handleSave = async (e) => {
        e.preventDefault();
        gridRef.current.api.stopEditing();

        const selectedData = gridRef.current.api.getSelectedRows();

        await selectedData.forEach(materialType => {
            try {
                axiosPrivate.post(
                    API_URL + "save",
                    JSON.stringify({
                        id: objId,
                        materialType: materialType.materialType.toUpperCase(),
                        description: materialType.description
                    })
                );
            }
            catch (err) { }
        });       
    }

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
        { field: "materialType", headerName: "Material Type", width: 150, valueFormatter: stringFormatter },
        { field: "description", headerName: "Description", width: 250 }
    ]);

    function stringFormatter(params) {
        var paramVal = params.value;
        return paramVal && paramVal.toUpperCase();
    }

    return (
        <div className='material-type'>
            <PageHeader title="Material Types" />
            <CustomAgGrid api_url={API_URL} handleSave={handleSave} gridRef={gridRef} items={materialTypes} columnDefs={columnDefs} />
        </div>
    )
}
