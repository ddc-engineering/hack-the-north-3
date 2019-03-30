const baseUrl = process.env.REACT_APP_API_URL;

const APIEndpoints = {
  start: `${baseUrl}/api/start`,
  restoreSession: `${baseUrl}/api/restore`,
  response: `${baseUrl}/api/response`,
  answers: `${baseUrl}/api/answers`
};

export default APIEndpoints;
