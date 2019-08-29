export const jsonRequest = (url, method, payload, headers) => {
  return fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers
    },
    body:
      method !== "GET" && payload !== undefined
        ? JSON.stringify(payload)
        : undefined
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw response;
  });
};
