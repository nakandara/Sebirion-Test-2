import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/pages/Layout';

import RequireAuth from './components/pages/RequireAuth';
// import IsoUnit from './components/Application/AppBase/IsoUnit/IsoUnit';

const Page404 = lazy(()=>import('./components/pages/page404/Page404'));
const Home = lazy(() => import('./components/pages/home/Home'));
const AppHome = lazy(() => import('./components/pages/home/AppHome'));
const Unauthorized = lazy(() => import('./components/pages/Unauthorized'));
// const UserRole = lazy(() => import('./components/enterp/UserRole'));
// const UserRoles = lazy(() => import('./components/enterp/UserRoles'));
// const Project = lazy(() => import('./components/Application/Proj/Project/Project'));
// const Material = lazy(() => import('./components/Application/Manufacturing/Material/Material'));
// const MaterialGroup = lazy(() => import('./components/Application/Manufacturing/MaterialGroup/MaterialGroup'));
// const CoveringType = lazy(() => import('./components/Application/Invent/CoveringTypes/CoveringType'));
const Login = lazy(() => import('./Application/fndbas/Login/Login'));
// const FndUser = lazy(() => import('./Application/Enterprise/User/FndUser'));
// const FndUsers = lazy(() => import('./Application/Enterprise/FndUsers/FndUsers'));
const InventoryItem = lazy(() => import('./Application/Inventory/InventoryItem/InventoryItem'));
const ItemType = lazy(() => import('./Application/Inventory/ItemType/ItemType'));

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="login" element={<Suspense fallback={<>...</>}><Login /></Suspense>} />
        <Route path="unauthorized" element={<Suspense fallback={<>...</>}><Unauthorized /></Suspense>} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/" element={<Suspense fallback={<>...</>}><AppHome /></Suspense>}>
            <Route path='/' element={<Suspense fallback={<>...</>}><Home /></Suspense>} />
            <Route path='inventory_item/:objId' element={<Suspense fallback={<>...</>}><InventoryItem /></Suspense>} />
            <Route path='item_types' element={<Suspense fallback={<>...</>}><ItemType /></Suspense>} /> 
            {/* <Route path='user' element={<FndUser />} />
            <Route path='users' element={<FndUsers />} />
            <Route path='user_role' element={<UserRole />} />
            <Route path='user_roles' element={<UserRoles />} />
            <Route path='project' element={<Project />} />
            <Route path='covering_types' element={<CoveringType />} />
            <Route path='material' element={<Material />} />
            <Route path='material_groups' element={<MaterialGroup />} />
            <Route path='unit_measure' element={<IsoUnit />} />            
            */}
          </Route>
          <Route path="*" element={<Suspense fallback={<>...</>}><Page404 /></Suspense>} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
