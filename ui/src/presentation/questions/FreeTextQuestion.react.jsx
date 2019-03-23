import React from "react";

export default class FreeTextQuestion extends React.Component {
  render() {
    const { title, hint, name } = this.props;
    return (
      <div class="govuk-form-group">
        <h1 className="govuk-heading-m">{title}</h1>
        {hint ? (
          <span id={`${name}-hint`} class="govuk-hint">
            {hint}
          </span>
        ) : null}
        <textarea
          className="govuk-textarea"
          id={name}
          name={name}
          rows="5"
          aria-describedby={`${name}-hint`}
        />
      </div>
    );
  }
}
