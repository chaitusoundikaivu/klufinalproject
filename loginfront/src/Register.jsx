import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
function Register () {

    const navigate=useNavigate();
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
      setRegister({
        ...register,
        [e.target.name]:e.target.value
      })

    }
    const notify = () =>toast("Registered Successfully!");
     const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(register);

        try{
            const response = await axios.post('http://localhost:8086/addUser', register);
            console.log(response.data);
             alert("User added successfully");
            navigate('/login');


       } catch(error){
        console.log(error);

       }
       
}
    
    return (
       <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Registration Page</h2>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={register.name}
          onChange={handleChange}
        />
        <br /><br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={register.email}
          onChange={handleChange}
        />
        <br /><br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={register.password}
          onChange={handleChange}
        />
        <br /><br />

        <button onClick={notify}>Register</button>
      </form>
      <ToastContainer />
    </div>
    )
}

export default Register;