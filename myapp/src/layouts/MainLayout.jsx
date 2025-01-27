import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = ({currentUser, children}) =>{
  return (
    <div>
      <Header {...currentUser}/>
      <div className="main">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout;