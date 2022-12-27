import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import "./Register.css"
interface RegisterModel {
  user:User
}
export const Register = ({user}:RegisterModel) => {
  const [registerData,setRegisterData] = useState( {
    name:"",
    email:"",
    password:"",

  })

  const navigate = useNavigate();
  useEffect(() => {
    if(!user) {
      navigate("/home");
    }
  }, [navigate,user])
  const onChangeInput = (e:any) => {
    setRegisterData({...registerData,[e.target.name]:e.target.value});


  }
  const registerUser = (e:any) => {
    e.preventDefault()
    axios.post('/users',{...registerData,userName:registerData.email})
    navigate("/login");
  }
  return (
    <div className="register form">
      <form onSubmit={registerUser} >
        <input onChange={onChangeInput} placeholder="Enter Full Name..." type="text" name="name" />
       {registerData.name.length == 0 ? <p className="err">Name  can't be empty</p> : null} 
        <input onChange={onChangeInput} placeholder="Enter Email..." type="text" name="email" />
        {registerData.email.length == 0 ? <p className="err">Email can't be empty</p> : null} 
        <input onChange={onChangeInput}  placeholder="Enter password..."   name="password" type="password"/>
        {registerData.password.length == 0 ? <p className="err">Password can't be empty</p> : null} 
        <input type="Submit"  value="Register" />
      </form>
    </div>
  )
}
