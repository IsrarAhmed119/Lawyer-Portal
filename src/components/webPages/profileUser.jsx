import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {getCurrentUser,logout} from '../../services/authService'
import { getUserProfile,deleteUserProfile } from './../../services/userService';

import dummyImg from "../../images/profile_placeholder.png";

const baseURL = "http://localhost:5000/";

class ProfileUser extends Component {
  state = {
    user: "",
  };

  async componentDidMount() {
    const currentUser = await getCurrentUser();
    // console.log("current__user", currentUser);
    if (currentUser) {
      this.getProfile(currentUser.user._id);
    }
  }

  async getProfile(id) {
    // let a ="3242klj2k34j2kl4j3"
    const res = await getUserProfile(id);
    if(res.data.success){
      // console.log("getProfile_res----->>", res.data);
      this.setState({
        user: res.data.user
      });
    }
    else{
      toast.error("Error: Something went wrong. Failed to get Profile data");
      // console.log("getProfile_err----->>", res.data.error);
    }
  }
 
  async userDelete(id) {
    const res = await deleteUserProfile(id);
    if(res.data.success){
      console.log("getProfile_res----->>", res);
      await logout();
      window.location = "/home";
    }
    else{
      toast.error("Error: Something went wrong. Failed to delete profile");
      // console.log("getProfile_err----->>", res.data.error);
    }

  }


  
  render() {
    const user = this.state.user;

    return (
      <div className="container pt-5">
        <div className="d-flex justify-content-start pt-5">
          <div className="d-flex flex-row bd-highlight mb-3">
            <div className="pl-3 bd-highlight font-weight-bold">
              <Link to={`/allcases`} className="font-weight-bold">
                All Cases
              </Link>
            </div>
            <div className="pl-3 bd-highlight font-weight-bold">
              <Link to={`/profileuser`} className="font-weight-bold">
                Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="container profiesection border border-info ">
          <div className="row">
            <div className="col-sm-12 container ">
              <div className="row">
                {user.userImage ? (
                  <div className="col-sm-4 m-0 p-0">
                    <img
                      className="rounded d-block w-100"
                      src={baseURL + user.userImage}
                      alt="image"
                    />
                  </div>
                ) : (
                  <div className="col-sm-4 m-0 p-0">
                    <img
                      className="rounded d-block w-100"
                      src={dummyImg}
                      alt="image"
                    />
                  </div>
                )}

                <div className="col-sm-8">
                  <div className=" ">
                    <h5 className="card-title font-weight-bold mt-2 p-2">
                      Name: {user.name}
                    </h5>

                    <div className="d-flex flex-row pt-3">
                      <h5>
                        <i
                          className="fa fa-map-marker text-primary pr-2"
                          aria-hidden="true"
                        ></i>
                      </h5>
                      <p className="card-title font-weight-bold m-0 p-0">
                        Address: {user.address}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="card-title font-weight-bold m-0 pr-2">
                        City: {user.city}
                      </h6>
                    </div>

                    <div className="d-flex flex-row mt-2 ">
                      <h5>
                        <i
                          className="fa fa-volume-control-phone pr-2"
                          aria-hidden="true"
                        ></i>
                      </h5>
                      <p className="card-title font-weight-bold m-0 p-0">
                        {user.contactNo}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row-reverse bd-highlight">
                  <div className="p-2 bd-highlight">
                    <button
                      className="btn btn-danger btn-md m-3"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure want to delete your account"
                          )
                        )
                          this.userDelete(user._id);
                      }}
                    >
                      Delete Profile
                    </button>
                    <Link to={`updateuser`} className="btn btn-primary btn-md">
                      Update Profile
                    </Link>
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

export default ProfileUser;
