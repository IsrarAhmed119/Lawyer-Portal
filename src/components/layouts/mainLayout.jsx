import React from "react";
import NavBar from './../webPages/navBar';
import Footer from './../webPages/footer';



const WebLayout = (props) => {
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default WebLayout;
