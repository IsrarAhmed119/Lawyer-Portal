import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../services/authService";


class Header extends Component {
  state = {};

  componentDidMount() {
    // console.log("navbar_cdm_call_getCurrentUser");
    const user = getCurrentUser();
    this.setState({ user });

  }
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <div>
          <nav class="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a class="navbar-brand" href="#">
                Welcome to your Dashboard
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                class="collapse navbar-collapse container"
                id="navbarNavDropdown"
              >
                {!user && (
                  <React.Fragment>
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item active">
                        <Link class="nav-link" href="#">
                          Not_LoggedIn
                        </Link>
                      </li>
                    </ul>
                  </React.Fragment>
                )}
                {user && (
                  <React.Fragment>
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item active">
                        <Link class="nav-link" href="#">
                          {user.user.name}
                        </Link>
                      </li>
                      <li class="nav-item active">
                        <Link class="nav-link" to={`/logout`}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </React.Fragment>
                )}
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
