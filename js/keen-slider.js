var animation = { duration: 30000, easing: (t) => t };

var slider = new KeenSlider("#keen-slider", {
  loop: true,
  renderMode: "performance",
  drag: false,
  slides: {
    perView: 2,
    spacing: 24,
  },
  breakpoints: {
    "(min-width: 520px)": {
      slides: {
        perView: 4,
        spacing: 16,
      },
    },
    "(min-width: 769px)": {
      slides: {
        perView: 5,
        spacing: 16,
      },
    },
    "(min-width: 940px)": {
      slides: {
        perView: 6,
        spacing: 16,
      },
    },
    "(min-width: 1200px)": {
      slides: {
        perView: 7,
        spacing: 16,
      },
    },
  },

  created(s) {
    s.moveToIdx(6, true, animation);
  },
  updated(s) {
    s.moveToIdx(s.track.details.abs + 6, true, animation);
  },
  animationEnded(s) {
    s.moveToIdx(s.track.details.abs + 6, true, animation);
  },
});
