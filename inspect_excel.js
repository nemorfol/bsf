const XLSX = require('xlsx');
const path = 'F:\\sviluppo\\bsf\\utils\\xls\\RPOL_PatrimonioBuoni.xlsx';

try {
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    console.log('Headers:', data[0]);
    console.log('First row of data:', data[1]);
} catch (error) {
    console.error('Error reading Excel file:', error.message);
}
