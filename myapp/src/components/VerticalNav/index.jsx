import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from './../UserProfile';
import './styles.css';

const VerticalNav = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="verticalNav">
      <UserProfile currentUser={currentUser} />
      <div className="menu">{children}</div>
    </div>
  );
};

export default VerticalNav;
