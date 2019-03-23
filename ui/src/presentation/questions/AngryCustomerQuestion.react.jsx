import React from "react";
import Footer from "../Footer.react";

const AngryCustomer = () => {
  return (
    <div>
      <div className="question-container">
        <a href="/" draggable="false" className="govuk-button">
          Home
        </a>
        <h2 className="govuk-heading-l">You're an unhappy customer!</h2>
        <p className="govuk-body-l">
          We're sorry that you feel unhappy about our service.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AngryCustomer;
