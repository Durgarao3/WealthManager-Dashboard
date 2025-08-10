const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

// Path to your Excel file
const excelFilePath = "C:\\Users\\LENOVO\\Downloads\\Sample Portfolio Dataset for Assignment.xlsx";

// Load the workbook
const workbook = xlsx.readFile(excelFilePath);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// Save to portfolio.json in backend/data folder
const outputPath = path.join(__dirname, "data", "portfolio.json");
fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

console.log(`✅ Conversion complete! JSON saved at ${outputPath}`);
