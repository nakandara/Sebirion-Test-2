import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Box, Tab, TextField, useMediaQuery, useTheme } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Header from "../../../components/Header";
import ListCrudActions from "../../../components/ListCrudActions";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";

const API_URL = "enterp/v1/Association/";

const Association = () => {
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const axiosPrivate = useAxiosPrivate();

  const [newClicked, setNewClicked] = useState(false);
  const [values, setValues] = useState(initialValues);

  const [association, setAssociation] = useState();

 

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      filter: true,
      sortable: true,
      floatingFilter: true,
    };
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "associationId",
      headerName: "Association ID",
      width: 200,
    },
    {
      field: "associationName",
      headerName: "Association Name",
      width: 200,
    },
    {
      field: "address1",
      headerName: "Address 1",
      width: 110,
    },
    {
      field: "address2",
      headerName: "Address 2",
      width: 110,
    },
    {
      field: "city",
      headerName: "City",
      width: 110,
    },
    {
      field: "district",
      headerName: "District",
      width: 110,
    },
    {
      field: "province",
      headerName: "Province",
      width: 110,
    },
    {
      field: "country",
      headerName: "Country",
      width: 110,
    },
    {
      field: "contact1",
      headerName: "Contact 1",
      width: 110,
    },
    {
      field: "contact2",
      headerName: "Contact 2",
      width: 110,
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
    },
  ]);
  const addItems = useCallback((addIndex) => {
    const newItems = [{}];
    gridRef.current.api.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAssociation = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });

        isMounted && setAssociation(response.data);
      } catch (err) {}
    };
    getAssociation();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleNew = (e) => {
    setValues(initialValues);
    setNewClicked(true);
    addItems(undefined);
  };

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
  const handleEdit = (e) => {};
  const handleDelete = (e) => {};

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
        <Header title="ASSOCIATION" subTitle="" />
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
            rowData={association}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            animateRows={true}
            onSelectionChanged={onSelectionChanged}
            editType={"fullRow"}
          ></AgGridReact>
        </div>
      </Box>
    </Box>
  );
};

const initialValues = {
  associationId: "",
  associationName: "",
  address1: "",
  address2: "",
  city: "",
  district: "",
  province: "",
  country: "",
  contact1: "",
  contact2: "",
  email: "",
};

export default Association;
