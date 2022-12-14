const header = document.querySelector(".header");
const navigation = document.querySelector(".navigation");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation__ul");
const navLink = document.querySelectorAll(".navigation__link");
const cookieEl = document.querySelector(".cookie__container");
const cookieAcceptBtn = document.querySelector("#cookie-accept");
const cookieRejectBtn = document.querySelector("#cookie-reject");
const tabs = document.querySelectorAll(".questions__btn");
const tabsContainer = document.querySelector(".questions__tab-container");
const tabsContent = document.querySelectorAll(".questions__content");

// IMPLEMENTING STICKY NAVIGATION
const stickyNavigation = function (entries) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");
  } else navigation.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);

// IMPLEMENTING HAMBURGER MENU
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLink.forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

//  COOKIE LOCAL STORAGE POP-UP
const cookieStorage = localStorage.getItem("cookie");
let cookie;
cookieAcceptBtn.addEventListener("click", function () {
  cookie = localStorage.setItem("cookie", "accepted");
  cookieEl.style.display = "none";
});

cookieRejectBtn.addEventListener("click", function () {
  cookie = localStorage.setItem("cookie", "rejected");
  cookieEl.style.display = "none";
});

window.addEventListener("load", function () {
  if (cookieStorage === "accepted") {
    cookieEl.style.display = "none";
  }
});

// RENDER MAP WITH SHOP LOCATION USING LEAFLET API

const rendermap = function () {
  //coords of shop
  const coords = [54.569584, 18.3923391];
  const map = L.map("map").setView([54.569999, 18.3923391], 17);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup(
      L.popup({
        closeButton: false,
        autoClose: false,
        closeOnEscapeKey: false,
        closeOnClick: false,
        content: "Genera??a Henryka D??browskiego 17, Rumia",
      })
    )
    .openPopup();
};
setTimeout(rendermap, 1000);

// how to add event listener on marker????

/// implementing smooth scrolling
document
  .querySelector(".navigation__ul")
  .addEventListener("click", function (e) {
    console.log(e.target);
    e.preventDefault();

    if (e.target.classList.contains("navigation__link")) {
      const clickedElement = e.target.getAttribute("href");
      document.querySelector(clickedElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

// tabbed component (section QUESTIONS)

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".questions__btn");
  console.log(clicked);

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("questions__btn--active"));
  clicked.classList.add("questions__btn--active");

  tabsContent.forEach((content) =>
    content.classList.remove("questions__content--active")
  );

  document
    .querySelector(`.questions__content--${clicked.dataset.set}`)
    .classList.add("questions__content--active");
});

//revealing section animation

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  //console.log(entries);
  const [entry] = entries;
  console.log(entry);

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.11,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
