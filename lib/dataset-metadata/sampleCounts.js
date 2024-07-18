"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exacSampleCounts = require('./datasets/exac/sampleCounts');
const _a = require('./datasets/gnomad-v2/sampleCounts'), { subsets: gnomadV2SubsetSampleCounts } = _a, gnomadV2SampleCounts = __rest(_a, ["subsets"]);
const _b = require('./datasets/gnomad-v3/sampleCounts'), { subsets: gnomadV3SubsetSampleCounts } = _b, gnomadV3SampleCounts = __rest(_b, ["subsets"]);
const _c = require('./datasets/gnomad-sv-v2/sampleCounts'), { subsets: gnomadSvV2SubsetSampleCounts } = _c, gnomadSvV2SampleCounts = __rest(_c, ["subsets"]);
const gnomadCnvV4SubsetSampleCounts = require('./datasets/gnomad-cnv-v4/sampleCounts');
const _d = require('./datasets/gnomad-v4/sampleCounts'), { subsets: gnomadV4SubsetSampleCounts } = _d, gnomadV4SampleCounts = __rest(_d, ["subsets"]);
const sampleCounts = [
    { exac: exacSampleCounts },
    { gnomad_r2_1: gnomadV2SampleCounts },
    ...Object.keys(gnomadV2SubsetSampleCounts).map((subset) => ({
        [`gnomad_r2_1_${subset}`]: gnomadV2SubsetSampleCounts[subset],
    })),
    { gnomad_r3: gnomadV3SampleCounts },
    ...Object.keys(gnomadV3SubsetSampleCounts).map((subset) => ({
        [`gnomad_r3_${subset}`]: gnomadV3SubsetSampleCounts[subset],
    })),
    { gnomad_sv_r2_1: gnomadSvV2SampleCounts },
    ...Object.keys(gnomadSvV2SubsetSampleCounts).map((subset) => ({
        [`gnomad_sv_r2_1_${subset}`]: gnomadSvV2SubsetSampleCounts[subset],
    })),
    { gnomad_sv_r4: { total: 63046 } },
    { gnomad_cnv_r4: gnomadCnvV4SubsetSampleCounts }, // TODO: should not be called "subset"
    { gnomad_r4: gnomadV4SampleCounts },
    ...Object.keys(gnomadV4SubsetSampleCounts).map((subset) => ({
        [`gnomad_r4_${subset}`]: gnomadV4SubsetSampleCounts[subset],
    })),
].reduce(Object.assign, {});
exports.default = sampleCounts;
//# sourceMappingURL=sampleCounts.js.map