async function viewAds() {
  // e.preventDefault();


  if (!(localStorage.getItem('authorization'))) {
    // eslint-disable-next-line no-alert
    alert('Please sign in');
    window.location.href = 'sign-in.html';
  }

  const response = await fetch('http://localhost:2000/api/v1/car', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      authorization: localStorage.getItem('authorization'),
    },


  });
  const result = await response.json();
  console.log(result.rows);
  if (result.rows.length > 0) {
    let adTemplate;
    const adList = document.querySelector('.column');

    for (let i = 0; i < result.rows.length; i++) {
      adTemplate += ` <li>
      <div class="img-i">
      <label class="car-state-label">NEW</label>
          <a href="car-details.html"><img src= ${result.rows[i].img_url} alt="product"></a>
      </div>
    
      <div class="desc-i">
          <ul class='car-list'>
              <li>&nbsp; NAME: ${result.rows[i].model}</li>
              <li>&nbsp; PRICE: NGN34,234,230.00</li>
          </ul>
          <h3 class="view-btn"><a href="car-details.html">VIEW CAR</a></h3>
    
      </div>
    </li>`;
    }

    adList.innerHTML = adTemplate;
  }
}
viewAds();
