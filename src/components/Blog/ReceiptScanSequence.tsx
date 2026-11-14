import type { BlogLocale } from "@/content/blog/types";
import {
  Diagram,
  Label,
  accent,
  border,
  muted,
  soft,
} from "@/components/Blog/ClientArchitecture";

// Lifeline centres: phone, scan-receipt function, Gemini, Appwrite database.
const X = [100, 280, 460, 640] as const;
const TOP = 96;
const BOTTOM = 612;

const copy = {
  en: {
    kicker: "RECEIPT SCAN / MOBILE 3.1.0",
    title: "The model drafts. The person saves.",
    actors: [
      ["Phone", "Refuel form"],
      ["scan-receipt", "holds the Gemini key"],
      ["Gemini", "vision model"],
      ["Appwrite DB", "refuels · ai_usage"],
    ],
    notes: [
      ["1. Photo attached", "as the receipt"],
      ["6. Check ranges,", "drop tank + odometer"],
      ["8. Fill empty fields,", "person checks"],
    ],
    messages: [
      "2. JPEG + session",
      "3. Count + reserve a scan",
      "4. Photo + JSON schema",
      "5. JSON",
      "7. Draft + warnings",
      "9. Save → refuel row",
    ],
    footer: [
      "No refuel row exists before step 9.",
      "The only earlier write is the usage counter.",
    ],
    description:
      "1. The phone attaches the photo to the refuel form as its receipt. 2. It sends a JPEG copy with the signed-in session to the scan-receipt Appwrite Function, which holds the Gemini key. 3. The function counts and reserves one scan in the ai_usage table. 4. It sends the photo and a JSON schema to Gemini. 5. Gemini returns JSON. 6. The function checks value ranges and drops any tank state or odometer. 7. It returns a draft and warnings to the phone. 8. The form fills empty fields and the person checks them. 9. Only when the person taps Save is a refuel row written to the Appwrite database.",
    caption:
      "Request sequence for Scan Receipt in Car Brain mobile 3.1.0, drawn from the code at tag v3.1.0. Solid: request. Dashed: response. The thick arrow is the only write to the refuel records.",
  },
  pl: {
    kicker: "SKAN PARAGONU / MOBILE 3.1.0",
    title: "Model szkicuje. Człowiek zapisuje.",
    actors: [
      ["Telefon", "Formularz tankowania"],
      ["scan-receipt", "trzyma klucz Gemini"],
      ["Gemini", "model wizyjny"],
      ["Baza Appwrite", "refuels · ai_usage"],
    ],
    notes: [
      ["1. Zdjęcie dołączone", "jako paragon"],
      ["6. Sprawdza zakresy,", "bez baku i licznika"],
      ["8. Wypełnia puste pola,", "człowiek sprawdza"],
    ],
    messages: [
      "2. JPEG + sesja",
      "3. Policz i zarezerwuj skan",
      "4. Zdjęcie + schemat JSON",
      "5. JSON",
      "7. Szkic + ostrzeżenia",
      "9. Zapisz → wpis tankowania",
    ],
    footer: [
      "Przed krokiem 9 nie ma żadnego wpisu tankowania.",
      "Wcześniej zapisuje się tylko licznik skanów.",
    ],
    description:
      "1. Telefon dołącza zdjęcie do formularza tankowania jako paragon. 2. Wysyła kopię JPEG z sesją zalogowanej osoby do funkcji Appwrite scan-receipt, która trzyma klucz Gemini. 3. Funkcja liczy i rezerwuje jeden skan w tabeli ai_usage. 4. Wysyła zdjęcie i schemat JSON do Gemini. 5. Gemini zwraca JSON. 6. Funkcja sprawdza zakresy wartości i odrzuca stan baku oraz przebieg. 7. Zwraca telefonowi szkic i ostrzeżenia. 8. Formularz wypełnia puste pola, a człowiek je sprawdza. 9. Wpis tankowania trafia do bazy Appwrite dopiero wtedy, gdy człowiek naciśnie Zapisz.",
    caption:
      "Sekwencja żądań funkcji Skanuj paragon w Car Brain mobile 3.1.0, narysowana na podstawie kodu z tagu v3.1.0. Linia ciągła: żądanie. Przerywana: odpowiedź. Gruba strzałka to jedyny zapis do wpisów tankowania.",
  },
} as const;

function Note({
  x,
  y,
  lines,
}: {
  x: number;
  y: number;
  lines: readonly string[];
}) {
  return (
    <g>
      <rect
        x={x - 90}
        y={y}
        width={180}
        height={46}
        rx={6}
        fill={soft}
        stroke={accent}
        strokeWidth={1.2}
      />
      {lines.map((line, i) => (
        <Label key={line} x={x} y={y + 19 + i * 17} anchor="middle" size={12.5}>
          {line}
        </Label>
      ))}
    </g>
  );
}

export function ReceiptScanSequence({
  locale = "en",
}: {
  locale?: BlogLocale;
}) {
  const t = copy[locale === "pl" ? "pl" : "en"];
  const arrows = [
    { from: 0, to: 1, y: 250 },
    { from: 1, to: 3, y: 302 },
    { from: 1, to: 2, y: 354 },
    { from: 2, to: 1, y: 406, reply: true },
    { from: 1, to: 0, y: 512, reply: true },
    { from: 0, to: 3, y: 600, save: true },
  ];
  return (
    <Diagram
      locale={locale}
      kind="sequence"
      kicker={t.kicker}
      className="receipt-sequence"
      title={t.title}
      height={688}
      description={t.description}
      caption={t.caption}
    >
      {(marker) => (
        <>
          {t.actors.map(([name, detail], i) => (
            <g key={name}>
              <rect
                x={X[i] - 80}
                y={TOP}
                width={160}
                height={54}
                rx={6}
                fill={soft}
                stroke={accent}
              />
              <Label x={X[i]} y={TOP + 23} anchor="middle" bold size={16}>
                {name}
              </Label>
              <Label
                x={X[i]}
                y={TOP + 42}
                anchor="middle"
                size={12}
                color={muted}
              >
                {detail}
              </Label>
              <path
                d={`M${X[i]} ${TOP + 54}V${BOTTOM}`}
                stroke={border}
                strokeDasharray="4 5"
              />
            </g>
          ))}
          <Note x={X[0]} y={168} lines={t.notes[0]} />
          <Note x={X[1]} y={424} lines={t.notes[1]} />
          <Note x={X[0]} y={530} lines={t.notes[2]} />
          {arrows.map((a, i) => (
            <g key={t.messages[i]}>
              <Label
                x={(X[a.from] + X[a.to]) / 2}
                y={a.y - 10}
                anchor="middle"
                size={13}
                bold={a.save}
              >
                {t.messages[i]}
              </Label>
              <path
                data-message={i + 1}
                d={`M${X[a.from]} ${a.y}H${X[a.to]}`}
                stroke={accent}
                strokeWidth={a.save ? 3 : 1.7}
                strokeDasharray={a.reply ? "5 4" : undefined}
                markerEnd={a.save ? undefined : `url(#${marker})`}
              />
              {a.save ? (
                // A marker scales with stroke width; draw this head at normal size.
                <path
                  d={`M${X[a.to] - 11} ${a.y - 7}L${X[a.to]} ${a.y}L${X[a.to] - 11} ${a.y + 7}`}
                  fill="none"
                  stroke={accent}
                  strokeWidth={2.4}
                />
              ) : null}
            </g>
          ))}
          {t.footer.map((line, i) => (
            <Label key={line} x={28} y={644 + i * 19} size={13} color={muted}>
              {line}
            </Label>
          ))}
        </>
      )}
    </Diagram>
  );
}
