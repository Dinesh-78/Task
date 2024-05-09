import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeEdit({ match }) {
  const [employee, setEmployee] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    
    axios.get(`http://localhost:3000/employees/${match.params.id}`)
      .then(response => {
        setEmployee(response.data);
        setFormData(response.data); 
      })
      .catch(error => {
        console.error('Error fetching employee:', error);
      });
  }, [match.params.id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/employees/${match.params.id}`, formData)
      .then(response => {
        console.log('Employee updated successfully:', response.data);
       
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        
      });
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
        <label>EMAI</label>
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EmployeeEdit;
