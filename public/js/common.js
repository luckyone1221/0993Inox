"use strict";

const JSCCommon = {
  modalCall() {
    const link = '[data-fancybox="modal"], .link-modal-js';

    Fancybox.bind(link, {
      arrows: false,
      // infobar: false,
      touch: false,
      trapFocus: false,
      placeFocusBack: false,
      infinite: false,
      dragToClose: false,
      type: "inline",
      autoFocus: false,
      groupAll: false,
      groupAttr: false,
      // showClass: "fancybox-throwOutUp",
      // hideClass: "fancybox-throwOutDown",
      l10n: {
        Escape: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
      },
    });
    document.querySelectorAll(".modal-close-js").forEach((el) => {
      el.addEventListener("click", () => {
        Fancybox.close();
      });
    });
    Fancybox.bind("[data-fancybox]", {
      placeFocusBack: false,
    });
    document.addEventListener("click", (event) => {
      let element = event.target.closest(link);
      if (!element) return;
      let modal = document.querySelector("#" + element.dataset.src);
      const data = element.dataset;

      function setValue(val, elem) {
        if (elem && val) {
          const el = modal.querySelector(elem);
          el.tagName == "INPUT" ? (el.value = val) : (el.innerHTML = val);
          // console.log(modal.querySelector(elem).tagName)
        }
      }
      setValue(data.title, ".ttu");
      setValue(data.text, ".after-headline");
      setValue(data.btn, ".btn");
      setValue(data.order, ".order");
    });
  },
  toggleMenu() {
    document.addEventListener(
      "click",
      function (event) {
        const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
        const menu = document.querySelector(".menu-mobile--js");
        const toggleEv = event.target.closest(".toggle-menu-mobile--js");
        if (!toggleEv) return;
        toggle.forEach((el) => el.classList.toggle("on"));
        menu.classList.toggle("active");
        [document.body, document.querySelector("html")].forEach((el) =>
          el.classList.toggle("fixed")
        );
      },
      { passive: true }
    );
  },
  closeMenu() {
    const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
    const menu = document.querySelector(".menu-mobile--js");
    if (!menu) return;
    if (menu.classList.contains("active")) {
      toggle.forEach((element) => element.classList.remove("on"));
      menu.classList.remove("active");
      [document.body, document.querySelector("html")].forEach((el) =>
        el.classList.remove("fixed")
      );
    }
  },
  mobileMenu() {
    const menu = document.querySelector(".menu-mobile--js");
    if (!menu) return;
    this.toggleMenu();
    document.addEventListener(
      "mouseup",
      (event) => {
        let container = event.target.closest(".menu-mobile--js.active"); // (1)
        let link = event.target.closest(".menu-mobile .menu a"); // (1)
        let toggle = event.target.closest(".toggle-menu-mobile--js.on"); // (1)
        if (!container && !toggle) this.closeMenu();
      },
      { passive: true }
    );

    window.addEventListener(
      "resize",
      () => {
        if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
      },
      { passive: true }
    );
  },
  tabscostume(tab) {
    // tabs.addEventListener('click', function (element) {
    // 	const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
    // 	if (!btn) {
    // 		return;
    // 	}
    // 	const data = btn.dataset.tabBtn;
    // 	const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
    // 	const content = this.querySelectorAll(`[data-tab-content]`);
    // 	tabsAllBtn.forEach(element => {
    // 		element.dataset.tabBtn == data
    // 			? element.classList.add('active')
    // 			: element.classList.remove('active')
    // 	});
    // 	content.forEach(element => {
    // 		element.dataset.tabContent == data
    // 			? (element.classList.add('active'), element.previousSibling.classList.add('active'))
    // 			: element.classList.remove('active')
    // 	});
    // });
    // })
  },
  // /tabs

  inputMask() {
    // mask for input
    let InputTel = [].slice.call(
      document.querySelectorAll('input[type="tel"]')
    );
    InputTel.forEach((element) =>
      element.setAttribute(
        "pattern",
        "[+][0-9]{3}[ ][(][0-9]{2}[)][ ][0-9]{3}-[0-9]{2}-[0-9]{2}"
      )
    );
    Inputmask({ mask: "+380 (99) 999-99-99", showMaskOnHover: false }).mask(
      InputTel
    );
  },
  // /inputMask
  sendForm() {
    var gets = (function () {
      var a = window.location.search;
      var b = new Object();
      var c;
      a = a.substring(1).split("&");
      for (var i = 0; i < a.length; i++) {
        c = a[i].split("=");
        b[c[0]] = c[1];
      }
      return b;
    })();
    // form
    $(document).on("submit", "form", function (e) {
      e.preventDefault();
      const th = $(this);
      var data = th.serialize();
      // th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
      // th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
      // th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
      // th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
      console.log("Submited");
      $.ajax({
        url: "action.php",
        type: "POST",
        data: data,
      })
        .done(function (data) {
          Fancybox.close();
          Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
          // window.location.replace("/thanks.html");
          setTimeout(function () {
            // Done Functions
            th.trigger("reset");

            // ym(53383120, 'reachGoal', 'zakaz');
            // yaCounter55828534.reachGoal('zakaz');
          }, 4000);
        })
        .fail(function () {});
    });
  },
  heightwindow() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // We listen to the resize event
    window.addEventListener(
      "resize",
      () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      },
      { passive: true }
    );
  },
  makeDDGroup() {
    let parents = document.querySelectorAll(".dd-group-js");
    for (let parent of parents) {
      if (parent) {
        // childHeads, kind of funny))
        let ChildHeads = parent.querySelectorAll(".dd-head-js:not(.disabled)");
        $(ChildHeads).click(function () {
          let clickedHead = this;

          $(ChildHeads).each(function () {
            if (this === clickedHead) {
              //parent element gain toggle class, style head change via parent
              $(this.parentElement).toggleClass("active");
              $(this.parentElement)
                .find(".dd-content-js")
                .slideToggle(function () {
                  $(this).toggleClass("active");
                });
            } else {
              $(this.parentElement).removeClass("active");
              $(this.parentElement)
                .find(".dd-content-js")
                .slideUp(function () {
                  $(this).removeClass("active");
                });
            }
          });
        });
      }
    }
  },
  imgToSVG() {
    const convertImages = (query, callback) => {
      const images = document.querySelectorAll(query);

      images.forEach((image) => {
        fetch(image.src)
          .then((res) => res.text())
          .then((data) => {
            const parser = new DOMParser();
            const svg = parser
              .parseFromString(data, "image/svg+xml")
              .querySelector("svg");

            if (image.id) svg.id = image.id;
            if (image.className) svg.classList = image.classList;

            image.parentNode.replaceChild(svg, image);
          })
          .then(callback)
          .catch((error) => console.error(error));
      });
    };

    convertImages(".img-svg-js");
  },
};
const $ = jQuery;

function eventHandler() {
  JSCCommon.modalCall();
  // JSCCommon.tabscostume('tabs');
  JSCCommon.mobileMenu();
  JSCCommon.inputMask();
  JSCCommon.sendForm();
  JSCCommon.heightwindow();
  JSCCommon.makeDDGroup();

  // JSCCommon.CustomInputFile();
  var x = window.location.host;
  let screenName;
  screenName = "screen/" + document.body.dataset.bg;
  if (screenName && x.includes("localhost:30")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`
    );
  }

  //css vars
  let header = document.querySelector(".header--js");
  function setFixedNav() {
    let header = document.querySelector(".header--js");
    if (!header) return;
    window.scrollY > 0
      ? header.classList.add("fixed")
      : header.classList.remove("fixed");
  }

  function calcHeaderHeight() {
    document.documentElement.style.setProperty(
      "--header-h",
      `${header.offsetHeight}px`
    );
    window.setTimeout(() => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`
      );
    }, 10);
    window.setTimeout(() => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`
      );
    }, 100);
  }

  window.addEventListener("resize", calcHeaderHeight, { passive: true });
  window.addEventListener("scroll", calcHeaderHeight, { passive: true });
  calcHeaderHeight();

  function whenResize() {
    setFixedNav();
  }

  window.addEventListener(
    "scroll",
    () => {
      setFixedNav();
    },
    { passive: true }
  );
  window.addEventListener(
    "resize",
    () => {
      whenResize();
    },
    { passive: true }
  );

  whenResize();

  let defaultSl = {
    spaceBetween: 0,
    lazy: {
      loadPrevNext: true,
    },
    watchOverflow: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: " .swiper-pagination",
      type: "bullets",
      clickable: true,
      // renderBullet: function (index, className) {
      // 	return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }
    },
  };

  //luckyone js
  const swiperbreadcrumb = new Swiper(".breadcrumb-slider--js", {
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
    watchOverflow: true,
  });

  const headerBlockSlider = new Swiper(".headerBlock-slider-js", {
    // slidesPerView: 5,
    allowTouchMove: false,
    slidesPerView: 1,
    autoplay: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  //-
  let mixItContainers = document.querySelectorAll(".mixit-cont-js");
  let mixItChbGroups = document.querySelectorAll(".mixit-chb-group-js");

  for (let [index, container] of Object.entries(mixItContainers)) {
    let currentChbGroup = mixItChbGroups[index];
    let checkboxes = currentChbGroup.querySelectorAll('input[type="radio"]'); //used to be checkbox here

    let mixer = mixitup(container);

    currentChbGroup.addEventListener("change", function () {
      let selectors = [];

      // Iterate through all checkboxes, pushing the
      // values of those that are checked into an array

      for (let checkbox of checkboxes) {
        if (checkbox.checked) selectors.push(checkbox.value);
      }

      // If there are values in the array, join it into a string
      // using your desired logic, and send to the mixer's .filter()
      // method, otherwise filter by 'all'

      let selectorString =
        selectors.length > 0
          ? selectors.join(",") // or '.' for AND logic
          : "all";
      mixer.filter(selectorString);
    });
  }

  //- catalog page parameters !!! has to happen before(or after??) mixIt init
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let category = urlParams.get("category");
  if (category) {
    let current = document.querySelector(`input[value=".${category}" ]`);

    if (current) {
      current.click();
    }
  }

  //- filters
  $(".f-toggle-js").click(function () {
    $(".filters-js").toggleClass("active");
    [document.body, document.querySelector("html")].forEach((el) =>
      el.classList.toggle("f-open-fixed")
    );
  });
  $(".sCatalog__f-item").click(function () {
    $(".filters-js").removeClass("active");
    [document.body, document.querySelector("html")].forEach((el) =>
      el.classList.removeClass("f-open-fixed")
    );
  });
  window.addEventListener(
    "resize",
    () => {
      //need to check vars md breakpoint!!!!
      if (window.matchMedia("(min-width: 768px)").matches) {
        $(".filters-js").removeClass("active");
        [document.body, document.querySelector("html")].forEach((el) =>
          el.classList.remove("f-open-fixed")
        );
      }
    },
    { passive: true }
  );

  //prodCard
  let prodCardThumb = new Swiper(".sProdCard-thumb-js", {
    slidesPerView: "auto",

    breakpoints: {
      0: {
        direction: "horizontal",
      },
      768: {
        direction: "vertical",
      },
    },

    direction: "vertical",
    spaceBetween: 20,
  });
  let prodCardSlider = new Swiper(".sProdCard-slider-js", {
    spaceBetween: 0,
    thumbs: {
      swiper: prodCardThumb,
    },
    loop: true,
  });
  let prodCardTable = new Swiper(".sProdCard-table-slider-js", {
    freeMode: true,
    breakpoints: {
      0: {
        slidesPerView: "auto",
      },
      992: {
        slidesPerView: 1,
      },
    },

    spaceBetween: 0,
  });

  //
  let sOtherSlider = new Swiper(".sOther-slider-js", {
    slidesPerView: "auto",
    breakpoints: {
      0: {
        spaceBetween: 24,
      },
      1400: {
        spaceBetween: 38,
      },
    },
  });

  //end luckyone js
}
if (document.readyState !== "loading") {
  eventHandler();
} else {
  document.addEventListener("DOMContentLoaded", eventHandler);
}
