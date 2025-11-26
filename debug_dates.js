const XLSX = require('xlsx');

// Simulazione dati problematici
const testDates = ["30 mar 2046", "26/01/2021"];

console.log("Test parsing date:");
testDates.forEach(d => {
    const parsed = new Date(d);
    console.log(`"${d}" -> ${parsed} (Is Valid? ${!isNaN(parsed.getTime())})`);
});

// Carichiamo l'excel reale per vedere i dati grezzi
try {
    const workbook = XLSX.readFile('F:\\sviluppo\\bsf\\utils\\xls\\RPOL_PatrimonioBuoni.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    const row = data.find(r => r['TIPOLOGIA'] && r['TIPOLOGIA'].includes('OBIETTIVO 65'));
    
    if (row) {
        console.log("\nRiga Excel trovata:");
        console.log("SCADENZA (raw):", row['SCADENZA'], "Type:", typeof row['SCADENZA']);
        console.log("DATA SOTTOSCRIZIONE (raw):", row['DATA SOTTOSCRIZIONE']);
        
        const parsedScadenza = new Date(row['SCADENZA']);
        console.log("Parsed SCADENZA:", parsedScadenza);
    } else {
        console.log("Nessuna riga Obiettivo 65 trovata.");
    }
} catch (e) {
    console.error(e);
}
