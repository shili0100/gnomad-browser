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
const globals_1 = require("@jest/globals");
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const queries_1 = require("../../../tests/__helpers__/queries");
const Query_1 = __importStar(require("../Query"));
const datasets_1 = require("../../../tests/__helpers__/datasets");
const VariantPage_1 = __importDefault(require("./VariantPage"));
const Variant_1 = require("../__factories__/Variant");
const react_router_dom_1 = require("react-router-dom");
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
(0, datasets_1.forDatasetsMatching)(/gnomad_r3/, 'VariantPage with the dataset "%s"', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const variant = Variant_1.v3VariantFactory.build();
        setMockApiResponses({
            GnomadVariant: () => ({ variant }),
            ReadData: () => ({
                variant_0: { exome: null, genome: [] },
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(VariantPage_1.default, { datasetId: datasetId, variantId: variant.variant_id })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
(0, datasets_1.forDatasetsMatching)(/gnomad_r2/, 'VariantPage with the dataset %s', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const variant = Variant_1.v2VariantFactory.build();
        setMockApiResponses({
            GnomadVariant: () => ({ variant }),
            ReadData: () => ({
                variant_0: { exome: null, genome: [] },
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(VariantPage_1.default, { datasetId: datasetId, variantId: variant.variant_id })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
describe('VariantPage with the dataset exac', () => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const variant = Variant_1.v2VariantFactory.build();
        setMockApiResponses({
            GnomadVariant: () => ({ variant }),
            ReadData: () => ({
                variant_0: { exome: null, genome: [] },
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(VariantPage_1.default, { datasetId: "exac", variantId: variant.variant_id })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=VariantPage.spec.js.map