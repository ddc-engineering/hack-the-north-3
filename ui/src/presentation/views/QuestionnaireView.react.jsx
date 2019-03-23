import React from "react";
import CheckboxQuestion from "../CheckboxQuestion.react";
import RadioQuestion from "../questions/RadioButtonQuestion.react";
import BinaryQuestion from "../questions/BinaryQuestion.react";
import FreeTextQuestion from "../questions/FreeTextQuestion.react";
import Footer from "../Footer.react";
import AngryCustomerQuestion from "../questions/AngryCustomerQuestion.react";

export default class QuestionnaireView extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.submitResponse = this.submitResponse.bind(this);
    this.handleFreeText = this.handleFreeText.bind(this);
    this.state = {
      answer_id: null,
      question_id: null,
      freeTextValue: ""
    };
  }
  handleFreeText(text) {
    this.setState({ freeTextValue: text });
  }
  submitResponse(response = false) {
    console.table(response);
    const { freeTextValue } = this.state;
    const { respondToApi } = this.props;
    if (freeTextValue !== "") {
      const { question_id, freeTextValue } = this.state;
      this.setState({ freeTextValue: "" });
      return respondToApi({
        question_id,
        answer_id: 1,
        free_text: freeTextValue
      });
    }

    if (response == false) {
      const { answer_id, question_id } = this.state;
      respondToApi({ answer_id, question_id });
    } else {
      respondToApi(response);
    }
  }
  handleChange(id) {
    const { pageView } = this.props;
    this.setState({ answer_id: id, question_id: pageView.id });
  }
  componentWillUpdate() {
    const { pageView } = this.props;
    const { question_id } = this.state;
    if (pageView) {
      if (question_id !== pageView.id)
        this.setState({ question_id: pageView.id });
    }
  }
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
            <RadioQuestion {...questionData} handleClick={this.handleChange} />
          );
          return returnQuestions;
        case "binary":
          returnQuestions.push(
            <BinaryQuestion
              {...questionData}
              questionId={pageView.id}
              standardResponse={this.submitResponse}
            />
          );
          return returnQuestions;
        case "free":
          returnQuestions.push(
            <FreeTextQuestion
              {...questionData}
              passTextThrough={this.handleFreeText}
            />
          );
          return returnQuestions;

        default:
          return returnQuestions;
      }
    }, []);
  }
  render() {
    const { pageView, ready, angryCustomer } = this.props;
    if (angryCustomer) {
      return <AngryCustomerQuestion />;
    }
    if (!ready) {
      return (
        <div>
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
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
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
                <button
                  type="submit"
                  onClick={event => {
                    event.preventDefault();
                    this.submitResponse();
                  }}
                  className="govuk-button"
                >
                  Continue
                </button>
              )}
            </div>
          </form>
          <Footer />
        </div>
      );
    }
  }
}
