import React from "react";
import CheckboxQuestion from "../CheckboxQuestion.react";
import RadioQuestion from "../RadioQuestion.react";
import Cookie from "universal-cookie";
import BinaryQuestion from "../questions/BinaryQuestion.react";

export default class QuestionnaireView extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onSubmitHandler(event) {
    event.preventDefault();
    const { respondToApi, pageView } = this.props;
    const { answer_id } = this.state;
    respondToApi({ ...this.state, question_id: pageView.id, answer_id });
  }
  handleChange(id) {
    this.setState({ answer_id: id });
  }
  // componentDidMount() {
  //   const cookie = new Cookie();
  //   const sessionId = cookie.get("session-cookie");
  //   if (sessionId) {
  //     const { restoreSession } = this.props;
  //     restoreSession(sessionId);
  //   }
  // }
  renderQuestionContent() {
    const { pageView } = this.props;
    if (!pageView.questions) {
      return null;
    }
    return pageView.questions.reduce((returnQuestions, questionData) => {
      switch (questionData.type) {
        case "checkbox":
          returnQuestions.push(<CheckboxQuestion {...questionData} />);
          return returnQuestions;
        case "radio":
          returnQuestions.push(
            <RadioQuestion {...questionData} changeInput={this.handleChange} />
          );
          return returnQuestions;
        case "binary":
          returnQuestions.push(<BinaryQuestion {...questionData} />);
        default:
          return returnQuestions;
      }
    }, []);
  }
  render() {
    const { pageView, ready } = this.props;
    if (!ready) {
      return (
        <div className="question-container">
          <a href="/" draggable="false" className="govuk-button">
            Back
          </a>
          <h2 className="govuk-heading-l">Loading...</h2>
          <p className="govuk-body-l">
            If this page is stuck, try reloading the page.
          </p>
          <p className="govuk-body">
            If this does not fix the problem, try clicking the back button and
            starting again.
          </p>
        </div>
      );
    } else {
      return (
        <form onSubmit={this.onSubmitHandler}>
          <div className="question-container">
            <h2 className="govuk-heading-l">{pageView.title}</h2>
            {pageView.hint ? (
              <p className="govuk-body-l">{pageView.hint}</p>
            ) : null}
            <hr className="govuk-section-break govuk-section-break--visible" />
            <div className="govuk-form-group margin-top-form">
              {this.renderQuestionContent()}
            </div>
            {pageView.questions[0].type === "binary" ? null : (
              <button type="submit" class="govuk-button">
                Continue
              </button>
            )}
          </div>
        </form>
      );
    }
  }
}
