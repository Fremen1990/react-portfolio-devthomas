export const scrollToSection = (event, href) => {
  if (!href || href.charAt(0) !== "#") {
    return;
  }

  const target = document.getElementById(href.slice(1));
  if (!target) {
    return;
  }

  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });

  if (window.location.hash !== href) {
    window.history.pushState(null, "", href);
  }
};
