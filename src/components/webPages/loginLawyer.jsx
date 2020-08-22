import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';

import * as authService  from './../../services/authService';


class LoginLawyer extends Component {
  state = {
    account: { email: "", password: "" },
    errors: {},
    user: "",
  };

  schema = {
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("Password"),
  };
  componentDidMount = () => {
    console.log("_login_--->>");  
   
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
    console.log("handleSubmit_call--->>", this.state.account);
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // call server-------------here
    try {
      const { account } = this.state;
      const response = await authService.login_Lawyer(account.email, account.password);
      console.log("response_of_login-->", response);

      if(response.data.success){
      console.log("_login_res_success--->>", response.data.success);  
      await authService.loginWithJwt(response.data.token)

        if (response.data.user.city === undefined) {
          console.log("city == undefined");
          // this.props.history.replace("/createprofilelawyer");
          window.location = "/createprofilelawyer";
        }
        else{
          const {state} = this.props.location;
          window.location = state ? state.from.pathname : '/LawyerProfile'
        }
      }
      
      else{
        console.log("_login_res_failed--->>", response.data);
        toast.error(response.data.error);
      }
      // console.log("router_history--->>", this.props);
     
    } catch (ex) {
      // this code run when server throw error 
      // catch run's when server reject req 
      console.log("ex_of_login-->");
      // if (ex.response && ex.response.status === 400) {   
      //   // const errors = { ...this.state.errors };
      //   // errors.email = ex.response.account;
      //   // this.setState({ errors });
      //   console.log("invalid request-400 -->",ex.response.status, ex);
      // }
      // else if(ex.response && ex.response.status === 404){
      //   console.log("not found-404 -->",ex.response.status, ex);
      // }
    }
  };

  render() {
    if(authService.getCurrentUser()) return <Redirect to ="/"/>
    const { account, errors } = this.state;
      return (
        <div className="container pt-5">
          <div className="row m-5 pt-5">
            <div className="col-md-3"></div>
            <div className="col-md-6 registerStyle mt-5 mb-5 p-2">
              <div className="container">
                <h3 className="text-center p-3">Lawyer Login </h3>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      placeholder="email"
                      className="form-control"
                      type="text"
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
        </div>
      );
    }
}

export default LoginLawyer;
