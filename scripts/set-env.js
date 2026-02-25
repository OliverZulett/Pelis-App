const fs = require("fs");
const path = require("path");

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL || "https://api.themoviedb.org/3";

if (!apiKey) {
  console.error("ERROR: API_KEY environment variable is not defined.");
  process.exit(1);
}

const content = `export const environment = {
  production: true,
  api_key: '${apiKey}',
  api_url: '${apiUrl}',
};
`;

const targetDir = path.resolve(__dirname, "../src/environments");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetPath = path.join(targetDir, "environment.prod.ts");
fs.writeFileSync(targetPath, content);
console.log("Production environment file generated successfully");
