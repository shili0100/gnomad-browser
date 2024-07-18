"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const GnomadPopulationsTable_1 = require("./GnomadPopulationsTable");
const metadata_1 = require("../../dataset-metadata/metadata");
const Variant_1 = require("../__factories__/Variant");
(0, globals_1.describe)('GnomadPopulationsTable', () => {
    globals_1.describe.each(metadata_1.allDatasetIds)('with a dataset of %s', (dataset) => {
        (0, globals_1.test)('has no unexpected changes', () => {
            const exomeGeneticAncestryGroupObjexts = (0, Variant_1.createAncestryGroupObjects)([
                { id: 'afr', value: 1 },
                { id: 'remaining', value: 2 },
                { id: 'eur', value: 4 },
                { id: 'XX', value: 8 },
                { id: 'XY', value: 16 },
            ], false);
            const genomeGeneticAncestryGroupObjexts = (0, Variant_1.createAncestryGroupObjects)([
                { id: 'afr', value: 32 },
                { id: 'remaining', value: 64 },
                { id: 'eur', value: 128 },
                { id: 'XX', value: 256 },
                { id: 'XY', value: 512 },
            ], false);
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(GnomadPopulationsTable_1.GnomadPopulationsTable, { datasetId: dataset, exomePopulations: exomeGeneticAncestryGroupObjexts, genomePopulations: genomeGeneticAncestryGroupObjexts, jointPopulations: null, showHemizygotes: false }));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
        (0, globals_1.test)('has no unexpected changes when missing genetic ancestry groups are filled in', () => {
            const jointGeneticAncestryGroupObjects = (0, Variant_1.createAncestryGroupObjects)([
                { id: 'afr', value: 1 },
                { id: 'remaining', value: 2 },
                { id: 'eur', value: 4 },
                { id: 'XX', value: 8 },
                { id: 'XY', value: 16 },
            ], true);
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(GnomadPopulationsTable_1.GnomadPopulationsTable, { datasetId: dataset, exomePopulations: [], genomePopulations: [], jointPopulations: jointGeneticAncestryGroupObjects, showHemizygotes: false }));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=GnomadPopulationsTable.spec.js.map