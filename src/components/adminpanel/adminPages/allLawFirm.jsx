import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as lawyerService from '../../../services/lawyerServices';

class AllLawFirm extends Component {
  state = {
    lawyers: [],
  };

  async componentDidMount() {
    await this.getAllLawFirms();
  }


  
  async getAllLawFirms()  {
    const res = await lawyerService.getAllLawyer();
    if (res.data.success) {
      this.setState({ lawyers: res.data.user });
      console.log("componentDidMount----response", this.state.lawyers);
      // filter comleted profile
      const arrayOfObject = this.state.lawyers;

      var newLAawyer = arrayOfObject.filter(function (arrayOfObj) {
        return arrayOfObj.profileType === "LawFirm";
      });
      console.log("newLAawyer--->>", newLAawyer);

      this.setState({ lawyers: newLAawyer });
      // filter comleted profile
       
    }
    else{
      toast.error("Error: Something went wrong. Failed to Data");
      // console.log("getAllLawFirms_err----->>", res.data.error);
    }
  }

  removeItem(e) {
    // find index and remove index form array
    // console.log("before remove---->>", this.state.lawyers);
    const index = this.state.lawyers.findIndex((lawyer) => lawyer._id == e);
    // console.log("index----->>", index);
    this.state.lawyers.splice(index, 1);
    // console.log("after remove---->>", this.state.lawyers);
    // find index and remove index form array
    const lawyers = this.state.lawyers;

    this.setState({ lawyers: lawyers });
    // console.log("new_state ---->>", this.state.lawyers);
  }

  async lawfirmDelete(e){
    this.removeItem(e);
    const res = await lawyerService.deleteLawyerProfile(e);
    if (res.data.success) {
      this.getAllLawFirms();   
    }
    else{
      toast.error("Error: Something went wrong. Failed to Delete");
      // console.log("lawyerDelete_err----->>", res.data.error);
    }
  }


  render() {
    const { length: count } = this.state.lawyers;

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
        <h1 className="m-4">There are all Database lawfirms </h1>
        <table class="table table-hover border border-info">
          <thead>
            <tr className="bg-info">
              <th scope="col">Name</th>
              <th scope="col">Speciality</th>
              <th scope="col">ContactNo</th>
              <th scope="col">View Details</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lawyers.map((userData, i) => (
              <tr key={i}>
                <td>{userData.name} </td>
                <td>{userData.speciality} </td>
                <td>{userData.contactNo}</td>
                <td>
                  <Link
                    to={`/viewdetails/${userData._id}`}
                    className="btn btn-info btn-sm"
                  >
                    <i className="fa fa-eye"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    // onClick={() => this.lawfirmDelete(userData._id)}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this Lawyer?"
                        )
                      )
                        this.lawfirmDelete(userData._id);
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

export default AllLawFirm;
