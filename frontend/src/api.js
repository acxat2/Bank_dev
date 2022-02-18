function getToken(url, AUTH_DATA) {
  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(AUTH_DATA),
  });
  return request
    .then((responce) => responce.json())
    .then((result) => result.payload.token);
}

function getData(url, TOKEN) {
  const request = fetch(url, {
    headers: {
      Authorization: `Basic ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return request
    .then((responce) => responce.json())
    .then((result) => result.payload);
}

function createAccountApi(url, TOKEN) {
  const request = fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return request
    .then((responce) => responce.json())
    .then((result) => result.payload);
}

function transferFunds(url, TOKEN, data) {
  const request = fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  return request.then((responce) => responce.json());
}

export { getToken, getData, createAccountApi, transferFunds };
