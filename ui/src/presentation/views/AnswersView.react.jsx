import React from "react";

const RenderRows = props => {
  const { data } = props;
  return data.reduce((renderedRows, row) => {
    renderedRows.push(
      <div className="govuk-summary-list__row">
        <dd className="govuk-summary-list__value">
          <a href={row}>{row}</a>
        </dd>
      </div>
    );
    return renderedRows;
  }, []);
};

export default class AnswersView extends React.Component {
  constructor() {
    super();
    this.handlePassphraseQuery = this.handlePassphraseQuery.bind(this);
  }
  renderProvisions(provisionData) {
    console.log(provisionData);

    return provisionData.reduce((renderedProvisions, provision) => {
      renderedProvisions.push(
        <div>
          <h3 className="govuk-heading-m">{provision.name}</h3>
          <dl className="govuk-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Links</dt>
            </div>
            {<RenderRows data={provision.items} />}
          </dl>
        </div>
      );
      return renderedProvisions;
    }, []);
  }
  handlePassphraseQuery(event) {
    event.preventDefault();
    const { currentInput } = this.state;
    const { queryPassphrase } = this.props;
    queryPassphrase(currentInput);
  }
  render() {
    const { queryPassphrase, ready, fromQuestionnaire, data } = this.props;
    if (!ready) {
      return (
        <div className="margin-top-title">
          <h1 className="govuk-heading-xl">View Results</h1>
          <p className="govuk-body-l">
            Enter your passphrase below to access your results.
          </p>
          <div className="govuk-form-group">
            <label className="govuk-label" for="event-name">
              Passphrase
            </label>
            <input
              className="govuk-input"
              id="passphrase"
              name="passphrase"
              type="text"
              onChange={e => {
                this.setState({ currentInput: e.target.value });
              }}
            />
          </div>
          <button
            type="button"
            onClick={this.handlePassphraseQuery}
            className="govuk-button"
          >
            View your results
          </button>
        </div>
      );
    } else {
      return (
        <div className="margin-top-title" style={{ paddingBottom: 200 }}>
          {fromQuestionnaire ? (
            <div className="govuk-panel govuk-panel--confirmation">
              <h1 className="govuk-panel__title">Questionnaire Complete</h1>
              <div className="govuk-panel__body">
                Your Passphrase
                <br />
                <strong>{data.passphrase}</strong>
                <p className="govuk-panel__body" style={{ fontSize: "0.75em" }}>
                  You will need this passphrase to use access your results at a
                  later date.
                </p>
              </div>
            </div>
          ) : null}
          <h1 className="govuk-heading-xl">Results</h1>
          <h2 className="govuk-heading-l">Your Recommendations</h2>
          {this.renderProvisions(data.provisions)}
        </div>
      );
    }
  }
}
