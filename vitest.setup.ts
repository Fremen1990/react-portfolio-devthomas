import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Components read the route with usePathname(). Tests default to the home
// page and override it with vi.mocked(usePathname).mockReturnValue(...).
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));
