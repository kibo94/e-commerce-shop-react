import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import "./Login.scss";

interface LoginModel {
  login: (username: string, password: string, id: any) => void;
  user: User;
}
export const Login = ({ login, user }: LoginModel) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordeRef = useRef<HTMLInputElement>(null);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);
  const loginUser = async () => {
    const userName = usernameRef.current?.value;
    const password = passwordeRef.current?.value;
    if (userName?.length == 0) {
      return;
    }
    if (password?.length == 0) {
      return;
    }
    const users = await axios.get("/users");

    const findedUser = users?.data.find(
      (user: User) => user.userName == userName && user.password === password
    );
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
  const onLoginSubmit = async (e: any) => {
    e.preventDefault();
    await loginUser();
  };

  return (
    <div className="login form">
      <form onSubmit={onLoginSubmit}>
        <input ref={usernameRef} placeholder="Enter username..." type="text" />
        {usernameRef.current?.value.length === 0 ? (
          <p className="err">user name can be empty</p>
        ) : null}

        <input ref={passwordeRef} placeholder="Enter password..." type="text" />
        {passwordeRef.current?.value.length === 0 ? (
          <p className="err">password name can be empty</p>
        ) : null}
        <input type="submit" />
      </form>
      {authError ? <p className="err">username or passwor are wrong</p> : null}
    </div>
  );
};
