import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

const COUNTRY_URL = "v1/IsoCountry/";

export default function IsoCountryAutoComplete({ country, setCountry, setDefaultCountry }) {
    const axiosPrivate = useAxiosPrivate();

    const [countries, setCountries] = useState([]);
    const [inputCountry, setInputCountry] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;
        const getCountries = async () => {
            try {
                const response = await axiosPrivate.get(COUNTRY_URL + "get_countries", {
                    headers: {
                        signal: controller.signal,
                    },
                });

                isMounted && setCountries(response.data);
                isMounted &&
                    setDefaultCountry(
                        response.data.find((item) => item.countryCode === "AU")
                    );
            } catch (err) { }
        }

        countries.length === 0 && getCountries();
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
                option.country === value.country
            }
            id="country"
            value={country}
            inputValue={inputCountry}
            onInputChange={(event, newInputValue) => {
                setInputCountry(newInputValue);
            }}
            options={countries}
            onChange={(event, newValue) => {
                setCountry(newValue);
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
