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
import moment from "moment";

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
          address:
            item.address1 &&
            item.address1.concat(
              " , ",
              item.address2,
              " , ",
              item.city
            ),
          contact1: item.contact1,
          contact2: item.contact2,
          email: item.email,
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
      width: 40,
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
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "contact1",
      headerName: "Contact 1",
      flex: 1,
    },
    {
      field: "contact2",
      headerName: "Contact 2",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date Of Birth",
      flex: 1,
      cellRenderer: (data) => {
        return moment(data.dateCreated).format("MM/DD/YYYY");
      },
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
