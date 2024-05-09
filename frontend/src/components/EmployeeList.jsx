import React, { useState, useEffect } from 'react';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    
    fetch('http://localhost:3000/employees') 
      .then(response => response.json())
      .then(data => {
        
        setEmployees(data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []); 

  const handleEdit = (employeeId, employeeData) => {
    setEditingEmployeeId(employeeId);
    setFormData(employeeData);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
   
    fetch(`http://localhost:3000/employees/${editingEmployeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(updatedEmployee => {
        
        const updatedEmployees = employees.map(employee =>
          employee._id === updatedEmployee._id ? updatedEmployee : employee
        );
        setEmployees(updatedEmployees);
        setEditingEmployeeId(null); 
        setFormData({}); 
      })
      .catch(error => {
        console.error('Error updating employee data:', error);
      });
  };

  const handleDelete = (employeeId) => {
    
    fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: 'DELETE',
    })
      .then(() => {
        
        const updatedEmployees = employees.filter(employee => employee._id !== employeeId);
        setEmployees(updatedEmployees);
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  const handleSearch = () => {
   
    fetch(`http://localhost:3000/employees/search?keyword=${searchKeyword}`)
      .then(response => response.json())
      .then(data => {
      
        setEmployees(data);
      })
      .catch(error => {
        console.error('Error searching employee data:', error);
      });
  };

  return (
    <div>
      <h2>Employee List</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchKeyword}
        onChange={e => setSearchKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            <div>Name: {employee.name}</div>
            <div>Email: {employee.email}</div>
            
            {editingEmployeeId === employee._id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                />
                
                <button onClick={handleSubmit}>Save</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleEdit(employee._id, employee)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
