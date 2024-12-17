import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../assets/saar1.png";
import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";


const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const totalNumCartItems = useSelector(selectCartItemsCount)
  const navigate = useNavigate();

  /*const handleSignOut = useCallback(() => {
    auth.signOut();
    dispatch(setCurrentUser(null))
    dispatch({type : 'SIGN_IN_SUCCESS', payload : false})
    navigate('/dashbord')
  }, [dispatch, navigate]);*/

  const SignOut = () => {
    dispatch(signOutUserStart());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Simple Logo" />
          </Link>
        </div>

        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          <ul>

            <li>
              <Link to="/cart">
                Your Cart ({totalNumCartItems})
              </Link>
            </li>
            {currentUser && [
              <li key="dashboard">
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li key="logout">
                <Link onClick={SignOut}>
                  {console.log("is current user")}
                  LogOut
                </Link>
              </li>,
            ]}

            {!currentUser && [
                <li key="register">
                  <Link to="/registration">
                    {console.log("is not current user")}
                    Register
                  </Link>
                </li>,
                <li key="login">
                  <Link to="/login">Login</Link>
                </li>
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
