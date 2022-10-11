export const aboardSignal = new AbortController();

export const request = async ({
  url,
  type = 'POST',
  headers = {'Content-Type': 'application/json'},
  body,
}) => {
  return await fetch(url, {
    method: type,
    headers: headers,
    body: body,
    signal: aboardSignal.signal,
  }).then(response => response.json());
};
