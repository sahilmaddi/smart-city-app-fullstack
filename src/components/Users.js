import React from 'react'
import UserForm from './UserForm'
import UsersList from './UsersList'

const Users = () => {
    const handleUserSubmit = (username) => {
        console.log('Submitted username:', username);
      };
  return (
    <div>
      <UserForm onSubmit={handleUserSubmit}/>
      <UsersList/>
    </div>
  )
}

export default Users
