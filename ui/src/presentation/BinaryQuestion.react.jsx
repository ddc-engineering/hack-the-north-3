import React from "react";

class BinaryQuestion extends React.Component {
  render() {
    return (
      <fieldset class="govuk-fieldset" aria-describedby="waste-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h1 class="govuk-fieldset__heading">{title}</h1>
        </legend>
        <div class="govuk-checkboxes">{this.renderInputs(data.options)}</div>
      </fieldset>
    );
  }
}
