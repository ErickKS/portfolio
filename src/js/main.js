// NAV

const nav = document.getElementById("navigation");
const navButton = document.getElementById("btn-mobile");

const dropdownTrigger = document.getElementById("dropdown-trigger");
const dropdownContent = document.getElementById("dropdown-content");

function toggleNav(event) {
  event.stopPropagation();
  if (event.type === "touchstart") event.preventDefault();

  if (window.screen.width <= 768) nav.classList.toggle("active");
}

function toggleDropdown(event) {
  event.stopPropagation();

  dropdownTrigger.classList.toggle("active");
  dropdownContent.classList.toggle("active");
}

navButton.addEventListener("click", toggleNav);
navButton.addEventListener("touchstart", toggleNav);
dropdownTrigger.addEventListener("click", toggleDropdown);

document.addEventListener("click", (event) => {
  const targetElement = event.target;

  if (!nav.contains(targetElement) && nav.classList.contains("active")) {
    nav.classList.remove("active");
  }

  if (!dropdownContent.contains(targetElement) && dropdownContent.classList.contains("active")) {
    dropdownTrigger.classList.remove("active");
    dropdownContent.classList.remove("active");
  }
});

// CLOSE NAV ON CLICK UL -> A

for (const navLink of document.querySelectorAll(".nav__links")) {
  navLink.addEventListener("click", toggleNav);
}

// NAV ANIMATION && SECTION ANIMATION

window.onload = () => {
  Boolean(sessionStorage.getItem("about")) && activateCurrentSection(about, true);
  Boolean(sessionStorage.getItem("experiences")) && activateCurrentSection(experiences, true);
  Boolean(sessionStorage.getItem("projects")) && activateCurrentSection(projects, true);
  Boolean(sessionStorage.getItem("contact")) && activateCurrentSection(contact, true);
};

window.onscroll = () => {
  onScrollNavAnimation();
  toggleMouseStyle();
};

function onScrollNavAnimation() {
  activateCurrentSection(about, false);
  activateCurrentSection(experiences, false);
  activateCurrentSection(projects, false);
  activateCurrentSection(contact, false);
}

function activateCurrentSection(section, isInLocalStorage) {
  const sectionId = section.getAttribute("id");

  const targetLine = scrollY + innerHeight / 2;
  const targetLine2 = scrollY + innerHeight / 1.2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionTopReachOrPassedTargetLine2 = targetLine2 >= sectionTop;

  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries = sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;
  const sectionBoundaries2 = sectionTopReachOrPassedTargetLine2;

  // NAV ANIMATION
  const menuElement = document.querySelector(`.nav__links ul li a[href*=${sectionId}]`);

  menuElement.classList.remove("active");
  if (sectionBoundaries) menuElement.classList.add("active");

  // SECTION ANIMATION
  const heroSection = document.querySelector(`#${sectionId}`);

  if (sectionBoundaries2) {
    heroSection.classList.add("active");
    sessionStorage.setItem(`${sectionId}`, true);
  }

  if (isInLocalStorage) {
    heroSection.classList.add("active");
  }
}

// MOUSE BANNER ANIMATION

const mouse = document.getElementById("mouse");

function toggleMouseStyle() {
  if (window.scrollY > 400) {
    mouse.style.cssText = "opacity:0;" + "visibility:hidden;";
  } else {
    mouse.style.cssText = "opacity:1;" + "visibility:visible;";
  }
}
