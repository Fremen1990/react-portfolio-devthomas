"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  CLOSE_INPUTS,
  SHOW_ALL,
  commands,
  filterCommands,
  type Command,
  type CommandContext,
} from "../../commands";
import { profile } from "../../content/publicProfile";
import { scrollToSection } from "../../utils/scrollToSection";
import { applyTheme } from "../../utils/theme";
import { applySkin } from "../../utils/skin";
import { usePreferences } from "../../utils/preferences";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isHome: boolean;
};

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
}: CommandPaletteProps) => {
  const router = useRouter();
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
  const [toast, setToast] = useState("");

  const results = useMemo(
    () => filterCommands(commands, query, { theme, skin }),
    [query, theme, skin]
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

  const showToast = (message: string) => {
    clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(""), 4000);
  };

  const context: CommandContext = {
    goToSection: (id) => {
      if (isHome) {
        scrollToSection(null, `#${id}`);
      } else {
        router.push(id === "home" ? "/" : `/#${id}`);
      }
    },
    openExternal: (url) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    copyEmail: async () => {
      try {
        await navigator.clipboard.writeText(profile.links.emailLabel);
        showToast("Email address copied");
      } catch {
        showToast(`Couldn't copy. The address is ${profile.links.emailLabel}`);
      }
    },
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
    ? `command not found: ${trimmed} — type help`
    : `No command matches “${trimmed}”. Type help to see them all.`;

  return (
    <>
      <dialog
        ref={dialogRef}
        className="palette"
        aria-label="Command palette"
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
              aria-label="Search commands"
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
                terminal ? "type help" : "Go to a section, open a link…"
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
            aria-label="Commands"
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
                <span className="palette-hint">{command.group}</span>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="palette-empty">{emptyMessage}</p>
          )}
          <p className="palette-footer" aria-hidden="true">
            <kbd>↑</kbd> <kbd>↓</kbd> to choose · <kbd>Enter</kbd> to run ·{" "}
            <kbd>Esc</kbd> to close
          </p>
          <p className="visually-hidden" role="status">
            {open
              ? results.length
                ? `${results.length} commands`
                : emptyMessage
              : ""}
          </p>
        </div>
      </dialog>
      <p
        className={toast ? "palette-toast is-visible" : "palette-toast"}
        role="status"
      >
        {toast}
      </p>
    </>
  );
};
