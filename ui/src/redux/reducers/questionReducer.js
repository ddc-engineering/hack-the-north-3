import * as types from "../constants/actionTypes";

const initialState = {
  ready: false
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_QUESTIONNAIRE:
      console.log(JSON.stringify(action.payload));
      return { ...state, ready: true, pageView: action.payload };
    case types.NEXT_QUESTION:
      console.log(action.payload);

      return { ...state, pageView: action.payload };
    default:
      return state;
  }
};

export default questionReducer;
