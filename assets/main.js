/**
 * The brand element
 */
const brand = document.querySelector('.navbar-brand');
/**
 * Is the secondary navigation open?
 */
let isSecondaryNavOpen = false;
/**
 * Our site navigation
 */
const nav = document.getElementById('main-nav');
/**
 * The width of the window
 */
let windowWidth = window.innerWidth;
/**
 * Are we displaying the mobile version of the nav?
 *
 * @returns {boolean} True if we are displaying the mobile version of the nav
 */
const isMobileNav = () => (windowWidth < 768);
/**
 * Display the secondary navigation
 */
const displaySecondaryNav = () => {
  if (!isMobileNav()) {
    return;
  }
  isSecondaryNavOpen = true;
  document.getElementById('primary-nav').classList.add('d-none');
  document.getElementById('mobile-secondary-nav').classList.remove('d-none');
  nav.querySelector('.logo-solid-bg').classList.add('d-none');
  nav.querySelector('form').classList.add('d-none');
  nav.querySelector('.secondary-nav-back').classList.remove('d-none');
};
/**
 * Display the navigation with a solid background
 */
const displaySolidNav = () => {
  nav.classList.remove('transparent');
  nav.classList.add('solid');
  brand.querySelector('.logo-transparent-bg').classList.remove('logo-show');
  brand.querySelector('.logo-transparent-bg').classList.add('logo-hide');
  brand.querySelector('.logo-solid-bg').classList.remove('logo-hide');
  brand.querySelector('.logo-solid-bg').classList.add('logo-show');
};
/**
 * Display the navigation with a transparent background
 */
const displayTransparentNav = () => {
  nav.classList.remove('solid');
  nav.classList.add('transparent');
  if (nav.dataset.navState === 'transparent-light') {
    brand.querySelector('.logo-solid-bg').classList.remove('logo-show');
    brand.querySelector('.logo-solid-bg').classList.add('logo-hide');
    brand.querySelector('.logo-transparent-bg').classList.remove('logo-hide');
    brand.querySelector('.logo-transparent-bg').classList.add('logo-show');
  }
};
/**
 * Hide the secondary navigation
 */
const hideSecondaryNav = () => {
  isSecondaryNavOpen = false;
  document.getElementById('primary-nav').classList.remove('d-none');
  document.getElementById('mobile-secondary-nav').classList.add('d-none');
  nav.querySelector('.logo-solid-bg').classList.remove('d-none');
  nav.querySelector('form').classList.remove('d-none');
  nav.querySelector('.secondary-nav-back').classList.add('d-none');
};
/**
 * Check's if a dropdown in our nav is currently open.
 */
const isNavDropdownOpen = () => {
  const dropdowns = nav.querySelectorAll('.dropdown-toggle');
  for (let i = 0; i < dropdowns.length; i += 1) {
    if (dropdowns[i].classList.contains('show')) {
      return true;
    }
  }
  return false;
};
/**
 * Function to handle nav dropdown toggle event
 *
 * @param {Event} event The event that triggered this function
 */
const onNavDropdownToggle = (event) => {
  if (!isMobileNav()) {
    return;
  }
  event.stopPropagation();
  displaySecondaryNav();
};
/**
 * Our main javacript file
 */
window.addEventListener('load', () => {
  /**
   * Change the color of the navbar on mouseover
   */
  nav.addEventListener('mouseover', () => {
    if ((isNavDropdownOpen()) || (isMobileNav()) || (nav.dataset.navState === 'solid')) {
      return;
    }
    displaySolidNav();
  });
  nav.addEventListener('mouseout', () => {
    if ((isNavDropdownOpen()) || (isMobileNav()) || (nav.dataset.navState === 'solid')) {
      return;
    }
    if (window.scrollY > 0) {
      displaySolidNav();
    } else {
      displayTransparentNav();
    }
  });
  nav.querySelector('.navbar-brand').addEventListener('click', (event) => {
    if (isSecondaryNavOpen) {
      event.preventDefault();
      hideSecondaryNav();
    }
  });
  nav.querySelector('.navbar-toggler').addEventListener('click', () => {
    if (isSecondaryNavOpen) {
      hideSecondaryNav();
    }
  });
  const dropdowns = nav.querySelectorAll('.nav-item.dropdown > a.dropdown-toggle');
  for (let i = 0; i < dropdowns.length; i += 1) {
    dropdowns[i].addEventListener('click', (event) => onNavDropdownToggle(event), true);
  }
});
/**
 * Add listener for scroll event
 */
window.addEventListener('scroll', () => {
  if ((isNavDropdownOpen()) || (isMobileNav()) || (nav.dataset.navState === 'solid')) {
    return;
  }
  if (window.scrollY > 0) {
    displaySolidNav();
    return;
  }
  displayTransparentNav();
});
window.addEventListener('resize', () => {
  windowWidth = window.innerWidth;
  if ((isMobileNav()) || (nav.dataset.navState === 'solid')) {
    return;
  }
  if (isNavDropdownOpen()) {
    hideSecondaryNav();
  }
  if (window.scrollY > 0) {
    displaySolidNav();
    return;
  }
  displayTransparentNav();
});
