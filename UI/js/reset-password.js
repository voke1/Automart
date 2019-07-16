/* eslint-disable func-names */
window.onload = function () {
  async function getPassword(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
   
    // const submit = document.getElementById('body').value;
    const response = await fetch('https://voke-automart.herokuapp.com/api/v1/users/:useremail/reset_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    console.log(data.error);
    
    if (data.info) {
      const displayInfo = document.createElement('div');
      if (displayInfo.innerHTML !== data.info) {
        displayInfo.style.color = 'red';
        displayInfo.style.position = 'center';
        displayInfo.innerHTML = data.info;
        document.getElementById('reset-password-id').appendChild(displayInfo);
      }
    }
    if (data.error) {
      const Info = document.createElement('div');
      if (Info.innerHTML !== data.error) {
        Info.style.color = 'red';
        Info.style.position = 'center';
        Info.innerHTML = data.error;
        document.getElementById('reset-password-id').appendChild(Info);
      }
    }
  }
  document.getElementById('get-password').addEventListener('click', getPassword);
};
