import React, { useEffect, useRef, useState } from 'react'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import CustomAgGrid from '../../Fndfw/GridList/AgGridTable/CustomAgGrid';
import PageHeader from '../../Fndfw/PageHeader/PageHeader';

import './coveringType.css';

const API_URL = "v1/CoveringType";

export default function CoveringType() {
    const gridRef = useRef();
    const axiosPrivate = useAxiosPrivate();

    const [coveringTypes, setCoveringTypes] = useState([]);
    const [objId] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const getCoveingTypes = async () => {
            try {
                const response = await axiosPrivate.get(API_URL+"/get_all",
                    {
                        headers: {
                            signal: controller.signal
                        }
                    }
                );
                const coveringTypes = response.data.map((coveringType, idx) => ({
                    index: idx + 1,
                    id: coveringType.id,
                    coveringType: coveringType.coveringType,
                    description: coveringType.description
                }));
                setCoveringTypes(coveringTypes);
            } catch (err) {
                console.error(err);
            }
        }
        getCoveingTypes();
        return () => {
            controller.abort();
        }
    }, [axiosPrivate, objId]);

    const handleSave = async (e) => {
        e.preventDefault();
        gridRef.current.api.stopEditing();

        const selectedData = gridRef.current.api.getSelectedRows();

        await selectedData.forEach(coveringType => {
            try {
                axiosPrivate.post(
                    API_URL + "save",
                    {
                        id: coveringType.id,
                        chargeId: coveringType.chargeId.toUpperCase(),
                        description: coveringType.description
                    }
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
        { field: "coveringType", headerName: "Covering Type", width: 250, valueFormatter: stringFormatter },
        { field: "description", headerName: "Description", width: 350 }
    ]);

    function stringFormatter(params) {
        var paramVal = params.value;
        return paramVal && paramVal.toUpperCase();
    }

    return (
        <div className='covering-type'>
            <PageHeader title="Covering Types" />
            <CustomAgGrid api_url={API_URL} handleSave={handleSave} gridRef={gridRef} items={coveringTypes} columnDefs={columnDefs} />
        </div>
    )
}
