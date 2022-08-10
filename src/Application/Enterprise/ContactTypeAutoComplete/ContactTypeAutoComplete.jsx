import { Autocomplete, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

export default function ContactTypeAutoComplete({ contactType, setContactType, setDefaultContactType }) {
    const axiosPrivate = useAxiosPrivate();
    const CONTACT_TYPE_URL = "v1/ContactType/";

    const [contactTypes, setContactTypes] = useState([]);
    const [inputContactType, setInputContactType] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;
        const getContactTypes = async () => {
            try {
                const response = await axiosPrivate.get(
                    CONTACT_TYPE_URL + "get_contact_types",
                    {
                        headers: {
                            signal: controller.signal,
                        },
                    });

                isMounted && setContactTypes(response.data);
                isMounted &&
                    setDefaultContactType(
                        response.data.find((item) => item.contactType === "PHONE")
                    );
            } catch (err) { }
        }

        contactTypes.length === 0 && getContactTypes();
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
                option.contactType === value.contactType
            }
            id="contactType"
            value={contactType}
            inputValue={inputContactType}
            onInputChange={(event, newInputValue) => {
                setInputContactType(newInputValue);
            }}
            options={contactTypes}
            onChange={(event, newValue) => {
                setContactType(newValue);
            }}
            getOptionLabel={(option) => option.description || ""}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Contact Type"
                    size="small"
                    fullWidth
                    margin="normal"
                />
            )}
        />
    )
}
