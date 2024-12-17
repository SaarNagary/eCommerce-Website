import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import "./styles.css";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Button";
import AuthWrapper from "../AuthWrapper";
import { signUpUserStart } from "../../redux/User/user.actions";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {currentUser, userErr} = useSelector((state) => state.user)
  const [signUser, setSignUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors : []
  });

  useEffect(() => {
    if (currentUser) {
      setSignUser({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors : []
      });
      navigate('/'); 
    }
  }, [currentUser, navigate])

  useEffect(() => {
    if(Array.isArray(userErr) && userErr.length > 0) {
      setSignUser((prevState) => ({
        ...prevState,
        errors : userErr
      }))
    }
  }, [userErr])

  const headline = "Registration";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUserStart(signUser));

 
  };
  return (
    <AuthWrapper headline={headline}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={signUser.displayName}
            placeholder="Full Name"
            onChange={handleChange}
          />

          <FormInput
            type="email"
            name="email"
            value={signUser.email}
            placeholder="Email"
            onChange={handleChange}
          />

          <FormInput
            type="password"
            name="password"
            value={signUser.password}
            placeholder="Password"
            onChange={handleChange}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={signUser.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <Button type="submit">Register</Button>
        </form>

        {signUser.errors.length > 0 && (
        <div className="error-message">
          {signUser.errors[0]}
        </div>
      )}
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
