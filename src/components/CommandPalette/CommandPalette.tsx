"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import {
  CLOSE_INPUTS,
  SHOW_ALL,
  buildShareUrl,
  createCommands,
  filterCommands,
  type Command,
  type CommandContext,
} from "../../commands";
import { profile } from "../../content/publicProfile";
import { scrollToSection } from "../../utils/scrollToSection";
import { applyTheme } from "../../utils/theme";
import { applySkin } from "../../utils/skin";
import { usePreferences } from "../../utils/preferences";
import { copyToClipboard } from "../../utils/clipboard";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isHome: boolean;
  locale?: "en" | "pl";
};

// How long a message stays up. A failed copy shows the text to copy by hand,
// so it stays longer.
const TOAST_MS = { done: 6000, failed: 15000 };

// True only in the browser, so the toast can be portalled into <body>.
const noSubscription = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    noSubscription,
    () => true,
    () => false
  );

const isEditable = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="palette-search-icon">
    <circle
      cx="11"
      cy="11"
      r="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M20 20l-4-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// One component, two looks: the standard skin shows a search list, and the
// Terminal skin restyles the same markup as a shell prompt (see
// skin-terminal.css), where the command aliases are what you type.
export const CommandPalette = ({
  open,
  onOpenChange,
  isHome,
  locale = "en",
}: CommandPaletteProps) => {
  const t = (en: string, pl: string) => (locale === "pl" ? pl : en);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, skin } = usePreferences();
  const terminal = skin === "terminal";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<Element | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState({ message: "", failed: false });
  const isClient = useIsClient();

  const results = useMemo(
    () => filterCommands(createCommands(locale), query, { theme, skin }),
    [query, theme, skin, locale]
  );
  const activeIndex = Math.min(active, results.length - 1);
  const activeCommand = results[activeIndex];
  const optionId = (command: Command) => `palette-option-${command.id}`;

  const close = ({ restoreFocus }: { restoreFocus: boolean }) => {
    setQuery("");
    setActive(0);
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    onOpenChange(false);
    if (restoreFocus && returnFocusRef.current instanceof HTMLElement) {
      returnFocusRef.current.focus();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
      inputRef.current?.focus();
    }
  }, [open]);

  // ⌘K / Ctrl+K opens and closes the palette from anywhere except other
  // text fields.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "k" ||
        !(event.metaKey || event.ctrlKey) ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }
      if (isEditable(event.target) && event.target !== inputRef.current) {
        return;
      }
      event.preventDefault();
      if (open) {
        close({ restoreFocus: true });
      } else {
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    if (open && activeCommand) {
      document
        .getElementById(optionId(activeCommand))
        ?.scrollIntoView?.({ block: "nearest" });
    }
  }, [open, activeCommand]);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  const showToast = (message: string, { failed = false } = {}) => {
    clearTimeout(toastTimerRef.current);
    setToast({ message, failed });
    toastTimerRef.current = setTimeout(
      () => setToast({ message: "", failed: false }),
      failed ? TOAST_MS.failed : TOAST_MS.done
    );
  };

  // If the browser refuses both copy methods, show the text to copy by hand.
  const copyText = async (text: string, copied: string, fallback: string) => {
    if (await copyToClipboard(text)) {
      showToast(copied);
    } else {
      showToast(
        `${t("Couldn't copy.", "Nie udało się skopiować.")} ${fallback} ${text}`,
        { failed: true }
      );
    }
  };

  const context: CommandContext = {
    goToSection: (id) => {
      if (isHome) {
        scrollToSection(null, `#${id}`);
      } else {
        router.push(
          `${locale === "pl" ? "/pl/" : "/"}${id === "home" ? "" : `#${id}`}`
        );
      }
    },
    goToPage: (path) => router.push(path),
    openExternal: (url) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    copyEmail: () =>
      copyText(
        profile.links.emailLabel,
        t("Email address copied", "Skopiowano adres e-mail"),
        t("The address is", "Adres:")
      ),
    copyShareLink: () =>
      copyText(
        buildShareUrl(pathname, { theme, skin }),
        t("Link copied", "Skopiowano link"),
        t("The link is", "Link:")
      ),
    setTheme: (next) => applyTheme(next, { persist: true }),
    setSkin: (next) => applySkin(next),
  };

  const run = (command: Command) => {
    // Close first: the modal dialog makes the page inert, and a section
    // command needs to move focus to its heading.
    close({ restoreFocus: false });
    command.run(context);
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const count = results.length;
    if (event.key === "ArrowDown" && count) {
      event.preventDefault();
      setActive((activeIndex + 1) % count);
    } else if (event.key === "ArrowUp" && count) {
      event.preventDefault();
      setActive((activeIndex - 1 + count) % count);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close({ restoreFocus: true });
    } else if (event.key === "Enter") {
      event.preventDefault();
      const normalized = query.trim().toLowerCase();
      if (CLOSE_INPUTS.includes(normalized)) {
        close({ restoreFocus: true });
      } else if (normalized !== SHOW_ALL && activeCommand) {
        run(activeCommand);
      }
    }
  };

  const trimmed = query.trim();
  const emptyMessage = terminal
    ? `${t("command not found", "nie znaleziono polecenia")}: ${trimmed} — ${t("type help", "wpisz help")}`
    : locale === "pl"
      ? `Brak polecenia „${trimmed}”. Wpisz help, by zobaczyć wszystkie.`
      : `No command matches “${trimmed}”. Type help to see them all.`;

  return (
    <>
      <dialog
        ref={dialogRef}
        className="palette"
        aria-label={t("Command palette", "Paleta poleceń")}
        onClose={() => {
          if (open) {
            close({ restoreFocus: true });
          }
        }}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) {
            close({ restoreFocus: true });
          }
        }}
      >
        <div className="palette-panel">
          <div className="palette-input-row">
            <span className="palette-prompt" aria-hidden="true">
              tomasz@devthomas:~$
            </span>
            <SearchIcon />
            <input
              ref={inputRef}
              className="palette-input"
              type="text"
              role="combobox"
              aria-label={t("Search commands", "Szukaj poleceń")}
              aria-expanded={results.length > 0}
              aria-controls="palette-list"
              aria-autocomplete="list"
              aria-activedescendant={
                activeCommand ? optionId(activeCommand) : undefined
              }
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder={
                terminal
                  ? t("type help", "wpisz help")
                  : t(
                      "Go to a section, open a link…",
                      "Przejdź do sekcji, otwórz link…"
                    )
              }
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKeyDown}
            />
          </div>
          <ul
            id="palette-list"
            className="palette-list"
            role="listbox"
            aria-label={t("Commands", "Polecenia")}
            hidden={results.length === 0}
          >
            {results.map((command, index) => (
              <li
                key={command.id}
                id={optionId(command)}
                className="palette-option"
                role="option"
                aria-selected={index === activeIndex}
                onMouseMove={() => setActive(index)}
                onClick={() => run(command)}
              >
                <span className="palette-alias">{command.alias}</span>
                <span className="palette-title">{command.title}</span>
                <span className="palette-hint">
                  {locale === "pl"
                    ? {
                        Section: "Sekcja",
                        Page: "Strona",
                        Link: "Link",
                        Setting: "Ustawienie",
                        Action: "Akcja",
                      }[command.group]
                    : command.group}
                </span>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="palette-empty">{emptyMessage}</p>
          )}
          <p className="palette-footer" aria-hidden="true">
            <kbd>↑</kbd> <kbd>↓</kbd> {t("to choose", "wybór")} ·{" "}
            <kbd>Enter</kbd> {t("to run", "uruchom")} · <kbd>Esc</kbd>{" "}
            {t("to close", "zamknij")}
          </p>
          <p className="visually-hidden" role="status">
            {open
              ? results.length
                ? `${results.length} ${t("commands", "poleceń")}`
                : emptyMessage
              : ""}
          </p>
        </div>
      </dialog>
      {/* Rendered into <body>: inside the header, a backdrop-filter (the
          Terminal skin has one) would make the header the toast's
          positioning box. */}
      {isClient &&
        createPortal(
          <p
            className={[
              "palette-toast",
              toast.message && "is-visible",
              toast.failed && "is-failed",
            ]
              .filter(Boolean)
              .join(" ")}
            role="status"
          >
            {toast.message}
          </p>,
          document.body
        )}
    </>
  );
};
