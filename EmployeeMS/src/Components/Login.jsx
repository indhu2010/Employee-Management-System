// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  axios.defaults.withCredentials = true; // requesting the cors


 
  const handleSubmit = (event)=>{
    event.preventDefault()
    axios.post('http://localhost:3000/auth/adminlogin',values)  // to call server side app checking the credentials with the database 
    .then( result =>{
      if(result.data.loginStatus){
        navigate('/dashboard')
      }
      else{
      setError(result.data.Error)
      }
      
       })
    .catch(err => console.log(err))   
                        
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
       <div className='p-3 rounded w-25 border loginForm'>
      <div className='text-danger'>
        {error && error} 
      </div>
      
       <h2>Login Page</h2>
       
       <form onSubmit = {handleSubmit}>
        <div className = 'mb-3'>
            <label htmlFor="email"> <strong>Email:</strong> </label>
            <input type="text" name="email" autoComplete='off' placeholder='Enter your email' 
           onChange= {(e) => setValues({...values, email : e.target.value })}  className='form-control rounded-0'/>
        </div>
    
        <div  className = 'mb-3'>
            <label htmlFor="password"> <strong>Password:</strong> </label>
            <input type="password" name="password"  placeholder='Enter Password' 
            onChange= {(e) => setValues({...values, password : e.target.value })}  className='form-control rounded-0'/>
        </div>
      <button className='btn btn-success w-100 rounded-0 mb-2 '> Login in </button>
  
      
      <div  className = 'mb-1'>
      <input type="checkbox" name="tick"  id = "tick" className='me-2' />
            <label htmlFor="password"> You are agree with terms & conditions </label>
            
      </div>


       </form>
    </div>
    </div>
  )
}

export default Login

