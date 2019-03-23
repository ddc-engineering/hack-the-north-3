import React from "react";

export default class FreeTextQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: ""
    };
  }
  render() {
    const { title, hint, name, passTextThrough } = this.props;
    const { currentInput } = this.state;
    return (
      <div className="govuk-form-group">
        <h1 className="govuk-heading-m">{title}</h1>
        {hint ? (
          <span id={`${name}-hint`} className="govuk-hint">
            {hint}
          </span>
        ) : null}
        <textarea
          className="govuk-textarea"
          id={name}
          value={currentInput}
          onChange={event => {
            this.setState({ currentInput: event.target.value });
            passTextThrough(event.target.value);
          }}
          rows={5}
          aria-describedby={`${name}-hint`}
        />
      </div>
    );
  }
}
