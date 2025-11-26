const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const { getCoefficients, getTabellaACoefficients } = require('./lib/coefficients');
const { fetchIstatData, calculateInflationCoeff } = require('./lib/istat');

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 3000;

// Avvio Server e Fetch Dati ISTAT
app.listen(port, async () => {
    console.log(`Server simulatore avviato su http://localhost:${port}`);
    // Tentativo fetch, ma non bloccante
    try {
        await fetchIstatData(); 
    } catch (e) {
        console.log("ISTAT Warning: Dati non disponibili, uso fallback.");
    }
});

app.use(express.static('public'));
app.use(express.json());

// Helper: Calcola età con precisione semestrale (es. 54.5)
function calculateAge(birthDate, refDate = new Date()) {
    const birth = new Date(birthDate);
    const ref = new Date(refDate);
    
    let age = ref.getFullYear() - birth.getFullYear();
    const m = ref.getMonth() - birth.getMonth();
    const d = ref.getDate() - birth.getDate();

    // Correzione se il mese corrente è precedente al mese di nascita
    if (m < 0 || (m === 0 && d < 0)) {
        age--;
    }

    // Calcolo mesi residui dall'ultimo compleanno
    let monthsSinceBirthday = (ref.getMonth() - birth.getMonth() + 12) % 12;
    if (d < 0) {
        monthsSinceBirthday--;
    }
    // Gestione caso negativo (es. compleanno domani)
    if (monthsSinceBirthday < 0) monthsSinceBirthday += 12;

    // Aggiungi 0.5 se passati 6 mesi
    return age + (monthsSinceBirthday >= 6 ? 0.5 : 0.0);
}

// Helper: Calcola Semestri Anzianità
function calculateSemesters(startDate, endDate = new Date()) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let totalMonths = years * 12 + months;
    if (endDate.getDate() < startDate.getDate()) totalMonths--; // Non ha finito il mese
    return Math.floor(totalMonths / 6);
}

// Helper Parsing Date Robusto
function parseItalianDate(dateStr) {
    if (!dateStr) return null;
    if (typeof dateStr === 'number') {
        // Excel serial date
        return new Date((dateStr - (25567 + 2)) * 86400 * 1000);
    }
    if (typeof dateStr !== 'string') return null;

    dateStr = dateStr.trim().toLowerCase();

    // Caso 1: DD/MM/YYYY
    if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        const [d, m, y] = dateStr.split('/');
        return new Date(y, m - 1, d);
    }
    
    // Caso 2: "30 mar 2046" (con mesi italiani)
    const months = {
        'gen': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'mag': 4, 'giu': 5,
        'lug': 6, 'ago': 7, 'set': 8, 'ott': 9, 'nov': 10, 'dic': 11
    };
    
    // Regex per "30 mar 2046" o "30-mar-2046"
    const textualMatch = dateStr.match(/^(\d{1,2})[\s\/\-]([a-z]{3})[\s\/\-](\d{4})$/);
    if (textualMatch) {
        const day = parseInt(textualMatch[1]);
        const monthStr = textualMatch[2];
        const year = parseInt(textualMatch[3]);
        if (months.hasOwnProperty(monthStr)) {
            return new Date(year, months[monthStr], day);
        }
    }

    // Fallback standard
    const standardDate = new Date(dateStr);
    if (!isNaN(standardDate.getTime())) return standardDate;

    return null;
}

// API: Simulazione Manuale
app.post('/api/simulate', async (req, res) => { 
    const { type, birthDate, amount, subscriptionDate } = req.body;
    
    if (!type || !birthDate || !amount) {
        return res.status(400).json({ error: 'Dati mancanti' });
    }

    const subDate = subscriptionDate ? new Date(subscriptionDate) : new Date();
    const bDate = new Date(birthDate);
    const ageAtSub = calculateAge(bDate, subDate);
    
    const coeffs = getCoefficients(type, ageAtSub);
    
    if (!coeffs) {
        return res.json({ 
            success: false, 
            message: `Nessun coefficiente trovato per età ${ageAtSub} (Anni completi o +6 mesi). Verificare che l'età rientri nei limiti del prodotto.` 
        });
    }

    const montante65 = amount * coeffs.coeff_capitale;
    const rataMensile = amount * coeffs.coeff_rata; 

    const payoutStartDate = new Date(bDate);
    payoutStartDate.setFullYear(payoutStartDate.getFullYear() + 65);
    payoutStartDate.setMonth(payoutStartDate.getMonth() + 1);

    // 1. Riscatto Tabellare
    const semesters = calculateSemesters(subDate);
    const coeffA = getTabellaACoefficients(type, semesters);
    const valoreTabellare = coeffA ? (amount * coeffA.netto) : amount;

    // 2. Riscatto Inflazione (FOI)
    const coeffInflazione = calculateInflationCoeff(subDate);
    const valoreInflazionato = amount * coeffInflazione;

    // 3. Max(Tabellare, Inflazione)
    const valoreRiscatto = Math.max(valoreTabellare, valoreInflazionato);
    const isInflationAdjusted = valoreInflazionato > valoreTabellare;

    res.json({
        success: true,
        data: {
            ageAtSubscription: ageAtSub,
            montante65: montante65.toFixed(2),
            rataMensile: rataMensile.toFixed(2),
            valore_nominale: amount,
            valore_riscatto_attuale: valoreRiscatto.toFixed(2),
            is_inflation_adjusted: isInflationAdjusted, 
            valore_tabellare: valoreTabellare.toFixed(2),
            valore_inflazionato: valoreInflazionato.toFixed(2), 
            data_inizio_rendita: payoutStartDate.toISOString(),
            scadenza: new Date(new Date(birthDate).setFullYear(new Date(birthDate).getFullYear() + 80)).toLocaleDateString()
        }
    });
});

// API: Upload Excel
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nessun file caricato.');
    }

    const userBirthDateStr = req.body.birthDate;
    if (!userBirthDateStr) {
        return res.status(400).json({ error: "La data di nascita dell'intestatario è obbligatoria per l'analisi Excel." });
    }
    const userBirthDate = new Date(userBirthDateStr);

    // Refresh dati ISTAT se necessario (non bloccante qui)
    // await fetchIstatData(); 

    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        
        const results = data
            .filter(row => {
                const tipo = (row['TIPOLOGIA'] || '').toUpperCase();
                return tipo.includes('OBIETTIVO 65') || tipo.includes('SOLUZIONE FUTURO');
            })
            .map(row => {
                const tipoUpper = (row['TIPOLOGIA'] || '').toUpperCase();
                
                let subDate = parseItalianDate(row['DATA SOTTOSCRIZIONE']);
                if (!subDate) subDate = new Date(); 

                const ageAtSub = calculateAge(userBirthDate, subDate);
                
                let typeKey = "Obiettivo65"; 
                if (tipoUpper.includes('FUTURO')) typeKey = "SoluzioneFuturo";

                const amountStr = row['VALORE NOMINALE'];
                let amount = 0;
                if (typeof amountStr === 'number') {
                    amount = amountStr;
                } else {
                    const cleanStr = String(amountStr).replace(/[^0-9,-]/g, '');
                    amount = parseFloat(cleanStr.replace(',', '.'));
                }

                const coeffs = getCoefficients(typeKey, ageAtSub);
                
                const payoutStartDate = new Date(userBirthDate);
                payoutStartDate.setFullYear(payoutStartDate.getFullYear() + 65);
                payoutStartDate.setMonth(payoutStartDate.getMonth() + 1);

                // 1. Riscatto Tabellare
                const semesters = calculateSemesters(subDate);
                const coeffA = getTabellaACoefficients(typeKey, semesters);
                const valoreTabellare = coeffA ? (amount * coeffA.netto) : amount;

                // 2. Riscatto Inflazione (FOI)
                const coeffInflazione = calculateInflationCoeff(subDate);
                const valoreInflazionato = amount * coeffInflazione;

                // 3. Max(Tabellare, Inflazione)
                const valoreRiscatto = Math.max(valoreTabellare, valoreInflazionato);
                const isInflationAdjusted = valoreInflazionato > valoreTabellare;

                return {
                    ...row,
                    tipo_normalizzato: typeKey,
                    stima_eta_sottoscrizione: ageAtSub,
                    stima_nascita: userBirthDate.toLocaleDateString(),
                    valore_nominale: amount,
                    valore_riscatto_attuale: valoreRiscatto.toFixed(2),
                    is_inflation_adjusted: isInflationAdjusted,
                    stima_montante_65: coeffs ? (amount * coeffs.coeff_capitale).toFixed(2) : "N/A",
                    stima_rata: coeffs ? (amount * coeffs.coeff_rata).toFixed(2) : "N/A",
                    data_inizio_rendita: payoutStartDate.toISOString(),
                    note: coeffs ? "" : `Età ${ageAtSub} non tabellata`
                };
            });

        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).send('Errore processamento file.');
    }
});