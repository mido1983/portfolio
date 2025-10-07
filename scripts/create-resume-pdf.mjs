import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = join(process.cwd(), "public");
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const resumeStreamLines = [
  "BT",
  "/F1 20 Tf",
  "72 780 Td",
  "(Michael Doroshenko - Full Stack Web Developer) Tj",
  "0 -26 Td",
  "(Email: m0504471533@gmail.com) Tj",
  "0 -26 Td",
  "(Phone: +972-50-4471533) Tj",
  "0 -26 Td",
  "(Location: Haifa / Tel Aviv, Israel) Tj",
  "0 -26 Td",
  "(Skills: React, Next.js, Node.js, PHP, WordPress, AI tools) Tj",
  "0 -26 Td",
  "(Experience: Codere, Primis, Init, Global on Media) Tj",
  "0 -26 Td",
  "(For full details visit michael-doroshenko portfolio site.) Tj",
  "ET"
];

const streamContent = resumeStreamLines.join("\n");
const rawStreamContent = `${streamContent}\n`;
const streamBuffer = Buffer.from(rawStreamContent, "utf8");

const objects = [
  {
    id: 1,
    content: "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
  },
  {
    id: 2,
    content: "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
  },
  {
    id: 3,
    content:
      "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n"
  },
  {
    id: 4,
    content: `4 0 obj\n<< /Length ${streamBuffer.length} >>\nstream\n${rawStreamContent}endstream\nendobj\n`
  },
  {
    id: 5,
    content:
      "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
  }
];

let fileContent = "%PDF-1.4\n";
const offsets = [0];

for (const object of objects) {
  const currentOffset = Buffer.byteLength(fileContent, "utf8");
  offsets.push(currentOffset);
  fileContent += object.content;
}

const xrefOffset = Buffer.byteLength(fileContent, "utf8");
let xref = `xref\n0 ${objects.length + 1}\n`;
xref += "0000000000 65535 f \n";

for (let index = 0; index < objects.length; index += 1) {
  const offset = offsets[index + 1];
  xref += `${offset.toString().padStart(10, "0")} 00000 n \n`;
}

const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

fileContent += xref + trailer;

writeFileSync(join(outputDir, "resume.pdf"), fileContent, { encoding: "binary" });
