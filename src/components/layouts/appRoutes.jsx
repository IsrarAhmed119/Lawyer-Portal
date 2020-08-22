import React from "react";
import { Route,Redirect } from "react-router-dom";
import {getCurrentUser} from '../../services/authService'

const AppRoute = ({ component: Component, layout: Layout, path, ...rest }) => {
  return (
  //   <Route
  //   {...rest}
  //   render={props => {
  //       console.log("path----->>",path)
  //       const loggedin = getCurrentUser();
  //       if(getCurrentUser())
  //             {
  //               return(
  //               <Layout>
  //                 <Component {...props} />
  //               </Layout>
  //               )
  //             }
  //           else{
  //             return(
  //                 <Layout>
  //                   <Component {...props} />
  //                 </Layout>
  //             )
  //           }
  //     }
      
  //     }
  // />

    <Route
      {...rest}
      render={props => {
        console.log("path----->>",path)
        // const loggedin = await getCurrentUser();
          switch(path) {
            case '/LawyerProfile':
               if (!getCurrentUser()){
                 
                    return (
                      <Redirect
                        to={{ pathname: "/home", state: { from: props.location } }}
                      />
                    );
                  } 
            default:
              return(
                <Layout>
                  <Component {...props} />
                </Layout>
            )
          }
        }
      }
    />
  );

  // return (
  //   <Route
  //     {...rest}
  //     render={props => (
  //       <Layout>
  //         <Component {...props} />
  //       </Layout>
  //     )}
  //   />
  // );
};

export default AppRoute;
