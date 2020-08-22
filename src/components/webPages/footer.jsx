import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="mainfooter" role="contentinfo">
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div className="footer-pad">
                  <h4>Business Lawyer</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#"></a>
                    </li>
                    <li>
                      <a href="#">Intellectual Property Law (IP)</a>
                    </li>
                    <li>
                      <a href="#">Trademark | Copyright | Patent</a>
                    </li>
                    <li>
                      <a href="#">Banking & Finance</a>
                    </li>
                    <li>
                      <a href="#">Corporate & Commercial</a>
                    </li>
                    <li>
                      <a href="#">Taxation & Customs</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div className="footer-pad">
                  <h4>Family Laywer</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Divorce Law in Pakistan</a>
                    </li>
                    <li>
                      <a href="#">Family Law</a>
                    </li>
                    <li>
                      <a href="#">Court Marriage</a>
                    </li>
                    <li>
                      <a href="#">Child Custody</a>
                    </li>
                    <li>
                      <a href="#">Divorce Deeds</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                {/* <!--Column1--> */}
                <div className="footer-pad">
                  <h4>Help Support</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Support Forum</a>
                    </li>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="#">Support Policy</a>
                    </li>
                    <li>
                      <a href="#">FAQs</a>
                    </li>

                    <li>
                      <a href="#"></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <h4>Follow Us</h4>
                <ul className="social-network social-circle">
                  <li>
                    <a href="#" className="icoFacebook" title="Facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icoLinkedin" title="Linkedin">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icoLinkedin" title="Linkedin">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icoLinkedin" title="Linkedin">
                      <i className="fa fa-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 copy">
                <p className="text-center">
                  &copy; Copyright 2020 - Company Name. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
