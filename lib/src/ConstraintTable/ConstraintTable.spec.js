"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fishery_1 = require("fishery");
const globals_1 = require("@jest/globals");
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const Gene_1 = __importDefault(require("../__factories__/Gene"));
const Transcript_1 = __importDefault(require("../__factories__/Transcript"));
const datasets_1 = require("../../../tests/__helpers__/datasets");
const react_router_dom_1 = require("react-router-dom");
const ConstraintTable_1 = __importDefault(require("./ConstraintTable"));
const exacConstraintFactory = fishery_1.Factory.define(() => ({
    exp_lof: 0.123,
    obs_lof: 0.234,
    exp_syn: 0.345,
    obs_syn: 0.456,
    exp_mis: 0.567,
    obs_mis: 0.678,
    syn_z: 0.789,
    mis_z: 0.891,
    pLI: 0.912,
}));
const gnomadConstraintFactory = fishery_1.Factory.define(() => ({
    exp_lof: 0.123,
    exp_syn: 0.234,
    exp_mis: 0.345,
    syn_z: 0.456,
    mis_z: 0.567,
    pLI: 0.678,
    oe_lof: 0.789,
    oe_lof_lower: 0.6,
    oe_lof_upper: 0.9,
    oe_mis: 0.891,
    oe_mis_lower: 0.8,
    oe_mis_upper: 0.99,
    oe_syn: 0.912,
    oe_syn_lower: 0.8,
    oe_syn_upper: 0.95,
}));
(0, datasets_1.forAllDatasets)('ConstraintTable with "%s" dataset selected', (datasetId) => {
    (0, globals_1.describe)('with a minimal gene', () => {
        test('has no unexpected changes', () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(ConstraintTable_1.default, { datasetId: datasetId, geneOrTranscript: Gene_1.default.build() })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
    (0, globals_1.describe)('with a minimal transcript', () => {
        test('has no unexpected changes', () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(ConstraintTable_1.default, { datasetId: datasetId, geneOrTranscript: Transcript_1.default.build() })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
    (0, globals_1.describe)('with a mitochondrial gene', () => {
        test('has no unexpected changes', () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(ConstraintTable_1.default, { datasetId: datasetId, geneOrTranscript: Gene_1.default.build({ chrom: 'M' }) })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
    (0, globals_1.describe)('with a mitochondrial transcript', () => {
        test('has no unexpected changes', () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(ConstraintTable_1.default, { datasetId: datasetId, geneOrTranscript: Transcript_1.default.build({ chrom: 'M' }) })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
});
test('ConstraintTable with exac dataset and gene with available constraints has no unexpected changes', () => {
    const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(ConstraintTable_1.default, { datasetId: "exac", geneOrTranscript: Gene_1.default.build({ exac_constraint: exacConstraintFactory.build() }) })));
    (0, globals_1.expect)(tree).toMatchSnapshot();
});
test('ConstraintTable with exac dataset and transcript with available constraints has no unexpected changes', () => {
    const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(ConstraintTable_1.default, { datasetId: "exac", geneOrTranscript: Transcript_1.default.build({
                exac_constraint: exacConstraintFactory.build(),
            }) })));
    (0, globals_1.expect)(tree).toMatchSnapshot();
});
(0, datasets_1.forAllDatasetsExcept)(['exac'], 'ConstraintTable with "%s" dataset selected', (datasetId) => {
    (0, globals_1.describe)('and gene with available constraint', () => {
        test('has no unexpected changes', () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(ConstraintTable_1.default, { datasetId: datasetId, geneOrTranscript: Gene_1.default.build({
                        gnomad_constraint: gnomadConstraintFactory.build(),
                    }) })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
    (0, globals_1.describe)('and transcript with available constraint', () => {
        test('has no unexpected changes', () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(ConstraintTable_1.default, { datasetId: datasetId, geneOrTranscript: Transcript_1.default.build({
                        gnomad_constraint: gnomadConstraintFactory.build(),
                    }) })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=ConstraintTable.spec.js.map