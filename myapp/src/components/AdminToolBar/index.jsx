import React from "react";

import './styles.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserIsAdmin } from "../../Utils";

const AdminToolBar = () => {

  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = checkUserIsAdmin(currentUser);
  if(!isAdmin) {
    return null;
  }
  return (
    <div className="adminToolBar">
      <ul>
        <li>
          <Link to='/admin'>
            My Admin
          </Link>
        </li>
      </ul>

    </div>
  )
}

export default AdminToolBar