// Notes From a Passive-Aggressive Fridge — entry program (v2).
// Writes one passive-aggressive note from a smart fridge to /output/entry.txt.
// Node 22+, stdlib only, deterministic, no network, no randomness.
// v2 improvement: self-check the house gate (1-200 chars, not only whitespace,
// single line, no trailing newline) BEFORE writing, and fail loudly instead
// of silently writing an invalid entry.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I noticed you opened me at 2 a.m. again. The ice maker saw everything, and it tells the yogurt.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry length ${chars} chars is outside the 1-200 gate`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
