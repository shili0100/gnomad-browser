"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const PopulationsTable_1 = require("./PopulationsTable");
const LOCAL_ANCESTRY_NAMES = {
    african: 'African',
    amerindigenous: 'Amerindigenous',
    european: 'European',
};
const addPopulationNames = (populations) => {
    return populations.map((pop) => (Object.assign(Object.assign({}, pop), { 
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        name: gnomadPopulations_1.GNOMAD_POPULATION_NAMES[pop.id] || pop.id, subpopulations: pop.subpopulations.map((subPop) => (Object.assign(Object.assign({}, subPop), { 
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            name: LOCAL_ANCESTRY_NAMES[subPop.id.split('_')[1]] || subPop.id }))) })));
};
const groupPopulations = (populations) => {
    const populationsById = {};
    populations.forEach((pop) => {
        const popId = pop.id.split('_')[0];
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!populationsById[popId]) {
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            populationsById[popId] = {
                id: popId,
                ac: 0,
                an: 0,
                subpopulations: [],
            };
        }
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        populationsById[popId].ac += pop.ac;
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        populationsById[popId].an += pop.an;
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        populationsById[popId].subpopulations.push(pop);
    });
    return Object.values(populationsById);
};
const LocalAncestryPopulationsTable = ({ populations }) => {
    const renderedPopulations = addPopulationNames(groupPopulations(populations));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(PopulationsTable_1.PopulationsTable, { populations: renderedPopulations, initiallyExpandRows: true, showHemizygotes: false, showHomozygotes: false }),
        react_1.default.createElement("p", null,
            react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
            " Local ancestry is not available for all gnomAD genetic ancestry groups.")));
};
exports.default = LocalAncestryPopulationsTable;
//# sourceMappingURL=LocalAncestryPopulationsTable.js.map