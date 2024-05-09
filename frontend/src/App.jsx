// App.jsx

import { useState,Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navigation from './components/Navigation';
import CreateEmp from './components/CreateEmp';
import EmployeeList from './components/EmployeeList';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navigation />
        <Routes>
        <Route exact path='/' element={<Login/>}/>
          
            <Route exact path='/dashboard' element={<Dashboard/>}/>
          
          <Route exact path='/createemp' element={<CreateEmp/>}/>
          <Route exact path='/Emplist' element={<EmployeeList/>}/>
        </Routes>
      </Fragment>
    </Router>
    
  );
}
export default App;