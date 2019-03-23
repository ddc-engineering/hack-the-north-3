import React from "react";
import { withRouter } from "react-router-dom";

class HomeView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.startQuestionnaire = this.startQuestionnaire.bind(this);
  }
  startQuestionnaire() {
    const { startQuestionnaire, history } = this.props;
    startQuestionnaire();
    history.push("/start");
  }
  render() {
    return (
      <div className="margin-top-title">
        <h1 className="govuk-heading-xl">Getting back to work.</h1>
        <p className="govuk-body">
          We will guide you through a set of questions, at the end of which you
          will have a personalised report that you can share with others, with
          your permission and at your discretion.
        </p>
        <p className="govuk-body-l">
          <u>
            You are not required to supply any information that can identify you
            as an individual.
          </u>
        </p>
        <p className="govuk-body">
          You will also be supplied with links to further reading, as well as
          advice and guidance.
        </p>
        <button
          onClick={this.startQuestionnaire}
          draggable="false"
          className="govuk-button"
        >
          Get Started
        </button>
      </div>
    );
  }
}

export default HomeView;
