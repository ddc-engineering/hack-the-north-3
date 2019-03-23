import * as types from "../constants/actionTypes";
import axios from "axios";
import APIEndpoints from "../constants/endpoints";
import history from "../../history";

const querySuccessful = payload => {
  console.log(payload);
  return { type: types.QUERY_COMPLETE, payload };
};

const passphraseNotFound = () => {
  return { type: types.PASSPHRASE_NOT_FOUND };
};

const startQuery = () => {
  return { type: types.QUERY_START };
};

export const queryPassphrase = passphrase => {
  return dispatch => {
    dispatch(startQuery());
    axios
      .get(`${APIEndpoints.answers}?friendlyCode=${passphrase}`)
      .then(response => {
        dispatch(querySuccessful(response.data));
      })
      .catch(() => {
        dispatch(passphraseNotFound());
      });
  };
};

export const getResults = payload => {
  history.push("/results");
  return { type: types.QUESTIONNAIRE_FINISHED, payload };
};
