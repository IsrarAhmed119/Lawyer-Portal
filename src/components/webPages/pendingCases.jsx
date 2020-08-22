import React, { Component } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import * as lawyerServices from "../../services/lawyerServices";
const baseURL = "http://localhost:5000/";

class PendingCases extends Component {
  state = {
    user: [],
  };

  async componentDidMount() {
    await this.getPendingCases();
  }
  
  async getPendingCases() {
    // send obj
    const Obj = {
      status: "pending",
    };
    const res = await lawyerServices.getPendingCases(Obj)
    if (res.data.success) {
      this.setState({
        user: res.data.response,   
      });
    }
    else{
      toast.error("Error: Something went wrong. Failed to get data");
      // console.log("getAllData_err----->>", res.data.error);
    }
  }

  async approvedOrDisapproved(status, caseId) {
   // send obj
   const Obj = {
    status,
    caseId,
  };
    const res = await lawyerServices.approvedOrDisapproved(Obj)
    if (res.data.success) {
      toast.info("Your request submitted successfully");
      await this.getPendingCases();
    }
    else{
      toast.error("Error: Something went wrong. Failed to approved/disapproved");
      // console.log("approvedOrDisapproved_err----->>", res.data.error);
    }
  }
  
  render() {
    const { length: count } = this.state.user;

    if (count === 0)
      return (
        <div className="row container m-5">
          <div class="d-flex justify-content-start pt-5">
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/pendingcases`} className="font-weight-bold">
                  Pending Cases
                </Link>
              </div>
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/inprogresscases`} className="font-weight-bold">
                  Inprogress Cases
                </Link>
              </div>
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/completedcases`} className="font-weight-bold">
                  Completed Cases
                </Link>
              </div>
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/LawyerProfile`} className="font-weight-bold">
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-2 m-5"></div>
          <div className="col-md-8 m-5">
            <h4 className="font-weight-bold m-5 p-3 mb-2 bg-danger text-white">
              There is no data in the database.
            </h4>
          </div>
          <div className="col-md-2 m-5"></div>
        </div>
      );
    // const user = this.state.user;
    // console.log("user--->>", user);

    return (
      <div className="container pt-5">
        <div class="d-flex justify-content-start pt-5">
          <div class="d-flex flex-row bd-highlight mb-3">
            <div class="pl-3 bd-highlight font-weight-bold">
              <Link to={`/pendingcases`} className="font-weight-bold">
                Pending Cases
              </Link>
            </div>
            <div class="pl-3 bd-highlight font-weight-bold">
              <Link to={`/inprogresscases`} className="font-weight-bold">
                Inprogress Cases
              </Link>
            </div>
            <div class="pl-3 bd-highlight font-weight-bold">
              <Link to={`/completedcases`} className="font-weight-bold">
                Completed Cases
              </Link>
            </div>
            <div class="pl-3 bd-highlight font-weight-bold">
              <Link to={`/LawyerProfile`} className="font-weight-bold">
                Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="container profiesection">
          <div className="row">
            <div class="row m-5 ">
              <div class="">
                <div class="review-block">
                  {this.state.user.map((userData, i) => (
                    <div class="row">
                      <div className="col-md-4">
                        <span class="badge badge-info">
                          Case Number:{i + 1}
                        </span>
                      </div>
                      <div class="col-md-8">
                        <div class="review-block-title">
                          {userData.caseNameame}
                        </div>
                        <div class="review-block-description">
                          {userData.caseDescription}
                        </div>
                        <div class="review-block-title">
                          Case Status: {userData.status}
                        </div>

                        {userData.status === "pending" ? (
                          <div className="d-flex flex-row bd-highlight">
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                this.approvedOrDisapproved("inprogress", userData._id)
                              }
                            >
                              Approved
                            </button>
                            <button
                              className="btn btn-danger  ml-3"
                              onClick={() =>
                                this.approvedOrDisapproved("cancelled", userData._id)
                              }
                            >
                              Disapproved
                            </button>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <Link
                          to={`/casedetails/${userData._id}`}
                          className="btn btn-info mt-2 ml-3"
                        >
                          Details
                        </Link>
                        <hr />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PendingCases;
