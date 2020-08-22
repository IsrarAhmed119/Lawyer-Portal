import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.common["x-access-token"] = `${token()}`;

// axios.interceptors.request.use(config => {
//     console.log("FormData_serv_call--->>");
//     if (config.data instanceof FormData) {
//         console.log("FormData_hae--->>");
//         Object.assign(config.headers, customHeader());
//         // axios.defaults.headers.common[ 'Content-Type'] = 'multipart/form-data'
//     }else{
//         console.log("FormData_no--->>");
//         return config;
        
//     }
   
//   });

//   function customHeader() {
//     const customHead = {
//         headers: {
//             name:"israr",
//           'Content-Type': 'multipart/form-data'
//         },
//       };
//   };

axios.interceptors.response.use(null, error => {
    console.log("httpServ_serv_call--->>");

    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
        // toast.error(error.response);
    if (!expectedError) {

        toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
});

export function token() {

    if (!localStorage.getItem("token")) {
        // console.log("token_if_return_null", localStorage.getItem("token"));

        return null;
    } else {
        // console.log("token_else", localStorage.getItem("token"));

        return localStorage.getItem("token");
    }
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,

};