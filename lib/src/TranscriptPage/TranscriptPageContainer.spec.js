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
const Query_1 = __importStar(require("../Query"));
const datasets_1 = require("../../../tests/__helpers__/datasets");
const react_router_dom_1 = require("react-router-dom");
const Transcript_1 = __importDefault(require("../__factories__/Transcript"));
const TranscriptPageContainer_1 = __importDefault(require("./TranscriptPageContainer"));
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
(0, datasets_1.forAllDatasets)('TranscriptPageContainer with dataset %s', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const transcript = Transcript_1.default.build();
        setMockApiResponses({
            Transcript: () => ({
                transcript,
            }),
            VariantsInTranscript: () => ({
                meta: { clinvar_release_date: '2023-12-01' },
                transcript: {
                    clinvar_variants: [],
                    variants: [],
                },
            }),
            TranscriptCoverage: () => ({
                transcript: {
                    coverage: {},
                },
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(TranscriptPageContainer_1.default, { datasetId: datasetId, transcriptId: transcript.transcript_id })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=TranscriptPageContainer.spec.js.map