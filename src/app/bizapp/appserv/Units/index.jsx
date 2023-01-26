import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box, Tab, TextField, useMediaQuery, useTheme } from "@mui/material";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const API_URL = "/invent/v1/IsoUnit/";

const rows = [
  {
    id: 1,
    unitCode: "unitCode",
    description: "description",
    baseUnit: "length",
    multiFactor: "2",
    divFactor: "3",
    tenPower: "2",
    userDefined: "true",
    unitType: "Not Used",
  },
];

function BasicData() {
  const axiosPrivate = useAxiosPrivate();

  const [newClicked, setNewClicked] = useState(false);

  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const [tableValues, setTableValues] = useState(rows);

  const [values, setValues] = useState(initialValues);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const VISIBLE_FIELDS = [];

  const { data } = useDemoData({
    // dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  const handleNew = (e) => {
    setValues(initialValues);
    setNewClicked(true);
  };
  const handleEdit = (e) => {};

  const handleSave = async (e) => {
    e.preventDefault();
    setValues(initialValues);
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
      // response.data && setCurrentObject(response.data);
      showAllToasts("SUCCESS", "Successfully Saved.");
    } catch (err) {
      showAllToasts("ERROR", err.response.data.apiError.message);
      console.log(err);
    }
  };

  const handleDelete = (e) => {

  };

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

  const columns = [
    { field: "id", headerName: "ID", width: 110 },
    {
      field: "unitCode",
      headerName: "Unit Code",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 110,
      editable: true,
    },
    {
      field: "baseUnit",
      headerName: "Base Unit",
      width: 110,
    },
    {
      field: "multiFactor",
      headerName: "Multi Factor",
      width: 110,
    },
    {
      field: "divFactor",
      headerName: "Div Factor",
      width: 110,
    },
    {
      field: "tenPower",
      headerName: "Ten Power",
      width: 110,
    },
    {
      field: "userDefined",
      headerName: "User Defined",
      width: 110,
    },
    {
      field: "unitType",
      headerName: "Unit Type",
      width: 110,
    },
  ];

  return (
    <Box>
      <Box m="10px">
        <CrudActions
          handleNew={handleNew}
          isNewEnabled={isNewEnabled}
          handleEdit={handleEdit}
          isEditEnabled={isEditEnabled}
          handleSave={handleSave}
          isSaveEnabled={isSaveEnabled}
          handleDelete={handleDelete}
          isDeleteEnabled={isDeleteEnabled}
        />
      </Box>

      <form onSubmit={handleSave}>
        <fieldset disabled={!newClicked} style={{ border: "0" }}>
          <Box
            display="grid"
            marginTop="10px"
            gap="20px"
            gridTemplateColumns="repeat(6, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
            }}
          >
            <TextField
              disabled
              fullWidth
              variant="outlined"
              type="text"
              label="Unit Code"
              onChange={(e) => onFormInputChange("unitCode", e.target.value)}
              value={values.unitCode}
              InputProps={{ sx: { height: 40 } }}
              name="unitCode"
              size="small"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
            />
            <TextField
              disabled
              fullWidth
              variant="outlined"
              type="text"
              label="Description"
              onChange={(e) => onFormInputChange("description", e.target.value)}
              value={values.description}
              name="description"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />

            <TextField
              disabled
              fullWidth
              variant="outlined"
              type="text"
              label="BaseUnit"
              onChange={(e) => onFormInputChange("baseUnit", e.target.value)}
              value={values.baseUnit}
              name="baseUnit"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Multi Factor"
              onChange={(e) => onFormInputChange("multiFactor", e.target.value)}
              value={values.multiFactor}
              name="multiFactor"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Div Factor"
              onChange={(e) => onFormInputChange("divFactor", e.target.value)}
              value={values.divFactor}
              name="divFactor"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Ten Power"
              onChange={(e) => onFormInputChange("tenPower", e.target.value)}
              value={values.tenPower}
              name="tenPower"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              disabled
              fullWidth
              variant="outlined"
              type="text"
              label="User Defined"
              onChange={(e) => onFormInputChange("userDefined", e.target.value)}
              value={values.userDefined}
              name="userDefined"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
            <TextField
              disabled
              fullWidth
              variant="outlined"
              type="text"
              label="Unit Type"
              onChange={(e) => onFormInputChange("unitType", e.target.value)}
              value={values.unitType}
              name="unitType"
              sx={{
                gridColumn: "span 1",
                "& .MuiInputBase-root": {
                  height: 40,
                },
              }}
              size="small"
            />
          </Box>
        </fieldset>
      </form>

      <Box sx={{ height: 400, margin: "10px" }}>
        <DataGrid
          rows={tableValues}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

const initialValues = {
  unitCode: "meter",
  description: "meter unit",
  baseUnit: "length",
  multiFactor: "",
  divFactor: "",
  tenPower: "",
  userDefined: "true",
  unitType: "Not Used",
};

export default BasicData;
