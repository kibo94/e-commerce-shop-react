import React from 'react'
import { User } from '../../../models/User'

function LogedInUsers({users}:any) {
  return (
    <h2>Loged in users : {users.length}  </h2>
  )
}

export default LogedInUsers