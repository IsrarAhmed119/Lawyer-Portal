import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className=" navbar-dark adminSideBar">
          <ul class="navbar  flex-column">
            <li class="nav-item">
              <Link className="nav-link" to="/allLawyers">
                All Lawyers
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/allLawfirms">
                All LawyFirms
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/allUsers">
                All Users
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Sidebar;
