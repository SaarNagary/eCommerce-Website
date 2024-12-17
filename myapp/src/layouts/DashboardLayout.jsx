import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../redux/User/user.actions';

import Header from './../components/Header';
import VerticalNav from './../components/VerticalNav';
import Footer from './../components/Footer';

const DashBoardLayout = ({ children }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="dashboardLayout">
      <Header />
      <div className="controlPanel">
        <aside className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <span
                  className="signOut"
                  onClick={handleSignOut}
                >
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </aside>
        <main className="content">
          {children || <p>No content available</p>}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
