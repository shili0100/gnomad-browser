"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PopulationsTable_1 = require("../VariantPage/PopulationsTable");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const nestPopulations = (populations) => {
    const popIndices = [];
    const subpopulations = {};
    for (let i = 0; i < populations.length; i += 1) {
        const pop = populations[i];
        // IDs are one of:
        // * pop
        // * pop_subpop
        // * pop_sex
        // * sex
        const divisions = pop.id.split('_');
        if (divisions.length === 1) {
            popIndices.push(i);
        }
        else {
            const parentPop = divisions[0];
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (subpopulations[parentPop] === undefined) {
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                subpopulations[parentPop] = [Object.assign({}, pop)];
            }
            else {
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                subpopulations[parentPop].push(Object.assign({}, pop));
            }
        }
    }
    return popIndices.map((index) => {
        const pop = populations[index];
        return Object.assign(Object.assign({}, pop), { 
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            subpopulations: subpopulations[pop.id] });
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
const StructuralVariantPopulationsTable = ({ variant }) => {
    const populations = nestPopulations(addPopulationNames(variant.populations));
    const columnLabels = variant.type === 'MCNV'
        ? {
            ac: 'Non-diploid Samples',
            an: 'Total Samples',
            af: 'Non-diploid CN Frequency',
        }
        : undefined;
    return (react_1.default.createElement(PopulationsTable_1.PopulationsTable, { columnLabels: columnLabels, populations: populations, showHomozygotes: variant.type !== 'MCNV' && variant.chrom !== 'Y', showHemizygotes: variant.type !== 'MCNV' && (variant.chrom === 'X' || variant.chrom === 'Y') }));
};
exports.default = StructuralVariantPopulationsTable;
//# sourceMappingURL=StructuralVariantPopulationsTable.js.map