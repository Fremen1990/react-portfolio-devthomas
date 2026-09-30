// Copying text for the command palette. The Clipboard API is tried first. Some
// browsers refuse it (a blocked permission, an unfocused window), so the older
// select-and-copy method follows. Returns whether either one worked.

const copyWithSelection = (text: string) => {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.setAttribute("aria-hidden", "true");
  Object.assign(area.style, {
    position: "fixed",
    top: "0",
    left: "0",
    opacity: "0",
  });
  const previous = document.activeElement;
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  if (previous instanceof HTMLElement) {
    previous.focus({ preventScroll: true });
  }
  return copied;
};

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return copyWithSelection(text);
  }
};
