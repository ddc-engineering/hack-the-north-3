import { connect } from "react-redux";
import AnswersView from "../../presentation/views/AnswersView.react";
import { queryPassphrase } from "../actions/answersActions";

const mapStateToProps = state => {
  return {
    ready: state.answers.ready,
    loading: state.answers.loading,
    notFound: state.answers.notFound,
    fromQuestionnaire: state.answers.fromQuestionnaire,
    data: state.answers.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    queryPassphrase: passphrase => dispatch(queryPassphrase(passphrase))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswersView);
