import { connect } from "react-redux";
import QuestionnaireView from "../../presentation/views/QuestionnaireView.react";
import { restoreSession, respondToApi } from "../actions/questionActions";

const mapStateToProps = state => {
  return {
    pageView: state.question.pageView,
    ready: state.question.ready
  };
};

const mapDispatchToProps = dispatch => {
  return {
    respondToApi: response => dispatch(respondToApi(response)),
    restoreSession: sessionId => dispatch(restoreSession(sessionId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireView);
