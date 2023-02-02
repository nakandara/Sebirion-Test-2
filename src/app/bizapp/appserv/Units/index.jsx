import React, {
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box, Tab, TextField, useMediaQuery, useTheme } from "@mui/material";
import CrudActions from "../../../../Application/fndbas/CrudActions/CrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
// import { useDemoData } from "@mui/x-data-grid-generator";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Header from "../../../components/Header";
import ListCrudActions from "../../../components/ListCrudActions";
import CreateDlg from "./createDlg";

const API_URL = "/appsrv/v1/IsoUnit/";

function BasicData() {
  const gridRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const initialValues = {
    unitCode: "",
    description: "",
    baseUnit: "",
    multiFactor: "",
    divFactor: "",
    tenPower: "",
    userDefined: "",
    unitType: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [newClicked, setNewClicked] = useState(false);

  const [isNewEnabled, setIsNewEnabled] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(true);

  const [isOpenDlg, setIsOpenDlg] = useState(false);

  const [formValues, setFormValues] = useState(initialValues);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [isoUnits, setIsoUnits] = useState([]);
  const [columnDefs] = useState([
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
      type: "numericColumn",
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
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUnits = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });

        isMounted && setIsoUnits(response.data);
      } catch (err) {}
    };
    getUnits();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleNew = (e) => {
    setFormValues(initialValues);
    setNewClicked(true);
  };
  const handleEdit = (e) => {};

  const handleSave = async (e) => {
    e.preventDefault();
    setFormValues(initialValues);
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        API_URL + "create",
        JSON.stringify(formValues),
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

  const handleDelete = (e) => {};

  const onFormInputChange = (key, value) => {
    const updated = Object.assign({}, formValues);
    updated[key] = value;
    setFormValues(updated);
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
        <Header title="ISO Units" subTitle="" />
        <ListCrudActions
          addItems={handleNew}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      <Box sx={{ height: 400, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={isoUnits}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            animateRows={true}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </Box>
      <CreateDlg openDlg={isOpenDlg} setOpenDlg={setIsOpenDlg} />
    </Box>
  );
}

export default BasicData;
