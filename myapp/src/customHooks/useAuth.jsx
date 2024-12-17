import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const useAuth = () =>{
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  
  useEffect(() =>{
    console.log("currentUser:", currentUser);
    if(!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  return currentUser;
}

export default useAuth;