import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import { getCurrentUser } from "../../services/authService";
import * as lawyerService from '../../services/lawyerServices'

// import dummyImg from '../../images/profile_placeholder.png';
const baseURL = "http://localhost:5000/";

class UpdateProfieLawyer extends Component {
  state = {
    account: {
      city: "",
      address: "",
      contactNo: "",
      lawyerType: "",
      showContactNo: "",
      profileType: "",
      speciality: "",
      website: "",
      // userImage: "",
    },
    userImage: null,
    user: "",
    errors: {},
  };

  schema = {
    address: Joi.string().required().min(3).max(70).label("address"),
    profileType: Joi.string().required().label("profileType___okkkkk"),
    lawyerType: Joi.string().required().label("category___okkkkk"),
    showContactNo: Joi.string().required().label("category___okkkkk"),
    city: Joi.string().required().label("city___okkkkk"),
    speciality: Joi.string().allow("").optional(),
    website: Joi.string().allow("").optional(),
    contactNo: Joi.number().integer().min(11).required().label("Phone number"),
  };

  componentDidMount() {
    const userCurrent = getCurrentUser();
  
    this.getProfile(userCurrent.user._id);
    
  }

  lawyerType = async (event) => {
    // console.log("lawyerType--->>");
    // console.log("Radio_value---->>", event.target.value);
    // console.log("Radio_name---->>", event.target.name);

    const account = { ...this.state.account };

    // console.log("state_account---->>", account);
    account[event.target.name] = event.target.value;

    await this.setState({ account });
  };
  showNumber = async (event) => {
    // console.log("showNumber--->>");
    // console.log("Radio_value---->>", event.target.value);
    // console.log("Radio_name---->>", event.target.name);

    const account = { ...this.state.account };

    // console.log("state_account---->>", account);
    account[event.target.name] = event.target.value;

    await this.setState({ account });
  };

  profileType = async (event) => {
    // console.log("profileType--->>");

    const account = { ...this.state.account };

    // console.log("state_account---->>", account);
    account[event.target.name] = event.target.value;

    await this.setState({ account });
  };

  handleCityChange = async (e) => {
    const account = { ...this.state.account };

    account[e.target.name] = e.target.value;

    await this.setState({ account });
  };

  validate = () => {
    // console.log("validate--->>");
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    // console.log("validateProperty--->>");
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // console.log("handleChange--->>");
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  onChangeHandler = (e) => {
    // console.log("onChangeHandler--->>");

    // console.log("onChangeHandler--->>", e.target.files[0]);
    const file = e.target.files[0];
    this.setState({ userImage: file }, () => {
      console.log("setState_e--->>", this.state.userImage);
    });
  };


  async getProfile(id) {
    // let a ="3242klj2k34j2kl4j3"
    const res = await lawyerService.getLawyerProfile(id);
    // console.log("profile_getUser_res", res);   
    if(res.data.success){
      const profileData = res.data.user;
      // console.log("profileData_user--->>", profileData);
      // console.log("lawyerType------->>", profileData.lawyerType);
          // const showNum = profileData.showContactNo.toString();

          this.setState({
            account: {
              ...this.state.account,
              city: profileData.city,
              address: profileData.address,
              contactNo: profileData.contactNo,
              lawyerType: profileData.lawyerType,
              speciality: profileData.speciality,
              website: profileData.website,
              showContactNo: profileData.showContactNo.toString(),
              profileType: profileData.profileType,
            },
          });
          this.setState({
            userImage: profileData.userImage,
          });
          // console.log("state------->>", this.state.account);    
    }
    else{
      toast.error("Error: Something went wrong. Failed to get Profile data");
      // console.log("getProfile_err----->>", res.data.error);
    }
  }


  async updateProfile(data) {

    const res = await lawyerService.updateLawyerProfile(data);
    if(res.data.success){
      // console.log("updateProfile_res----->>", res.data);
      window.location = "/LawyerProfile";
    }
    else{
      toast.error("Error: Something went wrong. Failed to update profile");
      // console.log("updateProfile_err----->>", res.data.error);

    }
  }

  handleSubmit = async (e) => {
    // console.log("handleSubmit_call--->>");
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const account = this.state.account;
    const userImage = this.state.userImage;

    // console.log("this.state.userImage--->>", this.state.userImage);
    const formData = new FormData();

    formData.append("userImage", userImage);
    formData.append("city", account.city);
    formData.append("address", account.address);
    formData.append("contactNo", account.contactNo);
    formData.append("lawyerType", account.lawyerType);
    formData.append("showContactNo", account.showContactNo);
    formData.append("profileType", account.profileType);
    formData.append("speciality", account.speciality);
    formData.append("website", account.website);

    // console.log("guru--->>", formData.get("userImage"));

    await this.updateProfile(formData);

    // console.log("handleSubmit_end--->>", this.state.account);
    // console.log("handleSubmit_end--->>", this.state.userImage);
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="container">
        <div className="row m-5">
          <div className="col-md-2"></div>
          <div className="col-md-8 registerStyle mt-5 mb-5 p-2">
            <div className="container">
              <h2 className="text-center p-3">Update Profile Lawyer/LawFirm</h2>
              <form className="pt-3 pb-5" onSubmit={this.handleSubmit}>
                <hr />
                <div class="form-group">
                  <div className="row">
                    <div className="col-sm-4">
                      <label
                        for="exampleFormControlSelect1"
                        className="font-weight-bold"
                      >
                        Select your city
                      </label>
                    </div>
                    <div className="col-sm-8">
                      <select
                        id="dropdown"
                        name="city"
                        value={this.state.account.city}
                        onChange={this.handleCityChange}
                        required
                      >
                        <option value="" disabled selected>
                          --Select City--
                        </option>
                        <option name="city" value="Islamabad">
                          Islamabad
                        </option>
                        <option name="city" value="" disabled>
                          Punjab Cities
                        </option>
                        <option name="city" value="Ahmed Nager Chatha">
                          Ahmed Nager Chatha
                        </option>
                        <option name="city" value="Ahmadpur East">
                          Ahmadpur East
                        </option>
                        <option name="city" value="Ali Khan Abad">
                          Ali Khan Abad
                        </option>
                        <option name="city" value="Alipur">
                          Alipur
                        </option>
                        <option name="city" value="Arifwala">
                          Arifwala
                        </option>
                        <option name="city" value="Attock">
                          Attock
                        </option>
                        <option name="city" value="Bhera">
                          Bhera
                        </option>
                        <option name="city" value="Bhalwal">
                          Bhalwal
                        </option>
                        <option name="city" value="Bahawalnagar">
                          Bahawalnagar
                        </option>
                        <option name="city" value="Bahawalpur">
                          Bahawalpur
                        </option>
                        <option name="city" value="Bhakkar">
                          Bhakkar
                        </option>
                        <option name="city" value="Burewala">
                          Burewala
                        </option>
                        <option name="city" value="Chillianwala">
                          Chillianwala
                        </option>
                        <option name="city" value="Chakwal">
                          Chakwal
                        </option>
                        <option name="city" value="Chichawatni">
                          Chichawatni
                        </option>
                        <option name="city" value="Chiniot">
                          Chiniot
                        </option>
                        <option name="city" value="Chishtian">
                          Chishtian
                        </option>
                        <option name="city" value="Daska">
                          Daska
                        </option>
                        <option name="city" value="Darya Khan">
                          Darya Khan
                        </option>
                        <option name="city" value="Dera Ghazi Khan">
                          Dera Ghazi Khan
                        </option>
                        <option name="city" value="Dhaular">
                          Dhaular
                        </option>
                        <option name="city" value="Dina">
                          Dina
                        </option>
                        <option name="city" value="Dinga">
                          Dinga
                        </option>
                        <option name="city" value="Dipalpur">
                          Dipalpur
                        </option>
                        <option name="city" value="Faisalabad">
                          Faisalabad
                        </option>
                        <option name="city" value="Fateh Jhang">
                          Fateh Jang
                        </option>
                        <option name="city" value="Ghakhar Mandi">
                          Ghakhar Mandi
                        </option>
                        <option name="city" value="Gojra">
                          Gojra
                        </option>
                        <option name="city" value="Gujranwala">
                          Gujranwala
                        </option>
                        <option name="city" value="Gujrat">
                          Gujrat
                        </option>
                        <option name="city" value="Gujar Khan">
                          Gujar Khan
                        </option>
                        <option name="city" value="Hafizabad">
                          Hafizabad
                        </option>
                        <option name="city" value="Haroonabad">
                          Haroonabad
                        </option>
                        <option name="city" value="Hasilpur">
                          Hasilpur
                        </option>
                        <option name="city" value="Haveli">
                          Haveli
                        </option>
                        <option name="city" value="Lakha">
                          Lakha
                        </option>
                        <option name="city" value="Jalalpur">
                          Jalalpur
                        </option>
                        <option name="city" value="Jattan">
                          Jattan
                        </option>
                        <option name="city" value="Jampur">
                          Jampur
                        </option>
                        <option name="city" value="Jaranwala">
                          Jaranwala
                        </option>
                        <option name="city" value="Jhang">
                          Jhang
                        </option>
                        <option name="city" value="Jhelum">
                          Jhelum
                        </option>
                        <option name="city" value="Kalabagh">
                          Kalabagh
                        </option>
                        <option name="city" value="Karor Lal Esan">
                          Karor Lal Esan
                        </option>
                        <option name="city" value="Kasur">
                          Kasur
                        </option>
                        <option name="city" value="Kamalia">
                          Kamalia
                        </option>
                        <option name="city" value="Kamoke">
                          Kamoke
                        </option>
                        <option name="city" value="Khanewal">
                          Khanewal
                        </option>
                        <option name="city" value="Khanpur">
                          Khanpur
                        </option>
                        <option name="city" value="Kharian">
                          Kharian
                        </option>
                        <option name="city" value="Khushab">
                          Khushab
                        </option>
                        <option name="city" value="Kot Adu">
                          Kot Adu
                        </option>
                        <option name="city" value="Jauharabad">
                          Jauharabad
                        </option>
                        <option name="city" value="Lahore">
                          Lahore
                        </option>
                        <option name="city" value="Lalamusa">
                          Lalamusa
                        </option>
                        <option name="city" value="Layyah">
                          Layyah
                        </option>
                        <option name="city" value="Liaquat Pur">
                          Liaquat Pur
                        </option>
                        <option name="city" value="Lodhran">
                          Lodhran
                        </option>
                        <option name="city" value="Malakwal">
                          Malakwal
                        </option>
                        <option name="city" value="Mamoori">
                          Mamoori
                        </option>
                        <option name="city" value="Mailsi">
                          Mailsi
                        </option>
                        <option name="city" value="Mandi Bahauddin">
                          Mandi Bahauddin
                        </option>
                        <option name="city" value="mian Channu">
                          Mian Channu
                        </option>
                        <option name="city" value="Mianwali">
                          Mianwali
                        </option>
                        <option name="city" value="Multan">
                          Multan
                        </option>
                        <option name="city" value="Murree">
                          Murree
                        </option>
                        <option name="city" value="Muridke">
                          Muridke
                        </option>
                        <option name="city" value="Mianwali Bangla">
                          Mianwali Bangla
                        </option>
                        <option name="city" value="Muzaffargarh">
                          Muzaffargarh
                        </option>
                        <option name="city" value="Narowal">
                          Narowal
                        </option>
                        <option name="city" value="Okara">
                          Okara
                        </option>
                        <option name="city" value="Renala Khurd">
                          Renala Khurd
                        </option>
                        <option name="city" value="Pakpattan">
                          Pakpattan
                        </option>
                        <option name="city" value="Pattoki">
                          Pattoki
                        </option>
                        <option name="city" value="Pir Mahal">
                          Pir Mahal
                        </option>
                        <option name="city" value="Qaimpur">
                          Qaimpur
                        </option>
                        <option name="city" value="Qila Didar Singh">
                          Qila Didar Singh
                        </option>
                        <option name="city" value="Rabwah">
                          Rabwah
                        </option>
                        <option name="city" value="Raiwind">
                          Raiwind
                        </option>
                        <option name="city" value="Rajanpur">
                          Rajanpur
                        </option>
                        <option name="city" value="Rahim Yar Khan">
                          Rahim Yar Khan
                        </option>
                        <option name="city" value="Rawalpindi">
                          Rawalpindi
                        </option>
                        <option name="city" value="Sadiqabad">
                          Sadiqabad
                        </option>
                        <option name="city" value="Safdarabad">
                          Safdarabad
                        </option>
                        <option name="city" value="Sahiwal">
                          Sahiwal
                        </option>
                        <option name="city" value="Sangla Hill">
                          Sangla Hill
                        </option>
                        <option name="city" value="Sarai Alamgir">
                          Sarai Alamgir
                        </option>
                        <option name="city" value="Sargodha">
                          Sargodha
                        </option>
                        <option name="city" value="Shakargarh">
                          Shakargarh
                        </option>
                        <option name="city" value="Sheikhupura">
                          Sheikhupura
                        </option>
                        <option name="city" value="Sialkot">
                          Sialkot
                        </option>
                        <option name="city" value="Sohawa">
                          Sohawa
                        </option>
                        <option name="city" value="Soianwala">
                          Soianwala
                        </option>
                        <option name="city" value="Siranwali">
                          Siranwali
                        </option>
                        <option name="city" value="Talagang">
                          Talagang
                        </option>
                        <option name="city" value="Taxila">
                          Taxila
                        </option>
                        <option name="city" value="Toba Tek  Singh">
                          Toba Tek Singh
                        </option>
                        <option name="city" value="Vehari">
                          Vehari
                        </option>
                        <option name="city" value="Wah Cantonment">
                          Wah Cantonment
                        </option>
                        <option name="city" value="Wazirabad">
                          Wazirabad
                        </option>
                        <option name="city" value="" disabled>
                          Sindh Cities
                        </option>
                        <option name="city" value="Badin">
                          Badin
                        </option>
                        <option name="city" value="Bhirkan">
                          Bhirkan
                        </option>
                        <option name="city" value="Rajo Khanani">
                          Rajo Khanani
                        </option>
                        <option name="city" value="Chak">
                          Chak
                        </option>
                        <option name="city" value="Dadu">
                          Dadu
                        </option>
                        <option name="city" value="Digri">
                          Digri
                        </option>
                        <option name="city" value="Diplo">
                          Diplo
                        </option>
                        <option name="city" value="Dokri">
                          Dokri
                        </option>
                        <option name="city" value="Ghotki">
                          Ghotki
                        </option>
                        <option name="city" value="Haala">
                          Haala
                        </option>
                        <option name="city" value="Hyderabad">
                          Hyderabad
                        </option>
                        <option name="city" value="Islamkot">
                          Islamkot
                        </option>
                        <option name="city" value="Jacobabad">
                          Jacobabad
                        </option>
                        <option name="city" value="Jamshoro">
                          Jamshoro
                        </option>
                        <option name="city" value="Jungshahi">
                          Jungshahi
                        </option>
                        <option name="city" value="Kandhkot">
                          Kandhkot
                        </option>
                        <option name="city" value="Kandiaro">
                          Kandiaro
                        </option>
                        <option name="city" value="Karachi">
                          Karachi
                        </option>
                        <option name="city" value="Kashmore">
                          Kashmore
                        </option>
                        <option name="city" value="Keti Bandar">
                          Keti Bandar
                        </option>
                        <option name="city" value="Khairpur">
                          Khairpur
                        </option>
                        <option name="city" value="Kotri">
                          Kotri
                        </option>
                        <option name="city" value="Larkana">
                          Larkana
                        </option>
                        <option name="city" value="Matiari">
                          Matiari
                        </option>
                        <option name="city" value="Mehar">
                          Mehar
                        </option>
                        <option name="city" value="Mirpur Khas">
                          Mirpur Khas
                        </option>
                        <option name="city" value="Mithani">
                          Mithani
                        </option>
                        <option name="city" value="Mithi">
                          Mithi
                        </option>
                        <option name="city" value="Mehrabpur">
                          Mehrabpur
                        </option>
                        <option name="city" value="Moro">
                          Moro
                        </option>
                        <option name="city" value="Nagarparkar">
                          Nagarparkar
                        </option>
                        <option name="city" value="Naudero">
                          Naudero
                        </option>
                        <option name="city" value="Naushahro Feroze">
                          Naushahro Feroze
                        </option>
                        <option name="city" value="Naushara">
                          Naushara
                        </option>
                        <option name="city" value="Nawabshah">
                          Nawabshah
                        </option>
                        <option name="city" value="Nazimabad">
                          Nazimabad
                        </option>
                        <option name="city" value="Qambar">
                          Qambar
                        </option>
                        <option name="city" value="Qasimabad">
                          Qasimabad
                        </option>
                        <option name="city" value="Ranipur">
                          Ranipur
                        </option>
                        <option name="city" value="Ratodero">
                          Ratodero
                        </option>
                        <option name="city" value="Rohri">
                          Rohri
                        </option>
                        <option name="city" value="Sakrand">
                          Sakrand
                        </option>
                        <option name="city" value="Sanghar">
                          Sanghar
                        </option>
                        <option name="city" value="Shahbandar">
                          Shahbandar
                        </option>
                        <option name="city" value="Shahdadkot">
                          Shahdadkot
                        </option>
                        <option name="city" value="Shahdadpur">
                          Shahdadpur
                        </option>
                        <option name="city" value="Shahpur Chakar">
                          Shahpur Chakar
                        </option>
                        <option name="city" value="Shikarpaur">
                          Shikarpaur
                        </option>
                        <option name="city" value="Sukkur">
                          Sukkur
                        </option>
                        <option name="city" value="Tangwani">
                          Tangwani
                        </option>
                        <option name="city" value="Tando Adam Khan">
                          Tando Adam Khan
                        </option>
                        <option name="city" value="Tando Allahyar">
                          Tando Allahyar
                        </option>
                        <option name="city" value="Tando Muhammad Khan">
                          Tando Muhammad Khan
                        </option>
                        <option name="city" value="Thatta">
                          Thatta
                        </option>
                        <option name="city" value="Umerkot">
                          Umerkot
                        </option>
                        <option name="city" value="Warah">
                          Warah
                        </option>
                        <option name="city" value="" disabled>
                          Khyber Cities
                        </option>
                        <option name="city" value="Abbottabad">
                          Abbottabad
                        </option>
                        <option name="city" value="Adezai">
                          Adezai
                        </option>
                        <option name="city" value="Alpuri">
                          Alpuri
                        </option>
                        <option name="city" value="Akora Khattak">
                          Akora Khattak
                        </option>
                        <option name="city" value="Ayubia">
                          Ayubia
                        </option>
                        <option name="city" value="Banda Daud Shah">
                          Banda Daud Shah
                        </option>
                        <option name="city" value="Bannu">
                          Bannu
                        </option>
                        <option name="city" value="Batkhela">
                          Batkhela
                        </option>
                        <option name="city" value="Battagram">
                          Battagram
                        </option>
                        <option name="city" value="Birote">
                          Birote
                        </option>
                        <option name="city" value="Chakdara">
                          Chakdara
                        </option>
                        <option name="city" value="Charsadda">
                          Charsadda
                        </option>
                        <option name="city" value="Chitral">
                          Chitral
                        </option>
                        <option name="city" value="Daggar">
                          Daggar
                        </option>
                        <option name="city" value="Dargai">
                          Dargai
                        </option>
                        <option name="city" value="Darya Khan">
                          Darya Khan
                        </option>
                        <option name="city" value="dera Ismail Khan">
                          Dera Ismail Khan
                        </option>
                        <option name="city" value="Doaba">
                          Doaba
                        </option>
                        <option name="city" value="Dir">
                          Dir
                        </option>
                        <option name="city" value="Drosh">
                          Drosh
                        </option>
                        <option name="city" value="Hangu">
                          Hangu
                        </option>
                        <option name="city" value="Haripur">
                          Haripur
                        </option>
                        <option name="city" value="Karak">
                          Karak
                        </option>
                        <option name="city" value="Kohat">
                          Kohat
                        </option>
                        <option name="city" value="Kulachi">
                          Kulachi
                        </option>
                        <option name="city" value="Lakki Marwat">
                          Lakki Marwat
                        </option>
                        <option name="city" value="Latamber">
                          Latamber
                        </option>
                        <option name="city" value="Madyan">
                          Madyan
                        </option>
                        <option name="city" value="Mansehra">
                          Mansehra
                        </option>
                        <option name="city" value="Mardan">
                          Mardan
                        </option>
                        <option name="city" value="Mastuj">
                          Mastuj
                        </option>
                        <option name="city" value="Mingora">
                          Mingora
                        </option>
                        <option name="city" value="Nowshera">
                          Nowshera
                        </option>
                        <option name="city" value="Paharpur">
                          Paharpur
                        </option>
                        <option name="city" value="Pabbi">
                          Pabbi
                        </option>
                        <option name="city" value="Peshawar">
                          Peshawar
                        </option>
                        <option name="city" value="Saidu Sharif">
                          Saidu Sharif
                        </option>
                        <option name="city" value="Shorkot">
                          Shorkot
                        </option>
                        <option name="city" value="Shewa Adda">
                          Shewa Adda
                        </option>
                        <option name="city" value="Swabi">
                          Swabi
                        </option>
                        <option name="city" value="Swat">
                          Swat
                        </option>
                        <option name="city" value="Tangi">
                          Tangi
                        </option>
                        <option name="city" value="Tank">
                          Tank
                        </option>
                        <option name="city" value="Thall">
                          Thall
                        </option>
                        <option name="city" value="Timergara">
                          Timergara
                        </option>
                        <option name="city" value="Tordher">
                          Tordher
                        </option>
                        <option name="city" value="" disabled>
                          Balochistan Cities
                        </option>
                        <option name="city" value="Awaran">
                          Awaran
                        </option>
                        <option name="city" value="Barkhan">
                          Barkhan
                        </option>
                        <option name="city" value="Chagai">
                          Chagai
                        </option>
                        <option name="city" value="Dera Bugti">
                          Dera Bugti
                        </option>
                        <option name="city" value="Gwadar">
                          Gwadar
                        </option>
                        <option name="city" value="Harnai">
                          Harnai
                        </option>
                        <option name="city" value="Jafarabad">
                          Jafarabad
                        </option>
                        <option name="city" value="Jhal Magsi">
                          Jhal Magsi
                        </option>
                        <option name="city" value="Kacchi">
                          Kacchi
                        </option>
                        <option name="city" value="Kalat">
                          Kalat
                        </option>
                        <option name="city" value="Kech">
                          Kech
                        </option>
                        <option name="city" value="Kharan">
                          Kharan
                        </option>
                        <option name="city" value="Khuzdar">
                          Khuzdar
                        </option>
                        <option name="city" value="Killa Abdullah">
                          Killa Abdullah
                        </option>
                        <option name="city" value="Killa Saifullah">
                          Killa Saifullah
                        </option>
                        <option name="city" value="Kohlu">
                          Kohlu
                        </option>
                        <option name="city" value="Lasbela">
                          Lasbela
                        </option>
                        <option name="city" value="Lehri">
                          Lehri
                        </option>
                        <option name="city" value="Loralai">
                          Loralai
                        </option>
                        <option name="city" value="Mastung">
                          Mastung
                        </option>
                        <option name="city" value="Musakhel">
                          Musakhel
                        </option>
                        <option name="city" value="Nasirabad">
                          Nasirabad
                        </option>
                        <option name="city" value="Nushki">
                          Nushki
                        </option>
                        <option name="city" value="Panjgur">
                          Panjgur
                        </option>
                        <option name="city" value="Pishin valley">
                          Pishin Valley
                        </option>
                        <option name="city" value="Quetta">
                          Quetta
                        </option>
                        <option name="city" value="Sherani">
                          Sherani
                        </option>
                        <option name="city" value="Sibi">
                          Sibi
                        </option>
                        <option name="city" value="Sohbatpur">
                          Sohbatpur
                        </option>
                        <option name="city" value="Washuk">
                          Washuk
                        </option>
                        <option name="city" value="Zhob">
                          Zhob
                        </option>
                        <option name="city" value="Ziarat">
                          Ziarat
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr />
                <fieldset class="form-group">
                  <p className="font-weight-normal">
                    Are you working Individual Lawyer or a LawFirm
                  </p>
                  <div class="row">
                    <legend class="col-form-label col-sm-6 pt-0 font-weight-bold">
                      Profile type
                    </legend>
                    <div class="col-sm-6">
                      <div onChange={(event) => this.profileType(event)}>
                        <input
                          type="radio"
                          value="Individual"
                          checked={
                            this.state.account.profileType === "Individual"
                          }
                          name="profileType"
                        />
                        <span className="p-2">Individual lawyer</span>

                        <input
                          type="radio"
                          value="LawFirm"
                          checked={this.state.account.profileType === "LawFirm"}
                          name="profileType"
                        />
                        <span className="p-2">LawFirm</span>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <hr />
                <div className="form-group">
                  <label className="font-weight-bold">Address</label>
                  <input
                    name="address"
                    className="form-control"
                    type="text"
                    placeholder="Example: Al Hafeez Heights, Gulberg III, Lahore"
                    onChange={this.handleChange}
                    value={account.address}
                    error={errors.address}
                  />
                  {errors.address && (
                    <div className="alert alert-danger">{errors.address} </div>
                  )}
                </div>
                <hr />
                <div className="form-group">
                  <p className="font-weight-normal">
                    Contact number not included dashes "-" only integer numbers
                    allowed
                  </p>
                  <label className="font-weight-bold">Contact number</label>
                  <input
                    name="contactNo"
                    className="form-control"
                    type="contactNo"
                    placeholder="030000000"
                    onChange={this.handleChange}
                    value={account.contactNo}
                    error={errors.contactNo}
                  />
                  {errors.contactNo && (
                    <div className="alert alert-danger">{errors.contactNo}</div>
                  )}
                </div>
                <hr />
                <fieldset class="form-group">
                  <div class="row">
                    <legend class="col-form-label col-sm-6 pt-0 font-weight-bold">
                      Show number
                    </legend>
                    <div class="col-sm-6">
                      <div onChange={(event) => this.showNumber(event)}>
                        <input
                          type="radio"
                          value="true"
                          checked={this.state.account.showContactNo === "true"}
                          name="showContactNo"
                        />
                        <span className="p-2">Yes</span>
                        <input
                          type="radio"
                          value="false"
                          checked={this.state.account.showContactNo === "false"}
                          name="showContactNo"
                        />
                        <span className="p-2">No</span>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <hr />
                <fieldset class="form-group">
                  <p className="font-weight-normal">
                    Expertise in Business Lawyer or Family Lawyer
                  </p>
                  <div class="row">
                    <legend class="col-form-label col-sm-6 pt-0 font-weight-bold">
                      Lawyer type
                    </legend>
                    <div class="col-sm-6">
                      <div onChange={(event) => this.lawyerType(event)}>
                        <input
                          type="radio"
                          value="Business"
                          checked={this.state.account.lawyerType === "Business"}
                          name="lawyerType"
                        />
                        <span className="p-2">Business</span>

                        <input
                          type="radio"
                          value="Family"
                          checked={this.state.account.lawyerType === "Family"}
                          name="lawyerType"
                        />
                        <span className="p-2">Family</span>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <hr />
                <div className="form-group">
                  <p className="font-weight-normal">
                    speciality likes Court Marriage, Banking & Finance, Divorce,
                    Criminal law
                  </p>
                  <label className="font-weight-bold">
                    speciality <span className="ml-2">--Optional</span>
                  </label>
                  <input
                    name="speciality"
                    className="form-control"
                    type="text"
                    placeholder="speciality likes Child Custody, Divorce Deeds"
                    onChange={this.handleChange}
                    value={account.speciality}
                    error={errors.speciality}
                  />
                  {errors.speciality && (
                    <div className="alert alert-danger">
                      {errors.speciality}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">
                    website Url <span className="ml-2">--Optional</span>
                  </label>
                  <input
                    name="website"
                    className="form-control"
                    type="text"
                    placeholder="www.example.com"
                    onChange={this.handleChange}
                    value={account.website}
                    error={errors.website}
                  />
                  {errors.website && (
                    <div className="alert alert-danger">{errors.website}</div>
                  )}
                </div>
                <hr />
                <div>
                  {this.state.userImage ? (
                    <div className="col-sm-4 m-0 p-0">
                      <img
                        class="rounded d-block w-50 h-50"
                        src={baseURL + this.state.userImage}
                        alt="image"
                      />
                    </div>
                  ) : (
                    <div className="col-sm-4 m-0 p-0"></div>
                  )}
                </div>
                <div class="form-group files">
                  <label>Upload Your image </label>
                  <input
                    name="userImage"
                    type="file"
                    class="form-control"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="d-flex justify-content-between pt-3">
                  <button
                    disabled={this.validate()}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  <Link
                    to={`LawyerProfile`}
                    className="btn btn-secondary btn-md"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>

        {/* asdfasfasfasfa */}
      </div>
    );
  }
}

export default UpdateProfieLawyer;
