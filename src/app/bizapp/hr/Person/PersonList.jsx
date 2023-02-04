import { AgGridReact } from "ag-grid-react";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useTheme, Box } from "@mui/material";
import Header from "../../../components/Header";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import useAxiosPrivate from "../../../../Application/fndbas/hooks/useAxiosPrivate";
import { tokens } from "../../../../theme";
import { Link } from "react-router-dom";

const API_URL = "hr/v1/PersonaInfo/";

const PersonList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [personList, setPersonList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getItems = async () => {
      try {
        const response = await axiosPrivate.get(API_URL + "get_all", {
          headers: {
            signal: controller.signal,
          },
        });
        console.log(response.data);
        let assItems = response.data;
        const dataArray = assItems.map((item, idx) => ({
          id: idx + 1,
          personId: item.personId,
          nicNo: item.nicNo,
          name: item.name,
          fullName: item.fullName,
          initials: item.initials,
          firstName: item.firstName,
          lastName: item.lastName,
          middleName: item.middleName,
          dateOfBirth: item.dateOfBirth,
          gender: item.gender,
          married: item.married,
          pictureURL: item.pictureURL,
        }));

        isMounted && setPersonList(dataArray);
      } catch (err) {}
    };
    getItems();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      checkboxSelection: true,
    },
    {
      field: "personId",
      headerName: "Person Id",
      flex: 1,
      cellRenderer: (params) => {
        return <Link to={`/person/${params.value}`}>{params.value}</Link>;
      },
    },
    {
      field: "nicNo",
      headerName: "Nic No",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "initials",
      headerName: "Initials",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date Of Birth",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "married",
      headerName: "Married",
      flex: 1,
    },
    {
      field: "pictureURL",
      headerName: "Picture URL",
      flex: 1,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    document.querySelector("#selectedRows").innerHTML =
      selectedRows.length === 1 ? selectedRows[0].athlete : "";
  }, []);

  return (
    <Box m="5px" p="5px" backgroundColor={colors.primary[400]}>
      <Header title="Person List" subTitle=""></Header>
      <Box sx={{ height: 500, margin: "10px" }}>
        <div style={gridStyle} className="ag-theme-balham">
          <AgGridReact
            ref={gridRef}
            rowData={personList}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            animateRows={true}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </Box>
    </Box>
  );
};

export default PersonList;
