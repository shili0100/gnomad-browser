"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const globals_1 = require("@jest/globals");
const queries_1 = require("../../../tests/__helpers__/queries");
const react_router_dom_1 = require("react-router-dom");
const Query_1 = __importStar(require("../Query"));
const MitochondrialVariantsInRegion_1 = __importDefault(require("./MitochondrialVariantsInRegion"));
const metadata_1 = require("../../dataset-metadata/metadata");
globals_1.jest.mock('../Query', () => {
    const originalModule = globals_1.jest.requireActual('../Query');
    return Object.assign(Object.assign({ __esModule: true }, originalModule), { default: globals_1.jest.fn(), BaseQuery: globals_1.jest.fn() });
});
const { resetMockApiCalls, resetMockApiResponses, simulateApiResponse, setMockApiResponses } = (0, queries_1.mockQueries)();
beforeEach(() => {
    Query_1.default.mockImplementation(globals_1.jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('Query', query, children, operationName, variables)));
    Query_1.BaseQuery.mockImplementation(globals_1.jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('BaseQuery', query, children, operationName, variables)));
});
afterEach(() => {
    resetMockApiCalls();
    resetMockApiResponses();
});
const datasetsWithoutCoverage = [
    'exac',
    'gnomad_r2_1',
    'gnomad_r2_1_controls',
    'gnomad_r2_1_non_neuro',
    'gnomad_r2_1_non_cancer',
    'gnomad_r2_1_non_topmed',
];
const datasetsWithCoverage = metadata_1.allDatasetIds.filter((datasetId) => !datasetsWithoutCoverage.includes(datasetId));
const region = {
    chrom: 'M',
    reference_genome: 'GRCh38',
    start: 123,
    stop: 456,
    genes: [],
    non_coding_constraints: null,
};
globals_1.describe.each(datasetsWithoutCoverage)('MitochondrialVariantsInRegion with dataset %s', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(MitochondrialVariantsInRegion_1.default, { datasetId: datasetId, region: region })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
globals_1.describe.each(datasetsWithCoverage)('MitochondrialVariantsInRegion with dataset %s', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        setMockApiResponses({
            MitochondrialVariantsInRegion: () => ({
                meta: {
                    clinvar_release_date: '2022-10-31',
                },
                region: {
                    clinvar_variants: [],
                    mitochondrial_variants: [],
                },
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(MitochondrialVariantsInRegion_1.default, { datasetId: datasetId, region: region }));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=MitochondrialVariantsInRegion.spec.js.map