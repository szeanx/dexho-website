// this is the nav bar section, toggling css classes on mobile menu / navbar
$("#toggle").click(function () {
 $(this).toggleClass("on");
 $("#resize").toggleClass("active");
});
$("#resize ul li a").click(function () {
 $(this).toggleClass("on");
 $("#resize").toggleClass("active");
});
$(".close-btn").click(function () {
 $(this).toggleClass("on");
 $("#resize").toggleClass("active");
});

// changes the color of nav bar when scrolled dependent on how far the user has scrolled
$(function () {
 $(document).scroll(function () {
  var $nav = $(".nav");
  $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
 });
});

new WOW().init();

//  page transitions

// delay function
function delay(n) {
 n = n || 2000;
 return new Promise((done) => {
  setTimeout(() => {
   done();
  }, n);
 });
}

function pageTransition() {
 var tl = gsap.timeline();
 tl.to(".loading-screen", {
  duration: 1.2,
  width: "100%",
  left: "0%",
  ease: "Expo.easeInOut",
 });

 tl.to(".loading-screen", {
  duration: 1,
  width: "100%",
  left: "100%",
  ease: "Expo.easeInOut",
  delay: 0.3,
 });

 tl.set(".loading-screen", { left: "-100%" });
}

function contentAnimation() {
 var tl = gsap.timeline();
 tl.from(".animate-this", {
  duration: 1,
  y: 30,
  opacity: 0,
  stagger: 0.4,
  delay: 0.2,
 });
}

$(function () {
 barba.init({
  sync: true,

  transitions: [
   {
    async leave(data) {
     const done = this.async();

     pageTransition();
     await delay(1000);
     done();
    },

    async enter(data) {
     contentAnimation();
    },

    async once(data) {
     contentAnimation();
    },
   },
  ],
 });
});
