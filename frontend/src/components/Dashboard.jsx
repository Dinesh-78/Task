// Dashboard.jsx

import { Routes, Route } from 'react-router-dom';
import Navigation from "./Navigation";
import CreateEmp from "./CreateEmp";
import EmployeeList from "./EmployeeList";

function Dashboard() {
  return (
    <div className="app">
        <Fragment>
      <Navigation />
      <Routes>
        <Route path="/createemp" element={<CreateEmp />} />
        <Route path="/emplist" element={<EmployeeList />} />
      </Routes>
      </Fragment>
    </div>
  );
}

export default Dashboard;
