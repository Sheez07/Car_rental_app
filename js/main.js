var t1 = gsap.timeline();

t1.from(".home-text", {
  y: 150,
  opacity: 0,
  duration: 1,
});

t1.from(".download", {
    y: 30,
    opacity: 0,
    duration: 1,
  });

t1.from(".input-box", {
    y: 30,
    opacity: 0,
    duration: 1,
  });

t1.from("ul li", {
  y: -50,
  stagger: 0.3,
  duration: 1,
  opacity: 0,
});
