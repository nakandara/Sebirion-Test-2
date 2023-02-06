import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { ToastContainer, toast } from "react-toastify";
import ListCrudActions from "../../../components/ListCrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import Header from "../../../components/Header";

const API_URL = "/accrul/v1/PaymentTerm/";

function PaymentTerm() {
  const gridRef = useRef();
  const termIdRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [formValues, setFormValues] = useState(initState);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [values, setValues] = useState(initState);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      width: 40,
      checkboxSelection: true,
    },
    {
      field: "termId",
      headerName: "Payment Term",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "termValue",
      headerName: "Value",
      width: 100,
    },
    {
      field: "payTermType",
      headerName: "Term Function",
      width: 150,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPayTerms = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });

        isMounted && setPaymentTerms(response.data);
      } catch (err) {}
    };
    getPayTerms();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleNew = (e) => {
    setFormValues(initState);
  };

  const handleEdit = (e) => {};

  const handleSave = async (e) => {
    e.preventDefault();
    
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
            signal: controller.signal,
          },
        }
      );
      console.log(response.data);
      isMounted && setPaymentTerms(...paymentTerms, response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDelete = (e) => {};

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, values);
    updated[key] = value;
    setValues(updated);
  };

  const showAllToasts = (type, msg) => {
    type === "SUCCESS" &&
      toast.success(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "ERROR" &&
      toast.error(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "WARNING" &&
      toast.warning(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    type === "INFO" &&
      toast.info(msg, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };
  return (
    <Box>
      <Box m="10px">
        <Header title="Payment Terms" subTitle="" />
        <ListCrudActions
          addItems={handleNew}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <Paper elevation={2} style={{ padding: "5px" }}>
          <form onSubmit={handleSave}>
            <fieldset style={{ border: "0" }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    ref={termIdRef}
                    id="termId"
                    autoComplete="off"
                    name="termId"
                    label="Payment Term"
                    type="text"
                    value={values.termId}
                    onChange={(e) =>
                      onFormInputChange("termId", e.target.value)
                    }
                    required
                    margin="normal"
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="description"
                    autoComplete="off"
                    name="description"
                    label="Description"
                    type="text"
                    value={values.description}
                    onChange={(e) =>
                      onFormInputChange("description", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="termValue"
                    autoComplete="off"
                    name="termValue"
                    label="Value"
                    type="number"
                    value={values.termValue}
                    onChange={(e) =>
                      onFormInputChange("termValue", e.target.value)
                    }
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl
                    sx={{ minWidth: 120, gridColumn: "span 1" }}
                    size="small"
                  >
                    <InputLabel id="payTermType">Term Function</InputLabel>
                    <Select
                      labelId="payTermType"
                      id="payTermType"
                      value={values.payTermType}
                      label="Pay. Term Type"
                      onChange={(e) =>
                        onFormInputChange("payTermType", e.target.value)
                      }
                    >
                      <MenuItem value={"DAYS"}>Days</MenuItem>
                      <MenuItem value={"WEEKS"}>Weeks</MenuItem>
                      <MenuItem value={"MONTHS"}>Months</MenuItem>
                      <MenuItem value={"YEARS"}>Years</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </fieldset>
          </form>
        </Paper>
      </Box>

      <Box sx={{ height: 400, margin: "10px" }}>
        <AgGridReact
          ref={gridRef}
          className="ag-theme-balham"
          rowData={paymentTerms}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"single"}
          animateRows={true}
          onSelectionChanged={onSelectionChanged}
        ></AgGridReact>
      </Box>
    </Box>
  );
}

const initState = {
  id: "",
  termId: "",
  description: "",
  termValue: "",
  payTermType: "",
};

export default PaymentTerm;
