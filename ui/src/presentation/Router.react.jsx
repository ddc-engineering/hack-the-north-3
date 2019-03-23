import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestionnaireViewContainer from "../redux/containers/QuestionnaireViewContainer";
import HomeViewContainer from "../redux/containers/HomeViewContainer";
import history from "../history";

const RouterComponent = () => {
  return (
    <div className="govuk-width-container">
      <Router history={history}>
        <Route path="/" exact component={HomeViewContainer} />
        <Route path="/start" exact component={QuestionnaireViewContainer} />
      </Router>
    </div>
  );
};

export default RouterComponent;
