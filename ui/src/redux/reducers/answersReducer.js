import * as types from "../constants/actionTypes";

const initialState = {
  ready: true,
  notFound: false,
  loading: false,
  fromQuestionnaire: true,
  data: {
    passphrase: "Test Passphrase",
    provisions: [
      {
        name: "Training",
        items: ["http://link1.com", "http://link2.com", "http://link3.com"]
      }
    ]
  }
};

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.QUERY_START:
      return { ...state, ready: false, loading: true };
    case types.PASSPHRASE_NOT_FOUND:
      return { ...state, ready: false, notFound: true, loading: false };
    case types.QUERY_COMPLETE:
      return { ...state, ...action.payload, ready: true, loading: false };
    default:
      return state;
  }
};

export default answersReducer;
