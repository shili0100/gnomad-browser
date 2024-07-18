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
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const globals_1 = require("@jest/globals");
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const metadata_1 = require("../../dataset-metadata/metadata");
const queries_1 = require("../../../tests/__helpers__/queries");
const Query_1 = __importStar(require("../Query"));
const Gene_1 = __importDefault(require("../__factories__/Gene"));
const GenePage_1 = __importDefault(require("./GenePage"));
const GenePageContainer_1 = __importDefault(require("./GenePageContainer"));
const datasets_1 = require("../../../tests/__helpers__/datasets");
const react_router_dom_1 = require("react-router-dom");
globals_1.jest.mock('../Query', () => {
    const originalModule = globals_1.jest.requireActual('../Query');
    return Object.assign(Object.assign({ __esModule: true }, originalModule), { default: globals_1.jest.fn(), BaseQuery: globals_1.jest.fn() });
});
const { resetMockApiCalls, resetMockApiResponses, simulateApiResponse, setMockApiResponses, mockApiCalls, } = (0, queries_1.mockQueries)();
beforeEach(() => {
    Query_1.default.mockImplementation(globals_1.jest.fn(({ children, operationName, variables, query }) => simulateApiResponse('Query', query, children, operationName, variables)));
    Query_1.BaseQuery.mockImplementation(globals_1.jest.fn(({ children, operationName, variables, query }) => simulateApiResponse('BaseQuery', query, children, operationName, variables)));
});
afterEach(() => {
    resetMockApiCalls();
    resetMockApiResponses();
});
const svRegexp = /_sv/;
const cnvRegexp = /_cnv/;
(0, datasets_1.forDatasetsNotMatching)(svRegexp, 'GenePage with non-SV dataset "%s"', (datasetId) => {
    const gene = Gene_1.default.build();
    beforeEach(() => setMockApiResponses({
        VariantsInGene: () => ({
            gene,
            meta: { clinvar_release_date: '2022-10-31' },
        }),
        GeneCoverage: () => ({
            gene: {
                coverage: {},
            },
        }),
        CopyNumberVariantsInGene: () => ({
            gene: { copy_number_variants: [] },
        }),
    }));
    (0, globals_1.test)('has no unexpected changes', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(GenePage_1.default, { datasetId: datasetId, gene: gene, geneId: gene.gene_id })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
    (0, globals_1.test)('selector allows toggling between constrant and co-occurrence tables', () => __awaiter(void 0, void 0, void 0, function* () {
        const constraintModeMatcher = /Constraint not (yet )?available/;
        const cooccurrenceModeMatcher = /Individuals with/;
        (0, react_2.render)(react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(GenePage_1.default, { datasetId: datasetId, gene: gene, geneId: gene.gene_id }),
            ")"));
        const constraintButton = react_2.screen.getByText('Constraint');
        const cooccurrenceButton = react_2.screen.getByText('Variant co-occurrence');
        (0, globals_1.expect)(react_2.screen.queryByText(constraintModeMatcher)).not.toBeNull();
        (0, globals_1.expect)(react_2.screen.queryAllByText(cooccurrenceModeMatcher)).toEqual([]);
        yield user_event_1.default.click(cooccurrenceButton);
        (0, globals_1.expect)(react_2.screen.queryByText(constraintModeMatcher)).toBeNull();
        if ((0, metadata_1.hasVariantCoocurrence)(datasetId)) {
            (0, globals_1.expect)(react_2.screen.queryAllByText(cooccurrenceModeMatcher)).not.toEqual([]);
        }
        else {
            (0, globals_1.expect)(react_2.screen.queryAllByText(cooccurrenceModeMatcher)).toEqual([]);
        }
        yield user_event_1.default.click(constraintButton);
        (0, globals_1.expect)(react_2.screen.queryByText(constraintModeMatcher)).not.toBeNull();
        (0, globals_1.expect)(react_2.screen.queryAllByText(cooccurrenceModeMatcher)).toEqual([]);
    }));
});
(0, datasets_1.forDatasetsMatching)(svRegexp, 'GenePage with SV dataset "%s"', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const gene = Gene_1.default.build();
        setMockApiResponses({
            StructuralVariantsInGene: () => ({
                gene: { structural_variants: [] },
            }),
            RegionCoverage: () => ({
                region: {
                    coverage: {},
                },
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(GenePage_1.default, { datasetId: datasetId, gene: gene, geneId: gene.gene_id })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
(0, datasets_1.forDatasetsMatching)(cnvRegexp, 'GenePage with CNV dataset "%s"', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes', () => {
        const gene = Gene_1.default.build();
        setMockApiResponses({
            CopyNumberVariantsInGene: () => ({
                gene: { copy_number_variants: [] },
            }),
            RegionCoverage: () => ({
                region: {
                    coverage: {},
                },
            }),
            GeneCoverage: () => ({
                gene: {
                    coverage: {},
                },
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(GenePage_1.default, { datasetId: datasetId, gene: gene, geneId: gene.gene_id })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
    (0, globals_1.test)('queries the API for region coverage with the correct parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const gene = Gene_1.default.build();
        setMockApiResponses({
            CopyNumberVariantsInGene: () => ({
                gene: { copy_number_variants: [] },
            }),
            GeneCoverage: () => ({
                gene: {
                    coverage: {},
                },
            }),
        });
        react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(GenePage_1.default, { datasetId: datasetId, gene: gene, geneId: gene.gene_id })));
        const coverageQueries = mockApiCalls().filter(({ operationName }) => operationName === 'GeneCoverage');
        (0, globals_1.expect)(coverageQueries).toHaveLength(1);
        const [coverageQuery] = coverageQueries;
        const exomeCoverageArg = coverageQuery.variables.includeExomeCoverage;
        (0, globals_1.expect)(exomeCoverageArg).toEqual(true);
    }));
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
    ['gnomad_cnv_r4', true],
])('GenePage with non-SV dataset "%s"', (datasetId, expectedResult) => {
    (0, globals_1.test)('queries the API for gene coverage with the correct parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const gene = Gene_1.default.build();
        setMockApiResponses({
            VariantsInGene: () => ({
                gene,
                meta: { clinvar_release_date: '2022-10-31' },
            }),
            GeneCoverage: () => ({
                gene: {
                    coverage: {},
                },
            }),
            CopyNumberVariantsInGene: () => ({
                gene: { copy_number_variants: [] },
            }),
        });
        react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
            react_1.default.createElement(GenePage_1.default, { datasetId: datasetId, gene: gene, geneId: gene.gene_id })));
        const coverageQueries = mockApiCalls().filter(({ operationName }) => operationName === 'GeneCoverage');
        (0, globals_1.expect)(coverageQueries).toHaveLength(1);
        const [coverageQuery] = coverageQueries;
        const exomeCoverageArg = coverageQuery.variables.includeExomeCoverage;
        (0, globals_1.expect)(exomeCoverageArg).toEqual(expectedResult);
    }));
});
globals_1.describe.each([
    ['exac', 'GRCh37', false],
    ['gnomad_r2_1', 'GRCh37', false],
    ['gnomad_r2_1_controls', 'GRCh37', false],
    ['gnomad_r2_1_non_cancer', 'GRCh37', false],
    ['gnomad_r2_1_non_neuro', 'GRCh37', false],
    ['gnomad_r2_1_non_topmed', 'GRCh37', false],
    ['gnomad_sv_r2_1', 'GRCh37', false],
    ['gnomad_sv_r2_1_controls', 'GRCh37', false],
    ['gnomad_sv_r2_1_non_neuro', 'GRCh37', false],
    ['gnomad_r3', 'GRCh38', true],
    ['gnomad_r3_controls_and_biobanks', 'GRCh38', true],
    ['gnomad_r3_non_cancer', 'GRCh38', true],
    ['gnomad_r3_non_neuro', 'GRCh38', true],
    ['gnomad_r3_non_topmed', 'GRCh38', true],
    ['gnomad_r3_non_v2', 'GRCh38', true],
    ['gnomad_cnv_r4', 'GRCh38', false],
])('gene query with dataset %s', (datasetId, expectedReferenceGenome, expectedIncludeShortTandemRepeats) => {
    beforeEach(() => {
        setMockApiResponses({
            Gene: () => ({}),
        });
    });
    (0, globals_1.test)(`uses ${expectedReferenceGenome} reference genome`, () => {
        react_test_renderer_1.default.create(react_1.default.createElement(GenePageContainer_1.default, { datasetId: datasetId, geneIdOrSymbol: "ABC123" }));
        const queries = mockApiCalls();
        (0, globals_1.expect)(queries).toHaveLength(1);
        (0, globals_1.expect)(queries[0].variables.referenceGenome).toEqual(expectedReferenceGenome);
    });
    const verb = expectedIncludeShortTandemRepeats ? 'includes' : 'does not include';
    (0, globals_1.test)(`${verb} short tandem repeats`, () => {
        react_test_renderer_1.default.create(react_1.default.createElement(GenePageContainer_1.default, { datasetId: datasetId, geneIdOrSymbol: "ABC123" }));
        const queries = mockApiCalls();
        (0, globals_1.expect)(queries).toHaveLength(1);
        (0, globals_1.expect)(queries[0].variables.includeShortTandemRepeats).toEqual(expectedIncludeShortTandemRepeats);
    });
});
//# sourceMappingURL=GenePage.spec.js.map