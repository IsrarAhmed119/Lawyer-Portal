import React from "react";

const AboutUs = () => {
  var styles = {
    firstcarousel: {
      backgroundImage:
        "url(" +
        "https://www.marj3.com/wp-content/uploads/2019/04/changes_to_family_law_ontario.jpg" +
        ")",
    },
    secondcarousel: {
      backgroundImage:
        "url(" +
        "https://www.supremecourt.gov.pk/wp-content/uploads/2019/09/IMG_2548.jpg" +
        ")",
    },
    thirdcarousel: {
      backgroundImage:
        "url(" +
        "https://www.marj3.com/wp-content/uploads/2019/04/changes_to_family_law_ontario.jpg" +
        ")",
    },
  };

  return (
    <div className="">
      <div className="border border-info">
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            {/* <!-- Slide One - Set the background image for this slide in the line below --> */}
            <div class="carousel-item active" style={styles.firstcarousel}>
              <div class="carousel-caption d-none d-md-block text-left">
                <h3 class="display-4">Laws in Pakistan</h3>
                <h5>PAKISTAN LEGAL AWARENESS FACILITIES</h5>
                <p class="lead">
                  general public and law students to understand law and to
                  provide them assistance. It has the privileged to be the
                  “First website on law in Pakistan”.
                </p>
              </div>
            </div>
            {/* <!-- Slide Two - Set the background image for this slide in the line below --> */}
            <div class="carousel-item" style={styles.secondcarousel}>
             
              <div class="carousel-caption d-none d-md-block text-left">
                <h3 class="display-4">Find Lawyer in Pakistan</h3>
                <h5>ARE YOU SEARCHING FOR A GOOD LAWYER?</h5>
                <p class="lead">
                  this website helps you to find the best lawyers according to
                  your cases or you can discuss problems with a lawyer.
                </p>
              </div>
            </div>
            {/* <!-- Slide Three - Set the background image for this slide in the line below --> */}
            <div class="carousel-item" style={styles.thirdcarousel}>
             
              <div class="carousel-caption d-none d-md-block text-left">
                <h3 class="display-4">Legal Expert Directory</h3>
                <h5>It is an easy way to search for legal Expert</h5>
                <p class="lead">
                  look at their profiles according to their city and areas of
                  practice. Also if you want you can contact them directly.
                </p>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div className="container mt-5 p-3 policyStyle">
        <h2 className="text-center">PAKISTAN LEGAL AWARENESS FACILITIES</h2>
        <p class="lead">
          Pakistanlawyer.com is serving since 1996, as a generic and scalable
          software product engineered to assist lawyers and other professional
          in searching laws. It also facilitates general public and law students
          to understand law and to provide them assistance. It has the
          privileged to be the "First website on law in Pakistan".
        </p>
        <br />
        <p class="lead">
          In technical sense Pakistan Lawyer may be termed as a portal and being
          a law portal, it offers all the basic functionalities of a web portal
          which encompass searching of laws, case laws, and notifications as
          well as finding lawyers in Pakistan. The website is generic to some
          extent, yet it is specific to law and law industry.
        </p>
        <br />
        <p class="lead">
          Legal resources for lawyers, advocates, judges, other legal
          professionals, businessmen, students and individuals are available at
          one place. Legal resources at Pakistanlawyer.com includes, statues
          (Acts, Rules, Ordinances etc.) search facilities, free emails; and
          other related information, therefore, this site after its hosting on
          web attracted the attention of the surfers / web users by getting such
          advantage, the Pakistanlawyer.com is successfully aiming its goal by
          spreading legal knowledge in society and promoting the law culture in
          society as well.
        </p>
        <br />
        <p class="lead">
          “Ignorance of law is no excuse”, keeping in view the said maxim of
          law, Pakistan Lawyers has decided to spread legal knowledge through
          ‘legal awareness program’. Through this program, Pakistan Lawyers
          intend to disseminate legal education and information to general
          public.
        </p>
        <br />
        <p class="lead">
          Awareness of law is necessary for promoting a culture where rule of
          law has its supremacy. Not only citizens must know their rights but
          they should also recognize and respect the rights of others.
        </p>
        <br />
        <p class="lead">
          The main objectives of Pakistan Lawyers can be classified into
          following broad goals:-
          <ul>
            <li>Awareness of law</li>
            <li>Utilization of information technology in law</li>
            <li>Promotion of law</li>
            <li>
              Providing assistance to lawyers and law students in research
            </li>
          </ul>
        </p>
      </div>
      <div
        className=" mt-5 container "
        // style={{ maxwidth: "540px" }}
      ></div>
    </div>
  );
};

export default AboutUs;
