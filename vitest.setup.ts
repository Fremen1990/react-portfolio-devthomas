import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Components read the route with usePathname(). Tests default to the home
// page and override it with vi.mocked(usePathname).mockReturnValue(...).
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}));

// jsdom has <dialog> but not its modal methods. This is enough for tests;
// focus trapping and the inert page are covered by Playwright.
HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
  this.open = true;
};
HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
  if (!this.open) return;
  this.open = false;
  this.dispatchEvent(new Event("close"));
};
