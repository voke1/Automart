/* eslint-disable func-names */

async function addUser(e) {
  e.preventDefault();

  const first_name = document.getElementById('firstname').value;
  const last_name = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // const submit = document.getElementById('body').value;

  const response = await fetch('https://voke-automart.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      first_name, last_name, email, password,
    }),
  });
  const result = await response.json();

  if (result.data) {
    alert('sign up successful')
    window.location.href = '../index.html';
  }
  if (typeof result.error === 'string') {
    const displayInfo = document.createElement('div');
    if (displayInfo.innerHTML !== result.error) {
      displayInfo.style.color = 'red';
      displayInfo.style.position = 'center';
      displayInfo.innerHTML = result.error;
      document.getElementById('signin').appendChild(displayInfo);
    }
  }
  if (result.error) {
    const Info = document.createElement('div');
    if (Info.innerHTML !== result.error) {
      Info.style.color = 'red';
      Info.style.position = 'center';
      Info.innerHTML = result.error;
      document.getElementById('signin').appendChild(Info);
    }
  }
}

document.getElementById('addUsers').addEventListener('submit', addUser);

