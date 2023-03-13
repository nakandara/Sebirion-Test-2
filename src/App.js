import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "./styles.scss";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./app/dashboard/Dashboard";
import PrimarryAccount from "./app/dashboard/Primarry Account/PrimarryAccount";
import Actions from "./app/dashboard/Actions/Actions";

const Page404 = lazy(() => import("./components/pages/page404/Page404"));
const AppHome = lazy(() => import("./components/pages/home/AppHome"));
const Unauthorized = lazy(() => import("./components/pages/Unauthorized"));
const Login = lazy(() => import("./app/login/Login"));

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <div className={`app ${toggled ? "toggled" : ""}`}>
            <main>
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
                  <Route>
                    <Route
                      path="/"
                      element={
                        <Suspense fallback={<>...</>}>
                          <AppHome />
                        </Suspense>
                      }
                    >
                      <Route
                        path="/"
                        element={
                          <Suspense fallback={<>...</>}>
                            <Dashboard />
                          </Suspense>
                        }
                      />
                      <Route
                        path="Actions"
                        element={
                          <Suspense fallback={<>...</>}>
                            <Actions />
                          </Suspense>
                        }
                      />
                      <Route
                        path="primaryAcounts"
                        element={
                          <Suspense fallback={<>...</>}>
                            <PrimarryAccount />
                          </Suspense>
                        }
                      />
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
