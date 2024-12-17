import React from 'react'
import { useAuth } from '../customHooks'


const WithAuth = ({children}) => {
  const currentUser = useAuth();
  return currentUser ? children : null;
}

export default WithAuth;