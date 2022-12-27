
import React from 'react'
import styled from 'styled-components'
interface UserStatusModel {
  userStatus:boolean
}
interface WrapperProps {
  online:boolean
}
export default function UserStatus({userStatus}:UserStatusModel) {
  const Status = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props:WrapperProps) => props.online ? "rgb(12, 189, 12)" : "transparent"};
  border: ${props => props.online ? "none" : "2px solid rgb(124, 122, 122)"};
  border-radius: 50%;
  margin-right: 30px;
  text-align: right;
  

  `
  return (
      <Status online={userStatus}></Status>
  )
}
