import http from "./httpServices";
import * as Urls from "../config.json";


export function SignupLawyer(user) {
    console.log("SignupLawyer_Serv_call--->>");
    return http.post(Urls.BASE_URL + Urls.LAWYER_SIGNUP_URL, {
        name: user.name,
        email: user.email,
        password: user.password,
    });
}

export function getLawyerProfile(id) {
    console.log("getLawyerProfile_Serv_call--->>");
    return http.get(Urls.BASE_URL +Urls.GET_LAWYER_PROFILE_URL+id);
}

export function getLawyerDetail(id) {
    console.log("getLawyerDetail_Serv_call--->>");
    return http.get(Urls.BASE_URL +Urls.GET_LAWYER_DETAILS_URL+id);
}

export function getLawyerReview(id) {
    console.log("getLawyerReview_Serv_call--->>");
    return http.get(Urls.BASE_URL +Urls.GET_LAWYER_REVIEW_URL+id);
}
export function hireLawyer(obj) {
    console.log("hireLawyer_Serv_call--->>");
    return http.post(Urls.BASE_URL +Urls.HIRE_LAWYER_URL,obj);
}

export function getPendingCases(obj) {
    console.log("getPedingCases_Serv_call--->>");
    return http.post(Urls.BASE_URL +Urls.GET_CASE_URL+Urls.GET_PENDIMG_CASES_URL,obj);
}

export function getInprogressCases(obj) {
    console.log("getInprogressCases_Serv_call--->>");
    return http.post(Urls.BASE_URL +Urls.GET_CASE_URL+Urls.GET_PENDIMG_CASES_URL,obj);
}

export function approvedOrDisapproved(obj) {
    console.log("approvedOrDisapproved_Serv_call--->>");
    return http.put(Urls.BASE_URL +Urls.GET_CASE_URL+Urls.GET_PENDIMG_CASES_URL,obj);
}

export function markCompleted(obj) {
    console.log("markCompleted_Serv_call--->>");
    return http.put(Urls.BASE_URL +Urls.GET_CASE_URL+Urls.MARK_COMPLETED_CASES_URL,obj);
}

export function updateLawyerProfile(ProfileData) {
    console.log("updateLawyerProfile_Serv_call--->>");
    return http.put(Urls.BASE_URL +Urls.UPDATE_LAWYER_PROFILE_URL,ProfileData);
}

export function deleteLawyerProfile(id) {
    console.log("deleteLawyerProfile_Serv_call--->>");            
    return http.delete(Urls.BASE_URL + Urls.DELETE_LAWYER_PROFILE_URL+id);         
}

export function getAllLawyer() {         
    console.log("getAllLawyer_Serv_call--->>");            
    return http.get(Urls.BASE_URL + Urls.GET_ALL_LAWYERS_URL);         
}

export function getCompleteCases(obj) {         
    console.log("getCompleteCases_Serv_call--->>");                    
    return http.post(Urls.BASE_URL + Urls.GET_CASE_URL+Urls.GET_COMPLETE_CASES_URL,obj);         
}

export default {
    SignupLawyer,
    getLawyerProfile,
    deleteLawyerProfile,
    getAllLawyer,
    updateLawyerProfile,
    getLawyerDetail,
    getLawyerReview,
    hireLawyer,
    getCompleteCases,
    getPendingCases,
    getInprogressCases,
    markCompleted
};