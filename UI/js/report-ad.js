/* eslint-disable func-names */
const reportAd = async (e) => {
  e.preventDefault();

  const reason = document.getElementById('ss-form').value;
  const response = await fetch('https://voke-automart.herokuapp.com/api/v1/flag', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      token: localStorage.getItem('token'),
    },

    body: JSON.stringify({
      reason,
    }),
  });
  const data = await response.json();
  console.log(data);
};

const signout = async () => {
  localStorage.removeItem('token');
  window.location.href = '.././index.html';
};
document.getElementById('ss-form').addEventListener('submit', reportAd);
