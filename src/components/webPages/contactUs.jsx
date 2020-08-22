import React, { Component } from "react";

import Joi from "joi-browser";

class ContactUs extends Component {
  state = {
    account: {
      name: "",
      subject: "",
      message: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string()

      .required()
      .min(3)
      .max(20)
      .label("Name"),
    subject: Joi.string()

      .required()
      .min(3)
      .max(20)
      .label("subject"),
    message: Joi.string()

      .required()
      .min(3)
      .max(200)
      .label("message"),
  };

  validate = () => {
    console.log("validate--->>");
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    console.log("validateProperty--->>");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    console.log("handleChange--->>");
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

    console.log("handleSubmit_call--->>", this.state.account);
    // call server-------------here

    // console.log(this.state.account, "Submitted--->>");
    // console.log("handleSubmit_end--->>");

    try {
      console.log("tryBlock---call-->");
      // const response = await contactUs(this.state.account);

      // console.log("response_of_contactUs-->", response);

      window.location = "/";
      // this.props.history.push("/createprofile");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }

    // console.log("Submitted");
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className=" mt-5 ">
        {/* colored banner section */}
        <div className="homebanner ">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-3 "></div>
              <div className="col-md-6 homebanner-text m-0 p-0">
                <h2 className="font-weight-bold">
                  Find Best LawFirms and Lawyers in
                  <span className="paksitancolor">Pakistan</span>
                </h2>
                <p className="font-weight-bold">
                  With thousand of LawFirms and Lawyers, we have just the right
                  one for you
                </p>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>

        {/* contact form */}
        <div className="container">
          <div className="row  mt-5 mb-5">
            <div className="col-md-3"></div>
            <div className="col-md-6 mt-5 registerStyle">
              <h1 className="text-center p-3">Contact Us</h1>
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
                  <label>Subject</label>

                  <input
                    name="subject"
                    className="form-control"
                    type="text"
                    placeholder="Subject"
                    onChange={this.handleChange}
                    value={account.subject}
                    error={errors.subject}
                  />
                  {errors.subject && (
                    <div className="alert alert-danger">{errors.subject}</div>
                  )}
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Your message</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    name="message"
                    rows="4"
                    placeholder="Message"
                    onChange={this.handleChange}
                    value={account.message}
                    error={errors.message}
                  ></textarea>
                  {errors.message && (
                    <div className="alert alert-danger">{errors.message}</div>
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
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
