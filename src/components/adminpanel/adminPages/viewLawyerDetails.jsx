import React, { Component } from "react";
import { toast } from "react-toastify";
import * as lawyerServices from "../../../services/lawyerServices";
const baseURL = "http://localhost:5000/";

class ViewLawyerDetails extends Component {
  state = {
    getData: "",
    isLoggedIn: "",
  };

  async componentDidMount() {
    await this.getLawyer();
  }

  async getLawyer() {
    const userId = this.props.match.params.id;
    const res = await lawyerServices.getLawyerProfile(userId);
    if (res.data.success) {
      this.setState({ getData: res.data.user });
    }
    else{
      toast.error("Error: Something went wrong. Failed to get data");
      // console.log("getLawyer_err----->>", res.data.error);
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

                    {user.website ? (
                      <div className="d-flex justify-content-start mt-2">
                        <h6 className="font-weight-bold m-0 pr-2">
                          Website: {user.website}
                        </h6>
                      </div>
                    ) : (
                      <div className=""></div>
                    )}

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

                    {user.profileType ? (
                      <div className="d-flex justify-content-start mt-2">
                        <h6 className="font-weight-bold m-0 pr-2">
                          ProfileType: {user.profileType}
                        </h6>
                      </div>
                    ) : (
                      <div className=""></div>
                    )}

                    {user.lawyerType ? (
                      <div className="d-flex justify-content-start mt-2">
                        <h6 className="font-weight-bold m-0 pr-2">
                          LawyerType: {user.lawyerType}
                        </h6>
                      </div>
                    ) : (
                      <div className=""></div>
                    )}
                    {user.speciality ? (
                      <div className="d-flex justify-content-start mt-2">
                        <h6 className="font-weight-bold m-0 pr-2">
                          Speciality:{user.speciality}
                        </h6>
                      </div>
                    ) : (
                      <div className=""></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="container mt-5">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewLawyerDetails;
