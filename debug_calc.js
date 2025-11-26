const XLSX = require('xlsx');
const { getCoefficients } = require('./lib/coefficients');

const filePath = 'F:\\sviluppo\\bsf\\utils\\xls\\RPOL_PatrimonioBuoni.xlsx';
const birthDate = new Date('1981-03-30'); // Data di nascita fornita

// Helper Parsing Date
function parseItalianDate(dateStr) {
    if (!dateStr) return null;
    if (typeof dateStr === 'number') return new Date((dateStr - (25567 + 2)) * 86400 * 1000);
    if (typeof dateStr !== 'string') return null;
    dateStr = dateStr.trim().toLowerCase();
    if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        const [d, m, y] = dateStr.split('/');
        return new Date(y, m - 1, d);
    }
    const months = {'gen':0, 'feb':1, 'mar':2, 'apr':3, 'mag':4, 'giu':5, 'lug':6, 'ago':7, 'set':8, 'ott':9, 'nov':10, 'dic':11};
    const match = dateStr.match(/^(\d{1,2})[\s\/-]([a-z]{3})[\s\/-](\d{4})$/);
    if (match && months.hasOwnProperty(match[2])) return new Date(match[3], months[match[2]], match[1]);
    const std = new Date(dateStr);
    return isNaN(std.getTime()) ? null : std;
}

// Helper Age (Semestrale)
function calculateAge(birth, sub) {
    let age = sub.getFullYear() - birth.getFullYear();
    const m = sub.getMonth() - birth.getMonth();
    const d = sub.getDate() - birth.getDate();
    if (m < 0 || (m === 0 && d < 0)) age--;
    let monthsSince = (sub.getMonth() - birth.getMonth() + 12) % 12;
    if (d < 0) monthsSince--;
    if (monthsSince < 0) monthsSince += 12;
    return age + (monthsSince >= 6 ? 0.5 : 0.0);
}

try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log(`Analisi per nato il: ${birthDate.toLocaleDateString()}`);
    console.log("---------------------------------------------------");
    
    let totalRata = 0;
    let count = 0;

    data.forEach((row, idx) => {
        const tipo = (row['TIPOLOGIA'] || '').toUpperCase();
        if (!tipo.includes('OBIETTIVO 65') && !tipo.includes('SOLUZIONE FUTURO')) return;

        const subDate = parseItalianDate(row['DATA SOTTOSCRIZIONE']) || new Date();
        const amountStr = row['VALORE NOMINALE'];
        let amount = 0;
        if (typeof amountStr === 'number') amount = amountStr;
        else amount = parseFloat(String(amountStr).replace(/[^0-9,-]/g, '').replace(',', '.'));

        const age = calculateAge(birthDate, subDate);
        let typeKey = tipo.includes('FUTURO') ? "SoluzioneFuturo" : "Obiettivo65";
        const coeffs = getCoefficients(typeKey, age);

        if (!coeffs) {
            console.log(`[ERR] Riga ${idx+2}: Coefficiente mancante per Età ${age} (${tipo})`);
            return;
        }

        const rata = amount * coeffs.coeff_rata;
        totalRata += rata;
        count++;

        console.log(`Riga ${idx+2} | ${tipo.substr(0, 15)} | Sott: ${subDate.toLocaleDateString()} | Età: ${age} | Coeff: ${coeffs.coeff_rata} | Inv: ${amount}€ -> Rata: ${rata.toFixed(2)}€`);
    });

    console.log("---------------------------------------------------");
    console.log(`TOTALE RATE CALCOLATO: ${totalRata.toFixed(2)} €`);
    console.log(`Numero Buoni: ${count}`);

} catch (e) {
    console.error(e);
}
