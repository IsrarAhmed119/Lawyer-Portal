import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';

import * as auth from './../../services/authService';

class LoginAdmin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    user: "",
  };

  schema = {
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount = () => {
    console.log("_signin_User_--->>");  
  };
  doSubmit = async () => {
    console.log("handleSubmit_call--->>",this.state.data);
    try {
        const response = await auth.login_admin(this.state.data.email,this.state.data.password);
        console.log("re_login-->", response);
        if(response.data.success){
        console.log("_login_res_success--->>", response.data.success);
        await auth.loginWithJwt(response.data.token)
        // replace mean delete this url from brower history maintain by react-router-dom
        // user can't go back 
        window.location = "/adminpanel";
        // this.props.history.replace("/");
        }
        else{
          console.log("_login_res_false--->>", response.data);
          toast.error(response.data.error);
        }
      } catch (ex) {
        // this code run when server throw error 
        console.log("ex_of_longinUser-form--->", ex);
      }
  };



  
 

  render() {
    if(auth.getCurrentUser()) return <Redirect to ="/"/>
    return (
      <div className="container pt-5">
        <div className="row m-5 pt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 registerStyle mt-5 mb-5 p-2">
            <div className="container">
              <h3 className="text-center p-3">Admin Login </h3>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Submit")}
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default LoginAdmin;
