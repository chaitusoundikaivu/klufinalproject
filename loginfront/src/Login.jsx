import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login () {

    const [password, setPasswordValue] = useState("");
    const [userId, setUserIdValue] = useState("");
    const navigate=useNavigate();
    const setPassword = (e) => {
        setPasswordValue(e.target.value);
    }

    const setUserId = (e) => {
        setUserIdValue(e.target.value);
    }

    

    const handleSubmit = async (e) => {
        //prevent default
        e.preventDefault();

        //api call
        console.log("this is our data "+ userId +"   "+ password )
        
        //create an object with userId and password for passing the api
        const data = {
            "userId": userId,
            "password": password
        }
        // const notify = () => toast("Login Successfull!");
        // const notify1 = () => toast("Login UnSuccessfull!");
        try{
            const response = await axios.post("http://localhost:8086/loginUser", data);

            console.log("this is the response " + response.data);
            if(!response.data) {
                
                // <button onClick={notify1}>Login</button>
                alert("Invalid User Id or Password");
                
            }
            else {
          
                 
                alert("Login Successfull");

                
                navigate('/data');

            }
            
        } catch(error) {
            console.error(error);
        }




    }

    const redirectToRegister = () => {
        window.location.href = "/register";
    }

    return (
        <>
        <div className="container">
           <form onSubmit={handleSubmit}>
           <h1> Login Page</h1>
            <label>User ID:</label>
            <input type="email" placeholder="Enter your user id" value={userId} onChange={setUserId}/>
            <br></br>
            <br></br>
            <label>Password:</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={setPassword}/>
            <br></br>
            <br></br>

            <a onClick={redirectToRegister}>don't have an account</a>
            <button type="submit">Login</button>
           </form>
        <ToastContainer />
        </div></>
    )
}

export default Login;