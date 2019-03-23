const baseUrl =
  "http://ec2-3-8-124-198.eu-west-2.compute.amazonaws.com:3000/api/";

const APIEndpoints = {
  start: `${baseUrl}start`,
  restoreSession: `${baseUrl}restore`,
  response: `${baseUrl}response`
};

export default APIEndpoints;
