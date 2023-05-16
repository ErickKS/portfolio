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

// NAV ANIMATION && MOUSE SCROLL ANIMATION (banner) && SECTION ANIMATION

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
  const menuElement = document.querySelector(`.menu li a[href*=${sectionId}]`);

  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }

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

const mouse = document.getElementById("mouse");

function toggleMouseStyle() {
  if (window.scrollY > 400) {
    mouse.style.cssText = "opacity:0;" + "visibility:hidden;";
  } else {
    mouse.style.cssText = "opacity:1;" + "visibility:visible;";
  }
}

// PROJECTS FILTER

const projectTrigger = document.querySelectorAll(".project__trigger");
const project = document.querySelectorAll(".project__single");

function filter(category, items) {
  items.forEach((item) => {
    const isItemFiltered = !item.classList.contains(category);
    const isShowAll = category === "all";

    if (isItemFiltered && !isShowAll) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  });
}

projectTrigger.forEach((button) => {
  button.addEventListener("click", () => {
    projectTrigger.forEach((disableButton) => {
      disableButton.classList.remove("active");
    });
    button.classList.add("active");

    const currentCategory = button.dataset.filter;
    filter(currentCategory, project);
  });
});
