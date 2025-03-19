const toggleRight = document.querySelector(".toggle-right");
const toggleLeft = document.querySelector(".toggle-left");
const navbar = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav-item");

var navItemsWidth = 0;
navItems.forEach((element) => {
  navItemsWidth += element.clientWidth;
});
var navbarStartPosition = 0;
var navbarEndPosition = navItemsWidth - navbar.clientWidth;
var navbarCurrentPosition = navbarStartPosition;
var navbarMovementStep = 100;

function logValues(title) {
  const navbarStartPositionLog = {
    name: "navbarStartPosition",
    value: navbarStartPosition,
  };
  const navbarEndPositionLog = {
    name: "navbarEndPosition",
    value: navbarEndPosition,
  };
  const navItemsWidthLog = { name: "navItemsWidth", value: navItemsWidth };
  const navbarCurrentPositionLog = {
    name: "navbarCurrentPosition",
    value: navbarCurrentPosition,
  };
  const navbarMovementStepLog = {
    name: "navbarMovementStep",
    value: navbarMovementStep,
  };
  console.group();
  console.log("%c" + title, "background: #222; color:rgb(85, 218, 138)");
  console.table([
    navbarStartPositionLog,
    navbarEndPositionLog,
    navItemsWidthLog,
    navbarCurrentPositionLog,
    navbarMovementStepLog,
  ]);
  console.groupEnd();
}
logValues("document ready");

toggleRight.addEventListener("click", function () {
  logValues("toggleRight");
  if (navbarCurrentPosition < navbarEndPosition) {
    navbarCurrentPosition =
      navbarCurrentPosition + navbarMovementStep > navbarEndPosition
        ? navbarEndPosition
        : navbarCurrentPosition + navbarMovementStep;
    navbar.style.transform = "translateX(" + -navbarCurrentPosition + "px)";
  }
  logValues("toggleRight2");
});

toggleLeft.addEventListener("click", function () {
  logValues("toggleLeft");

  if (navbarCurrentPosition >= navbarStartPosition) {
    navbarCurrentPosition =
      navbarCurrentPosition - navbarMovementStep < navbarStartPosition
        ? navbarStartPosition
        : navbarCurrentPosition - navbarMovementStep;

    navbar.style.transform = "translateX(" + -navbarCurrentPosition + "px)";

    logValues("toggleLeft2");
  }
});
function toggleButtonsVisibility() {
  if (
    navItemsWidth + document.querySelector(".flex-shrink-0").clientWidth * 2 >=
    document.querySelector(".nav-container").clientWidth
  ) {
    document
      .querySelectorAll(".toggle")
      .forEach((el) => (el.style.visibility = "visible"));
  } else {
    document
      .querySelectorAll(".toggle")
      .forEach((el) => (el.style.visibility = "hidden"));
  }
}
toggleButtonsVisibility();
window.addEventListener("resize", function () {
  let navbar = document.querySelector(".nav");
  navbarCurrentPosition = navbarStartPosition;
  //navbarStartPosition = Math.round(navbar.clientWidth / 2) + 5;
  navbarStartPosition = 0;
  navbarEndPosition = navItemsWidth - navbar.clientWidth;
  //   navbarEndPosition = Math.round(
  //     navbar.clientWidth / 2 - (navItemsWidth - navbar.clientWidth) - 5
  //   );
  logValues("window resize");
  navbar.style.transition = "transform 0s";
  navbar.style.transform = "translateX(" + navbarStartPosition + "px)";

  //debugger;
  toggleButtonsVisibility();
  /*if (navItemsWidth > document.querySelector(".nav-container").clientWidth) {
    document
      .querySelectorAll(".toggle")
      .forEach((el) => (el.style.visibility = "visible"));
  } else {
    document.querySelector(".nav").classList.remove("justify-content-end");
    document
      .querySelectorAll(".toggle")
      .forEach((el) => (el.style.visibility = "hidden"));
  }*/
});
