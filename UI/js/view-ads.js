function getViewBtn() {
  const buttons = [...document.querySelectorAll('.view-btn')];
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.getAttribute('dataId');
      const response = await fetch(`https://voke-automart.herokuapp.com/api/v1/car/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          authorization: localStorage.getItem('authorization'),
        },


      });
      const result = await response.json();
      console.log(result);
    });
  });
}

async function viewAds() {
  // e.preventDefault();
  let adTemplate;
  const adList = document.querySelector('.column');

  const buttons = [...document.querySelectorAll('.btn-car')];
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      if (!(localStorage.getItem('token'))) {
        // eslint-disable-next-line no-alert
        alert('Please sign in');
      }

      const response = await fetch('https://voke-automart.herokuapp.com/api/v1/car', {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          token: localStorage.getItem('token'),
        },


      });
      const result = await response.json();
      console.log(result.rows);

      if (result.rows.length > 0) {
        for (let i = 0; i < result.rows.length; i++) {
          adTemplate += ` <li>
      <div class="img-i">
      <label class="car-state-label">NEW</label>
          <a href="car-details.html"><img src= ${result.rows[i].img_url} alt="product"></a>
      </div>
    
      <div class="desc-i">
          <ul class='car-list'>
              <li>&nbsp; NAME: ${result.rows[i].model}</li>
              <li>&nbsp; PRICE: NGN${result.rows[i].price}</li>
          </ul>
          <h3 class="view-btn" dataId=${result.rows[i].id}><a href="#">VIEW CAR</a></h3>
    
      </div>
    </li>`;
        }

        adList.innerHTML = adTemplate;
        getViewBtn();
      }
    });
  });
}
viewAds();
