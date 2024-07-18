"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const TranscriptPage_1 = __importDefault(require("./TranscriptPage"));
const apiCall_1 = require("../../../tests/__helpers__/apiCall");
const datasets_1 = require("../../../tests/__helpers__/datasets");
const react_router_dom_1 = require("react-router-dom");
const Transcript_1 = __importDefault(require("../__factories__/Transcript"));
(0, datasets_1.forAllDatasets)('TranscriptPage with dataset "%s"', (datasetId) => {
    const fetch = globals_1.jest.fn(() => {
        return new Promise(() => { });
    });
    beforeEach(() => {
        global.fetch = fetch;
    });
    test('has no unexpected changes', () => {
        const transcript = Transcript_1.default.build();
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(TranscriptPage_1.default, { datasetId: datasetId, transcript: transcript })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
globals_1.describe.each([
    ['exac', true],
    ['gnomad_r2_1', true],
    ['gnomad_r2_1_controls', true],
    ['gnomad_r2_1_non_cancer', true],
    ['gnomad_r2_1_non_neuro', true],
    ['gnomad_r2_1_non_topmed', true],
    ['gnomad_r3', false],
    ['gnomad_r3_controls_and_biobanks', false],
    ['gnomad_r3_non_cancer', false],
    ['gnomad_r3_non_neuro', false],
    ['gnomad_r3_non_topmed', false],
    ['gnomad_r3_non_v2', false],
    ['gnomad_sv_r2_1', true],
    ['gnomad_sv_r2_1_controls', true],
    ['gnomad_sv_r2_1_non_neuro', true],
])('TranscriptPage with dataset "%s"', (datasetId, expectedResult) => {
    const fetch = globals_1.jest.fn(() => {
        return new Promise(() => { });
    });
    beforeEach(() => {
        global.fetch = fetch;
    });
    test('queries the API with the correct parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const transcript = Transcript_1.default.build();
        react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(TranscriptPage_1.default, { datasetId: datasetId, transcript: transcript })));
        const coverageQueries = (0, apiCall_1.apiCallsMatching)(fetch, 'query TranscriptCoverage');
        (0, globals_1.expect)(coverageQueries).toHaveLength(1);
        const [coverageQuery] = coverageQueries;
        const exomeCoverageArg = coverageQuery.body.variables.includeExomeCoverage;
        (0, globals_1.expect)(exomeCoverageArg).toEqual(expectedResult);
    }));
});
//# sourceMappingURL=TranscriptPage.spec.js.map