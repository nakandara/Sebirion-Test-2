
import React, { lazy, Suspense,useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./styles.scss"

import RequireAuth from "./components/pages/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./app/dashboard/Dashboard";

// import IsoUnit from './components/Application/AppBase/IsoUnit/IsoUnit';

const Page404 = lazy(() => import("./components/pages/page404/Page404"));
const AppHome = lazy(() => import("./components/pages/home/AppHome"));
const Unauthorized = lazy(() => import("./components/pages/Unauthorized"));
// const UserRole = lazy(() => import('./components/enterp/UserRole'));
// const UserRoles = lazy(() => import('./components/enterp/UserRoles'));
// const Project = lazy(() => import('./components/Application/Proj/Project/Project'));
// const Material = lazy(() => import('./components/Application/Manufacturing/Material/Material'));
// const MaterialGroup = lazy(() => import('./components/Application/Manufacturing/MaterialGroup/MaterialGroup'));
// const CoveringType = lazy(() => import('./components/Application/Invent/CoveringTypes/CoveringType'));
const Login = lazy(() => import("./app/login/Login"));
const FndUser = lazy(() => import("./Application/Enterprise/User/FndUser"));
const FndUsers = lazy(() =>
  import("./Application/Enterprise/FndUsers/FndUsers")
);
const InventoryItem = lazy(() =>
  import("./Application/Inventory/InventoryItem/InventoryItem")
);
const ItemType = lazy(() =>
  import("./Application/Inventory/ItemType/ItemType")
);


const Company = lazy(() =>
  import("./app/bizapp/enterp/Company")
);
const SalesRepOrder = lazy(() => import("./Application/Order/SalesROrder"));
const IssueNote = lazy(() => import("./Application/Order/IssueNote"));

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>

          <div className={`app ${toggled ? 'toggled' : ''}`}>
            <main >

            <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route
                path="unauthorized"
                element={
                  <Suspense fallback={<>...</>}>
                    <Unauthorized />
                  </Suspense>
                }
              />
                <Route >
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<>...</>}>
                        <AppHome />
                      </Suspense>
                    }

                  >

                  />

                  <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >

                    <Route
                      path="/"
                      element={
                        <Suspense fallback={<>...</>}>
                          <Dashboard />
                        </Suspense>
                      }
                    />
                    <Route
                      path="inventory_item/:objId"
                      element={
                        <Suspense fallback={<>...</>}>
                          <InventoryItem />
                        </Suspense>
                      }
                    />
                    <Route
                      path="item_types"
                      element={
                        <Suspense fallback={<>...</>}>
                          <ItemType />
                        </Suspense>
                      }
                    />
                    <Route
                      path="user"
                      element={
                        <Suspense fallback={<>...</>}>
                          <FndUser />
                        </Suspense>
                      }
                    />
                    <Route
                      path="company"
                      element={
                        <Suspense fallback={<>...</>}>
                          <Company />
                        </Suspense>
                      }
                    />
                 <Route
                        path="Salesreporder"
                        element={
                          <Suspense fallback={<>...</>}>
                            <SalesRepOrder />
                          </Suspense>
                        }
                      />
                      <Route
                        path="Issuenote"
                        element={
                          <Suspense fallback={<>...</>}>
                            <IssueNote />
                          </Suspense>
                        }
                      />


                      {/*<Route path='users' element={<FndUsers />} />
            <Route path='user_role' element={<UserRole />} />
            <Route path='user_roles' element={<UserRoles />} />
            <Route path='project' element={<Project />} />
            <Route path='covering_types' element={<CoveringType />} />
            <Route path='material' element={<Material />} />
            <Route path='material_groups' element={<MaterialGroup />} />
            <Route path='unit_measure' element={<IsoUnit />} />            
            */}

                    </Route>
                    <Route
                      path="*"
                      element={
                        <Suspense fallback={<>...</>}>
                          <Page404 />
                        </Suspense>
                      }
                    />
                  </Route>

                </Route>
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<>...</>}>
                      <Page404 />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;