import axios from 'axios';
import React, { useState } from 'react';

function CreateEmp() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobileno: "",
    Designation: "",
    gender: "",
    Course: [],
    ImgUpload: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        
        setDetails((prevDetails) => ({
          ...prevDetails,
          Course: [...prevDetails.Course, name],
        }));
      } else {
        
        setDetails((prevDetails) => ({
          ...prevDetails,
          Course: prevDetails.Course.filter((course) => course !== name),
        }));
      }
    } else if (type === 'file') {
      setDetails({ ...details, ImgUpload: e.target.files[0] });
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(details); 
    axios.post("http://localhost:3000/empcreate",details).then(res => console.log(res));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>NAME</label>
        <input type="text" name="name" value={details.name} onChange={handleChange} /><br />

        <label>EMAIL</label>
        <input type="text" name="email" value={details.email} onChange={handleChange} /><br />

        <label>MOBILE NO</label>
        <input type="text" name="mobileno" value={details.mobileno} onChange={handleChange} /><br />

        <label>DESIGNATION</label>
        <input type="text" name="Designation" value={details.Designation} onChange={handleChange} /><br />

        <label>GENDER</label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={details.gender === 'male'}
          onChange={handleChange}
        /> Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={details.gender === 'female'}
          onChange={handleChange}
        /> Female<br />

        <label>COURSE</label><br/>
        MCA
        <input
          type="checkbox"
          name="MCA"
          checked={details.Course.includes("MCA")}
          onChange={handleChange}
        /> <br />
        BCA
        <input
          type="checkbox"
          name="BCA"
          checked={details.Course.includes("BCA")}
          onChange={handleChange}
        /> <br />
        BSC
        <input
          type="checkbox"
          name="BSC"
          checked={details.Course.includes("BSC")}
          onChange={handleChange}
        /> <br />

        <label>IMG UPLOAD</label>
        <input type="file" name="ImgUpload" onChange={handleChange} /><br />

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default CreateEmp;
