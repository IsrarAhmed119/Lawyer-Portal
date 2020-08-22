import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Document, Page } from "react-pdf";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getLawyerDetail, getLawyerReview, hireLawyer } from './../../services/lawyerServices';
import {getCurrentUser} from '../../services/authService';

import dummyImg from "../../images/profile_placeholder.png";

const baseURL = "http://localhost:5000/";

class ProfileDetails extends Component {
  state = {
    profileDetail: "",
 
    role: null,
    getReview: "",
    // account: { review: "" },
    account: {
      caseNameame: "",
      totalPayment: "",
      caseDescription: "",                  
    },
    caseFile: null,
    caseDate: new Date(),
    errors: {},
    Reviews: [],
  };

  schema = {
    caseNameame: Joi.string().required().label("address"),
    totalPayment: Joi.number().integer().required().label("Phone number"),
    caseDescription: Joi.string().required().label("city___okkkkk"),

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

  handleSubmit = async (e) => {
    // console.log("handleSubmit_call--->>");
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const isoDate = this.state.caseDate.toISOString();

    console.log(
      "handleSubmit_call--->>",
      this.state.account,
      isoDate,
      this.state.caseFile
    );
    const userId = this.props.match.params.id;
    const account = this.state.account;
    const formData = new FormData();
    formData.append("caseNameame", account.caseNameame);
    formData.append("caseDescription", account.caseDescription);
    formData.append("totalPayment", account.totalPayment);
    formData.append("caseFile", this.state.caseFile);
    formData.append("caseDate", this.state.caseDate);
    formData.append("lawyerId", userId);

    await this.hire_Lawyer(formData);

    // const data = this.state.account;

    // await this.postReview(data, userId);
    // console.log("Submitted");
  };

  async componentDidMount() {
    const Currentuser = await getCurrentUser();
    // console.log('user--->>',Currentuser.user.role)
    if(Currentuser){
      this.setState({
        role: Currentuser.user.role,
      });
    }
   
    await this.getDetails();
    await this.getReview();


  }

  async handleReview() {
    // console.log("handleReview_call---->>");
    if (this.state.role == null) {
      return window.confirm("First Login then add review");
      // return alert("First Login then add review");
    } 
      // console.log("handleReview_call_user_exits---->>");
      window.$("#exampleModal").modal("show"); // to show
      // window.$('#exampleModal').modal('hide') // to hide
    
  }

  async getDetails() {
    const userId = this.props.match.params.id;
    const res = await getLawyerDetail(userId);
    if(res.data.success){
      // console.log("getLawyerDetail_res----->>", res);
      this.setState({
      profileDetail: res.data.user,
      });
    }
    else{
      toast.error("Error: Something went wrong. Failed to get lawyerDetails");
      // console.log("getDetails_err----->>", res.data.error);
    }
  }

  async getReview() {
    const userId = this.props.match.params.id;
    const res = await getLawyerReview(userId);
    if (res.data.success === true) {
      console.log("getReview_res", res);
      console.log("getReview_res___data", res.data.response);
        this.setState({
          getReview: res.data.response,
        });
         // const obj = {};
      const modifiedReview = [];
      for (let i = 0; i < this.state.getReview.length; i++) {
        // console.log(
        //   "this.state.caseComments---->>",
        //   this.state.getReview[i]
        // );
        let obj = this.state.getReview[i].review;
        // obj.comment = this.state.caseComments[i];
        modifiedReview.push(obj);
      }
      this.setState({ Reviews: modifiedReview });
      console.log("obj---->>", modifiedReview);    
    }
    else{
      toast.error("Error: Something went wrong. Failed to get lawyerReview");
      // console.log("getDetails_err----->>", res.data.error);
    }
  }

 async hire_Lawyer(data){
     const res = await hireLawyer(data);
    if(res.data.success){
      // console.log("hire_Lawyer_res----->>", res);
      window.$("#exampleModal").modal("hide"); // to hide
      toast.success("Your case request submit successfully");
    }
    else{
      toast.error("Error: Something went wrong. Failed to hire lawyer");
      // console.log("hire_Lawyer_err----->>", res.data.error);
    }
  }

  handleDate = (date) => {
    this.setState({
      caseDate: date,
    });
  };
  onChangeHandler = (e) => {
    // console.log("onChangeHandler--->>");
    // console.log("onChangeHandler--->>", e.target.files[0]);
    const file = e.target.files[0];
    this.setState({ caseFile: file }, () => {
      // console.log("setState_e--->>", this.state.caseFile);
    });
  };

  render() {
    const { account, errors } = this.state;
    const user = this.state.profileDetail;
console.log('review_lenght--->>',this.state.Reviews.length )

    return (
      <div className="container pt-5">
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
                    <div className="d-flex justify-content-start ">
                      <h6 className="font-weight-bold m-0 pr-2">
                        Email: {user.email}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="font-weight-bold m-0 pr-2">
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
                      <p className=" font-weight-bold m-0 p-0">
                        Address: {user.address}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="font-weight-bold m-0 pr-2">
                        City: {user.city}
                      </h6>
                    </div>

                    {!user.showContactNo === true ? (
                      <div className="d-flex flex-row mt-2 "></div>
                    ) : (
                      <div className="d-flex flex-row mt-2 ">
                        <h5>
                          <i
                            className="fa fa-volume-control-phone pr-2"
                            aria-hidden="true"
                          ></i>
                        </h5>
                        <p className="card-text m-0 p-0">{user.contactNo}</p>
                      </div>
                    )}

                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="font-weight-bold m-0 pr-2">
                        ProfileType: {user.profileType}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="font-weight-bold m-0 pr-2">
                        LawyerType: {user.lawyerType}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-start mt-2">
                      <h6 className="font-weight-bold m-0 pr-2">
                        Speciality:{user.speciality}
                      </h6>
                    </div>
                    <div className="d-flex pl-2 mt-3">

                     {this.state.role ? (
                       this.state.role === 'lawyer' ?
                        <div></div>
                        :
                         <button
                         type="button"
                         className="btn btn-info btn-lg"
                         onClick={() => this.handleReview()}
                       >
                         Hire now
                       </button>
                      ) :(
                        <Link to={`/SigninUser`} className="btn btn-info btn-lg">
                        Login for hire Lawyer
                      </Link>
                      )}

                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {/* <!-- review --> */}
            <div className="container mt-5">
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <h1>Customers review</h1>
                </div>
              </div>
              <div className="row m-5 ">
                <div className="col-sm-7">
                  <div className="review-block">
                    <div className="row">
                      {this.state.Reviews.length > 0 ? (
                        <div className="col-sm-12">
                          {this.state.Reviews.map((item, i) => (
                            <div key={i}>
                              <div className="review-block-title">{item.name}</div>
                              <div className="review-block-description">
                                {item.case_review}
                              </div>
                              <hr />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <div className="review-block-description">
                            There is no review
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {/* <!-- review --> */}

          </div>
        </div>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form onSubmit={this.handleSubmit}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Hire Lawyer Form
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
                  <div className="form-group">
                    <label className="font-weight-bold">Case Name</label>
                    <input
                      name="caseNameame"
                      className="form-control"
                      type="text"
                      placeholder="Example: Divorce deeds, Criminal"
                      onChange={this.handleChange}
                      value={account.caseNameame}
                      error={errors.caseNameame}
                    />
                    {errors.caseNameame && (
                      <div className="alert alert-danger">
                        {errors.caseNameame}{" "}
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                      Case Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      name="caseDescription"
                      rows="4"
                      placeholder="Message"
                      onChange={this.handleChange}
                      value={account.caseDescription}
                      error={errors.caseDescription}
                    ></textarea>
                    {errors.review && (
                      <div className="alert alert-danger">{errors.review}</div>
                    )}
                  </div>
                  <hr />
                  <div className="form-group">
                    <label className="font-weight-bold">Case Date</label>
                    <DatePicker
                      selected={this.state.caseDate}
                      onChange={this.handleDate}
                    />
                  </div>
                  <hr />
                  <div className="form-group">
                    <label className="font-weight-bold"> Case File</label>
                  </div>
                  <input
                    name="caseFile"
                    type="file"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <hr />
                  <div className="form-group">
                    <label className="font-weight-bold"> Total Payment</label>
                    <input
                      name="totalPayment"
                      className="form-control"
                      type="contactNo"
                      placeholder="50000"
                      onChange={this.handleChange}
                      value={account.totalPayment}
                      error={errors.totalPayment}
                    />
                    {errors.totalPayment && (
                      <div className="alert alert-danger">
                        {errors.totalPayment}
                      </div>
                    )}
                  </div>
                  <hr />
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

export default ProfileDetails;
