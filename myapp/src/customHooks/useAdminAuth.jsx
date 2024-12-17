import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { checkUserIsAdmin } from '../Utils'
import { useNavigate } from 'react-router-dom'


const useAdminAuth = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      navigate('/login');
    }
  }, [currentUser, navigate])

  return currentUser
}

export default useAdminAuth