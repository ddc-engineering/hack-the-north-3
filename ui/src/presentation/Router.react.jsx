import React from "react";
import { Router, Route } from "react-router-dom";
import QuestionnaireViewContainer from "../redux/containers/QuestionnaireViewContainer";
import HomeViewContainer from "../redux/containers/HomeViewContainer";
import AnswersViewContainer from "../redux/containers/AnswersViewContainer";
import history from "../history";

const RouterComponent = () => {
  return (
    <div className="govuk-width-container">
      <Router history={history}>
        <Route path="/" exact component={HomeViewContainer} />
        <Route
          path="/questionnaire"
          exact
          component={QuestionnaireViewContainer}
        />
        <Route path="/results" exact component={AnswersViewContainer} />
      </Router>
    </div>
  );
};

export default RouterComponent;
