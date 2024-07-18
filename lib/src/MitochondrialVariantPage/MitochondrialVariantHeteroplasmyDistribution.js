"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const react_1 = __importDefault(require("react"));
const StackedHistogram_1 = __importDefault(require("../StackedHistogram"));
const MitochondrialVariantHeteroplasmyDistribution = ({ variant }) => {
    const binEdges = variant.heteroplasmy_distribution.bin_edges;
    const bins = [...Array(binEdges.length - 1)].map((_, i) => `${binEdges[i]}-${binEdges[i + 1]}`);
    const values = variant.heteroplasmy_distribution.bin_freq.map((n) => [n]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { style: { height: '16px', marginBottom: '1em' } }),
        react_1.default.createElement(StackedHistogram_1.default
        // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: number... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: number... Remove this comment to see the full error message
            id: "heteroplasmy-distribution-plot", bins: bins, values: values, xLabel: "Heteroplasmy level", yLabel: "Individuals", barColors: ['#73ab3d'], formatTooltip: (bin, individualsInBin) => {
                const nIndividuals = (0, d3_array_1.sum)(individualsInBin);
                return `${nIndividuals.toLocaleString()} individual${nIndividuals === 1 ? ' has' : 's have'} a heteroplasmy level in the ${bin} range`;
            } })));
};
exports.default = MitochondrialVariantHeteroplasmyDistribution;
//# sourceMappingURL=MitochondrialVariantHeteroplasmyDistribution.js.map