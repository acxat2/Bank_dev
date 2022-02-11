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

function getDataAccounts(url, TOKEN) {
  const request = fetch(url, {
    headers: {
      Authorization: `Basic ${TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return request
    .then((responce) => responce.json())
    .then((result) => result.payload[0]);
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

function getDataAccount(url, TOKEN) {
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

export { getToken, getDataAccounts, createAccountApi, getDataAccount };
