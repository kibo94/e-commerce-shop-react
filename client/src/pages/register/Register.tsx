import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import { checkAllFieldsAreValid } from '../../utils/utils';
import "./Register.scss"
interface RegisterModel {
  user:User
}
export const Register = ({user}:RegisterModel) => {
  const [registerData,setRegisterData] = useState( {
    name:{
      touched:false,
      value : false
    },
    email:{
      touched:false,
      value : false
    },
    password:{
      touched:false,
      value : false
    },

  })

  const navigate = useNavigate();
  useEffect(() => {
    // if(!user) {
    //   navigate("/home");
    // }
  }, [navigate,user])
  const onChangeInput = (e:any) => {
    setRegisterData({...registerData,[e.target.name]:{value:e.target.value.length > 0,touched:true}})


  }
  const registerUser = (e:any) => {
    e.preventDefault()
    axios.post('/users',{...registerData,userName:registerData.email})
    navigate("/login");
  }
  console.log(registerData)
  return (
    <div className="register form">
      <form onSubmit={registerUser} >
      <input onChange={onChangeInput} placeholder="Enter Full Name..." type="text" name="name" />
       {!registerData.name.value && registerData.name.touched ? <p className="err">Name  can't be empty</p> : null} 
        <input onChange={onChangeInput} placeholder="Enter Email..." type="text" name="email" />
        {!registerData.email.value && registerData.email.touched ?  <p className="err">Email can't be empty</p> : null} 
        <input onChange={onChangeInput}  placeholder="Enter password..."   name="password" type="password"/>
        {!registerData.password.value && registerData.password.touched? <p className="err">Password can't be empty</p> : null} 
        <input disabled={ !checkAllFieldsAreValid(registerData)} type="Submit"  value="Register" className='send'/>
      </form>
    </div>
  )
}
