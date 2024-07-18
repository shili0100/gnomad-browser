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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const search_1 = require("./search");
(0, globals_1.describe)('fetchSearchResults', () => {
    (0, globals_1.beforeEach)(() => {
        // @ts-expect-error TS(2322) FIXME: Type 'Mock<UnknownFunction>' is not assignable to ... Remove this comment to see the full error message
        global.fetch = globals_1.jest.fn();
    });
    (0, globals_1.it)('should return a variant page link for structural variant IDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_sv_r2_1', 'MCNV_4_185')).toEqual([
            {
                label: 'MCNV_4_185',
                value: '/variant/MCNV_4_185?dataset=gnomad_sv_r2_1',
            },
        ]);
    }));
    (0, globals_1.it)('should return a variant page link for variant IDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', '1-55516888-G-GA')).toEqual([
            {
                label: '1-55516888-G-GA',
                value: '/variant/1-55516888-G-GA?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)('should return a variant page link for rsIDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', 'rs527413419')).toEqual([
            {
                label: 'rs527413419',
                value: '/variant/rs527413419?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)('should return a gene page link for Ensembl gene IDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', 'ENSG00000169174')).toEqual([
            {
                label: 'ENSG00000169174',
                value: '/gene/ENSG00000169174?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)('should return a transcript page link for Ensembl transcript IDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', 'ENST00000302118')).toEqual([
            {
                label: 'ENST00000302118',
                value: '/transcript/ENST00000302118?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)('should return a region page link for region IDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', '1:55039447-55064852')).toEqual([
            {
                label: '1-55039447-55064852',
                value: '/region/1-55039447-55064852?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)('should return region page links for a window and a position for position IDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', '1:55039447')).toEqual([
            {
                label: '1-55039427-55039467',
                value: '/region/1-55039427-55039467?dataset=gnomad_r3',
            },
            {
                label: '1-55039447-55039447',
                value: '/region/1-55039447-55039447?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)('should search for gene symbols', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-expect-error TS(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        global.fetch.mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({
                data: {
                    gene_search: [{ ensembl_id: 'ENSG00000169174', symbol: 'PCSK9' }],
                },
            }),
        }));
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', 'PCSK9')).toEqual([
            {
                label: 'PCSK9',
                value: '/gene/ENSG00000169174?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)("sorts gene search results with genes that start with the query ahead of those that don't", () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-expect-error TS(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        global.fetch.mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({
                data: {
                    gene_search: [
                        { ensembl_id: 'ENSG000004', symbol: 'ABCD3' },
                        { ensembl_id: 'ENSG000001', symbol: 'QRST3' },
                        { ensembl_id: 'ENSG000005', symbol: 'LMNO2' },
                        { ensembl_id: 'ENSG000002', symbol: 'QRST1' },
                        { ensembl_id: 'ENSG000006', symbol: 'ZXCV1' },
                        { ensembl_id: 'ENSG000003', symbol: 'QRST2' },
                    ],
                },
            }),
        }));
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r3', 'QRS')).toEqual([
            { label: 'QRST1', value: '/gene/ENSG000002?dataset=gnomad_r3' },
            {
                label: 'QRST2',
                value: '/gene/ENSG000003?dataset=gnomad_r3',
            },
            {
                label: 'QRST3',
                value: '/gene/ENSG000001?dataset=gnomad_r3',
            },
            {
                label: 'ABCD3',
                value: '/gene/ENSG000004?dataset=gnomad_r3',
            },
            {
                label: 'LMNO2',
                value: '/gene/ENSG000005?dataset=gnomad_r3',
            },
            {
                label: 'ZXCV1',
                value: '/gene/ENSG000006?dataset=gnomad_r3',
            },
        ]);
    }));
    (0, globals_1.it)('should return a link to variant co-occurrence for two variant IDs', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, globals_1.expect)(yield (0, search_1.fetchSearchResults)('gnomad_r2_1', '1-55505647-G-T and 1-55523855-G-A')).toEqual([
            {
                label: '1-55505647-G-T and 1-55523855-G-A co-occurrence',
                value: '/variant-cooccurrence?dataset=gnomad_r2_1&variant=1-55505647-G-T&variant=1-55523855-G-A',
            },
        ]);
    }));
});
//# sourceMappingURL=search.spec.js.map