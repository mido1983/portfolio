import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const roots = ["src", "public", "scripts"];
const standaloneFiles = ["README.md"];
const extensions = new Set([".css", ".html", ".js", ".json", ".jsx", ".md", ".mjs", ".ts", ".tsx", ".txt", ".xml"]);
const forbidden = [
  ["doro", "shenko"].join(""),
  ["доро", "шенко"].join(""),
  ["דורו", "שנקו"].join(""),
];

async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* files(filePath);
    else if (extensions.has(path.extname(entry.name))) yield filePath;
  }
}

const candidates = [...standaloneFiles];
for (const root of roots) {
  for await (const filePath of files(root)) candidates.push(filePath);
}

const violations = [];
for (const filePath of candidates) {
  const content = (await readFile(filePath, "utf8")).toLocaleLowerCase("en");
  if (forbidden.some((value) => content.includes(value))) violations.push(filePath);
}

if (violations.length > 0) {
  console.error(`Privacy check failed in:\n${violations.join("\n")}`);
  process.exit(1);
}

console.log("Privacy check passed: no prohibited personal attribution found.");
