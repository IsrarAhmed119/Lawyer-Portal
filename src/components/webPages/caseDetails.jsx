import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import * as userService from "../../services/userService";
import {getCurrentUser} from '../../services/authService';

const baseURL = "http://localhost:5000/";

class CaseDetails extends Component {
  state = {
    account: { caseComments: "" },
    case: {},
    errors: {},
    isLoggedIn: "",
    role: "",
    caseId: null,
    modifiedComments: [],
  };
  schema = {
    caseComments: Joi.string().required().label("address"),
  };
  validate = () => {
    // console.log("validate--->>");
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    // console.log("validateProperty--->>");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // console.log("handleChange--->>");
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  async componentDidMount() {
    await this.getCase();
    const userCurrent = getCurrentUser();

    // console.log("current__user", userCurrent);
    // if (!userCurrent) {
    //   window.location = "/home";
    // }

    // this.getUser(userCurrent.user._id);

    this.setState({ isLoggedIn: userCurrent });

    if (this.state.isLoggedIn) {
      const role = userCurrent.user.role;
      // console.log("_cdm_user_role", role);
      if (role === "employeer") {
        this.setState({ role: role });
      }
    }
  }

  async getCase(){
    const case_id = this.props.match.params.id;
    const res = await userService.getCase(case_id);
    if (res.data.success === true) {
      const data = res.data.response;
      this.setState({ case: data });
      this.setState({ caseComments: res.data.response.caseComments });
      // const obj = {};
      const modifiedComments = [];

      for (let i = 0; i < this.state.caseComments.length; i++) {
        console.log(
          "this.state.caseComments---->>",
          this.state.caseComments[i]
        );
        let obj = { comment: this.state.caseComments[i] };
        // obj.comment = this.state.caseComments[i];
        modifiedComments.push(obj);
      }
      this.setState({ modifiedComments: modifiedComments });
      console.log("obj---->>", modifiedComments);

      //   console.log("componentDidMount----response", this.state.lawyers);
    }
    else{
     toast.error("Error: Something went wrong failed get case details");
     // console.log("hire_Lawyer_err----->>", res.data.error);
   }
 }


 async addComments(id){
  // send obj
  const reviewObj = {
    caseId: id,
    caseComment: this.state.account.caseComments,
  };
  const res = await userService.postComments(reviewObj);
  console.log("postComments_res", res.data);
  if (res.data.success === true) {
  // console.log("success--->>", res.data);
  this.setState({
    hideButton: false,
  }); 

  this.getCase();
   window.$("#exampleModal").modal("hide"); // to hide
  }
  else{
   toast.error("Error: Something went wrong failed post comments");
   // console.log("hire_Lawyer_err----->>", res.data.error);
 }
}

  // getCase() {
  //   // custon header
  //   const config = {
  //     headers: {
  //       authorization: localStorage.getItem("token"),
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Accept: "application/json",
  //     },
  //   };
  //   const userId = this.props.match.params.id;

  //   const baseUrl = "http://localhost:5000/api";
  //   let url = baseUrl + "/case/" + userId;
  //   axios
  //     .get(url, { withCredentials: true }, config)
  //     .then((res) => {
  //       console.log("getCase_res---->>", res.data.response);

  //       if (res.data.success === true) {
  //         const data = res.data.response;
  //         this.setState({ case: data });
  //         this.setState({ caseComments: res.data.response.caseComments });
  //         // const obj = {};
  //         const modifiedComments = [];

  //         for (let i = 0; i < this.state.caseComments.length; i++) {
  //           console.log(
  //             "this.state.caseComments---->>",
  //             this.state.caseComments[i]
  //           );
  //           let obj = { comment: this.state.caseComments[i] };
  //           // obj.comment = this.state.caseComments[i];
  //           modifiedComments.push(obj);
  //         }
  //         this.setState({ modifiedComments: modifiedComments });
  //         console.log("obj---->>", modifiedComments);

  //         //   console.log("componentDidMount----response", this.state.lawyers);
  //       } else {
  //         console.log("getAllLawyers_service_res_Failed");
  //       }
  //     })
  //     .catch((err) => console.log("getAllLawyers_service_err", err));
  // }

  async handleReview(id) {
    this.setState({
      caseId: id,
    });
    // console.log("handleReview_call_user_exits---->>");
    window.$("#exampleModal").modal("show"); // to show
    // window.$('#exampleModal').modal('hide') // to hide
  }

  async handleComments() {
    // console.log("handleReview_call_user_exits---->>");
    window.$("#exampleModal2").modal("show"); // to show
    // window.$('#exampleModal').modal('hide') // to hide
  }

  handleSubmit = async (e) => {
    // console.log("handleSubmit_call--->>");
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // console.log("handleSubmit_call--->>", this.state.account);
    const id = this.state.caseId;
    await this.addComments(id);
  };

  // addComments(id) {
  //   // custon header
  //   const config = {
  //     headers: {
  //       authorization: localStorage.getItem("token"),
  //       Accept: "application/json",
  //     },
  //   };
  //   // send obj
  //   const reviewObj = {
  //     caseId: id,
  //     caseComment: this.state.account.caseComments,
  //   };
  //   // console.log("id------>", id);
  //   // baseUrl
  //   const baseUrl = "http://localhost:5000/api/case/comment";
  //   // let url = baseUrl + "/hireLawyer";
  //   axios
  //     .put(baseUrl, reviewObj, { withCredentials: true }, config)
  //     .then((res) => {
  //       console.log("postReview_res", res.data);
  //       if (res.data.success === true) {
  //         // console.log("success--->>", res.data);
  //         this.setState({
  //           hideButton: false,
  //         });
  //         this.getCase();
  //         window.$("#exampleModal").modal("hide"); // to hide
  //       } else {
  //         console.log("postReview_res_Failed");
  //       }
  //     })
  //     .catch((err) => console.log("postReview_err", err));
  // }
  render() {
    // const { length: count } = this.state.case.caseComments;
    const { account, errors } = this.state;
    const caseDate = this.state.case.caseDate;
    // var caseDate = parseISO(caseDate1);

    const caseDescription = this.state.case.caseDescription;
    const caseFile = this.state.case.caseFile;
    const caseNameame = this.state.case.caseNameame;
    const clientName = this.state.case.clientName;
    const clientNumber = this.state.case.clientNumber;
    const totalPayment = this.state.case.totalPayment;
    const caseId = this.state.case._id;
    const status = this.state.case.status;

    // const caseComments = this.state.case.caseComments;
    // console.log("caseComments--->>", caseComments);
    // console.log("this.state.case--->>", this.state.case);

    return (
      <div className="row container m-5">
        <div class="d-flex justify-content-start pt-5">
          {!this.state.role ? (
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
                <Link to={`/profilelawyer`} className="font-weight-bold">
                  Profile
                </Link>
              </div>
            </div>
          ) : (
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/allcases`} className="font-weight-bold">
                  All Cases
                </Link>
              </div>
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/profileuser`} className="font-weight-bold">
                  Profile
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-3 m-5"></div>

        <div className="col-md-6 m-5">
          <div class="container d-flex flex-column bd-highlight mb-3 border border-info">
            <div class="p-2 bd-highlight">
              <p>
                <span class="font-weight-bold">Case Name:</span> {caseNameame}
              </p>
            </div>

            <div class="p-2 bd-highlight">
              <p>
                <span class="font-weight-bold">Case Desc:</span>{" "}
                {caseDescription}
              </p>
            </div>
            <div class="p-2 bd-highlight">
              <p>
                <span class="font-weight-bold">Client Name:</span> {clientName}
              </p>
            </div>

            <div class="p-2 bd-highlight">
              <p>
                <span class="font-weight-bold">Client Number:</span>{" "}
                {clientNumber}
              </p>
            </div>

            <div class="p-2 bd-highlight">
              <p>
                <span class="font-weight-bold">TotalPyament:</span>
                {totalPayment}
              </p>
            </div>
            <div class="p-2 bd-highlight">
              <p>
                <span class="font-weight-bold">
                  <a href={baseURL + caseFile} download>
                    Case File
                  </a>
                </span>
              </p>
            </div>
            <div class="p-2 bd-highlight">
              <p>
                <span class="font-weight-bold">Case Date:</span> {caseDate}
              </p>
            </div>
            <div class="p-2 bd-highlight">
              {this.state.modifiedComments.length > 0 ? (
                <button
                  className="btn btn-primary m-3"
                  onClick={() => this.handleComments()}
                >
                  Show Comments
                </button>
              ) : (
                <div></div>
              )}
            </div>
            {status === "inprogress" && !this.state.role ? (
              <div class="d-flex justify-content-between">
                <button
                  className="btn btn-primary m-3"
                  onClick={() => this.handleReview(caseId)}
                >
                  Add Comments
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="col-md-3 m-5"></div>

        {/* <!-- Modal_1 for case details --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form onSubmit={this.handleSubmit}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Comments
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Comments</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      name="caseComments"
                      rows="4"
                      placeholder="Message"
                      onChange={this.handleChange}
                      value={account.caseComments}
                      error={errors.caseComments}
                    ></textarea>
                    {errors.caseComments && (
                      <div className="alert alert-danger">
                        {errors.caseComments}
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    disabled={this.validate()}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal */}

        {/* <!-- Modal_2  for post reivew --> */}
        <div
          className="modal fade"
          id="exampleModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Comments
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.modifiedComments.map((item, index) => (
                  <div>
                    <p class="font-weight-bolder">Comment {index + 1}</p>
                    <p>{item.comment}</p>
                    <hr />
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
      </div>
    );
  }
}

export default CaseDetails;
