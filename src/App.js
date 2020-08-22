import React, { Component } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// decide route web or admin
import AppRoute from './components/layouts/appRoutes';
// web layout
import AppLayout from './components/layouts/mainLayout';
// admin layout 
import AdminLayout from './components/layouts/adminDashoard';
// admin components here
import Dashboard from "./components/adminpanel/adminPages/dashBoard";
import AllLawyer from './components/adminpanel/adminPages/allLawyer';
import ViewLawyerDetails from './components/adminpanel/adminPages/viewLawyerDetails';
import AllLawFirm from "./components/adminpanel/adminPages/allLawFirm";
import AllUser from './components/adminpanel/adminPages/allUser';   
import UserDetails from './components/adminpanel/adminPages/userDetails';

// web components here
import Home from './components/webPages/home';
import NotFound from './components/webPages/notFound';
import SignupLawyer from './components/webPages/signupLawyer';
import LoginLawyer from './components/webPages/loginLawyer';
import SignupUser from './components/webPages/signupUser';
import LoginUser from './components/webPages/loginUser';
import LoginAdmin from "./components/webPages/loginAdmin";
import ProfileLawyer from './components/webPages/profileLawyer';
import CreateProfileLawyer from './components/webPages/createProfilelawyer';
import ProfileUser from './components/webPages/profileUser';
import CreateProfileUser from './components/webPages/createProfileUser';
import ProfileDetails from "./components/webPages/profileDetails";
import CaseDetails from './components/webPages/caseDetails';
import UpdateProfieLawyer from './components/webPages/updateProfileLawyer';
import UpdateProfileUser from './components/webPages/updateProfileUser';
import BusinessLawyer from './components/webPages/businessLawyer';
import BusinessLawFirm from "./components/webPages/businessLawFirm";
import FamilyLawyer from './components/webPages/familyLawyer';
import FamilyLawFirm from './components/webPages/familyLawFirm';
import AboutUs from './components/webPages/aboutUs';
import ContactUs from './components/webPages/contactUs';
import AllCases from './components/webPages/allCases';
import CompletedCases from "./components/webPages/completedCases";
import PendingCases from './components/webPages/pendingCases';
import InprogressCases from './components/webPages/inprogressCases';
import { getCurrentUser } from "./services/authService";





class App extends Component {    
  state = {};

 
  async componentDidMount() {
    const user = await getCurrentUser();
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer
          position="bottom-left"
          autoClose={7500}
        />
         <main className="">
          <Switch >
            {/* web App routes here */}
            <AppRoute path="/home" layout={AppLayout} component={Home} />
            <AppRoute
              path="/SignupLawyer"
              layout={AppLayout}
              component={SignupLawyer}
            />
             <AppRoute
              path="/SignupUser"
              layout={AppLayout}
              component={SignupUser}
            />
            <AppRoute
              path="/SigninLawyer"
              layout={AppLayout}
              component={LoginLawyer}
            />
            <AppRoute
              path="/SigninUser"
              layout={AppLayout}
              component={LoginUser}
            />
            <AppRoute
              path="/SigninAdmin"
              layout={AppLayout}
              component={LoginAdmin}
            />
            <AppRoute
              path="/LawyerProfile"
              layout={AppLayout}
              component={ProfileLawyer}              
            />
            <AppRoute
              path="/UserProfile"
              layout={AppLayout}
              component={ProfileUser}              
            />
             <AppRoute
              path="/createProfileLawyer"
              layout={AppLayout}
              component={CreateProfileLawyer}              
            />
             <AppRoute
              path="/createProfileUser"
              layout={AppLayout}
              component={CreateProfileUser}              
            />
             <AppRoute
              path="/updatelawyer"
              layout={AppLayout}
              component={UpdateProfieLawyer}
            />
            <AppRoute
              path="/updateuser"
              layout={AppLayout}
              component={UpdateProfileUser}
            />
            <AppRoute
              path="/businesslawyer"
              layout={AppLayout}
              component={BusinessLawyer}
            />
            <AppRoute
              path="/businesslawfirm"
              layout={AppLayout}
              component={BusinessLawFirm}
            />
             <AppRoute
              path="/familylawyer"
              layout={AppLayout}
              component={FamilyLawyer}
            />
             <AppRoute
              path="/familylawfirm"
              layout={AppLayout}
              component={FamilyLawFirm}
            />
            <AppRoute
              path="/details/:id"
              layout={AppLayout}
              component={ProfileDetails}
            />
             <AppRoute
              path="/casedetails/:id"
              layout={AppLayout}
              component={CaseDetails}
            />
             <AppRoute
              path="/allcases"
              layout={AppLayout}
              component={AllCases}
            />
             <AppRoute
              path="/pendingcases"
              layout={AppLayout}
              component={PendingCases}
            />
             <AppRoute
              path="/inprogresscases"
              layout={AppLayout}
              component={InprogressCases}
            />
             <AppRoute
              path="/completedcases"
              layout={AppLayout}
              component={CompletedCases}
            />
            <AppRoute path="/aboutus" layout={AppLayout} component={AboutUs} />
            <AppRoute
              path="/contactus"
              layout={AppLayout}
              component={ContactUs}
            />

             {/* admin routes here */}

             <AppRoute
              path="/allLawyers"
              layout={AdminLayout}
              component={AllLawyer}
            />
             <AppRoute
              path="/viewdetails/:id"
              layout={AdminLayout}
              component={ViewLawyerDetails}
            />
             <AppRoute
              path="/allLawfirms"
              layout={AdminLayout}
              component={AllLawFirm}
            />
             <AppRoute
              path="/allUsers"
              layout={AdminLayout}
              component={AllUser}
            />
            <AppRoute
              path="/userdetails/:id"
              layout={AdminLayout}
              component={UserDetails}
            />
            <AppRoute
              path="/adminpanel"
              layout={AdminLayout}
              component={Dashboard}
            />

            {/* below three routes must be end of the routes */}
            <Redirect from="/" exact to="/home" />
            <AppRoute
              path="/not-found"
              layout={AppLayout}
              component={NotFound}
            />
            <Redirect to="/not-found" />

           
          </Switch>
        </main>
     
      </React.Fragment>
    );
  }
}

export default App;
