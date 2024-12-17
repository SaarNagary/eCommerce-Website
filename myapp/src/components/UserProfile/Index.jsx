import React from 'react';
import './styles.css';
import userIMG from './../../assets/userIMG.png'

const UserProfile = ({ currentUser }) => {
  const displayName = currentUser?.displayName || 'User';

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <img src={userIMG} alt="User profile" />
          </div>
        </li>
        <li>
          <span className="displayName">{displayName}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
