import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import "./styles.css";
import Button from "../Forms/Button";
import { resetPasswordStart, resetUserState } from "../../redux/User/user.actions";
import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { useNavigate } from "react-router-dom";


const EmailPassword = () => {
  const {resetPasswordSuccess, userErr} = useSelector((state) => ({
    resetPasswordSuccess : state.user.resetPasswordSuccess,
    userErr : state.user.userErr
  }));
  
  const dispacth = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(resetPasswordSuccess){
      dispacth(resetUserState());
      navigate('/login');
    }
  }, [resetPasswordSuccess, navigate])

  useEffect(() => {
    if(Array.isArray(userErr) && userErr.length > 0){
      setErrors(userErr);
    }
  }, [userErr])

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispacth(resetPasswordStart({email}))
    
  }; 

  const headline = "Email Password";
  return (
    <AuthWrapper headline={headline}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
           {errors.length > 0 && (
            <div className="errorMessages">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <Button type="submit">Send Password Reset Email</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
