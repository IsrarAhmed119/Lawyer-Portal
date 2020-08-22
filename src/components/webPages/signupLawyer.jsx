import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';


import * as userService from './../../services/lawyerServices';
import {getCurrentUser} from './../../services/authService';

class SignupLawyer extends Component {
  state = {
    account: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
    user: "",
  };

  componentDidMount = () => {
    console.log("_signinup_Lawyer_--->>");  
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().min(3).label("Name"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: false,
      })
      .required()
      .label("Email"),
    password: Joi.string().min(4).required().label("Password"),
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
    console.log("handleSubmit_call--->>");
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("_register__Form_data-->", this.state.account);

    try {
      const response = await userService.SignupLawyer(this.state.account);
      console.log("response_of_signup-->", response);
      if(response.data.success){
      console.log("_signup_res_success--->>", response.data.success);
      this.props.history.replace("/SigninLawyer");
        
      }
      else{
        console.log("_signup_res_false--->>", response.data);
        toast.error(response.data.error);
      }
    } catch (ex) {
      // this code run when server throw error 
      console.log("ex_of_register-form--->", ex);
      // if (ex.response && ex.response.status === 400) {
      //   const errors = { ...this.state.errors };
      //   errors.username = ex.response.account;
      //   this.setState({ errors });
      // }
    }
  };

  render() {
    if(getCurrentUser()) return <Redirect to ="/"/>
    const { account, errors } = this.state;
    return (
      <div className="container pt-5">
        <div className="row m-5 pt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 registerStyle mt-5 mb-5 p-2">
            <div className="container">
              <h3 className="text-center p-3">Signup Lawyer </h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Name</label>

                  <input
                    name="name"
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    onChange={this.handleChange}
                    value={account.name}
                    error={errors.name}
                  />
                  {errors.name && (
                    <div className="alert alert-danger">{errors.name} </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={account.email}
                    error={errors.email}
                  />
                  {errors.email && (
                    <div className="alert alert-danger">{errors.email} </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="form-control"
                    onChange={this.handleChange}
                    value={account.password}
                    error={errors.password}
                  />
                  {errors.password && (
                    <div className="alert alert-danger">{errors.password} </div>
                  )}
                </div>
                <button
                  disabled={this.validate()}
                  className="btn btn-primary mb-3"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>

        {/* asdfasfasfasfa */}
      </div>
    );
  }
}

export default SignupLawyer;
