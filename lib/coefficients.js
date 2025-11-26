// Coefficienti REALI completi estratti dai Fogli Informativi
// Fonte: BO165A201118 (Obiettivo 65) e SF165A231115 (Soluzione Futuro)

const coefficients = {
    "Obiettivo65": {
        // Tabella C (Rata netta)
        "data": {
            // --- Fascia 54 ---
            "55.5": { coeff_rata: 0.00705198, coeff_capitale: 1.09636506 },
            "55.0": { coeff_rata: 0.00705198, coeff_capitale: 1.09636506 },
            "54.5": { coeff_rata: 0.00705198, coeff_capitale: 1.09636506 },
            "54.0": { coeff_rata: 0.00708372, coeff_capitale: 1.10120980 },
            // --- Fascia 53 ---
            "53.5": { coeff_rata: 0.00711561, coeff_capitale: 1.10607871 },
            "53.0": { coeff_rata: 0.00714767, coeff_capitale: 1.11097190 },
            // --- Fascia 52 ---
            "52.5": { coeff_rata: 0.00717988, coeff_capitale: 1.11588950 },
            "52.0": { coeff_rata: 0.00721226, coeff_capitale: 1.12083162 },
            // --- Fascia 51 ---
            "51.5": { coeff_rata: 0.00724479, coeff_capitale: 1.12579839 },
            "51.0": { coeff_rata: 0.00727749, coeff_capitale: 1.13078994 },
            // --- Fascia 50 ---
            "50.5": { coeff_rata: 0.00731035, coeff_capitale: 1.13580638 },
            "50.0": { coeff_rata: 0.00734338, coeff_capitale: 1.14084784 },
            // --- Fascia 49 ---
            "49.5": { coeff_rata: 0.00737657, coeff_capitale: 1.14591444 },
            "49.0": { coeff_rata: 0.00740993, coeff_capitale: 1.15100631 },
            // --- Fascia 48 ---
            "48.5": { coeff_rata: 0.00752281, coeff_capitale: 1.16457852 },
            "48.0": { coeff_rata: 0.00755860, coeff_capitale: 1.17002206 },
            // --- Fascia 47 ---
            "47.5": { coeff_rata: 0.00759457, coeff_capitale: 1.17549409 },
            "47.0": { coeff_rata: 0.00763073, coeff_capitale: 1.18099479 },
            // --- Fascia 46 ---
            "46.5": { coeff_rata: 0.00766708, coeff_capitale: 1.18652428 },
            "46.0": { coeff_rata: 0.00770363, coeff_capitale: 1.19208273 },
            // --- Fascia 45 ---
            "45.5": { coeff_rata: 0.00774036, coeff_capitale: 1.19767029 },
            "45.0": { coeff_rata: 0.00777729, coeff_capitale: 1.20328710 },
            // --- Fascia 44 ---
            "44.5": { coeff_rata: 0.00791235, coeff_capitale: 1.21998140 },
            "44.0": { coeff_rata: 0.00795198, coeff_capitale: 1.22598733 },
            // --- Fascia 43 ---
            "43.5": { coeff_rata: 0.00799182, coeff_capitale: 1.23202620 },
            "43.0": { coeff_rata: 0.00803188, coeff_capitale: 1.23809819 },
            // --- Fascia 42 ---
            "42.5": { coeff_rata: 0.00807216, coeff_capitale: 1.24420349 },
            "42.0": { coeff_rata: 0.00811266, coeff_capitale: 1.25034227 },
            // --- Fascia 41 ---
            "41.5": { coeff_rata: 0.00815338, coeff_capitale: 1.25651472 },
            "41.0": { coeff_rata: 0.00819433, coeff_capitale: 1.26272103 },
            // --- Fascia 40 ---
            "40.5": { coeff_rata: 0.00823550, coeff_capitale: 1.26896139 },
            "40.0": { coeff_rata: 0.00827689, coeff_capitale: 1.27523597 },
            // --- Fascia 39 ---
            "39.5": { coeff_rata: 0.00831852, coeff_capitale: 1.28154496 },
            "39.0": { coeff_rata: 0.00836037, coeff_capitale: 1.28788856 },
            // --- Fascia 38 ---
            "38.5": { coeff_rata: 0.00840245, coeff_capitale: 1.29426696 },
            "38.0": { coeff_rata: 0.00844476, coeff_capitale: 1.30068033 },
            // --- Fascia 37 ---
            "37.5": { coeff_rata: 0.00848731, coeff_capitale: 1.30712889 },
            "37.0": { coeff_rata: 0.00853009, coeff_capitale: 1.31361282 },
            // --- Fascia 36 ---
            "36.5": { coeff_rata: 0.00857310, coeff_capitale: 1.32013231 },
            "36.0": { coeff_rata: 0.00861635, coeff_capitale: 1.32668756 },
            // --- Fascia 35 ---
            "35.5": { coeff_rata: 0.00865983, coeff_capitale: 1.33327876 },
            "35.0": { coeff_rata: 0.00870356, coeff_capitale: 1.33990612 },
            // --- Fascia 34 ---
            "34.5": { coeff_rata: 0.00874752, coeff_capitale: 1.34656983 },
            "34.0": { coeff_rata: 0.00879172, coeff_capitale: 1.35327009 },
            // --- Fascia 33 ---
            "33.5": { coeff_rata: 0.00883617, coeff_capitale: 1.36000710 },
            "33.0": { coeff_rata: 0.00888086, coeff_capitale: 1.36678106 },
            // --- Fascia 32 ---
            "32.5": { coeff_rata: 0.00908868, coeff_capitale: 1.39381815 },
            "32.0": { coeff_rata: 0.00913684, coeff_capitale: 1.40109300 },
            // --- Fascia 31 ---
            "31.5": { coeff_rata: 0.00918528, coeff_capitale: 1.40840956 },
            "31.0": { coeff_rata: 0.00923400, coeff_capitale: 1.41576807 },
            // --- Fascia 30 ---
            "30.5": { coeff_rata: 0.00928300, coeff_capitale: 1.42316877 },
            "30.0": { coeff_rata: 0.00933228, coeff_capitale: 1.43061191 },
            // --- Fascia 29 ---
            "29.5": { coeff_rata: 0.00938185, coeff_capitale: 1.43809771 },
            "29.0": { coeff_rata: 0.00943169, coeff_capitale: 1.44562644 },
            // --- Fascia 28 ---
            "28.5": { coeff_rata: 0.00948183, coeff_capitale: 1.45319834 },
            "28.0": { coeff_rata: 0.00953225, coeff_capitale: 1.46081365 },
            // --- Fascia 27 ---
            "27.5": { coeff_rata: 0.00958296, coeff_capitale: 1.46847262 },
            "27.0": { coeff_rata: 0.00963396, coeff_capitale: 1.47617550 },
            // --- Fascia 26 ---
            "26.5": { coeff_rata: 0.00968525, coeff_capitale: 1.48392255 },
            "26.0": { coeff_rata: 0.00973684, coeff_capitale: 1.49171402 },
            // --- Fascia 25 ---
            "25.5": { coeff_rata: 0.00978872, coeff_capitale: 1.49955016 },
            "25.0": { coeff_rata: 0.00984090, coeff_capitale: 1.50743123 },
            // --- Fascia 24 ---
            "24.5": { coeff_rata: 0.01011248, coeff_capitale: 1.54346560 },
            "24.0": { coeff_rata: 0.01016887, coeff_capitale: 1.55195102 },
            // --- Fascia 23 ---
            "23.5": { coeff_rata: 0.01022558, coeff_capitale: 1.56048719 },
            "23.0": { coeff_rata: 0.01028264, coeff_capitale: 1.56907443 },
            // --- Fascia 22 ---
            "22.5": { coeff_rata: 0.01034004, coeff_capitale: 1.57771304 },
            "22.0": { coeff_rata: 0.01039778, coeff_capitale: 1.58640332 },
            // --- Fascia 21 ---
            "21.5": { coeff_rata: 0.01045587, coeff_capitale: 1.59514559 },
            "21.0": { coeff_rata: 0.01051430, coeff_capitale: 1.60394016 },
            // --- Fascia 20 ---
            "20.5": { coeff_rata: 0.01108987, coeff_capitale: 1.67963475 },
            "20.0": { coeff_rata: 0.01115727, coeff_capitale: 1.68970725 },
            // --- Fascia 19 ---
            "19.5": { coeff_rata: 0.01122510, coeff_capitale: 1.69984500 },
            "19.0": { coeff_rata: 0.01129338, coeff_capitale: 1.71004844 },
            // --- Fascia 18 ---
            "18.5": { coeff_rata: 0.01136210, coeff_capitale: 1.72031799 },
            "18.0": { coeff_rata: 0.01143126, coeff_capitale: 1.73065407 }
        },
        // Tabella A (Coefficienti Rimborso Anticipato per semestri di anzianità)
        "tabellaA": {
            "0": { lordo: 1.00000000, netto: 1.00000000 },
            "1": { lordo: 1.00000000, netto: 1.00000000 }, // 0.5 anni
            "2": { lordo: 1.00000000, netto: 1.00000000 }, // 1 anno
            "3": { lordo: 1.00751877, netto: 1.00657892 }, // 1.5 anni
            "4": { lordo: 1.01003756, netto: 1.00878287 }, // 2 anni
            "5": { lordo: 1.01256266, netto: 1.01099232 }, // 2.5 anni
            "6": { lordo: 1.01509406, netto: 1.01320731 }, // 3 anni
            "7": { lordo: 1.01763180, netto: 1.01542782 },
            "8": { lordo: 1.02017588, netto: 1.01765389 },
            "9": { lordo: 1.02272632, netto: 1.01988553 },
            "10": { lordo: 1.02528313, netto: 1.02212274 },
            "11": { lordo: 1.02784634, netto: 1.02436555 },
            "12": { lordo: 1.03041596, netto: 1.02661396 },
            "13": { lordo: 1.03299200, netto: 1.02886800 },
            "14": { lordo: 1.03557448, netto: 1.03112767 },
            "15": { lordo: 1.03816341, netto: 1.03339299 },
            "16": { lordo: 1.04075882, netto: 1.03566397 },
            "17": { lordo: 1.04336072, netto: 1.03794063 },
            "18": { lordo: 1.05539928, netto: 1.04847437 },
            "19": { lordo: 1.05856548, netto: 1.05124479 },
            "20": { lordo: 1.06174118, netto: 1.05402353 },
            "21": { lordo: 1.06492640, netto: 1.05681060 },
            "22": { lordo: 1.06812118, netto: 1.05960603 },
            "23": { lordo: 1.07132554, netto: 1.06240985 },
            "24": { lordo: 1.12715978, netto: 1.11126480 },
            "25": { lordo: 1.13279558, netto: 1.11619613 },
            "26": { lordo: 1.13845955, netto: 1.12115211 },
            "27": { lordo: 1.14415185, netto: 1.12613287 },
            "28": { lordo: 1.14987261, netto: 1.13113853 },
            "29": { lordo: 1.15562197, netto: 1.13616923 },
            "30": { lordo: 1.16140008, netto: 1.14122507 },
            "31": { lordo: 1.16720708, netto: 1.14630620 },
            "32": { lordo: 1.17304312, netto: 1.15141273 },
            "33": { lordo: 1.17890833, netto: 1.15654479 },
            "34": { lordo: 1.18480288, netto: 1.16170252 },
            "35": { lordo: 1.19072689, netto: 1.16688603 },
            "36": { lordo: 1.30864537, netto: 1.27006470 },
            "37": { lordo: 1.31846021, netto: 1.27865268 },
            "38": { lordo: 1.32834866, netto: 1.28730508 },
            "39": { lordo: 1.33831128, netto: 1.29602237 },
            "40": { lordo: 1.34834861, netto: 1.30480504 },
            "41": { lordo: 1.35846123, netto: 1.31365357 },
            "42": { lordo: 1.36864969, netto: 1.32256848 },
            "43": { lordo: 1.37891456, netto: 1.33155024 },
            "44": { lordo: 1.38925642, netto: 1.34059937 },
            "45": { lordo: 1.39967584, netto: 1.34971636 },
            "46": { lordo: 1.41017341, netto: 1.35890173 }
        }
    },
    "SoluzioneFuturo": {
        // Tabella C (Rata netta)
        "data": {
            "55.5": { coeff_rata: 0.00921235, coeff_capitale: 1.31843539 }, // Tolleranza over 55
            "55.0": { coeff_rata: 0.00921235, coeff_capitale: 1.31843539 }, // Tolleranza over 55
            "54.5": { coeff_rata: 0.00921235, coeff_capitale: 1.31843539 },
            "54.0": { coeff_rata: 0.00933938, coeff_capitale: 1.33620464 },
            "53.5": { coeff_rata: 0.00946830, coeff_capitale: 1.35423845 },
            "53.0": { coeff_rata: 0.00959914, coeff_capitale: 1.37254078 },
            "52.5": { coeff_rata: 0.00973193, coeff_capitale: 1.39111561 },
            "52.0": { coeff_rata: 0.00986670, coeff_capitale: 1.40996700 },
            "51.5": { coeff_rata: 0.01000347, coeff_capitale: 1.42909907 },
            "51.0": { coeff_rata: 0.01014228, coeff_capitale: 1.44851601 },
            "50.5": { coeff_rata: 0.01028315, coeff_capitale: 1.46822205 },
            "50.0": { coeff_rata: 0.01042613, coeff_capitale: 1.48822149 },
            "49.5": { coeff_rata: 0.01057123, coeff_capitale: 1.50851871 },
            "49.0": { coeff_rata: 0.01071849, coeff_capitale: 1.52911813 },
            "48.5": { coeff_rata: 0.01128369, coeff_capitale: 1.60818064 },
            "48.0": { coeff_rata: 0.01145461, coeff_capitale: 1.63208962 },
            "47.5": { coeff_rata: 0.01162829, coeff_capitale: 1.65638401 },
            "47.0": { coeff_rata: 0.01180477, coeff_capitale: 1.68107003 },
            "46.5": { coeff_rata: 0.01198409, coeff_capitale: 1.70615399 },
            "46.0": { coeff_rata: 0.01216630, coeff_capitale: 1.73164231 },
            "45.5": { coeff_rata: 0.01235145, coeff_capitale: 1.75754150 },
            "45.0": { coeff_rata: 0.01253958, coeff_capitale: 1.78385818 },
            "44.5": { coeff_rata: 0.01273075, coeff_capitale: 1.81059910 },
            "44.0": { coeff_rata: 0.01292499, coeff_capitale: 1.83777107 },
            "43.5": { coeff_rata: 0.01312237, coeff_capitale: 1.86538107 },
            "43.0": { coeff_rata: 0.01332293, coeff_capitale: 1.89343613 },
            "42.5": { coeff_rata: 0.01424509, coeff_capitale: 2.02243070 },
            "42.0": { coeff_rata: 0.01448043, coeff_capitale: 2.05535017 },
            "41.5": { coeff_rata: 0.01471985, coeff_capitale: 2.08884078 },
            "41.0": { coeff_rata: 0.01496342, coeff_capitale: 2.12291243 },
            "40.5": { coeff_rata: 0.01521122, coeff_capitale: 2.15757520 },
            "40.0": { coeff_rata: 0.01546332, coeff_capitale: 2.19283936 }
        },
        // Tabella A (Coefficienti Rimborso Anticipato per semestri di anzianità)
        "tabellaA": {
            "0": { lordo: 1.00000000, netto: 1.00000000 },
            "1": { lordo: 1.00000000, netto: 1.00000000 }, // 0.5 anni
            "2": { lordo: 1.00000000, netto: 1.00000000 }, // 1 anno
            "3": { lordo: 1.00751877, netto: 1.00657892 }, // 1.5 anni
            "4": { lordo: 1.01003756, netto: 1.00878287 }, // 2 anni
            "5": { lordo: 1.01256266, netto: 1.01099232 }, // 2.5 anni
            "6": { lordo: 1.01509406, netto: 1.01320731 }, // 3 anni
            "7": { lordo: 1.03552940, netto: 1.03108822 },
            "8": { lordo: 1.04070704, netto: 1.03561866 },
            "9": { lordo: 1.04591058, netto: 1.04017176 },
            "10": { lordo: 1.05114013, netto: 1.04474762 },
            "11": { lordo: 1.05639583, netto: 1.04934635 },
            "12": { lordo: 1.06167781, netto: 1.05396809 },
            "13": { lordo: 1.06698620, netto: 1.05861293 },
            "14": { lordo: 1.07232113, netto: 1.06328099 },
            "15": { lordo: 1.07768274, netto: 1.06797240 },
            "16": { lordo: 1.08307115, netto: 1.07268726 },
            "17": { lordo: 1.08848651, netto: 1.07742569 },
            "18": { lordo: 1.09392894, netto: 1.08218782 },
            "19": { lordo: 1.15254009, netto: 1.13347258 },
            "20": { lordo: 1.16118414, netto: 1.14103612 },
            "21": { lordo: 1.16989302, netto: 1.14865640 },
            "22": { lordo: 1.17866722, netto: 1.15633382 },
            "23": { lordo: 1.18750723, netto: 1.16406882 },
            "24": { lordo: 1.19641353, netto: 1.17186184 }
        }
    }
};

// Funzione per trovare il coefficiente corretto dalla Tabella C (rata/montante a 65)
// accetta age in float (es. 54.5)
function getCoefficients(type, age) {
    const table = coefficients[type]?.data;
    if (!table) return null;

    const fullYear = Math.floor(age);
    const decimal = age - fullYear;
    const normalizedAge = fullYear + (decimal >= 0.5 ? 0.5 : 0.0);
    
    const key = normalizedAge.toFixed(1); 
    
    // Gestione età oltre limite (usa l'ultima disponibile)
    if (!table[key]) {
        const ages = Object.keys(table).map(Number).sort((a,b)=>a-b);
        if (normalizedAge > ages[ages.length - 1]) return table[ages[ages.length - 1]]; // Usa il max
        if (normalizedAge < ages[0]) return table[ages[0]]; // Usa il min
    }

    return table[key] || null;
}

// Funzione per trovare il coefficiente di rimborso anticipato dalla Tabella A
// accetta seniority in semestri (int)
function getTabellaACoefficients(type, semesters) {
    const tableA = coefficients[type]?.tabellaA;
    if (!tableA) return null;

    // La tabella A è per anzianità in semestri (0, 1, 2, ...)
    const key = String(semesters);

    // Gestione anzianità oltre limite o non esatta
    if (!tableA[key]) {
        const availableSemesters = Object.keys(tableA).map(Number).sort((a,b)=>a-b);
        // Trova il semestre più vicino <=
        let selectedKey = availableSemesters[0];
        for (let s of availableSemesters) {
            if (s <= semesters) selectedKey = s;
            else break;
        }
        return tableA[String(selectedKey)];
    }

    return tableA[key];
}

module.exports = { getCoefficients, getTabellaACoefficients };