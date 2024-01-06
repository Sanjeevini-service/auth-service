import axios from "axios";

export const httpRequest = async (method: string, endpoint: string, data = {}) => {
  const options = {
    url: `http://localhost:4001/api${endpoint}`,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data,
  };
  const response = await axios.request(options);
  return response;
};
