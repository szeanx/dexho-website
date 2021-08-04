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

// Select all links with hashes
$('a[href*="#"]')
 // Remove links that don't actually link to anything
 .not('[href="#"]')
 .not('[href="#0"]')
 .click(function (event) {
  // On-page links
  if (
   location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
   location.hostname == this.hostname
  ) {
   // Figure out element to scroll to
   var target = $(this.hash);
   target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
   // Does a scroll target exist?
   if (target.length) {
    // Only prevent default if animation is actually gonna happen
    event.preventDefault();
    $("html, body").animate(
     {
      scrollTop: target.offset().top,
     },
     1000,
     function () {
      // Callback after animation
      var $target = $(target);
      $target.focus();
      if ($target.is(":focus")) {
       // Checking if the target was focused
       return false;
      } else {
       $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
       $target.focus(); // Set focus again
      }
     }
    );
   }
  }
 });

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
