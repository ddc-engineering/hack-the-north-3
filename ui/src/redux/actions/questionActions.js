import * as types from "../constants/actionTypes";
import APIEndpoints from "../constants/endpoints";
import axios from "axios";
import Cookies from "universal-cookie";
import history from "../../history";

const questionnaireStartEvent = payload => {
  const cookies = new Cookies();
  cookies.set("session-cookie", payload.sessionId, { path: "/" });
  history.push("/start");
  return { type: types.START_QUESTIONNAIRE, payload };
};

const nextQuestion = payload => {
  return { type: types.NEXT_QUESTION, payload };
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
        dispatch(nextQuestion(response.data));
      })
      .catch(error => console.error(error));
  };
};

export const restoreSession = sessionId => {
  return dispatch => {
    axios(`${APIEndpoints.restoreSession}?sessionId=${sessionId}`, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        dispatch(questionnaireStartEvent(response.data));
      })
      .catch(() => {
        window.location.href = "/";
      });
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
