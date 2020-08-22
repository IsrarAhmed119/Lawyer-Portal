import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";
import {getCurrentUser,logout} from '../../services/authService'

class NavBar extends Component {
  state = {};

 async componentDidMount() {
    console.log("navbar_cdm--->>");
    const user = await getCurrentUser();
    if(user){
      console.log("navbar_cdm_user", user);
      this.setState({ user });

      console.log("navbar_cdm_user_role", user.user.role);
      const role = user.user.role;
      this.setState({ role: role });
    }
  }

  handleLogout(){
    console.log("handleLogout---->");
    logout();
    window.location = "/";
  }
  handleProfile() {
    const { user } = this.state;
    console.log("NavBar_cur_user---->", user);
    console.log("NavBar_cur_user---->", user.user.role);
    if (user.user.role === "admin") {
      window.location = "/home";
    }
    if (user.user.role === "employeer") {
      window.location = "/UserProfile";
    } else {
      window.location = "/LawyerProfile";
    }
  }
  render() {
    const { user } = this.state;

    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand " to="/">
            Easy_Law
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Find Lawyer
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <NavLink className="dropdown-item" to={`/familylawyer`}>
                    Family Lawyer
                  </NavLink>
                  <NavLink className="dropdown-item" to={`/businesslawyer`}>
                    Business Lawyer
                  </NavLink>
                </div>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Find LawFirm
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <NavLink className="dropdown-item" to={`/familylawfirm`}>
                    Family LawFirm
                  </NavLink>
                  <NavLink className="dropdown-item" to={`/businesslawfirm`}>
                    Business LawFirm
                  </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/aboutus`}>
                  AboutUs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/contactus`}>
                  ContactUs
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="nav-item dropdown userIcon">
            <NavLink
              className="nav-link"
              to="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="div-circle">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
              </div>
            </NavLink>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              {!user && (
                <React.Fragment>
                  <NavLink className="dropdown-item" to={`/SigninLawyer`}>
                    Login Lawyer
                  </NavLink>
                  <NavLink className="dropdown-item" to={`/SignupLawyer`}>
                    Signup Lawyer
                  </NavLink>
                  <NavLink className="dropdown-item" to={`/SignupUser`}>
                    Signup User
                  </NavLink>
                  <NavLink className="dropdown-item" to={`/SigninUser`}>
                    Login User
                  </NavLink>
                  <NavLink className="dropdown-item" to={`/SigninAdmin`}>
                    Login Admin
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink className="dropdown-item" to="#">
                    {user.user.name}
                  </NavLink>
                  {/* <NavLink
                    className="dropdown-item"
                    // onClick={this.handleProfile()}
                    to={`/profile`}
                    // to="#"
                  >
                    Profile
                  </NavLink> */}
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => this.handleProfile()}
                  >
                    Profile
                  </Link>

                  <Link className="dropdown-item"
                   to="#"
                   onClick={() => this.handleLogout()}
                   >
                    Logout
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
