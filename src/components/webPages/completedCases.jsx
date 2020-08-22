import React, { Component } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import * as lawyerServices from "../../services/lawyerServices";
const baseURL = "http://localhost:5000/";

class CompletedCases extends Component {
  state = {
    user: [],
  
  };

  async componentDidMount() {
  await this.getCompleteCases();
}

async getCompleteCases() {
  // send obj
  const Obj = {
    status: "completed",
  };
  const res = await lawyerServices.getCompleteCases(Obj)
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
            <div className="row m-5 ">
              <div className="col-sm-7">
                <div className="review-block">
                  {this.state.user.map((userData, i) => (
                    <div className="row">
                      <div className="col-md-4">
                        <span class="badge badge-info">
                          Case Number:{i + 1}
                        </span>
                      </div>
                      <div className="col-sm-8">
                        <div className="review-block-title">
                          {userData.caseNameame}
                        </div>
                        <div className="review-block-description">
                          {userData.caseDescription}
                        </div>
                        <div className="review-block-title">
                          Case Stuts: {userData.status}
                        </div>
                        <Link
                          to={`/casedetails/${userData._id}`}
                          className="btn btn-info"
                        >
                          Details
                        </Link>
                      </div>
                      <hr/>
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

export default CompletedCases;
