/* eslint-disable func-names */
window.onload = function () {
  async function signIn(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const submit = document.getElementById('body').value;
    const response = await fetch('http://localhost:2000/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    });
    const data = await response.json();
    console.log(data.error);
    if (data.signedUser) {
      localStorage.setItem('authorization', data.signedUser.token);
      window.location.href = 'dashboard.html';
    }
    if (data.Authentication_failed) {
      const displayInfo = document.createElement('div');
      if (displayInfo.innerHTML !== data.Authentication_failed) {
        displayInfo.style.color = 'red';
        displayInfo.style.position = 'center';
        displayInfo.innerHTML = data.Authentication_failed;
        document.getElementById('signin').appendChild(displayInfo);
      }
    }
    if (data.error) {
      const Info = document.createElement('div');
      if (Info.innerHTML !== data.error) {
        Info.style.color = 'red';
        Info.style.position = 'center';
        Info.innerHTML = data.error;
        document.getElementById('signin').appendChild(Info);
      }
    }
  }
  document.getElementById('signin').addEventListener('submit', signIn);
};
