import http from "./httpServices";
import * as Urls from "../config.json";

export function SignupUser(user) {
    console.log("SignupUser_Serv_call--->>");
    return http.post(Urls.BASE_URL + Urls.USER_SIGNUP_URL, {
        name: user.name,
        email: user.email,
        password: user.password,
    });
}

export function updateUserProfile(ProfileData) {
    return http.put(Urls.BASE_URL +Urls.UPDATE_USER_PROFILE_URL,
                    ProfileData
                    );
}

export function getAllUser() {
    console.log("getAllUser_Serv_call--->>");
    return http.get(Urls.BASE_URL +Urls.UPDATE_USER_PROFILE_URL);
}

export function getUserProfile(id) {
    console.log("getUserProfile_Serv_call--->>");
    return http.get(Urls.BASE_URL +Urls.GET_USER_PROFILE_URL+id);
}

export function deleteUserProfile(id) {
    console.log("deleteUserProfile_Serv_call--->>");            
    return http.delete(Urls.BASE_URL + Urls.DELETE_USER_PROFILE_URL+id);         
}
export function postComments(obj) {
    console.log("postComments_Serv_call--->>");
    return http.put(Urls.BASE_URL + Urls.ADD_CASE_COMMENTS_URL,obj);
}

export function getCase(id) {
    console.log("getCase_Serv_call--->>");            
    return http.get(Urls.BASE_URL + Urls.GET_CASE_URL+id);         
}

export function getALLCases(obj) {
    console.log("getALLCases_Serv_call--->>");            
    return http.get(Urls.BASE_URL + Urls.GET_CASE_URL + Urls.GET_ALL_CASES_URL,obj);         
}

export function CancelCase(obj) {
    console.log("CancelCase_Serv_call--->>");            
    return http.put(Urls.BASE_URL + Urls.GET_CASE_URL + Urls.CANCEL_CASE_URL,obj);         
}

export function addReview(obj) {
    console.log("addReview_Serv_call--->>");            
    return http.put(Urls.BASE_URL + Urls.ADD_CASE_REVIEW_URL,obj);         
}

export default {
    updateUserProfile,
    SignupUser,
    deleteUserProfile,
    getCase,
    getUserProfile,
    postComments,
    getALLCases,
    addReview,
    getAllUser
};