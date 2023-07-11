"use strict";

import Glide, { Autoplay, Controls } from '@glidejs/glide/dist/glide.modular.esm';
import Typewriter from 'typewriter-effect/dist/core';

/* Function to show toast notifications */
const showNotification = function (message, isSuccess) {
  const notificationElement = document.getElementById("notification");
  notificationElement.textContent = message;
  const classToAdd = isSuccess ? "notification-success" : "notification-warning";
  notificationElement.classList.add(classToAdd);
  notificationElement.classList.add('show');

  // Hide notification after 3 seconds (adjust as needed)
  setTimeout(function() {
  notificationElement.classList.add('hide');
  }, 3000);
}

const domReady = function() {
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
  const glider = new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    keyboard: true,
    autoplay: 8000,
    animationDuration: 1000
  })
  glider.mount({ Autoplay, Controls })


  /* Type Writer Effect */
  setTimeout(() => {
    const typewriter = new Typewriter('.typewriter', {
      typeString: 'Your Brand<br/>Our Words',
      loop: true,
      delay: 75
    });
    typewriter
      .pauseFor(500)
      .typeString('Your Brand<br/>Our Words')
      .pauseFor(3000)
      .deleteChars(24)
      .typeString('Your Brand<br/>Our Words')
      .pauseFor(2000)
      .start();
  }, 3000)

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
};


if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  domReady();
} else {
  document.addEventListener("DOMContentLoaded", domReady);
}
