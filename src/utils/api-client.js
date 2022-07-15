import { BASE_API } from "../config/constants";

async function makeReq(method, path, params = {}, body, headers = {}) {
  let url = `${BASE_API}/${path}`;
  const query = new URLSearchParams(params).toString();

  if (query.length) url = `${url}?${query}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
  };

  if (["POST", "PUT"].includes(method) && body) {
    options.body = JSON.stringify(body);
  }

  const resp = await fetch(url, options);
  const data = await resp.json();

  return data;
}

const ApiClient = {
  async get(url, params, headers) {
    const data = await makeReq("GET", url, params, undefined, headers);

    return data;
  },

  async put(url, body, headers) {
    const data = await makeReq("PUT", url, undefined, body, headers);

    return data;
  },

  async post(url, body, headers) {
    const data = await makeReq("POST", url, undefined, body, headers);

    return data;
  },
};

export default ApiClient;
