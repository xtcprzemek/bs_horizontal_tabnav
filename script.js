class StdTabView {
  //static navbarMovementStep = 100;
  constructor(step) {
    //here we are cathing all necessary document elements which we will use for manipulation
    this.container = document.querySelector(".std-tab-view");
    this.navbox = this.container.querySelector(".nav-box");
    this.navbar = this.container.querySelector(".nav");
    this.navItems = this.navbar.querySelectorAll(".nav-item");
    this.toggleRightBtn = this.container.querySelector(".toggle-right");
    this.toggleLeftBtn = this.container.querySelector(".toggle-left");
    this.toggleBtns = this.container.querySelectorAll(".toggle");

    //other static or calculated variables
    this.navItemsWidth = (() => {
      let i = 0;
      this.navItems.forEach((element) => {
        i += element.clientWidth;
      });
      return i;
    })();
    this.navItemsWidth = Array.from(this.navItems).reduce((totalWidth, el) => {
      return totalWidth + el.clientWidth;
    }, 0);
    this.navbarStartPosition = 0;
    this.navbarEndPosition = this.navItemsWidth - this.navbar.clientWidth;
    this.navbarCurrentPosition = this.navbarStartPosition;
    this.navbarMovementStep = step;

    //create events
    this.#evToggleRight();
    this.#evToggleLeft();
    this.#evWindowResize();
    //init visibility of buttons
    this.#toggleButtonsVisibility();
  } //end of class constuctor

  //methods
  logValues(title) {
    const properties = Object.keys(this)
      .filter((key) => typeof this[key] !== "object")
      .map((key, index) => ({
        "variable name": key,
        "variable value": this[key],
      }));
    if (title)
      console.log("%c" + title, "background: #222; color:rgb(85, 218, 138)");
    console.table(properties);
  }
  //buttons private events action
  #evToggleRight() {
    this.toggleRightBtn.addEventListener("click", () => {
      if (this.navbarCurrentPosition < this.navbarEndPosition) {
        this.navbarCurrentPosition =
          this.navbarCurrentPosition + this.navbarMovementStep >
          this.navbarEndPosition
            ? this.navbarEndPosition
            : this.navbarCurrentPosition + this.navbarMovementStep;
        this.navbar.style.transform =
          "translateX(" + -this.navbarCurrentPosition + "px)";
      }
    });
  }
  #evToggleLeft() {
    this.toggleLeftBtn.addEventListener("click", () => {
      if (this.navbarCurrentPosition >= this.navbarStartPosition) {
        this.navbarCurrentPosition =
          this.navbarCurrentPosition - this.navbarMovementStep <
          this.navbarStartPosition
            ? this.navbarStartPosition
            : this.navbarCurrentPosition - this.navbarMovementStep;
        this.navbar.style.transform =
          "translateX(" + -this.navbarCurrentPosition + "px)";
      }
    });
  }
  #toggleButtonsVisibility() {
    let btnsDivsWidth = Array.from(this.toggleBtns).reduce(
      (totalWidth, btn) => {
        return totalWidth + btn.parentElement.clientWidth;
      },
      0
    );
    if (this.navItemsWidth + btnsDivsWidth >= this.container.clientWidth) {
      this.toggleBtns.forEach((b) => (b.style.visibility = "visible"));
    } else {
      this.toggleBtns.forEach((b) => (b.style.visibility = "hidden"));
    }
  }
  #evWindowResize() {
    window.addEventListener("resize", () => {
      this.navbarCurrentPosition = this.navbarStartPosition;
      this.navbarStartPosition = 0;
      this.navbarEndPosition = this.navItemsWidth - this.navbar.clientWidth;
      this.logValues("window resize");
      this.navbar.style.transform =
        "translateX(" + this.navbarStartPosition + "px)";

      this.#toggleButtonsVisibility();
    });
  }
} //end of AlvStdTabView class

var alvStdTabsView = new StdTabView(100);
