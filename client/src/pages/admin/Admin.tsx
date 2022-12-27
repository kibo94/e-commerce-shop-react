import axios from "axios";
import React , {useEffect,useState} from "react";
import UserStatus from "../../components/userStatus/UserStatus";
import { User } from "../../models/User";
import LogedInUsers from "./logedInUsers/LogedInUsers";

const Admin = () => {
  const [logedUsers,setLogedUsers] = useState([])
  useEffect(() => {
     axios.get('/logedUsers').then((users:any) => {
      console.log(users)
          setLogedUsers(users.data)
     })
  },[])
  return (
    <>
      <h1>Admin</h1>
    <LogedInUsers users={logedUsers}/>
    </>
  );
};

export default Admin;
