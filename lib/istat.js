const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

// Dati statici di fallback (FOI approssimativi medi annuali/mensili chiave)
const FALLBACK_DATA = {
    "2020-01": 102.7, "2020-06": 102.5, "2020-12": 102.3,
    "2021-01": 102.9, "2021-06": 104.2, "2021-12": 106.2,
    "2022-01": 107.7, "2022-06": 111.9, "2022-12": 118.2,
    "2023-01": 118.3, "2023-06": 118.6, "2023-12": 118.9,
    "2024-01": 119.3, "2024-06": 119.9, "2024-10": 120.1 
};

let foiCache = null;
let lastFetch = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 ore

// Endpoint SDMX ISTAT corretto per FOI (senza tabacchi)
// Query: Monthly (M), All dimensions wildcards, from 2000-01-01
const ISTAT_URL = "https://esploradati.istat.it/SDMXWS/rest/data/IT1,169_745_DF_DCSP_FOI1B2015_1,1.0/M......./ALL/?detail=full&startPeriod=2000-01-01";

// Funzione ricorsiva per trovare tutte le osservazioni nell'XML
// Indipendentemente dalla struttura (GenericData, StructureSpecificData, annidamento Series)
function findObservations(obj, results = []) {
    if (Array.isArray(obj)) {
        obj.forEach(item => findObservations(item, results));
    } else if (typeof obj === 'object' && obj !== null) {
        // Controllo se è un nodo osservazione (ha TIME_PERIOD e OBS_VALUE)
        // fast-xml-parser usa il prefisso @_ per gli attributi
        if (obj['@_TIME_PERIOD'] && obj['@_OBS_VALUE']) {
            results.push({
                time: obj['@_TIME_PERIOD'],
                value: parseFloat(obj['@_OBS_VALUE'])
            });
        }
        // Continua a cercare nei figli
        Object.values(obj).forEach(val => findObservations(val, results));
    }
    return results;
}

async function fetchIstatData() {
    if (foiCache && (Date.now() - lastFetch < CACHE_DURATION)) {
        console.log("ISTAT: Uso dati in cache");
        return foiCache;
    }

    console.log("ISTAT: Scaricamento nuovi dati SDMX...");
    try {
        const response = await axios.get(ISTAT_URL, {
            headers: { 'Accept': 'application/vnd.sdmx.genericdata+xml;version=2.1' }
        });
        
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const jsonObj = parser.parse(response.data);

        // Logica di estrazione specifica per SDMX Generic Data v2.1
        const dataMap = {};
        let obsCount = 0;

        // Helper per trovare ricorsivamente le Generic Series
        function findSeries(obj, seriesList = []) {
            if (Array.isArray(obj)) {
                obj.forEach(item => findSeries(item, seriesList));
            } else if (typeof obj === 'object' && obj !== null) {
                if (obj['generic:Obs']) {
                    seriesList.push(obj);
                } else {
                    Object.values(obj).forEach(val => findSeries(val, seriesList));
                }
            }
            return seriesList;
        }

        const seriesList = findSeries(jsonObj);

        seriesList.forEach(series => {
            const obsList = Array.isArray(series['generic:Obs']) ? series['generic:Obs'] : [series['generic:Obs']];
            
            obsList.forEach(obs => {
                // Estrazione TIME_PERIOD
                // Può essere generic:ObsDimension o un attributo diretto in altre versioni, 
                // ma in Generic v2.1 è solitamente generic:ObsDimension con id="TIME_PERIOD"
                let time = null;
                if (obs['generic:ObsDimension']) {
                    const dims = Array.isArray(obs['generic:ObsDimension']) ? obs['generic:ObsDimension'] : [obs['generic:ObsDimension']];
                    const timeDim = dims.find(d => d['@_id'] === 'TIME_PERIOD');
                    if (timeDim) time = timeDim['@_value'];
                }

                // Estrazione Value
                let value = null;
                if (obs['generic:ObsValue']) {
                    value = parseFloat(obs['generic:ObsValue']['@_value']);
                }

                if (time && !isNaN(value)) {
                    dataMap[time] = value;
                    obsCount++;
                }
            });
        });

        if (obsCount === 0) {
            throw new Error("Nessuna osservazione trovata (SDMX Generic Parsing)");
        }

        foiCache = dataMap;
        lastFetch = Date.now();
        
        const keys = Object.keys(dataMap).sort();
        const lastKey = keys[keys.length - 1];
        console.log(`ISTAT: Dati aggiornati. Totale mesi: ${obsCount}. Ultimo: ${lastKey} = ${dataMap[lastKey]}`);

        return dataMap;

    } catch (error) {
        console.error("ISTAT Fetch Error:", error.message);
        console.log("ISTAT: Attivazione fallback dati storici statici.");
        foiCache = FALLBACK_DATA; 
        return FALLBACK_DATA;
    }
}

function getFOI(date) {
    if (!foiCache) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const key = `${y}-${m}`;
    return foiCache[key];
}

function getLatestFOI() {
    if (!foiCache) return null;
    const keys = Object.keys(foiCache).sort();
    if (keys.length === 0) return null;
    const lastKey = keys[keys.length - 1];
    return { date: lastKey, value: foiCache[lastKey] };
}

function calculateInflationCoeff(subDate) {
    if (!foiCache) return 1;

    const baseDate = new Date(subDate);
    baseDate.setMonth(baseDate.getMonth() - 3); // -3 mesi
    const baseIndex = getFOI(baseDate);

    const latest = getLatestFOI();
    
    if (!baseIndex || !latest) return 1;

    let coeff = latest.value / baseIndex;
    return Math.max(1, coeff);
}

module.exports = { fetchIstatData, getFOI, calculateInflationCoeff, getLatestFOI };