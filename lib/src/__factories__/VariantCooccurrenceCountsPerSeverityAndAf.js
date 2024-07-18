"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomozygousVariantCooccurrenceCountsPerSeverityAndAfFactory = exports.HeterozygousVariantCooccurrenceCountsPerSeverityAndAfFactory = void 0;
const fishery_1 = require("fishery");
const VariantCooccurrenceCountsTable_1 = require("../GenePage/VariantCooccurrenceCountsTable");
const simpleHash = (input) => Math.abs(input.split('').reduce((prev, curr) => (Math.imul(15, prev) + curr.charCodeAt(0)) | 0, 0));
const buildFakeHeterozygousCounts = (severity, afCutoff) => {
    const severityHash = simpleHash(severity);
    const afCutoffHash = simpleHash(afCutoff);
    const hashSum = severityHash + afCutoffHash;
    const in_cis = hashSum % 12345;
    const in_trans = hashSum % 23456;
    const unphased = hashSum % 34567;
    const two_het_total = in_cis + in_trans + unphased;
    return { in_cis, in_trans, unphased, two_het_total };
};
const buildFakeHomozygousCounts = (severity, afCutoff) => {
    const severityHash = simpleHash(severity);
    const afCutoffHash = simpleHash(afCutoff);
    const hashSum = severityHash + afCutoffHash;
    const hom_total = hashSum % 45678;
    return { hom_total };
};
const buildCounts = (severities, afCutoffs, cellBuilder) => {
    const result = {};
    severities.forEach((severity) => {
        result[severity] = {};
        afCutoffs.forEach((afCutoff) => {
            result[severity][afCutoff] = cellBuilder(severity, afCutoff);
        });
    });
    return result;
};
exports.HeterozygousVariantCooccurrenceCountsPerSeverityAndAfFactory = fishery_1.Factory.define(() => {
    return buildCounts(VariantCooccurrenceCountsTable_1.heterozygousVariantCooccurrenceSeverities, VariantCooccurrenceCountsTable_1.heterozygousVariantCooccurrenceAfCutoffs, buildFakeHeterozygousCounts);
});
exports.HomozygousVariantCooccurrenceCountsPerSeverityAndAfFactory = fishery_1.Factory.define(() => {
    return buildCounts(VariantCooccurrenceCountsTable_1.homozygousVariantCooccurrenceSeverities, VariantCooccurrenceCountsTable_1.homozygousVariantCooccurrenceAfCutoffs, buildFakeHomozygousCounts);
});
//# sourceMappingURL=VariantCooccurrenceCountsPerSeverityAndAf.js.map