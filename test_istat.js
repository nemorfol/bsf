const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

// Endpoint SDMX ISTAT (Mensile, Tutti i dati, dal 2020 per brevità test)
const ISTAT_URL = "https://esploradati.istat.it/SDMXWS/rest/data/IT1,169_745_DF_DCSP_FOI1B2015_1,1.0/M......./ALL/?detail=full&startPeriod=2024-01-01";

console.log("--- TEST CHIAMATA ISTAT SDMX ---");
console.log(`URL: ${ISTAT_URL}`);

async function runTest() {
    try {
        console.log("Esecuzione richiesta (Forzatura XML)...");
        const response = await axios.get(ISTAT_URL, { 
            responseType: 'text',
            headers: {
                'Accept': 'application/vnd.sdmx.genericdata+xml;version=2.1' 
            }
        });
        
        console.log(`Risposta ricevuta! Status: ${response.status}`);
        console.log(`Lunghezza dati: ${response.data.length} caratteri`);
        
        // Anteprima XML grezzo
        console.log("\n--- ANTEPRIMA XML (Primi 500 caratteri) ---");
        console.log(response.data.substring(0, 500));
        console.log("-------------------------------------------\n");

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const jsonObj = parser.parse(response.data);

        console.log("Parsing XML completato.");

        // Funzione di ricerca ricorsiva (la stessa usata in lib/istat.js)
        function findObservations(obj, results = []) {
            if (Array.isArray(obj)) {
                obj.forEach(item => findObservations(item, results));
            } else if (typeof obj === 'object' && obj !== null) {
                if (obj['@_TIME_PERIOD'] && obj['@_OBS_VALUE']) {
                    results.push({
                        time: obj['@_TIME_PERIOD'],
                        value: obj['@_OBS_VALUE']
                    });
                }
                Object.values(obj).forEach(val => findObservations(val, results));
            }
            return results;
        }

        const observations = findObservations(jsonObj);
        console.log(`\nOsservazioni trovate: ${observations.length}`);
        
        if (observations.length > 0) {
            console.log("Ultime 5 osservazioni:");
            console.log(observations.slice(-5));
        } else {
            console.log("ATTENZIONE: Nessuna osservazione trovata! Struttura JSON:");
            // Stampa struttura di alto livello per debug
            console.log(JSON.stringify(jsonObj, null, 2).substring(0, 1000) + "...");
        }

    } catch (error) {
        console.error("ERRORE DURANTE IL TEST:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data: ${error.response.data}`);
        } else {
            console.error(error.message);
        }
    }
}

runTest();
