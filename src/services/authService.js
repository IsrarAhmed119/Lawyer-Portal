import http from "./httpServices";
import jwtDecode from "jwt-decode";
import { BASE_URL, LAWYER_SIGNIN_URL,USER_SIGNIN_URL,ADMIN_SIGNIN_URL} from "../config.json";

const tokenKey = "token";

export  function login_Lawyer(email, password) {
    console.log("login_Lawyer_serv_call--->>");
  return http.post(BASE_URL+LAWYER_SIGNIN_URL, { email, password });
}
export  function login_User(email, password) {
    console.log("login_User_serv_call--->>");
  return http.post(BASE_URL+USER_SIGNIN_URL, { email, password });
}

export  function login_admin(email, password) {
    console.log("login_admin_serv_call--->>");
  return http.post(BASE_URL+ADMIN_SIGNIN_URL, { email, password });
}

// this function just set jwt into token in browser
export function loginWithJwt(jwt) {
    console.log("loginWithJwt_serv_call--->>");
    localStorage.setItem(tokenKey, jwt);
}
export function logout() {
    console.log("logout_serv_call--->>");
    localStorage.removeItem(tokenKey);
}
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login_Lawyer,
    login_admin,
    login_User,
    loginWithJwt,
    logout,
    getJwt,
    getCurrentUser
};