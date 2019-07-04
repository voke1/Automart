/* eslint-disable func-names */
window.onload = function () {
  async function reportAd(e) {
    e.preventDefault();

    const reason = document.getElementById('ss-form').value;
    const authorization = localStorage.getItem('authorization');

    const response = await fetch('http://localhost:2000/api/v1/flag', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },

      body: JSON.stringify({
        reason, authorization,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  document.getElementById('ss-form').addEventListener('submit', reportAd);
};
