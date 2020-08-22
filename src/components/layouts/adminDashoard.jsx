import React from "react";
import Sidebar from "../adminpanel/Menu/sidebar";
import Header from "../adminpanel/Menu/Header";
const AdminLayout = props => {
  return (
    <React.Fragment>
      <div className="m-0 p-0">
        <div className="row m-0 p-0">
          <div className="col-md-12 m-0 p-0 ">
            <Header />
          </div>
        </div>
        <div className="row m-0 p-0">
          <div className="col-md-2 m-0 p-0 ">
            <Sidebar />
          </div>
          <div className="col-md-10 m-0 p-0 ">
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
