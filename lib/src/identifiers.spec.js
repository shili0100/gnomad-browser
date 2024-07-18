"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const identifiers_1 = require("./identifiers");
const datasets_1 = require("../../tests/__helpers__/datasets");
(0, globals_1.describe)('isStructuralVariantId', () => {
    const chromosomes = ['1', '12', 'X', 'Y'];
    (0, datasets_1.forDatasetsMatching)(/gnomad_sv_r2/, 'with dataset %s', (datasetId) => {
        const variantTypes = ['BND', 'CPX', 'CTX', 'DEL', 'DUP', 'INS', 'INV', 'MCNV', 'OTH'];
        const positions = ['3', '63', '963'];
        variantTypes.forEach((variantType) => {
            chromosomes.forEach((chromosome) => {
                positions.forEach((position) => {
                    const variantId = [variantType, chromosome, position].join('_');
                    (0, globals_1.test)(`recognizes ${variantId} as a v2 variant ID`, () => {
                        (0, globals_1.expect)((0, identifiers_1.isStructuralVariantId)(variantId, datasetId)).toEqual(true);
                    });
                });
            });
        });
    });
    (0, datasets_1.forDatasetsMatching)(/gnomad_sv_r4/, 'with dataset %s', (datasetId) => {
        const variantTypes = ['BND', 'CPX', 'CTX', 'DEL', 'DUP', 'INS', 'INV', 'CNV'];
        const suffixes = ['0F1E2D3C', 'DEADBEEF', '12345678'];
        variantTypes.forEach((variantType) => {
            chromosomes.forEach((chromosome) => {
                suffixes.forEach((suffix) => {
                    const variantId = [variantType, `CHR${chromosome}`, suffix].join('_');
                    (0, globals_1.test)(`recognizes ${variantId} as a v4 variant ID`, () => {
                        (0, globals_1.expect)((0, identifiers_1.isStructuralVariantId)(variantId, datasetId)).toEqual(true);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=identifiers.spec.js.map