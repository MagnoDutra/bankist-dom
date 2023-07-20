'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////
// Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  //primeiro pega as coordenadas
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document
  .querySelector('.nav')
  .addEventListener('click', e => console.log('nav clicada'));
document
  .querySelector('.nav__links')
  .addEventListener('click', e => console.log('link bar clicada'));
document.querySelector('.nav__link').addEventListener('click', function () {
  this.style.backgroundColor = randomColor();
});

// const head = document.querySelector('header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';

// head.append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
