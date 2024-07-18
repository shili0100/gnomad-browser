"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const datasets_1 = require("../../tests/__helpers__/datasets");
const react_router_dom_1 = require("react-router-dom");
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const history_1 = require("history");
const Searchbox_1 = __importDefault(require("./Searchbox"));
(0, globals_1.describe)('Searchbox', () => {
    (0, globals_1.test)('has no unexpected changes when no dataset specified', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(Searchbox_1.default, null)));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
    (0, datasets_1.forAllDatasets)('with selected dataset %s', (datasetId) => {
        (0, globals_1.test)('has no unexpected changes', () => {
            const history = (0, history_1.createBrowserHistory)();
            history.push(`/?dataset=${datasetId}`);
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(Searchbox_1.default, { history: history })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
        const expectedDefaultDatasets = {
            exac: 'exac',
            gnomad_r2_1: 'gnomad_r2_1',
            gnomad_r2_1_controls: 'gnomad_r2_1',
            gnomad_r2_1_non_cancer: 'gnomad_r2_1',
            gnomad_r2_1_non_neuro: 'gnomad_r2_1',
            gnomad_r2_1_non_topmed: 'gnomad_r2_1',
            gnomad_r3: 'gnomad_r3',
            gnomad_r3_controls_and_biobanks: 'gnomad_r3',
            gnomad_r3_non_cancer: 'gnomad_r3',
            gnomad_r3_non_neuro: 'gnomad_r3',
            gnomad_r3_non_topmed: 'gnomad_r3',
            gnomad_r3_non_v2: 'gnomad_r3',
            gnomad_sv_r2_1: 'gnomad_sv_r2_1',
            gnomad_sv_r2_1_controls: 'gnomad_sv_r2_1',
            gnomad_sv_r2_1_non_neuro: 'gnomad_sv_r2_1',
            gnomad_sv_r4: 'gnomad_sv_r4',
            gnomad_r4: 'gnomad_r4',
            gnomad_cnv_r4: 'gnomad_cnv_r4',
            gnomad_r4_non_ukb: 'gnomad_r4',
        };
        (0, globals_1.test)('has correct default dataset', () => {
            const expectedDefaultDataset = expectedDefaultDatasets[datasetId];
            const history = (0, history_1.createBrowserHistory)();
            history.push(`/?dataset=${datasetId}`);
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(Searchbox_1.default, { history: history })));
            const datasetSelect = tree.root.findByType('select');
            const defaultDataset = datasetSelect.props.value;
            (0, globals_1.expect)(defaultDataset).toEqual(expectedDefaultDataset);
        });
    });
});
//# sourceMappingURL=Searchbox.spec.js.map