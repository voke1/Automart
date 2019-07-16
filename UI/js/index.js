const nonUserNav = `
<a href="#" class="logo">AUTOMART</a>
<input class="menu-btn" type="checkbox" id="menu-btn" />
<label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
<ul class="menu">
    <li><a href="#">HOME</a></li>
    <li><a href="https://voke-automart.herokuapp.com/api-docs">API DOCS</a></li>
    <li><a href="UI/sign-up.html">SIGN UP</a></li>
    <li><a href="UI/sign-in.html">SIGN IN</a></li>

</nav>`;

const memberNav = `
<a href="#" class="logo">AUTOMART</a>
<input class="menu-btn" type="checkbox" id="menu-btn" />
<label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
<ul class="menu">
    <li><a href="#">HOME</a></li>
    <li><a href="https://voke-automart.herokuapp.com/api-docs">API DOCS</a></li>
    <li><a href="UI/post_ad.html">SELL A CAR</a></li>
    <li><a href="UI/view-all-ads.html">FIND A CAR</a></li>
    <li onclick="signout()"><a>SIGN OUT</a></li>
</ul>
`;
async function getViewBtn() {
  const buttons = [...document.querySelectorAll('.btn-cars')];
    console.log(buttons);
  buttons.forEach((buton) => {
    buton.addEventListener('click', async () => {
      if (!localStorage.getItem('token')) {
        alert('Please sign in');
      } else {
        window.location.href = 'UI/view-all-ads.html';
      }
    });
  });
}

async function navToggle() {
  const result = document.querySelector('.header');
  if (!localStorage.getItem('token')) {
    result.innerHTML = nonUserNav;
  } else {
    result.innerHTML = memberNav;
  }
  getViewBtn();
}
function signout() {

    localStorage.removeItem('token');
    window.location.href = 'index.html';
  }

navToggle();
