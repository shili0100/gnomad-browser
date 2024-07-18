"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const shallow_1 = require("react-test-renderer/shallow");
const datasets_1 = require("../../../tests/__helpers__/datasets");
const metadata_1 = require("../../dataset-metadata/metadata");
const RegionPage_1 = __importDefault(require("./RegionPage"));
(0, datasets_1.forAllDatasets)('RegionPage with "%s" dataset', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes for a non-mitochondrial region', () => {
        const region = {
            reference_genome: (0, metadata_1.referenceGenome)(datasetId),
            chrom: '12',
            start: 345,
            stop: 456,
            genes: [],
            short_tandem_repeats: [],
            non_coding_constraints: [],
        };
        const renderer = (0, shallow_1.createRenderer)();
        renderer.render(react_1.default.createElement(RegionPage_1.default, { datasetId: datasetId, region: region }));
        (0, globals_1.expect)(renderer.getRenderOutput()).toMatchSnapshot();
    });
    (0, globals_1.test)('has no unexpected changes for a mitochondrial region', () => {
        const region = {
            reference_genome: (0, metadata_1.referenceGenome)(datasetId),
            chrom: 'M',
            start: 345,
            stop: 456,
            genes: [],
            short_tandem_repeats: [],
            non_coding_constraints: [],
        };
        const renderer = (0, shallow_1.createRenderer)();
        renderer.render(react_1.default.createElement(RegionPage_1.default, { datasetId: datasetId, region: region }));
        (0, globals_1.expect)(renderer.getRenderOutput()).toMatchSnapshot();
    });
});
//# sourceMappingURL=RegionPage.spec.js.map