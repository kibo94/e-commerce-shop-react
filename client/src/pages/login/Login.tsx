import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { checkAllFieldsAreValid } from "../../utils/utils";
import "./Login.scss";

interface LoginModel {
  login: (username: string, password: string, id: any) => void;
  user: User;
}
export const Login = ({ login, user }: LoginModel) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordeRef = useRef<HTMLInputElement>(null);
  const [authError, setAuthError] = useState("");
  let [loginData,setLoginData] = useState({
    username:{
      touched:false,
      value:false
    },
    password:{
      touched:false,
      value:false
    }
    

  })

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);
  const loginUser = async () => {
    const userName = usernameRef.current?.value;
    const password = passwordeRef.current?.value;
  
    const users = await axios.get("/users");

    const findedUser = users?.data.find(
      (user: User) => user.userName == userName && user.password === password
    );
    console.log(findedUser)
    if (findedUser) {
      login(
        usernameRef.current!.value,
        passwordeRef.current!.value,
        findedUser?.id
      );
      await axios.post("/logedUsers", findedUser);
      navigate("/home");
    } else {
      setAuthError("Username or password is incorrect");
    }
  };
  const onChangeHandler = (e:any) => {
      setLoginData({...loginData,[e.target.name]:{value:e.target.value.length > 0,touched:true}})
 
 }
  const onLoginSubmit = async (e: any) => {
    e.preventDefault();
    await loginUser();
  };
  console.log(loginData)
  return (
    <div className="login form">
      <form onSubmit={onLoginSubmit}>
        <input ref={usernameRef} placeholder="Enter username..." type="text"  onChange={onChangeHandler} name="username"/>
        {!loginData.username.value && loginData.username.touched? (
          <p className="err">user name can be empty</p>
        ) : null}

        <input ref={passwordeRef} placeholder="Enter password..." type="text" onChange={onChangeHandler} name="password" />
        {!loginData.password.value && loginData.password.touched ? (
          <p className="err">password name can be empty</p>
        ) : null}
        <input type="submit" disabled={!checkAllFieldsAreValid(loginData)} className="send" value="Login" />
      </form>
      {authError ? <p className="err">username or passwor are wrong</p> : null}
    </div>
  );
};
