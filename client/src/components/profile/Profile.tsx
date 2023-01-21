import React from "react";
import { User } from "../../models/User";
import "./Profile.scss";
interface ProfileModel {
  user: User;
}
function Profile({ user }: ProfileModel) {
  return (
    <div className="profile">
      <ul>
        <h4>Profile</h4>
        <li>Full Name : {user.name}</li>
        <li>User Name : {user.userName}</li>
        <li>Age : 20</li>
        <li>Address : Ulica 422 br 3</li>
        
      </ul>
    </div>
  );
}

export default Profile;
