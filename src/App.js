import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Application/Fndbase/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >

      </Route>
    </Routes>
  );
}

export default App;
