/* eslint-disable func-names */
async function postAd(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('price', document.getElementById('price').value);
  formData.append('state', document.getElementById('state').value);
  formData.append('manufacturer', document.getElementById('manufacturer').value);
  formData.append('dataFile', document.getElementById('image').files[0]);
  formData.append('description', document.getElementById('description').value);
  formData.append('model', document.getElementById('model').value);
  // eslint-disable-next-line camelcase
  formData.append('body_type', document.getElementById('body_type').value);
  console.log(formData);

  // const submit = document.getElementById('body').value;
  const response = await fetch('http://localhost:2000/api/v1/car', {
    method: 'POST',
    
    headers: {
      Accept: 'application/json, text/plain, */*',
      // 'Content-Type': 'application/json',
      authorization: localStorage.getItem('authorization'),
    },
    body: 
      formData,
    
  

  });
  const result = await response.json();
  console.log(result);

  if (result) {
    const displayInfo = document.createElement('div');
    const form = document.getElementById('post-ad');
    if (displayInfo.innerHTML !== result.info) {
      displayInfo.style.color = 'red';
      displayInfo.style.position = 'center';
      displayInfo.style.fontSize = '20px';
      displayInfo.innerHTML = result.info;
      form.appendChild(displayInfo);
    }
  }
  if (result.error) {
    const Info = document.createElement('div');
    if (Info.innerHTML !== result.error) {
      Info.style.color = 'red';
      Info.style.position = 'center';
      Info.style.fontSize = '20px';
      Info.innerHTML = result.error;
      document.getElementById('post-ad').appendChild(Info);
    }
  }
}
document.getElementById('post-ad').addEventListener('submit', postAd);
