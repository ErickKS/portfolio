// NAV

const btnMobile = document.getElementById("btnMobile");
const nav = document.getElementById("navigation");

const dropBtn = document.getElementById("dropA");
const dropList = document.getElementById("dropUl");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  nav.classList.toggle("active");

  document.documentElement.onclick = function (event) {
    if (event.target !== dropBtn && event.target !== dropList) {
      if (window.screen.width <= 990) {
        dropBtn.classList.remove("active");
        dropList.classList.remove("active");
        nav.classList.remove("active");
      }
    }
  };
}

function dropdown() {
  dropBtn.classList.toggle("active");
  dropList.classList.toggle("active");

  if (window.screen.width > 990) {
    document.documentElement.onclick = function (event) {
      if (event.target !== dropBtn && event.target !== dropList) {
        dropBtn.classList.remove("active");
        dropList.classList.remove("active");
      }
    };
  }
}

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);
dropBtn.addEventListener("click", dropdown);

// CLOSE NAV ON CLICK UL -> A

for (const navLink of document.querySelectorAll(".navLink")) {
  navLink.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// NAV ANIMATION

window.addEventListener("scroll", onScroll);

onScroll();
function onScroll() {
  activateMenuCurrentSection(about);
  activateMenuCurrentSection(projects);
  activateMenuCurrentSection(contact);
}

function activateMenuCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;

  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu li a[href*=${sectionId}]`);

  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

// MOUSE SCROLL ANIMATION (banner)

const mouse = document.getElementById("mouse");

(function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      mouse.style.opacity = "0";
      mouse.style.visibility = "hidden";
    } else {
      mouse.style.opacity = "1";
      mouse.style.visibility = "visible";
    }
  });
});

// ABOUT ANIMATION

const aboutBox = document.querySelector(".about__txt__painel");
const aboutBtn = document.querySelectorAll(".painel__btn");
const aboutContent = document.querySelectorAll(".painel__content__box");

aboutBox.addEventListener("click", (e) => {
  const aboutId = e.target.dataset.id;
  const element = document.getElementById(aboutId);
  if (aboutId) {
    aboutBtn.forEach((btn) => {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });

    aboutContent.forEach((aboutContent) => {
      aboutContent.classList.remove("active");
    });

    element.classList.add("active");
  }
});
