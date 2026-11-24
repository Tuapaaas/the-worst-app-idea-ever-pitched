// The Worst App Idea Ever Pitched — make.fun entry
// One sentence, at most 240 characters, pitching the worst app imaginable.
// The program writes the pitch to $MAKEFUN_OUTPUT_DIR/entry.txt and
// self-checks the 1-240 character, single-sentence gate before writing.

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Introducing CloudSocks: an app that pairs your socks in the cloud, so when the dryer eats one, you can watch its digital twin hold a tiny funeral, live, for $2.99 a month.";

function main(): void {
  const text = PITCH.trim();
  if (text.length < 1 || text.length > 240) {
    throw new Error(`pitch must be 1-240 chars, got ${text.length}`);
  }
  // One sentence: exactly one terminal mark, no ". " mid-text.
  // (Decimals like $2.99 contain a period but are not sentence ends.)
  const stripped = text.replace(/\d\.\d+/g, "");
  const terminals = (stripped.match(/[.!?]/g) ?? []).length;
  if (terminals !== 1 || !/[.!?]$/.test(text) || stripped.includes(". ")) {
    throw new Error("pitch must be exactly one sentence");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
