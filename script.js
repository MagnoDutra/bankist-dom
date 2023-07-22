'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

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

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////
// Page Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //match para ver se clicou nos elementos q vc quer
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////
// Tabs component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////
// Menu fading animation
const nav = document.querySelector('.nav');

function handleHover(opacity) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const hovered = e.target;
      const siblings = hovered.closest('.nav').querySelectorAll('.nav__link');
      const logo = hovered.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== hovered) {
          el.style.opacity = opacity;
        }
      });
      logo.style.opacity = opacity;
    }
  };
}

nav.addEventListener('mouseover', handleHover(0.5));

nav.addEventListener('mouseout', handleHover(1));

///////////////////////
// Sticky menu
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const obsCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObs = new IntersectionObserver(obsCallback, obsOptions);
headerObs.observe(header);

///////////////////////
// Revealing elements

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////
// lazy loading img

const allImgs = document.querySelectorAll('img[data-src]');

const lazyLoading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgsObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

allImgs.forEach(img => imgsObserver.observe(img));

//////////////////////////
// slider

const allSlides = document.querySelectorAll('.slide');
const buttonLeft = document.querySelector('.slider__btn--left');
const buttonRight = document.querySelector('.slider__btn--right');

let currentSlider = 0;

const slider = document.querySelector('.slider');

allSlides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);

buttonRight.addEventListener('click', function (e) {
  currentSlider++;
  allSlides.forEach(
    (s, i) =>
      (s.style.transform = `translateX(${
        (i - (currentSlider % allSlides.length)) * 100
      }%)`)
  );
});

buttonLeft.addEventListener('click', function (e) {
  currentSlider--;
  allSlides.forEach(
    (s, i) =>
      (s.style.transform = `translateX(${
        (i - ((currentSlider + allSlides.length) % allSlides.length)) * 100
      }%)`)
  );
});
