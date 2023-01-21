import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { checkAllFieldsAreValid, validateField } from "../../utils/utils";
import "./Login.scss";

interface LoginModel {
  login: (username: string, password: string, id: any,name:string) => void;
  user: User;
}
export const Login = ({ login, user }: LoginModel) => {
  const [authError, setAuthError] = useState("");
  let [loginData, setLoginData] = useState({
    email: {
      touched: false,
      message: "",
      value: "",
    },
    password: {
      touched: false,
      message: "",
      value: "",
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);
  const loginUser = async () => {
    const userName = loginData.email.value;
    const password = loginData.password.value;

    const users = await axios.get("/users");

    const findedUser = users?.data.find(
      (user: User) => user.userName == userName && user.password === password
    );
    if (findedUser) {
      login(userName, password, findedUser?.id,findedUser?.name);

      await axios.post("/logedUsers", findedUser);
      navigate("/home");
    } else {
      setAuthError("Username or password is incorrect");
    }
  };

  const onChangeHandler = (e: any) => {
    setLoginData({
      ...loginData,
      [e.target.name]: {
        touched: true,
        value: e.target.value,
        message: validateField(e.target.name, e.target.value),
      },
    });
  };
  const onLoginSubmit = async (e: any) => {
    e.preventDefault();
    await loginUser();
  };
  return (
    <div className="login form">
      <form onSubmit={onLoginSubmit}>
        <input
          className={loginData.email.message.length > 0 ? "err" : ""}
          placeholder="Enter Email..."
          type="text"
          onChange={onChangeHandler}
          name="email"
        />
        {loginData.email.touched && loginData.email.message.length > 0 ? (
          <p className="err">{loginData.email.message}</p>
        ) : null}

        <input
          className={loginData.password.message.length > 0 ? "err" : ""}
          placeholder="Enter password..."
          type="text"
          onChange={onChangeHandler}
          name="password"
        />
        {loginData.password.message.length > 0 && loginData.password.touched ? (
          <p className="err">{loginData.password.message}</p>
        ) : null}
        <input
          type="submit"
          disabled={!checkAllFieldsAreValid(loginData)}
          className="send"
          value="Login"
        />
      </form>
      {authError ? <p className="err">email or passwor are wrong</p> : null}
    </div>
  );
};
