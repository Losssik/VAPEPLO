const header = document.querySelector(".header");
const navigation = document.querySelector(".navigation");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation__ul");
const navLink = document.querySelectorAll(".navigation__link");
const cookieEl = document.querySelector(".cookie__container");
const cookieAcceptBtn = document.querySelector("#cookie-accept");
const cookieRejectBtn = document.querySelector("#cookie-reject");

// IMPLEMENTING STICKY NAVIGATION
const stickyNavigation = function (entries) {
  const [entry] = entries;
  console.log(entry);

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
  const map = L.map("map").setView(coords, 16);

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
        content: "Generała Henryka Dąbrowskiego 17, Rumia",
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
