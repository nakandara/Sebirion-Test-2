import React from 'react'
import { useState } from 'react';
import useAxiosPrivate from '../../fndbas/hooks/useAxiosPrivate';

const API_URL = "v1/inventoryItemType/";

export default function ItemTypeAutoComplete({itemType,setItemType}) {
  const axiosPrivate = useAxiosPrivate();

  const[items,setItems]=useState([]);
  const[inputItem,setInputItem]=useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const getItemTypes = async () => {
        try {
            const response = await axiosPrivate.get(API_URL + "get_all", {
                headers: {
                    signal: controller.signal,
                },
            });

            isMounted && setItems(response.data);            
        } catch (err) { }
    }

    items.length === 0 && getItemTypes();
    return () => {
        controller.abort();
        isMounted = false;
    }
}, []);

  return (
    <Autocomplete
            variant="outlined"
            disablePortal
            isOptionEqualToValue={(option, value) =>
                option.typeId === value.typeId
            }
            id="itemType"
            value={itemType}
            inputValue={inputItem}
            onInputChange={(event, newInputValue) => {
              setInputItem(newInputValue);
            }}
            options={items}
            onChange={(event, newValue) => {
              setItemType(newValue);
            }}
            getOptionLabel={(option) => option.description || ""}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Country"
                    fullWidth
                    margin="normal"
                    size="small"
                />
            )}
        />
  )
}
