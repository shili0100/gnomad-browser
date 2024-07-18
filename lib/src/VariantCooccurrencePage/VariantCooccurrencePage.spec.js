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
const globals_1 = require("@jest/globals");
const queries_1 = require("../../../tests/__helpers__/queries");
const Query_1 = __importStar(require("../Query"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const react_2 = require("@testing-library/react");
const datasets_1 = require("../../../tests/__helpers__/datasets");
const VariantCooccurrencePage_1 = __importDefault(require("./VariantCooccurrencePage"));
const react_router_dom_1 = require("react-router-dom");
jest.mock('../Query', () => {
    const originalModule = jest.requireActual('../Query');
    return Object.assign(Object.assign({ __esModule: true }, originalModule), { default: jest.fn(), BaseQuery: jest.fn() });
});
const { resetMockApiCalls, resetMockApiResponses, simulateApiResponse, setMockApiResponses } = (0, queries_1.mockQueries)();
const variantId1 = '1-234-A-C';
const variantId2 = '1-987-C-A';
const baseApiResponse = {
    variant_cooccurrence: {
        variant_ids: [variantId1, variantId2],
        genotype_counts: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        haplotype_counts: [10, 11, 12, 13],
        p_compound_heterozygous: 0.123, // TK calculate in real value
        populations: [],
    },
    variant1: {
        exome: { ac: 999, an: 101010 },
        genome: { ac: 555, an: 5555 },
        multi_nucleotide_variants: null,
        transcript_consequences: [
            {
                gene_id: 'ENSG00000169174',
                gene_version: '9',
                gene_symbol: 'PCSK9',
                hgvs: 'p.Arg46Leu',
                hgvsc: 'c.137G>T',
                hgvsp: 'p.Arg46Leu',
                is_canonical: true,
                is_mane_select: null,
                is_mane_select_version: null,
                lof: null,
                lof_flags: null,
                lof_filter: null,
                major_consequence: 'missense_variant',
                polyphen_prediction: 'benign',
                sift_prediction: 'tolerated',
                transcript_id: 'ENST00000302118',
                transcript_version: '5',
            },
        ],
    },
    variant2: {
        exome: { ac: 456, an: 654 },
        genome: { ac: 678, an: 876 },
        multi_nucleotide_variants: null,
        transcript_consequences: [],
    },
};
const cisThreshold = 0.02;
const transThreshold = 0.55;
const epsilon = 0.0000001;
const routerInitialEntries = [`/variant-cooccurrence?variant=${variantId1}&variant=${variantId2}`];
(0, globals_1.describe)('VariantCoocurrencePage', () => {
    (0, globals_1.describe)('for gnomad_r2_1', () => {
        beforeEach(() => {
            Query_1.default.mockImplementation(jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('Query', query, children, operationName, variables)));
            Query_1.BaseQuery.mockImplementation(jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('BaseQuery', query, children, operationName, variables)));
        });
        afterEach(() => {
            resetMockApiCalls();
            resetMockApiResponses();
        });
        (0, globals_1.test)('has no unexpected changes', () => {
            setMockApiResponses({
                VariantCooccurrence: () => baseApiResponse,
            });
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.MemoryRouter, { initialEntries: routerInitialEntries },
                react_1.default.createElement(VariantCooccurrencePage_1.default, { datasetId: "gnomad_r2_1" })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
        const cisResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { p_compound_heterozygous: cisThreshold - epsilon }) });
        const lowAmbiguousResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { p_compound_heterozygous: cisThreshold }) });
        const highAmbiguousResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { p_compound_heterozygous: transThreshold }) });
        const transResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { p_compound_heterozygous: transThreshold + epsilon }) });
        const missingFirstVariantResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { genotype_counts: [1, 2, 3, 0, 0, 0, 0, 0, 0], p_compound_heterozygous: null }) });
        const missingSecondVariantResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { genotype_counts: [1, 0, 0, 2, 0, 0, 3, 0, 0], p_compound_heterozygous: null }) });
        const missingBothVariantsResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { genotype_counts: [10000, 0, 0, 0, 0, 0, 0, 0, 0], p_compound_heterozygous: null }) });
        const cisSingletonResponse = Object.assign(Object.assign({}, baseApiResponse), { variant_cooccurrence: Object.assign(Object.assign({}, baseApiResponse.variant_cooccurrence), { genotype_counts: [1000, 0, 0, 0, 1, 0, 0, 0, 0], p_compound_heterozygous: cisThreshold - epsilon }) });
        const cisGenotypeCountsText = /these variants are likely found on the same haplotype/;
        const ambiguousGenotypeCountsText = /The co-occurrence pattern for these variants doesn’t allow us to give a robust assessment/;
        const transGenotypeCountsText = /these variants are likely found on different haplotypes in most/;
        const missingOneVariantGenotypeCountsText = /One of these variants is not observed/;
        const missingBothVariantsGenotypeCountsText = /These variants are not observed/;
        const cisTableDescription = 'Same haplotype';
        const ambiguousTableDescription = 'Uncertain';
        const transTableDescription = 'Different haplotypes';
        const noCalculationTableDescription = 'No prediction';
        const cases = [
            ['cis p_chet', cisResponse, cisGenotypeCountsText, cisTableDescription],
            [
                'low borderline p_chet',
                lowAmbiguousResponse,
                ambiguousGenotypeCountsText,
                ambiguousTableDescription,
            ],
            [
                'high borderline p_chet',
                highAmbiguousResponse,
                ambiguousGenotypeCountsText,
                ambiguousTableDescription,
            ],
            ['trans p_chet', transResponse, transGenotypeCountsText, transTableDescription],
            [
                'only the first of the two variants',
                missingFirstVariantResponse,
                missingOneVariantGenotypeCountsText,
                noCalculationTableDescription,
            ],
            [
                'only the second of the two variants',
                missingSecondVariantResponse,
                missingOneVariantGenotypeCountsText,
                noCalculationTableDescription,
            ],
            [
                'neither variant',
                missingBothVariantsResponse,
                missingBothVariantsGenotypeCountsText,
                noCalculationTableDescription,
            ],
            ['a cis singleton', cisSingletonResponse, null, noCalculationTableDescription],
        ];
        cases.forEach(([description, response, genotypeCountsText, tableDescription]) => {
            (0, globals_1.describe)(`when the main population has ${description}`, () => {
                (0, globals_1.test)('has an appropriate description in the summary table and under the genotype counts', () => __awaiter(void 0, void 0, void 0, function* () {
                    setMockApiResponses({
                        VariantCooccurrence: () => response,
                    });
                    const tree = (0, react_2.render)(react_1.default.createElement(react_router_dom_1.MemoryRouter, { initialEntries: routerInitialEntries },
                        react_1.default.createElement(VariantCooccurrencePage_1.default, { datasetId: "gnomad_r2_1" })));
                    (0, globals_1.expect)(tree).toMatchSnapshot();
                    if (genotypeCountsText) {
                        yield tree.findByText(genotypeCountsText);
                    }
                    yield tree.findByText(tableDescription);
                }));
            });
        });
        (0, globals_1.test)('omits haplotype table for cis singleton', () => __awaiter(void 0, void 0, void 0, function* () {
            setMockApiResponses({
                VariantCooccurrence: () => cisSingletonResponse,
            });
            const tree = (0, react_2.render)(react_1.default.createElement(react_router_dom_1.MemoryRouter, { initialEntries: routerInitialEntries },
                react_1.default.createElement(VariantCooccurrencePage_1.default, { datasetId: "gnomad_r2_1" })));
            const tables = tree.queryAllByText(/Haplotype Counts/);
            (0, globals_1.expect)(tables).toEqual([]);
        }));
        (0, globals_1.test)('has an accuracy warning for variants in cis with a large distance between them', () => __awaiter(void 0, void 0, void 0, function* () {
            const distantCisResponse = Object.assign(Object.assign({}, cisResponse), { variant_cooccurrence: Object.assign(Object.assign({}, cisResponse.variant_cooccurrence), { variant_ids: ['1-1-A-C', '1-50002-A-C'] }) });
            setMockApiResponses({
                VariantCooccurrence: () => distantCisResponse,
            });
            const tree = (0, react_2.render)(react_1.default.createElement(react_router_dom_1.MemoryRouter, { initialEntries: ['/variant-cooccurrence?variant=$1-1-A-C&variant=1-50002-A-C'] },
                react_1.default.createElement(VariantCooccurrencePage_1.default, { datasetId: "gnomad_r2_1" })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
            yield tree.findByText(/Accuracy is lower .+ away from each other./);
        }));
    });
    (0, datasets_1.forDatasetsNotMatching)(/r2_1$/, 'for non-2.1 dataset %s', (datasetId) => {
        (0, globals_1.test)('has no unexpected changes', () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.MemoryRouter, null,
                react_1.default.createElement(VariantCooccurrencePage_1.default, { datasetId: datasetId })));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=VariantCooccurrencePage.spec.js.map