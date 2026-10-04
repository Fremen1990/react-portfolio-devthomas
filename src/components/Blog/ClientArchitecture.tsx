import { useId, type ReactNode } from "react";
import type { BlogLocale } from "@/content/blog/types";

const ink = "var(--text, #1c282c)";
const muted = "var(--text-secondary, #52646a)";
const accent = "var(--accent, #0f6b75)";
const surface = "var(--surface, #ffffff)";
const soft = "var(--accent-soft, #e2efee)";
const border = "var(--separator, #d4deda)";

function Label({
  x,
  y,
  children,
  size = 14,
  bold = false,
  color = ink,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  bold?: boolean;
  color?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={size}
      fontWeight={bold ? 650 : 400}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}
function Node({
  x,
  y,
  w,
  title,
  detail,
  accentNode = false,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  detail: string;
  accentNode?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={68}
        rx={8}
        fill={accentNode ? soft : surface}
        stroke={accentNode ? accent : border}
        strokeWidth={1.5}
      />
      <Label x={x + 16} y={y + 28} size={19} bold>
        {title}
      </Label>
      <Label x={x + 16} y={y + 50} size={13} color={muted}>
        {detail}
      </Label>
    </g>
  );
}
function Diagram({
  locale,
  kind,
  title,
  description,
  caption,
  height,
  children,
}: {
  locale: BlogLocale;
  kind: string;
  title: string;
  description: string;
  caption: string;
  height: number;
  children: (marker: string) => ReactNode;
}) {
  const id = useId();
  const marker = `${id}-arrow`;
  return (
    <figure
      className={kind === "system" ? "client-architecture" : "auth-sequence"}
      style={{ margin: "32px 0", minWidth: 0 }}
    >
      <div
        tabIndex={0}
        role="region"
        aria-label={`${title} — ${locale === "pl" ? "przewijany diagram" : "scrollable diagram"}`}
        style={{
          overflowX: "auto",
          borderRadius: "var(--radius-surface, 16px)",
          border: `1px solid ${border}`,
          background: surface,
        }}
      >
        <svg
          data-diagram={kind}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 720 ${height}`}
          width={720}
          height={height}
          role="img"
          aria-labelledby={`${id}-title ${id}-desc`}
          style={{
            display: "block",
            width: "100%",
            minWidth: 640,
            height: "auto",
            fontFamily: "var(--font, system-ui, sans-serif)",
          }}
        >
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-desc`}>{description}</desc>
          <defs>
            <marker
              id={marker}
              viewBox="0 0 10 10"
              refX={9}
              refY={5}
              markerWidth={7}
              markerHeight={7}
              orient="auto-start-reverse"
            >
              <path
                d="M1 1L9 5L1 9"
                fill="none"
                stroke={accent}
                strokeWidth={1.5}
              />
            </marker>
            <pattern
              id={`${id}-grid`}
              width={24}
              height={24}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={1} cy={1} r={0.8} fill={border} />
            </pattern>
          </defs>
          <rect width={720} height={height} fill={surface} />
          <rect
            width={720}
            height={height}
            fill={`url(#${id}-grid)`}
            opacity={0.55}
          />
          <Label x={28} y={34} size={12} color={muted}>
            {kind === "system" ? "01 / SYSTEM MAP" : "02 / SESSION BOUNDARY"}
          </Label>
          <Label x={28} y={67} size={25} bold>
            {title}
          </Label>
          {children(marker)}
        </svg>
      </div>
      <figcaption
        style={{ marginTop: 12, color: muted, fontSize: 14, lineHeight: 1.6 }}
      >
        {caption}{" "}
        {locale === "pl"
          ? "Na małym ekranie przewiń schemat w poziomie."
          : "On a narrow screen, scroll the diagram horizontally."}
      </figcaption>
    </figure>
  );
}

export function ClientArchitecture({ locale = "en" }: { locale?: BlogLocale }) {
  const pl = locale === "pl";
  const title = pl
    ? "3 platformy. 2 klienty. 1 backend."
    : "3 platforms. 2 clients. 1 backend.";
  return (
    <Diagram
      locale={locale}
      kind="system"
      title={title}
      height={618}
      description={
        pl
          ? "iOS i Android korzystają z React Native i SDK Appwrite. Przeglądarka łączy się przez HTTPS z serwerem Next.js, który obsługuje sesję Appwrite. Mobilne operacje na danych i webowe sesje istnieją w kodzie; webowe operacje domenowe są planowane. Appwrite zapewnia wspólne Auth, Database, Storage i Functions."
          : "iOS and Android use React Native and the Appwrite SDK. The browser connects over HTTPS to the Next.js server, which handles the Appwrite session. Mobile data access and web sessions exist in code; web domain operations are planned. Appwrite provides shared Auth, Database, Storage and Functions."
      }
      caption={
        pl
          ? "Linia ciągła: ścieżka istniejąca w kodzie. Przerywana: planowane operacje domenowe webu. Strzałki pokazują kierunek wywołań, nie synchronizację Realtime."
          : "Solid: path present in code. Dashed: planned web domain operations. Arrows show calls, not Realtime synchronization."
      }
    >
      {(marker) => (
        <>
          <rect
            x={24}
            y={96}
            width={280}
            height={264}
            rx={12}
            fill={surface}
            stroke={border}
          />
          <rect
            x={348}
            y={96}
            width={348}
            height={264}
            rx={12}
            fill={surface}
            stroke={border}
          />
          <Label x={42} y={121} size={12} color={muted}>
            MOBILE / CLIENT
          </Label>
          <Label x={366} y={121} size={12} color={muted}>
            WEB / CLIENT + SERVER
          </Label>
          {[
            { x: 48, name: "iOS" },
            { x: 176, name: "Android" },
          ].map(({ x, name }) => (
            <g key={name}>
              <rect x={x} y={139} width={104} height={44} rx={22} fill={soft} />
              <rect
                x={x + 13}
                y={151}
                width={11}
                height={19}
                rx={2}
                stroke={accent}
                fill="none"
                strokeWidth={1.5}
              />
              <Label x={x + 34} y={166} size={15} bold>
                {name}
              </Label>
            </g>
          ))}
          <path
            d="M100 183V205H228V183M164 205V238"
            fill="none"
            stroke={accent}
            strokeWidth={1.7}
            markerEnd={`url(#${marker})`}
          />
          <Node
            x={44}
            y={242}
            w={240}
            title="React Native"
            detail="SDK + TanStack Query"
            accentNode
          />
          <Label x={164} y={338} anchor="middle" size={13} color={muted}>
            {pl ? "Sesja i cache klienta" : "Client session and cache"}
          </Label>
          <Node
            x={404}
            y={135}
            w={236}
            title={pl ? "Przeglądarka" : "Browser"}
            detail="Web UI"
          />
          <path
            d="M522 203V264"
            stroke={accent}
            strokeWidth={1.7}
            markerEnd={`url(#${marker})`}
          />
          <Label x={538} y={226} size={12} color={muted}>
            HTTPS / cookie
          </Label>
          <path
            d="M364 244H508M536 244H680"
            stroke={border}
            strokeDasharray="3 5"
          />
          <Label x={375} y={239} size={11} color={muted}>
            {pl ? "Granica serwera" : "Server boundary"}
          </Label>
          <Node
            x={380}
            y={268}
            w={284}
            title="Next.js / server"
            detail={
              pl ? "Sesja Appwrite · HTTP-only" : "Appwrite session · HTTP-only"
            }
            accentNode
          />
          <path
            data-edge="mobile"
            d="M164 360V471"
            stroke={accent}
            strokeWidth={2}
            fill="none"
            markerEnd={`url(#${marker})`}
          />
          <Label x={177} y={405} size={13} color={muted}>
            {pl ? "SDK · dane" : "SDK · data"}
          </Label>
          <path
            data-edge="session"
            d="M464 360V471"
            stroke={accent}
            strokeWidth={2}
            fill="none"
            markerEnd={`url(#${marker})`}
          />
          <Label x={451} y={405} anchor="end" size={13} color={muted}>
            {pl ? "Sesja / konto" : "Session / account"}
          </Label>
          <path
            data-edge="planned"
            d="M622 360V471"
            stroke={accent}
            strokeWidth={2}
            strokeDasharray="6 5"
            fill="none"
            markerEnd={`url(#${marker})`}
          />
          <Label x={548} y={413} anchor="middle" size={13} color={muted}>
            {pl ? "Dane domenowe" : "Domain data"}
          </Label>
          <Label x={548} y={437} anchor="middle" size={12} color={muted}>
            {pl ? "planowane" : "planned"}
          </Label>
          <rect
            x={44}
            y={476}
            width={632}
            height={108}
            rx={12}
            fill={soft}
            stroke={accent}
            strokeWidth={1.5}
          />
          <Label x={64} y={505} size={22} bold>
            Appwrite
          </Label>
          <Label x={652} y={503} size={12} anchor="end" color={muted}>
            {pl ? "WSPÓLNY PROJEKT" : "SHARED PROJECT"}
          </Label>
          {["Auth", "Database", "Storage", "Functions"].map((name, i) => (
            <g key={name}>
              <rect
                x={64 + i * 149}
                y={527}
                width={133}
                height={34}
                rx={5}
                fill={surface}
                stroke={border}
              />
              <Label x={130 + i * 149} y={549} anchor="middle" size={14}>
                {name}
              </Label>
            </g>
          ))}
        </>
      )}
    </Diagram>
  );
}

export function AuthSequence({ locale = "en" }: { locale?: BlogLocale }) {
  const pl = locale === "pl";
  const actors = [pl ? "Przeglądarka" : "Browser", "Next.js", "Appwrite"];
  const steps = pl
    ? [
        "1. Dane logowania",
        "2. Utworzenie sesji",
        "3. Sekret sesji",
        "4. Cookie HTTP-only",
        "5. Kolejne żądanie + cookie",
        "6. Klient z sesją użytkownika",
      ]
    : [
        "1. Sign-in details",
        "2. Create session",
        "3. Session secret",
        "4. HTTP-only cookie",
        "5. Next request + cookie",
        "6. User-scoped session client",
      ];
  return (
    <Diagram
      locale={locale}
      kind="sequence"
      title={
        pl ? "Jedno konto. Osobne sesje." : "One account. Separate sessions."
      }
      height={514}
      description={
        pl
          ? "Przeglądarka wysyła dane logowania do Next.js. Next.js tworzy sesję Appwrite i zapisuje jej sekret w cookie HTTP-only. Kolejne żądania używają klienta Appwrite z sesją użytkownika; planowane operacje domenowe zachowują ten kontekst uprawnień."
          : "Browser sends credentials to Next.js. Next.js creates an Appwrite session and stores the secret in an HTTP-only cookie. Later requests use a user-scoped Appwrite client; planned domain operations retain this permission context."
      }
      caption={
        pl
          ? "Schemat sekwencji obsługi sesji. Uprzywilejowany klient uwierzytelniania nie jest skrótem do danych pojazdów."
          : "Conceptual session sequence. The privileged authentication client is not a shortcut to vehicle data."
      }
    >
      {(marker) => (
        <>
          {actors.map((actor, i) => (
            <g key={actor}>
              <rect
                x={34 + i * 240}
                y={96}
                width={170}
                height={42}
                rx={6}
                fill={soft}
                stroke={accent}
              />
              <Label x={119 + i * 240} y={123} anchor="middle" bold size={17}>
                {actor}
              </Label>
              <path
                d={`M${119 + i * 240} 138V458`}
                stroke={border}
                strokeDasharray="4 5"
              />
            </g>
          ))}
          {[
            { from: 119, to: 359, y: 177 },
            { from: 359, to: 599, y: 227 },
            { from: 599, to: 359, y: 277 },
            { from: 359, to: 119, y: 327 },
            { from: 119, to: 359, y: 388 },
            { from: 359, to: 599, y: 438 },
          ].map((s, i) => (
            <g key={steps[i]}>
              <Label
                x={(s.from + s.to) / 2}
                y={s.y - 11}
                anchor="middle"
                size={13}
              >
                {steps[i]}
              </Label>
              <path
                data-message={i + 1}
                d={`M${s.from} ${s.y}H${s.to}`}
                stroke={accent}
                strokeWidth={1.7}
                strokeDasharray={i === 2 || i === 3 ? "5 4" : undefined}
                markerEnd={`url(#${marker})`}
              />
            </g>
          ))}
          <Label x={28} y={491} size={13} color={muted}>
            {pl
              ? "Lepsza kontrola sesji. Koszt: warstwa serwerowa i obsługa jej błędów."
              : "More session control. Cost: a server layer and its failure handling."}
          </Label>
        </>
      )}
    </Diagram>
  );
}
