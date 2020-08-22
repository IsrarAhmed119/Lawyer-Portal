import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";

import * as lawyerService from "../../services/lawyerServices";

const baseURL = "http://localhost:5000/";

class BusinessLawFirm extends Component {
  state = {
    lawyers: [],
    searchQuery: "",
  };

  async componentDidMount() {
    await this.getAllData();
  }

  async getAllData() {
    const res = await lawyerService.getAllLawyer();
    if (res.data.success === true) {
      this.setState({ lawyers: res.data.user });
      console.log("componentDidMount----response", this.state.lawyers);
      // filter comleted profile
      const arrayOfObject = this.state.lawyers;
      var newLAawyer = arrayOfObject.filter(function (arrayOfObj) {
        return (
          arrayOfObj.profileType === "LawFirm" &&
          arrayOfObj.lawyerType === "Business"
        );
      });
      console.log("newLAawyer--->>", newLAawyer);
      this.setState({ lawyers: newLAawyer });
      // filter comleted profile
    }
    else{
      toast.error("Error: Something went wrong. Failed to get data");
      // console.log("getAllData_err----->>", res.data.error);
    }
  }


  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  filerByCity = () => {
    const { searchQuery, lawyers: alllawyers } = this.state;

    let filtered = alllawyers;
    if (searchQuery)
      filtered = alllawyers.filter((m) =>
        m.city.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    return { filtered, searchQuery };
  };
  render() {
    const { filtered, searchQuery } = this.filerByCity();

    const { length: count } = this.state.lawyers;

    if (count === 0)
      return (
        <div className="row container m-5">
          <div className="col-md-2 m-5"></div>
          <div className="col-md-8 m-5">
            <h4 className="font-weight-bold m-5 p-3 mb-2 bg-danger text-white">
              There is no data in the database.
            </h4>
          </div>
          <div className="col-md-2 m-5"></div>
        </div>
      );
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
        {/* seacrch section */}
        <div className="container searchsection">
          <ul className="d-flex justify-content-center p-5">
            <li>
              <SearchBox
                placeholder={"Lawyer city"}
                value={searchQuery}
                onChange={this.handleSearch}
              />
            </li>

            <li>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </li>
          </ul>
        </div>
        {/* Lawyer section */}
        <div className="container ">
          <div className="row container">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className=" py-3 ">
                <h3 className="m-5">Our Best Business LawFirm in Pakistan</h3>
                {/* first card */}
                {filtered.map((userData, i) => (
                  <div className="card mt-5 mb-5 cardstyle" key={i}>
                    <div className="row  m-0 p-0">
                      <div className="col-md-4 m-0 p-0 img-square-wrapper">
                        <img
                          src={baseURL + userData.userImage}
                          alt="img"
                          className="d-block w-100 card-imagesection"
                        />
                      </div>
                      <div className="col-md-8 px-3">
                        <div className="card-block px-3">
                          <div className="m-1 pb-1 pt-2">
                            <h5 className="card-title font-weight-bold">
                              {userData.name}
                            </h5>
                          </div>
                          <div className="d-flex justify-content-start mt-1">
                            <h6 className="card-title m-0 pr-2">
                              {userData.city}
                            </h6>

                            <p className="card-title text-secondary m-0 p-0">
                              <i
                                className="fa fa-caret-right text-secondary pt-1 mr-1"
                                aria-hidden="true"
                              ></i>
                              <a
                                href={userData.website}
                                className="btn btn-link m-0 p-0"
                              >
                                {userData.website}
                              </a>
                            </p>
                          </div>
                          <div className="d-flex flex-row pt-1">
                            <h5>
                              <i
                                className="fa fa-map-marker text-primary pr-2"
                                aria-hidden="true"
                              ></i>
                            </h5>
                            <p className="card-text m-0 p-0">
                              {userData.address}
                            </p>
                          </div>
                          <div className="pt-1">
                            <p className="card-text m-0 p-0">
                              Expert: {userData.speciality}
                            </p>
                          </div>

                          <div className="d-flex justify-content-between mt-2 pb-1">
                            <div>
                              <span className="badge badge-pill mr-1 badge-success card-badgesize">
                                {userData.lawyerType}
                              </span>
                              <span className="badge badge-pill badge-info  card-badgesize">
                                {userData.profileType}
                              </span>
                            </div>

                            <Link
                              to={`/details/${userData._id}`}
                              className="btn btn-primary btn-sm"
                            >
                              Details
                              <i className="fa fa-arrow-circle-right pl-2"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>

        {/* LawFirm section */}
      </div>
    );
  }
}

export default BusinessLawFirm;
