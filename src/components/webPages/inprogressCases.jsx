import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import * as lawyerServices from "../../services/lawyerServices";
const baseURL = "http://localhost:5000/";

class InprogressCases extends Component {
  state = {
    user: [],
  };

  async componentDidMount() {
    await this.getInprogessCases();
  }
  
  async getInprogessCases() {
    // send obj
    const Obj = {
      status: "inprogress",
    };
    const res = await lawyerServices.getInprogressCases(Obj)
    if (res.data.success) {
      this.setState({
        user: res.data.response,   
      });
    }
    else{
      toast.error("Error: Something went wrong. Failed to get data");
      // console.log("getInprogessCases_err----->>", res.data.error);
    }
  }

  async markCompleted(status, caseId){
     // send obj
     const Obj = {
      status,
      caseId,
    };
    const res = await lawyerServices.markCompleted(Obj)
    if (res.data.success) {
      // console.log('res_markCompleted---->>',res)
     this.getInprogessCases();
    }
    else{
      toast.error("Error: Something went wrong. Failed to get data");
      // console.log("getInprogessCases_err----->>", res.data.error);
    }

  }

  // async changeStatus(status, caseId) {
  //   // custon header
  //   const config = {
  //     headers: {
  //       authorization: localStorage.getItem("token"),
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Accept: "application/json",
  //     },
  //   };
  //   // send obj
  //   const pendingObj = {
  //     status,
  //     caseId,
  //   };
  //   // baseUrl
  //   const baseUrl = "http://localhost:5000/api/case";
  //   let url = baseUrl + "/lawyer";
  //   await axios
  //     .put(url, pendingObj, { withCredentials: true }, config)
  //     .then((res) => {
  //       // console.log("profile_getUser_res", res);
  //       const user = res.data.response;
  //       console.log("changeStatus_user--->>", res);
  //       // console.log("changeStatus_user--->>", res);
  //       if (res.data.success === true) {
  //         this.getUser();
  //       } else {
  //         console.log("profile_getUser_res_Failed");
  //       }
  //     })
  //     .catch((err) => console.log("profile_getUser_res", err));
  // }

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
              <div class="col-sm-7">
                <div class="review-block">
                  {this.state.user.map((userData, i) => (
                    <div className="row">
                      <div className="col-md-2">
                        <span class="badge badge-info">
                          Case Number:{i + 1}
                        </span>
                      </div>
                      <div className="col-md-10">
                        <div class="row" key={i}>
                          <div class="col-sm-12">
                            <div class="review-block-title">
                              {userData.caseNameame}
                            </div>
                            <div class="review-block-description">
                              {userData.caseDescription}
                            </div>
                            <div class="review-block-title">
                              Case Stuts: {userData.status}
                            </div>

                            {userData.status === "inprogress" ? (
                              <div>
                                <button
                                  className="btn btn-success"
                                  onClick={() =>
                                    this.markCompleted("completed", userData._id)
                                  }
                                >
                                  Completed
                                </button>
                              </div>
                            ) : (
                              <div></div>
                            )}
                            <Link
                              to={`/casedetails/${userData._id}`}
                              className="btn btn-info mt-2"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
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

export default InprogressCases;
