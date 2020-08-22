import React, { Component } from "react";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="container m-0 p-0">
          <div className=" dashboard-height">
              <div className="row ">
                <div className="col-md-4"></div>
                <div className="col-md-4 mt-5">
                  <h3>Welcome to Dashborad</h3>
                </div>
                <div className="col-md-4"></div>
              </div>     
          </div>     
        </div>
        
      </React.Fragment>
    );
  }
}

export default Dashboard;
