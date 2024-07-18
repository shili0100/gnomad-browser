"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const DatasetSelector_1 = __importDefault(require("./DatasetSelector"));
const datasets_1 = require("../../tests/__helpers__/datasets");
const react_router_dom_1 = require("react-router-dom");
(0, datasets_1.forAllDatasets)('DataSelector with "%s" dataset selected', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(DatasetSelector_1.default, { selectedDataset: datasetId, datasetOptions: {} })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
    (0, globals_1.test)('has no unexpected changes when showing all possible datasets', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(DatasetSelector_1.default, { selectedDataset: datasetId, datasetOptions: {
                    includeShortVariants: true,
                    includeStructuralVariants: true,
                    includeExac: true,
                    includeGnomad2: true,
                    includeGnomad2Subsets: true,
                    includeGnomad3: true,
                    includeGnomad3Subsets: true,
                    includeCopyNumberVariants: true,
                    includeGnomad4: true,
                } })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=DatasetSelector.spec.js.map