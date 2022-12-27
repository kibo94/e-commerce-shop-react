import { User } from "./User";

export interface HeaderProps {
    authUser:User,
    admin:boolean,
    online:boolean,
    logoutUser:any
  }