import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import * as userServices from "../../services/userService";

class AllCases extends Component {
  state = {
    user: [],
    account: { case_review: "" },
    errors: {},
    caseId: null,
    hideButton: true,
  };
  schema = {
    case_review: Joi.string().required().label("address"),
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
   
   await this.getCases();
  }

  async getCases() {
    // send obj
    const Obj = {
      status: "inprogress",
    };
    const res = await userServices.getALLCases(Obj)
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

 
  async CancelCase(status, caseId)  {
    // send obj
    const Obj = {
      status,
      caseId,
    };
    const res = await userServices.CancelCase(Obj)
    if (res.data.success) {
      await this.getCases();
    }
    else{
      toast.error("Error: Something went wrong. Failed to CancelCase");
      // console.log("getAllData_err----->>", res.data.error);
    }
  }

  

  async handleReview(id) {
    this.setState({
      caseId: id,
    });
    // console.log("handleReview_call_user_exits---->>");
    window.$("#exampleModal").modal("show"); // to show
    // window.$('#exampleModal').modal('hide') // to hide
  }
  //   handleCase(id) {
  //     this.setState({
  //       caseId: id,
  //     });
  //   }
  handleSubmit = async (e) => {
    // console.log("handleSubmit_call--->>");
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log(
      "handleSubmit_call--->>",
      this.state.account,
      this.state.caseId
    );
    const data = this.state.account;
    const id = this.state.caseId;
    await this.addReview(data, id);
  };

  async addReview(data, id)  {
    // send obj
    const Obj = {
      caseId: id,
      review: data,
    };
    const res = await userServices.addReview(Obj)
    if (res.data.success) {
      this.setState({
        hideButton: false,
      }); 
      window.$("#exampleModal").modal("hide"); // to hide
    }
    else{
      toast.error("Error: Something went wrong. Failed to Post Comments");
      // console.log("getAllData_err----->>", res.data.error);
    }
  }


  
  render() {
    const { account, errors } = this.state;
    const user = this.state.user;

    const { length: count } = this.state.user;

    if (count === 0)
      return (
        <div className="row container m-5">
          <div class="d-flex justify-content-start pt-5">
            <div class="d-flex flex-row bd-highlight mb-3">
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/allcases`} className="font-weight-bold">
                  All Cases
                </Link>
              </div>
              <div class="pl-3 bd-highlight font-weight-bold">
                <Link to={`/UserProfile`} className="font-weight-bold">
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
        <div className="d-flex justify-content-start pt-5">
          <div class="d-flex flex-row bd-highlight mb-3">
            <div class="pl-3 bd-highlight font-weight-bold">
              <Link to={`/allcases`} className="font-weight-bold">
                All Cases
              </Link>
            </div>
            <div class="pl-3 bd-highlight font-weight-bold">
              <Link to={`/UserProfile`} className="font-weight-bold">
                Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="container profiesection">
          <div className="">
            <div className="row m-5 ">
              <div className="">
                <div className="">
                  {this.state.user.map((userData, i) => (
                    <div className="row m-3">
                      <div className="col-md-4">
                        <span className="badge badge-info">
                          Case Number:{i + 1}
                        </span>
                      </div>
                      <div className="col-md-8">
                        <div className="d-flex flex-column bd-highlight">
                          <div className="p-2 bd-highlight">
                            <h4 className="">
                              Case Name: {userData.caseNameame}
                            </h4>
                          </div>
                          <div className="p-2 bd-highlight">
                            Description: {userData.caseDescription}
                          </div>
                          <div className="p-2 bd-highlight">
                            Case Status: {userData.status}
                          </div>
                          {userData.status === "completed" &&
                          !userData.review &&
                          this.state.hideButton ? (
                            <div className="d-flex justify-content-between">
                              <button
                                className="btn btn-primary"
                                onClick={() => this.handleReview(userData._id)}
                                // onClick={() => this.handleCase(userData._id)}
                              >
                                Add review
                              </button>
                            </div>
                          ) : (
                            <div></div>
                          )}

                          <div className="d-flex flex-column">
                            <Link
                              to={`/casedetails/${userData._id}`}
                              className="btn btn-info mt-2"
                            >
                              Details
                            </Link>

                            {userData.status != "completed" &&
                            userData.status === "inprogress" &&
                            !userData.review &&
                            this.state.hideButton ? (
                              <div className="d-flex justify-content-between">
                                <button
                                  className="btn btn-danger mt-2"
                                  onClick={() =>
                                    this.CancelCase("completed", userData._id)
                                  }
                                >
                                  Not Satisfied Cancel Case
                                </button>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Modal --> */}
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
                    Add review
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
                    <label for="exampleFormControlTextarea1">review</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      name="case_review"
                      rows="4"
                      placeholder="Message"
                      onChange={this.handleChange}
                      value={account.review}
                      error={errors.review}
                    ></textarea>
                    {errors.review && (
                      <div className="alert alert-danger">{errors.review}</div>
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
      </div>
    );
  }
}

export default AllCases;
