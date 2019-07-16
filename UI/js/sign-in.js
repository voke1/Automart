/* eslint-disable func-names */
window.onload = function () {
  async function signIn(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    const response = await fetch('https://voke-automart.herokuapp.com/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    });
    const result = await response.json();
    
    if (result.data) {
      localStorage.setItem('token', result.data.token);
      window.location.href = '../index.html';
      alert('sign in successful');
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
  document.getElementById('signin').addEventListener('submit', signIn);
};

