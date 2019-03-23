import React from "react";
import Footer from "../Footer.react";

const AngryCustomer = () => {
  return (
    <div>
      <div className="question-container">
        <a href="/" draggable="false" className="govuk-button">
          Home
        </a>
        <h2 className="govuk-heading-l">Did you know you can get access to local support here?</h2>
        <div className="govuk-body-l">
            <a href="https://www.mindwell-leeds.org.uk/">MindWell Leeds</a>
            <p>MindWell is the mental health website for people in Leeds. Funded by the NHS Leeds Clinical Commissioning Groups Partnership, it brings together information from the NHS, Leeds City Council and the third sector into one single 'go to' place.</p>
            <p>MindWell provides quick and easy access to up-to-date information for all adults in Leeds, including GPs, employers and other professionals.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AngryCustomer;
