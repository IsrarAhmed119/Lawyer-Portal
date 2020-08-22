import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as useService from '../../../services/userService';


class AllUser extends Component {
  state = {
    allUser: [],
  };

  async componentDidMount() {
    await this.getAllUser();
  }

  async getAllUser()  {
    const res = await useService.getAllUser();
    if (res.data.success) {  
      this.setState({ allUser: res.data.user }); 
    }
    else{
      toast.error("Error: Something went wrong. Failed to Data");
      // console.log("getAllUser_err----->>", res.data.error);
    }
  }


  removeItem(e) {
    // find index and remove index form array
    // console.log("before remove---->>", this.state.allUser);
    const index = this.state.allUser.findIndex((lawyer) => lawyer._id == e);
    // console.log("index----->>", index);
    this.state.allUser.splice(index, 1);
    // console.log("after remove---->>", this.state.allUser);
    // find index and remove index form array
    const allUser = this.state.allUser;

    this.setState({ allUser: allUser });
    // console.log("new_state ---->>", this.state.allUser);
  }

  async userDelete(e){
    this.removeItem(e);
    const res = await useService.deleteUserProfile(e);
    if (res.data.success) {
      this.getAllUser();   
    }
    else{
      toast.error("Error: Something went wrong. Failed to Delete");
      // console.log("lawyerDelete_err----->>", res.data.error);
    }
  }
  // async userDelete(e) {
  //   // console.log("lawyerDelete--->>", `${e} clicked`);
  //   this.removeItem(e);
  //   // custon header
  //   const config = {
  //     headers: {
  //       authorization: localStorage.getItem("token"),
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Accept: "application/json",
  //     },
  //   };
  //   const baseUrl = "http://localhost:5000/api";
  //   let url = baseUrl + "/auth/employeer/del/" + e;
  //   await axios
  //     .delete(url, { withCredentials: true }, config)
  //     .then((res) => {
  //       console.log("DelelteLawyer_service_res", res);

  //       if (res.data.success === true) {
  //         console.log("DelelteLawyer_response_True");
  //       } else {
  //         console.log("DelelteLawyer_service_res_Failed");
  //       }
  //     })
  //     .catch((err) => console.log("DelelteLawyer_service_err", err));
  // }

  render() {
    const { length: count } = this.state.allUser;

    if (count === 0)
      return (
        <div className="row container m-5">
          <div className="col-sm-12 m-5">
            <h4 className="font-weight-bold m-5 p-3 mb-2 bg-danger text-white">
              There is no data in the database.
            </h4>
          </div>
        </div>
      );
    return (
      <div className="container mt-5">
        <h1 className="m-4">There are all Database Users </h1>
        <table class="table table-hover border border-info">
          <thead>
            <tr className="bg-info">
              <th scope="col">Name</th>
              <th scope="col">City</th>
              <th scope="col">ContactNo</th>
              <th scope="col">View Details</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allUser.map((userData, i) => (
              <tr key={i}>
                <td>{userData.name} </td>
                <td>{userData.city} </td>
                <td>{userData.contactNo}</td>
                <td>
                  <Link
                    to={`/userdetails/${userData._id}`}
                    className="btn btn-info btn-sm"
                  >
                    <i className="fa fa-eye"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    // onClick={() => this.userDelete(userData._id)}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this user?"
                        )
                      )
                        this.userDelete(userData._id);
                    }}
                  >
                    <i class="fa fa-trash-o 3x"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllUser;
