import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Layout from './components/pages/Layout';

import Unauthorized from './components/pages/Unauthorized';
import RequireAuth from './components/pages/RequireAuth';
import AppHome from './components/pages/home/AppHome';
import Home from './components/pages/home/Home';
import FndUsers from './components/Application/Enterp/FndUsers/FndUsers'
import UserRole from './components/enterp/UserRole';
import UserRoles from './components/enterp/UserRoles';
import Project from './components/Application/Proj/Project/Project'
import FndUser from './components/Application/Enterp/User/FndUser';
import Material from './components/Application/Manufacturing/Material/Material';
import MaterialGroup from './components/Application/Manufacturing/MaterialGroup/MaterialGroup';
import IsoUnit from './components/Application/AppBase/IsoUnit/IsoUnit';
import Page404 from './components/pages/page404/Page404';
import CoveringType from './components/Application/Invent/CoveringTypes/CoveringType';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/" element={<AppHome />}>
            <Route path='/' element={<Home />} />
            <Route path='user' element={<FndUser />} />
            <Route path='users' element={<FndUsers />} />
            <Route path='user_role' element={<UserRole />} />
            <Route path='user_roles' element={<UserRoles />} />
            <Route path='project' element={<Project />} />
            <Route path='covering_types' element={<CoveringType />} />
            <Route path='material' element={<Material />} />
            <Route path='material_groups' element={<MaterialGroup />} />
            <Route path='unit_measure' element={<IsoUnit />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
