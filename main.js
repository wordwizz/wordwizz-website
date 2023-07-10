/* Smooth Scrolling behavior with fixed header offset */
document.addEventListener('click', (event) => {
  if (event.target.matches('a[href^="#"]')) {
    const id = event.target.getAttribute('href').substring(1);
    const element = document.getElementById(id);
    if (element) {
      const rootStyles = getComputedStyle(document.documentElement);
      const headerHeightValue = rootStyles.getPropertyValue('--header-height');

      // Create a temporary element
      const tempElement = document.createElement('div');
      tempElement.style.setProperty('height', headerHeightValue);

      document.body.appendChild(tempElement);
      const computedStyle = getComputedStyle(tempElement);
      const headerHeight = parseInt(computedStyle.getPropertyValue('height'));
      document.body.removeChild(tempElement);

      const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      event.preventDefault();
    }
  }
});

/* Hamburger Menu */
const nav_main = document.getElementById('main-nav')
const nav_toggle = document.getElementById('nav-toggle')

nav_toggle.addEventListener('click', function(){
  if (nav_main.classList.contains('toggle-show')) {
    nav_main.classList.remove('toggle-show')
  } else {
    nav_main.classList.add('toggle-show')
  }
});


/* Slider */
import Glide, { Autoplay, Controls } from '@glidejs/glide/dist/glide.modular.esm'
const glider = new Glide('.glide', {
  type: 'carousel',
  perView: 1,
  focusAt: 'center',
  keyboard: true,
  autoplay: 3000,
  animationDuration: 1000
})

glider.mount({ Autoplay, Controls })
