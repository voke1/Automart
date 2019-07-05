/* eslint-disable func-names */
async function postAd(e) {
  e.preventDefault();

  const price = document.getElementById('price').value;
  const state = document.getElementById('state').value;

  // const submit = document.getElementById('body').value;
  const response = await fetch('http://localhost:2000/api/v1/car', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      authorization: localStorage.getItem('authorization'),
    },
    body: JSON.stringify({
      price, state,
    }),
  });
  const result = await response.json();
  console.log(result);
  
  if (result) {
    const displayInfo = document.createElement('div');
    if (displayInfo.innerHTML !== result.info) {
      displayInfo.style.color = 'red';
      displayInfo.style.position = 'center';
      displayInfo.style.fontSize = '20px';
      displayInfo.innerHTML = result.info;
      document.getElementById('sell-car').appendChild(displayInfo);
    }
  }
  if (result.error) {
    const Info = document.createElement('div');
    if (Info.innerHTML !== result.error) {
      Info.style.color = 'red';
      Info.style.position = 'center';
      Info.style.fontSize = '20px';
      Info.innerHTML = result.error;
      document.getElementById('sell-car').appendChild(Info);
    }
  }
}
document.getElementById('submit-btn-id').addEventListener('click', postAd);
