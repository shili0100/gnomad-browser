"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopulationsInDataset = exports.populationsInDataset = exports.populationName = exports.GNOMAD_POPULATION_NAMES = void 0;
const missingContent_1 = require("../src/missingContent");
const metadata_1 = require("./metadata");
exports.GNOMAD_POPULATION_NAMES = {
    afr: 'African/African American',
    ami: 'Amish',
    amr: 'Admixed American',
    asj: 'Ashkenazi Jewish',
    eas: 'East Asian',
    mid: 'Middle Eastern',
    eur: 'European',
    nfe: 'European (non-Finnish)',
    fin: 'European (Finnish)',
    oth: 'Remaining individuals',
    sas: 'South Asian',
    rmi: 'Remaining',
    remaining: 'Remaining',
    // EAS subpopulations
    eas_jpn: 'Japanese',
    eas_kor: 'Korean',
    eas_oea: 'Other East Asian',
    // NFE subpopulations
    nfe_bgr: 'Bulgarian',
    nfe_est: 'Estonian',
    nfe_nwe: 'North-western European',
    nfe_onf: 'Other non-Finnish European',
    nfe_seu: 'Southern European',
    nfe_swe: 'Swedish',
};
const populationName = (populationId) => (0, missingContent_1.textOrMissingTextWarning)('genetic ancestry group name', exports.GNOMAD_POPULATION_NAMES, populationId);
exports.populationName = populationName;
const ExACPopulations = ['sas', 'afr', 'amr', 'eas', 'fin', 'nfe', 'remaining'];
const v2Populations = ['amr', 'nfe', 'afr', 'asj', 'eas', 'fin', 'sas', 'oth'];
const v3Populations = [
    'nfe',
    'fin',
    'amr',
    'ami',
    'eas',
    'mid',
    'afr',
    'sas',
    'asj',
    'oth',
];
const v4Populations = [
    'afr',
    'amr',
    'asj',
    'eas',
    'fin',
    'mid',
    'nfe',
    'ami', // v4 does not directly include amish, but v3 does and v4 genomes are from v3
    'sas',
    'remaining',
];
exports.populationsInDataset = {
    ExAC: ExACPopulations,
    v2: v2Populations,
    v3: v3Populations,
    v4: v4Populations,
    default: [],
};
const getPopulationsInDataset = (datasetId) => {
    const topLeveDataset = (0, metadata_1.getTopLevelDataset)(datasetId);
    return exports.populationsInDataset[topLeveDataset];
};
exports.getPopulationsInDataset = getPopulationsInDataset;
//# sourceMappingURL=gnomadPopulations.js.map