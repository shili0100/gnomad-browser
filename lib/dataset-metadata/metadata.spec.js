"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const metadata_1 = require("./metadata");
const datasets_1 = require("../tests/__helpers__/datasets");
const expectedReferenceGenome = {
    exac: 'GRCh37',
    gnomad_r2_1: 'GRCh37',
    gnomad_r2_1_controls: 'GRCh37',
    gnomad_r2_1_non_cancer: 'GRCh37',
    gnomad_r2_1_non_neuro: 'GRCh37',
    gnomad_r2_1_non_topmed: 'GRCh37',
    gnomad_r3: 'GRCh38',
    gnomad_r4: 'GRCh38',
    gnomad_r3_controls_and_biobanks: 'GRCh38',
    gnomad_r3_non_cancer: 'GRCh38',
    gnomad_r3_non_neuro: 'GRCh38',
    gnomad_r3_non_topmed: 'GRCh38',
    gnomad_r3_non_v2: 'GRCh38',
    gnomad_sv_r2_1: 'GRCh37',
    gnomad_sv_r2_1_controls: 'GRCh37',
    gnomad_sv_r2_1_non_neuro: 'GRCh37',
    gnomad_sv_r4: 'GRCh38',
    gnomad_cnv_r4: 'GRCh38',
    gnomad_r4_non_ukb: 'GRCh38',
};
(0, datasets_1.forAllDatasets)('referenceGenome(%s)', (datasetId) => {
    const expectedResult = expectedReferenceGenome[datasetId];
    (0, globals_1.test)(`${datasetId} uses reference genome ${expectedResult}`, () => (0, globals_1.expect)((0, metadata_1.referenceGenome)(datasetId)).toEqual(expectedResult));
});
//# sourceMappingURL=metadata.spec.js.map