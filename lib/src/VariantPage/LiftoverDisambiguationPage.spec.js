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
const LiftoverDisambiguationPage_1 = __importDefault(require("./LiftoverDisambiguationPage"));
const metadata_1 = require("../../dataset-metadata/metadata");
const react_router_dom_1 = require("react-router-dom");
globals_1.jest.mock('../Query', () => {
    const originalModule = globals_1.jest.requireActual('../Query');
    return Object.assign(Object.assign({ __esModule: true }, originalModule), { default: globals_1.jest.fn(), BaseQuery: globals_1.jest.fn() });
});
const { resetMockApiCalls, resetMockApiResponses, simulateApiResponse, setMockApiResponses, mockApiCalls, } = (0, queries_1.mockQueries)();
(0, globals_1.beforeEach)(() => {
    Query_1.default.mockImplementation(globals_1.jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('Query', query, children, operationName, variables)));
    Query_1.BaseQuery.mockImplementation(globals_1.jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('BaseQuery', query, children, operationName, variables)));
});
(0, globals_1.afterEach)(() => {
    resetMockApiCalls();
    resetMockApiResponses();
});
const liftoverSourceDatasets = metadata_1.allDatasetIds.filter(metadata_1.isLiftoverSource);
const liftoverTargetDatasets = metadata_1.allDatasetIds.filter(metadata_1.isLiftoverTarget);
(0, globals_1.describe)('LiftoverDisambiguationPage', () => {
    globals_1.describe.each(liftoverSourceDatasets)('starting from liftover source dataset %s', (fromDatasetId) => {
        (0, globals_1.test)('makes the correct query', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({}),
            });
            react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r4" })));
            const queries = mockApiCalls();
            (0, globals_1.expect)(queries.length).toEqual(1);
            const query = queries[0];
            (0, globals_1.expect)(query.operationName).toEqual('LiftoverDisambiguation');
            (0, globals_1.expect)(query.variables.source_variant_id).toEqual('fakevariant');
            (0, globals_1.expect)(query.variables.liftover_variant_id).toEqual(undefined);
            (0, globals_1.expect)(query.variables.reference_genome).toEqual('GRCh37');
        });
        (0, globals_1.test)('has appropriate message if no corresponding variant found', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({ liftover: [] }),
            });
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r4" })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
        (0, globals_1.test)('redirects if one corresponding variant found', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({
                    liftover: [{ liftover: { variant_id: 'source1' } }],
                }),
            });
            const router = (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r4" })));
            react_test_renderer_1.default.create(router);
            const { location } = window;
            (0, globals_1.expect)(location.pathname).toEqual('/variant/source1');
            (0, globals_1.expect)(location.search).toEqual('?dataset=gnomad_r4');
        });
        (0, globals_1.test)('renders links to each variant if multiple corresponding variants found', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({
                    liftover: [
                        { liftover: { variant_id: 'source1' } },
                        { liftover: { variant_id: 'source2' } },
                    ],
                }),
            });
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r4" })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
    globals_1.describe.each(liftoverTargetDatasets)('starting from liftover target dataset %s', (fromDatasetId) => {
        (0, globals_1.test)('makes the correct query', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({}),
            });
            react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r2_1" })));
            const queries = mockApiCalls();
            (0, globals_1.expect)(queries.length).toEqual(1);
            const query = queries[0];
            (0, globals_1.expect)(query.operationName).toEqual('LiftoverDisambiguation');
            (0, globals_1.expect)(query.variables.source_variant_id).toEqual(undefined);
            (0, globals_1.expect)(query.variables.liftover_variant_id).toEqual('fakevariant');
            (0, globals_1.expect)(query.variables.reference_genome).toEqual('GRCh38');
        });
        (0, globals_1.test)('has appropriate message if no corresponding variant found', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({ liftover: [] }),
            });
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r2_1" })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
        (0, globals_1.test)('redirects if one corresponding variant found', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({
                    liftover: [{ source: { variant_id: 'source1' } }],
                }),
            });
            const router = (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r2_1" })));
            react_test_renderer_1.default.create(router);
            const { location } = window;
            (0, globals_1.expect)(location.pathname).toEqual('/variant/source1');
            (0, globals_1.expect)(location.search).toEqual('?dataset=gnomad_r2_1');
        });
        (0, globals_1.test)('renders links to each variant if multiple corresponding variants found', () => {
            setMockApiResponses({
                LiftoverDisambiguation: () => ({
                    liftover: [
                        { source: { variant_id: 'source1' } },
                        { source: { variant_id: 'source2' } },
                    ],
                }),
            });
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(LiftoverDisambiguationPage_1.default, { fromVariantId: "fakevariant", fromDatasetId: fromDatasetId, toDatasetId: "gnomad_r2_1" })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=LiftoverDisambiguationPage.spec.js.map