import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';


import * as userService from './../../services/userService';
import {getCurrentUser} from './../../services/authService';


class SignupUser extends Form {
    state = {
        data: {
          name: "",
          email: "",
          password: "",
        },
        errors: {},
        user: "",
        err: {},
    };

      schema = {
       
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
    
      componentDidMount = () => {
        console.log("_signinup_User_--->>");  
      };
      
      doSubmit = async () => {
        console.log("handleSubmit_call--->>",this.state.data);
        try {
            const response = await userService.SignupUser(this.state.data);
            console.log("re_signup-->", response);
            if(response.data.success){
            console.log("_signup_res_success--->>", response.data.success);
            this.props.history.replace("/SigninUser");  
            }
            else{
              console.log("_signup_res_false--->>", response.data);
              toast.error(response.data.error);
            }
          } catch (ex) {
            // this code run when server throw error 
            console.log("ex_of_register-form--->", ex);
           
          }
      };
    render() {
        if(getCurrentUser()) return <Redirect to ="/"/> 
     return ( 
       <div className="container pt-5">
        <div className="row m-5 pt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 registerStyle mt-5 mb-5 p-2">
            <div className="container">
              <h3 className="text-center p-3">Signup User </h3>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Name")}
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
 
export default SignupUser;