import React, { Component } from "react";
import { toast } from "react-toastify";
import * as useService from '../../../services/userService';

const baseURL = "http://localhost:5000/";

// server req
class UserDetails extends Component {
  state = {
    getData: "",
    isLoggedIn: "",
  };

  async componentDidMount() {
    await this.getUser();
  }

  async getUser() {
    const userId = this.props.match.params.id;
    const res = await useService.getUserProfile(userId);
    if (res.data.success) {
      this.setState({ getData: res.data.user });
    }
    else{
      toast.error("Error: Something went wrong. Failed to get data");
      // console.log("getUser_err----->>", res.data.error);
    }
  }

 

  render() {
    const user = this.state.getData;
    console.log("user_render-->>", user);

    return (
      <div className="container ">
        <div class="container profiesection ">
          <div class="row">
            <div class="col-sm-12 container ">
              <div className="row">
                <div className="col-sm-4 m-0 p-0">
                  <img
                    class="rounded d-block w-100"
                    src={baseURL + user.userImage}
                    alt="image"
                  />
                </div>
                <div className="col-sm-8">
                  <div className=" ">
                    <h5 className="card-title font-weight-bold mt-2 p-2">
                      Name: {user.name}
                    </h5>
                    <div className="d-flex justify-content-start ">
                      <h6 className="font-weight-bold m-0 pr-2">
                        Email: {user.email}
                      </h6>
                    </div>
                    <div className="d-flex flex-row pt-3">
                      <h5>
                        <i
                          className="fa fa-map-marker text-primary pr-2"
                          aria-hidden="true"
                        ></i>
                      </h5>
                      <p className=" font-weight-bold m-0 p-0">
                        Address: {user.address}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="font-weight-bold m-0 pr-2">
                        City: {user.city}
                      </h6>
                    </div>

                    <div className="d-flex flex-row mt-2 ">
                      <h5>
                        <i
                          class="fa fa-volume-control-phone pr-2"
                          aria-hidden="true"
                        ></i>
                      </h5>
                      <p className="card-text m-0 p-0">{user.contactNo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
