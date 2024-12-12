import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Data from './Data';
import { useNavigate } from "react-router-dom";
import About from './About';
import Contact from './Contact';
import Success from './Success';
import Paypal from './Paypal';
function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <h2> Welcome to Registration Portal</h2>
      
      <BrowserRouter>
      <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/paypal">Paypal</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">ContactMe</Link>
      <Link to="/sucess">Sucess</Link>
      </nav>
        <Routes>
             <Route path="/register" element={<Register />} />
             <Route path="/login" element={<Login />} />
             <Route path="/paypal" element={<Paypal />} />
             <Route path="/data" element={<Data />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/sucess" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
