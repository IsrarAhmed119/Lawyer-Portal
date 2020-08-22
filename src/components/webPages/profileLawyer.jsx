import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import * as authService from '../../services/authService'
import * as userService from '../../services/lawyerServices'
import dummyImg from '../../images/profile_placeholder.png';

// server req
const baseURL = "http://localhost:5000/";

class ProfileLawyer extends Component {
  state = {
    user: "",
  };

  async componentDidMount() {
    const currentUser = await authService.getCurrentUser();
    // console.log("current__user", currentUser);
    if (currentUser) {
      this.getProfile(currentUser.user._id);
    }
  }

  async getProfile(id) {
    // let a ="3242klj2k34j2kl4j3"
    const res = await userService.getLawyerProfile(id);
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

  async lawyerDelete(id) {
    // console.log("lawyerDelete--->>", `${id} clicked`);
    const res = await userService.deleteLawyerProfile(id);
    if(res.data.success){
      // console.log("getProfile_res----->>", res.data);
      
      await  authService.logout();
      window.location = "/home";
     
    }
    else{
      toast.error("Error 204 No Content: Something went wrong. Failed to delete Profile");
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
              <Link to={`/pendingcases`} className="font-weight-bold">
                Pending Cases
              </Link>
            </div>
            <div className="pl-3 bd-highlight font-weight-bold">
              <Link to={`/inprogresscases`} className="font-weight-bold">
                Inprogress Cases
              </Link>
            </div>
            <div className="pl-3 bd-highlight font-weight-bold">
              <Link to={`/completedcases`} className="font-weight-bold">
                Completed Cases     
              </Link>                
            </div>
            <div className="pl-3 bd-highlight font-weight-bold">
              <Link to={`/LawyerProfile`} className="font-weight-bold">
                Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="container profiesection">
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
                    <div className="d-flex justify-content-start ">
                      <h6 className="card-title font-weight-bold m-0 pr-2">
                        Email: {user.email}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="card-title font-weight-bold m-0 pr-2">
                        Website: {user.website}
                      </h6>
                    </div>
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

                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="card-title font-weight-bold m-0 pr-2">
                        ProfileType: {user.profileType}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="card-title font-weight-bold m-0 pr-2">
                        LawyerType: {user.lawyerType}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="card-title font-weight-bold m-0 pr-2">
                        Speciality:{user.speciality}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-danger btn-md m-3"
                onClick={() => {
                  if (
                    window.confirm("Are you sure want to delete your account")
                  )
                    this.lawyerDelete(user._id);
                }}
              >
                Delete Profile
              </button>
              <Link to={`updatelawyer`} className="btn btn-primary btn-md">
                Update Profile
              </Link>
            </div>

            {/* <div className="container mt-5">
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <h1>Customers review</h1>
                </div>
              </div>
              <div class="row m-5 ">
                <div class="col-sm-7">
                  <div class="review-block">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="review-block-title">John Doe</div>
                        <div class="review-block-description">
                          this was nice in buy. this was nice in buy. this was
                          nice in buy. this was nice in buy this was nice in buy
                          this was nice in buy this was nice in buy this was
                          nice in buy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileLawyer;
