import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomepageLayout = ({currentUser, children}) =>{
  return (
    <div className="fullHeight">
      <Header currentUser={currentUser}/>
        {children}
        <Footer/>
    </div>
  )
}

export default HomepageLayout;