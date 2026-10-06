const prefersReducedMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

type Activation = Pick<
  MouseEvent,
  | "defaultPrevented"
  | "metaKey"
  | "ctrlKey"
  | "shiftKey"
  | "altKey"
  | "button"
  | "preventDefault"
>;

const isPlainActivation = (event: Activation | null) => {
  if (!event) {
    return true;
  }
  if (event.defaultPrevented) {
    return false;
  }
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }
  if (typeof event.button === "number" && event.button !== 0) {
    return false;
  }
  return true;
};

export const destinationFocusTarget = (id: string) =>
  document.getElementById(`${id}-heading`) || document.getElementById(id);

export const scrollToSection = (
  event: Activation | null,
  href: string,
  { updateHistory = true }: { updateHistory?: boolean } = {}
): boolean => {
  if (!isPlainActivation(event)) {
    return false;
  }
  if (!href || href.charAt(0) !== "#") {
    return false;
  }

  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) {
    return false;
  }

  if (event) {
    event.preventDefault();
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });

  const focusTarget = destinationFocusTarget(id);
  if (focusTarget && typeof focusTarget.focus === "function") {
    document.querySelectorAll(".nav-target").forEach((node) => {
      node.classList.remove("nav-target");
    });
    focusTarget.classList.add("nav-target");
    focusTarget.addEventListener(
      "blur",
      () => {
        focusTarget.classList.remove("nav-target");
      },
      { once: true }
    );
    // preventScroll keeps the scroll-margin position from scrollIntoView.
    focusTarget.focus({ preventScroll: true });
  }

  if (updateHistory && window.location.hash !== href) {
    window.history.pushState(null, "", href);
    // pushState emits no native hashchange; keep locale links in sync.
    window.dispatchEvent(new Event("portfolio:fragment"));
  }

  return true;
};
