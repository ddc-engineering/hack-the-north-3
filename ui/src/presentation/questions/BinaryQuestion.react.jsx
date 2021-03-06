import React from "react";

export default class BinaryQuestion extends React.Component {
  returnValidResponse(response) {
    const { questionId, standardResponse } = this.props;
    return standardResponse({
      question_id: questionId,
      answer_id: response ? 1 : 2
    });
  }
  render() {
    const { hint } = this.props;
    return (
      <div>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          {/* <h1 className="govuk-fieldset__heading">{title}</h1> */}
        </legend>
        {hint ? (
          <span id="nationality-hint" className="govuk-hint">
            {hint}
          </span>
        ) : null}
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <button
              type="button"
              className="govuk-button govuk-button-fullwidth"
              onClick={() => this.returnValidResponse(true)}
            >
              Yes
            </button>
          </div>
          <div className="govuk-grid-column-one-half">
            <button
              type="button"
              className="govuk-button govuk-button-fullwidth"
              onClick={() => this.returnValidResponse(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
}
