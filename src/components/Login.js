import React, { useEffect, useState } from "react";
import axios from "axios";


const initialFormValues = {
  username:'',
  password:''
}
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', formValues)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      props.history.push('/protected')
      console.log("success", res.data)
    })
    .catch( err => {
      console.log("Heres where you went wrong", err)
    })
  }

  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <p>Build a login page here</p>
      </h1>
      <form onSubmit = {login}>
        <label> Username:
          <input
            type = "text"
            name = "username" 
            values = {formValues.username}
            onChange = {handleChange}/>
        </label>
        <label>Password:
          <input
            type = "password"
            name = "password"
            values = {formValues.password}
            onChange = {handleChange}/>
        </label>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.