// Get specific Car Ad
async function getViewBtn() {
  const buttons = [...document.querySelectorAll('.view-btn')];
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const id = button.getAttribute('dataId');
      const response = await fetch(`https://voke-automart.herokuapp.com/api/v1/car/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          token: localStorage.getItem('token'),
        },


      });
      const result = await response.json();
      console.log(result);

      const specificAdTemplate = `<div class="car">
          <div class="product--title">
            <h2>Lamborghini Urus</h2>
          </div>
          <div class="product--body">
            <div class="product--image">
              <div class="icon-images">
                <img src="./UI/img/urus-back.jpg" />
                <img src="./UI/img/urus-side.jpg" />
                <img src="./UI/img/urus-inside.jpg" />
              </div>
              <img src="./UI/img/lamborghini-urus.jpg" class="display-img">
            </div>
              <div class="product--details">
                <div class="product--price">
                  <span class="product--price_price">Urus 2018</span>
                  <span class="product--price_offer">New arrival !</span>
                </div>
                <div class="product--desc">
                  <p>The engine is rated at a maximum power output of 478 kW (641 hp; 650 PS) at 6,000 rpm and
                        maximum torque of 850 N⋅m (627 lb⋅ft) at 2,250–4,500 rpm.<br> The Urus has a front-engine,
                    all-wheel-drive layout, and a top speed of 305 km/h (190 mph) making it one of the world's
                    fastest production SUVs.
                        - Power output: 478 kW (641 hp; 650 PS)<br>
                        - Layout: Front-engine, four-wheel-drive<br>
                          - Engine: 4.0 L FSI twin-turbocharged V8<br>
                            - Class: Mid-size luxury crossover SUV</p>
                </div>
  
                        <div class="product--quantity">
                          <input class="quantity" type="number" placeholder="quantity" min="1" max="10" value="1"></input>
                        </div>
                        <div class="add-to-cart">
                          <button class="btn-car btn--cart">BUY NOW!</button>
                        </div>
            </div>
        </div>
    </div>`;
      const specificAd = document.getElementsByClassName('specific-car');
      specificAd.innerHTML = specificAdTemplate;
    });
  });
}
function signout() {

  localStorage.removeItem('token');
  window.location.href = '.././index.html';
}
getViewBtn();
