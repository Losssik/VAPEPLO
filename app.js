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
