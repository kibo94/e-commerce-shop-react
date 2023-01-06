import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import { checkAllFieldsAreValid, validateField } from '../../utils/utils';
import "./Register.scss"
interface RegisterModel {
  user:User
}
export const Register = ({user}:RegisterModel) => {
  const [registerData,setRegisterData] = useState( {
    name:{
      touched:false,
      message : ""
    },
    email:{
      touched:false,
      message : ""
    },
    password:{
      touched:false,
      message : ""
    },

  })

  const navigate = useNavigate();
  useEffect(() => {
    // if(!user) {
    //   navigate("/home");
    // }
  }, [navigate,user])
  const onChangeInput = (e:any) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: {
        touched: true,
        message: validateField(e.target.name, e.target.value),
      },
    });
  }
  const registerUser = (e:any) => {
    e.preventDefault()
    axios.post('/users',{...registerData,userName:registerData.email})
    navigate("/login");
  }

  return (
    <div className="register form">
      <form onSubmit={registerUser} >
      <input onChange={onChangeInput} placeholder="Enter Full Name..." type="text" 
        className={registerData.name.message.length > 0 ? "err" : ""}name="name" />
       {registerData.name.message.length > 0 && registerData.name.touched ? <p className="err">{registerData.name.message}</p> : null} 
        <input onChange={onChangeInput} placeholder="Enter Email..." type="text" 
              className={registerData.email.message.length > 0 ? "err" : ""}
        name="email" />
        {registerData.email.message.length > 0 && registerData.email.touched ?  <p className="err">{registerData.email.message}</p> : null} 
        <input   className={registerData.password.message.length > 0 ? "err" : ""} onChange={onChangeInput}  placeholder="Enter password..."   name="password" type="password"/>
        {registerData.password.message.length > 0 && registerData.password.touched? <p className="err">{registerData.password.message}</p>: null} 
        <input  disabled={ !checkAllFieldsAreValid(registerData)} type="Submit"  value="Register" className='send'/>
      </form>
    </div>
  )
}
