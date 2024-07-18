"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../dataset-metadata/gnomadPopulations");
const FILTER_DISPLAY_MAPPING = {
    AC0: {
        name: 'AC0',
        description: 'Allele count is zero due to removal of low quality genotypes (GQ < 20; DP < 10; and AB < 0.2 for het calls) at this site',
    },
    AS_VQSR: {
        name: 'AS VSQR',
        description: 'Failed allele-specific VQSR filter',
    },
    InbreedingCoeff: {
        name: 'Inbreeding Coeff',
        description: 'Has an inbreeding coefficient < -0.3',
    },
    RF: {
        name: 'RF',
        description: 'Failed random forest filters',
    },
    discrepant_frequencies: {
        name: 'Discrepant frequencies',
        description: 'Has discrepant frequencies between genomes and exomes',
    },
    not_called_in_exomes: {
        name: 'Not in exomes',
        description: 'This variant was not called in the gnomAD exome callset; no exome samples had any genotype call (no reference or alternate calls)',
    },
    not_called_in_genomes: {
        name: 'Not in genomes',
        description: 'This variant was not called in the gnomAD genome callset; no genome samples had any genotype call (no reference or alternate calls)',
    },
};
const renderFilterDescription = (filter, data) => {
    let description = FILTER_DISPLAY_MAPPING[filter].description;
    if (filter === 'discrepant_frequencies') {
        description = description.concat(`, with a ${data.testName === 'cochran_mantel_haenszel_test'
            ? 'Cochran Mantel Haenszel test'
            : // @ts-ignore
                `Contingency Table test on ${gnomadPopulations_1.GNOMAD_POPULATION_NAMES[data.geneticAncestry]}`} p-value of ${data.pValue.toExponential(2)}`);
    }
    return description;
};
const QCFilter = ({ filter, data }) => (react_1.default.createElement(ui_1.Badge, { level: "warning", tooltip: renderFilterDescription(filter, data) }, FILTER_DISPLAY_MAPPING[filter].name));
exports.default = QCFilter;
//# sourceMappingURL=QCFilter.js.map