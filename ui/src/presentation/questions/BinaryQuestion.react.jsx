import React from "react";

export default class BinaryQuestion extends React.Component {
  returnValidResponse(response) {
    const { questionId, standardResponse } = this.props;
    standardResponse({
      question_id: questionId,
      value_id: response ? 1 : 2
    });
  }
  render() {
    const { title, hint } = this.props;
    return (
      <div>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        {hint ? (
          <span id="nationality-hint" className="govuk-hint">
            {hint}
          </span>
        ) : null}
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-half">
            <button
              className="govuk-button govuk-button-fullwidth"
              onClick={this.returnValidResponse(true)}
            >
              Yes
            </button>
          </div>
          <div class="govuk-grid-column-one-half">
            <button
              className="govuk-button govuk-button-fullwidth"
              onClick={this.returnValidResponse(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
}
