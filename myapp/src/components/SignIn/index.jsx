import React, { useEffect, useState } from "react";
import "./styles.css";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart} from "../../redux/User/user.actions";


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userIn, setUserIn] = useState({ email: '', password: '' });

  const headline = 'Login';

  const {currentUser} = useSelector((state) => state.user);


  useEffect(() => {
    if(currentUser) {
      setUserIn({ email: '', password: '' }); 
      navigate('/', {replace : true}); // השתמש ב-navigate להעברת המשתמש לדף אחר אחרי התחברות מוצלחת

    }
  }, [currentUser,dispatch , navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart(userIn));
  }; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserIn(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGoogleSignIn = () =>{
    dispatch(googleSignInStart())
  }

  return (
    <AuthWrapper headline={headline}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={userIn.email}
            placeholder="Email"
            onChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={userIn.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <Button type="submit">
            Log In
          </Button>
          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
