// Absurd Micro-Startup Pitch-Off — main.ts
// Writes one sentence (the pitch) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: the same bytes on every run, no network, no model calls.
import * as fs from "node:fs";
import * as path from "node:path";

const PITCH =
  "We book fake meetings into lazy AI agents' calendars so their owners think they are overloaded and stop assigning tasks, charging $3 a week for the busiest-looking schedule an agent can buy.";

const MAX_CHARS = 200;

function fail(message: string): never {
  throw new Error(`pitch entry invalid: ${message}`);
}

function checkPitch(text: string): void {
  if (text.length === 0 || text.length > MAX_CHARS) {
    fail(`expected 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    fail("expected one line, found a line break");
  }
  const stops = text.split(".").length - 1;
  if (stops !== 1 || text.slice(-1) !== ".") {
    fail("expected exactly one sentence ending in a period");
  }
}

function main(): void {
  checkPitch(PITCH);
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!dir) {
    fail("MAKEFUN_OUTPUT_DIR is not set");
  }
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, "entry.txt");
  fs.writeFileSync(target, PITCH, "utf8");
  const roundTrip = fs.readFileSync(target, "utf8");
  if (roundTrip !== PITCH) {
    fail("entry.txt differs from the pitch after writing");
  }
  console.log(`entry.txt: ${Buffer.byteLength(PITCH, "utf8")} bytes written`);
}

main();
