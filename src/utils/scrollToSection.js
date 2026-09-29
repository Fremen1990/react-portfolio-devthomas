export const scrollToSection = (event, href) => {
  if (!href || href.charAt(0) !== "#") {
    return;
  }

  const target = document.getElementById(href.slice(1));
  if (!target) {
    return;
  }

  event.preventDefault();
  let reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (error) {
    reduce = false;
  }
  target.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });

  if (window.location.hash !== href) {
    window.history.pushState(null, "", href);
  }
};
