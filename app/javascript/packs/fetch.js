import axios from 'axios';

export const authenticityToken = () => {
  const token = document.querySelector('meta[name="csrf-token"]');
  return token ? token.content : null;
};

const headers = () => ({
  Accept: '*/*',
  'content-Type': 'application/json',
  'X-CSRF-Token': authenticityToken(),
  'X-Requested-With': 'XMLHttpRequest',
});

export const fetch = (method, url, body) => {
  const options = {
    method,
    headers: headers(),
    data: body,
    url,
  };
  return axios(options);
};

export const handleFetchError = (error, message) => {
  if (error.response) {
    const formattedMessage = message ? `${message} ` : '';
    alert(`${formattedMessage}${error.response.status} - ${error.response.statusText}`);
  } else {
    alert('No response.');
  }
};
