import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Login = () => {
   const userRef = useRef();
   const passwordRef = useRef(); 
   const errRef = useRef();

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [errmsg, setErrmsg] = useState('');
   const navigateTo = useNavigate(); 

   useEffect(() => {
      userRef.current.focus();
   }, []);

   useEffect(() => {
      setErrmsg('');
   }, [username, password]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(username, password);
      try {
         const response = await axios.post("/adminlogin", {
           username,
           password,
         });
   
         if (response.data.message === "Login successful") {
           
           navigateTo('/dashboard'); 
           alert("You're successfully logged in");
         }
       } catch (error) {
         if (error.response && error.response.status === 401) {
           setErrmsg("Invalid username or password");
         } else {
           setErrmsg("An error occurred while logging in. Please try again later.");
         }
         console.error("Login error:", error);
       }
   
       setUsername('');
       setPassword('');
     };

   return (
      <>
         <div>
            <p ref={errRef} className={errmsg ? "err" : "offscreen"} aria-live="assertive">{errmsg}</p>
            <h1>LOGIN PAGE</h1>
            <form onSubmit={handleSubmit}>
               <label>USERNAME</label>
               <input type="text" id='username' ref={userRef} autoComplete="off" 
                  onChange={(e) => setUsername(e.target.value)} value={username} required />
               <label>PASSWORD</label>
               <input type="password" id='password' ref={passwordRef} 
                  onChange={(e) => setPassword(e.target.value)} value={password}
                  required />
               <button type="submit">SUBMIT</button> 
            </form>
         </div> 
      </>
   );
}

export default Login;
