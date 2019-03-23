import * as types from "../constants/actionTypes";

const initialState = {
  ready: false
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_QUESTIONNAIRE:
      return { ...state, ready: true, pageView: action.payload };
    case types.NEXT_QUESTION:
      return { ...state, pageView: action.payload };
    default:
      return state;
  }
};

export default questionReducer;
