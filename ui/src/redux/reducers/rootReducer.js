import { combineReducers } from "redux";
import questionReducer from "./questionReducer";
import answersReducer from "./answersReducer";

const rootReducer = combineReducers({
  question: questionReducer,
  answers: answersReducer
});

export default rootReducer;
