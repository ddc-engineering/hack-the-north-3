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
        <p className="govuk-body-l">
            <a href="https://www.mindwell-leeds.org.uk/">MindWell Leeds</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AngryCustomer;
