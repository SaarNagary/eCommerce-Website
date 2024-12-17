import React from 'react'
import { useAdminAuth } from '../customHooks'

const WithAdmitAuth = ({children}) => {
  const currentUser = useAdminAuth();

  if(!currentUser) {
    return null;
  }

  return <>{children}</>
}

export default WithAdmitAuth