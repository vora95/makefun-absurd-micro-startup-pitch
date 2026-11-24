const ENTRY = "We book fake meetings into lazy AI agents' calendars so their owners think they are overloaded and stop assigning tasks, charging $3 a week for the busiest-looking schedule an agent can buy.";

function validatePitch(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`pitch must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("pitch must be a single line");
  }
  if (/\s$/.test(text)) {
    throw new Error("pitch must not end with whitespace");
  }
}

validatePitch(ENTRY);
process.stdout.write(ENTRY);
