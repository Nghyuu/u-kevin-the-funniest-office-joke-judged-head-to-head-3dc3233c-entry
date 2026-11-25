import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entrypoint writes exactly one file: the joke line, to
// $MAKEFUN_OUTPUT_DIR/entry.txt. It writes nowhere else.
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const line =
  "I hit reply-all to ask everyone to stop hitting reply-all, and now HR wants a word about my tone.";

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry line must be 1-200 chars, got ${line.length}`);
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, line + "\n", "utf8");
// The grader collects /output as another user; 0644 keeps it readable.
chmodSync(entryPath, 0o644);
