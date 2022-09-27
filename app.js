const header = document.querySelector(".header");
const navigation = document.querySelector(".navigation");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation__ul");
const navLink = document.querySelectorAll(".navigation__link");

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
