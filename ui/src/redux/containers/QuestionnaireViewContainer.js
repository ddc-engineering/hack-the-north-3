import { connect } from "react-redux";
import QuestionnaireView from "../../presentation/views/QuestionnaireView.react";
import { respondToApi } from "../actions/questionActions";

const mapStateToProps = state => {
  return {
    pageView: state.question.pageView,
    ready: state.question.ready,
    angryCustomer: state.question.angryCustomer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    respondToApi: response => dispatch(respondToApi(response))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireView);
