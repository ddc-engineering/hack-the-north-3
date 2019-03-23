import * as types from "../constants/actionTypes";

const initialState = {
  ready: false,
  notFound: false,
  loading: false,
  fromQuestionnaire: true
};

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.QUERY_START:
      return { ...state, ready: false, loading: true };
    case types.PASSPHRASE_NOT_FOUND:
      return { ...state, ready: false, notFound: true, loading: false };
    case types.QUERY_COMPLETE:
      return { ...state, ...action.payload, ready: true, loading: false };
    case types.QUESTIONNAIRE_FINISHED:
      return { ...state };
    default:
      return state;
  }
};

export default answersReducer;
