import React from "react";

export default class RadioQuestion extends React.Component {
  renderItems(options) {
    const { changeInput, name } = this.props;
    return options.reduce((renderedOptions, option) => {
      const { handleClick } = this.props;
      const { id, value, text, hint } = option;
      renderedOptions.push(
        <div className="govuk-radios__item">
          <input
            className="govuk-radios__input"
            id={id}
            name={name}
            type="radio"
            required
            onChange={() => handleClick(id)}
            value={value}
          />
          <label className="govuk-label govuk-radios__label" for={id}>
            {text}
          </label>
          {hint ? (
            <span className="govuk-hint govuk-radios__hint">{hint}</span>
          ) : null}
        </div>
      );
      return renderedOptions;
    }, []);
  }
  render() {
    const { inline, title, hint, options } = this.props;
    return (
      <fieldset className="govuk-fieldset" aria-describedby="changed-name-hint">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
          {/* <h1 className="govuk-fieldset__heading">{title}</h1> */}
        </legend>
        {hint ? (
          <span id="changed-name-hint" className="govuk-hint">
            {hint}
          </span>
        ) : null}
        <div
          className={`govuk-radios ${inline ? "govuk-radios--inline" : null}`}
        >
          {this.renderItems(options)}
        </div>
      </fieldset>
    );
  }
}
