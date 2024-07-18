"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const CNVPopulationsTable_1 = require("./CNVPopulationsTable");
const nestPopulations = (populations) => {
    const popIndices = [];
    const subpopulations = {};
    for (let i = 0; i < populations.length; i += 1) {
        const pop = populations[i];
        const divisions = pop.id.split('_');
        if (divisions.length === 1) {
            popIndices.push(i);
        }
        else {
            const parentPop = divisions[0];
            if (subpopulations[parentPop] === undefined) {
                subpopulations[parentPop] = [Object.assign({}, pop)];
            }
            else {
                subpopulations[parentPop].push(Object.assign({}, pop));
            }
        }
    }
    return popIndices.map((index) => {
        const pop = populations[index];
        return Object.assign(Object.assign({}, pop), { subpopulations: subpopulations[pop.id] });
    });
};
const addPopulationNames = (populations) => {
    return populations.map((pop) => {
        let name;
        if (pop.id === 'XX' || pop.id.endsWith('_XX')) {
            name = 'XX';
        }
        else if (pop.id === 'XY' || pop.id.endsWith('_XY')) {
            name = 'XY';
        }
        else {
            name = (0, gnomadPopulations_1.populationName)(pop.id);
        }
        return Object.assign(Object.assign({}, pop), { name });
    });
};
const CopyNumberVariantPopulationsTable = ({ variant }) => {
    const populations = nestPopulations(addPopulationNames(variant.populations));
    const columnLabels = {
        sc: 'Site Count',
        sn: 'Site Number',
        sf: 'Site Frequency',
    };
    return react_1.default.createElement(CNVPopulationsTable_1.CNVPopulationsTable, { columnLabels: columnLabels, populations: populations, variant: variant });
};
exports.default = CopyNumberVariantPopulationsTable;
//# sourceMappingURL=CopyNumberVariantPopulationsTable.js.map