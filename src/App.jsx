import React, { useState } from 'react';
import {NavLink, Route, Routes} from 'react-router-dom'
import Auth from './components/Auth/Auth';
import style from './App.module.css'
const Home = React.lazy(() => import('./components/Home/Home'));

function App() {
  return (
    <div className={style.App}>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/main" element={<Home />} />
    </Routes>
    </div>
  );
}

export default App;
