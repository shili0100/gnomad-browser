"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const datasets_1 = require("../../tests/__helpers__/datasets");
const variantFeedback_1 = require("./variantFeedback");
const expectedResults = {
    exac: 'http://example.com/variant_report_form?variant_id_param=1-234-A-C',
    gnomad_r2_1: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_r2_1_controls: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_r2_1_non_cancer: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_r2_1_non_neuro: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_r2_1_non_topmed: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_r3: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v3&variant_id_param=1-234-A-C',
    gnomad_r3_non_cancer: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v3&variant_id_param=1-234-A-C',
    gnomad_r3_non_neuro: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v3&variant_id_param=1-234-A-C',
    gnomad_r3_controls_and_biobanks: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v3&variant_id_param=1-234-A-C',
    gnomad_r3_non_topmed: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v3&variant_id_param=1-234-A-C',
    gnomad_r3_non_v2: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v3&variant_id_param=1-234-A-C',
    gnomad_sv_r2_1: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_sv_r2_1_controls: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_sv_r2_1_non_neuro: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v2&variant_id_param=1-234-A-C',
    gnomad_sv_r4: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v3&variant_id_param=1-234-A-C',
    gnomad_r4: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v4&variant_id_param=1-234-A-C',
    gnomad_cnv_r4: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v4&variant_id_param=1-234-A-C',
    gnomad_r4_non_ukb: 'http://example.com/variant_report_form?dataset_id_parameter=gnomAD%20v4&variant_id_param=1-234-A-C',
};
const originalEnv = process.env;
beforeAll(() => {
    process.env.REPORT_VARIANT_URL = 'http://example.com/variant_report_form';
    process.env.REPORT_VARIANT_VARIANT_ID_PARAMETER = 'variant_id_param';
    process.env.REPORT_VARIANT_DATASET_PARAMETER = 'dataset_id_parameter';
});
afterAll(() => {
    process.env = originalEnv;
});
(0, datasets_1.forAllDatasets)('variantFeedbackUrl with %s dataset', (datasetId) => {
    const expectedResult = expectedResults[datasetId];
    (0, globals_1.test)(`returns "${expectedResult}"`, () => {
        const variant = { variant_id: '1-234-A-C' };
        const actualResult = (0, variantFeedback_1.variantFeedbackUrl)(variant, datasetId);
        (0, globals_1.expect)(actualResult).toEqual(expectedResult);
    });
});
//# sourceMappingURL=variantFeedback.spec.js.map