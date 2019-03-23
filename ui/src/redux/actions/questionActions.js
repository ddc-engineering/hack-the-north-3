import * as types from "../constants/actionTypes";
import APIEndpoints from "../constants/endpoints";
import axios from "axios";
import Cookies from "universal-cookie";
import history from "../../history";
import { getResults } from "./answersActions";

const questionnaireStartEvent = payload => {
  const cookies = new Cookies();
  cookies.set("session-cookie", payload.sessionId, { path: "/" });
  history.push("/questionnaire");
  return { type: types.START_QUESTIONNAIRE, payload };
};

const nextQuestion = payload => {
  return { type: types.NEXT_QUESTION, payload };
};

const angryCustomer = () => {
  return { type: types.ANGRY_CUSTOMER };
};

export const respondToApi = response => {
  const cookies = new Cookies();
  const sessionId = cookies.get("session-cookie");
  return dispatch => {
    axios
      .post(
        `${APIEndpoints.response}`,
        JSON.stringify({ ...response, sessionId }),
        {
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        console.table(response.data);
        if (response.data.angry_customer) {
          dispatch(angryCustomer());
        } else if (!response.data.questions) {
          dispatch(getResults(response.data));
        } else {
          dispatch(nextQuestion(response.data));
        }
      })
      .catch(error => console.error(error));
  };
};

export const startQuestionnaire = () => {
  return dispatch => {
    axios(APIEndpoints.start, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        dispatch(questionnaireStartEvent(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

/* TODO: Switch to Axios in order to set the session ID */
