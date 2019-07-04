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
    console.log(data);
    localStorage.setItem('authorization', data.signedUser.token);
  }
  document.getElementById('signin').addEventListener('submit', signIn);
};
