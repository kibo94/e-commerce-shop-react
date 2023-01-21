import axios from "axios";
import React , {useEffect,useState} from "react";
import { useNavigate } from "react-router";
import UserStatus from "../../components/userStatus/UserStatus";
import { User } from "../../models/User";
import LogedInUsers from "./logedInUsers/LogedInUsers";

const Admin = ({admin}:any) => {
  const [logedUsers,setLogedUsers] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    if (admin) {
      navigate("/admin");
    }
     axios.get('/logedUsers').then((users:any) => {
          setLogedUsers(users.data)
     })
  },[])
  return (
    <div className="Admin">
    <LogedInUsers users={logedUsers}/>
    </div>
  );
};

export default Admin;
