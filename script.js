import fs from "fs";
import morkParser from "mork-parser";
import path from "path";

// Nacitanie nazvu vstupneho suboru
const inputFilePath = process.argv[2];

if (!inputFilePath) {
  console.error("Zadaj nazov suboru ako argument");
  process.exit(1);
}

const inputFileName = path.basename(inputFilePath, path.extname(inputFilePath));

// Nastavenie nazvu vystupneho suboru
const timestamp = new Date();
const formattedDate = `${timestamp.getDate().toString().padStart(2, "0")}-${(
  timestamp.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${timestamp.getFullYear()}-${timestamp
  .getHours()
  .toString()
  .padStart(2, "0")}-${timestamp
  .getMinutes()
  .toString()
  .padStart(2, "0")}-${timestamp.getSeconds().toString().padStart(2, "0")}`;

const outputFilePath = `${inputFileName}-output-${formattedDate}.json`;

// Konverzia Mork do JSON
function convert(src, dst) {
  // Nacitanie vstupneho suboru
  fs.readFile(src, "utf-8", (err, data) => {
    if (err) {
      console.error("Chyba pri citani suboru:", err);
      process.exit(1);
    }

    // Konverzia
    const mork = new morkParser();
    const records = mork.parse(data);

    // Ulozenie JSON
    fs.writeFileSync(dst, JSON.stringify(records, " ", 2));
  });
}

convert(inputFilePath, outputFilePath);
