import React from "react";

export default class CheckboxQuestion extends React.Component {
  renderCheckboxes(options) {
    return options.reduce((renderedCheckboxes, data) => {
      renderedCheckboxes.push(
        <div className="govuk-checkboxes__item">
          <input
            className="govuk-checkboxes__input"
            id={data.id}
            name={data.name}
            type="checkbox"
            value={data.value}
          />
          <label className="govuk-label govuk-checkboxes__label" for={data.id}>
            {data.text}
          </label>
          {data.hint ? (
            <span
              id={`${data.id}__hint`}
              className="govuk-hint govuk-checkboxes__hint"
            >
              {data.hint}
            </span>
          ) : null}
        </div>
      );
      return renderedCheckboxes;
    }, []);
  }
  render() {
    const { title, hint, options } = this.props;
    return (
      <fieldset className="govuk-fieldset" required>
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          <h1 className="govuk-fieldset__heading">{title}</h1>
        </legend>
        {hint ? (
          <span id="nationality-hint" className="govuk-hint">
            {hint}
          </span>
        ) : null}
        <div className="govuk-checkboxes">{this.renderCheckboxes(options)}</div>
      </fieldset>
    );
  }
}
