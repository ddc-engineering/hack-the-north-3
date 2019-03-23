import React from "react";
import Footer from "../Footer.react";
class HomeView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.startQuestionnaire = this.startQuestionnaire.bind(this);
  }
  startQuestionnaire() {
    const { startQuestionnaire, history } = this.props;
    startQuestionnaire();
    history.push("/questionnaire");
  }

  render() {
    return (
      <div className="margin-top-title">
        <h1 className="govuk-heading-xl">Find work, get support and learn about what benefits you're entitled to</h1>
        <p className="govuk-body">
            This questionnaire will help us to understand your needs so that we can give you the right advice and support about work and benefits
        </p>
        <button
          onClick={this.startQuestionnaire}
          draggable="false"
          className="govuk-button"
        >
          Get Started
        </button>
        <p className="govuk-body">Already completed the survey?</p>
        <a href="/results" draggable="false" className="govuk-button">
          View Results
        </a>
        <Footer />
      </div>
    );
  }
}

export default HomeView;
