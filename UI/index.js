/* eslint-disable func-names */
window.onload = function () {
  function addUser(e) {
    e.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const submit = document.getElementById('body').value;

    fetch('http://localhost:2000/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstname, lastname, email, password,
      }),
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  document.getElementById('addUsers').addEventListener('submit', addUser);
};
