"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAnswer = exports.question = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ageDistribution_json_1 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v4/ageDistribution.json"));
const ageDistribution_json_2 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v3/ageDistribution.json"));
const ageDistribution_json_3 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v2/ageDistribution.json"));
const Histogram_1 = __importDefault(require("../../../src/Histogram"));
const ColumnsWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
const Column = styled_components_1.default.div `
  width: calc(50% - 15px);

  @media (max-width: 700px) {
    width: 100%;
  }
`;
exports.question = 'What is the age distribution in gnomAD?';
const renderAnswer = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement("p", null, "For gnomAD v4, the age distribution is:"),
    react_1.default.createElement(ColumnsWrapper, null,
        react_1.default.createElement(Column, null,
            react_1.default.createElement("p", null, "Exomes"),
            react_1.default.createElement(Histogram_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                binEdges: ageDistribution_json_1.default.exome.bin_edges, binValues: ageDistribution_json_1.default.exome.bin_freq, nSmaller: ageDistribution_json_1.default.exome.n_smaller, nLarger: ageDistribution_json_1.default.exome.n_larger, barColor: "#428bca", xLabel: "Age", yLabel: "Individuals", formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()} individuals` })),
        react_1.default.createElement(Column, null,
            react_1.default.createElement("p", null, "Genomes"),
            react_1.default.createElement(Histogram_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                binEdges: ageDistribution_json_1.default.genome.bin_edges, binValues: ageDistribution_json_1.default.genome.bin_freq, nSmaller: ageDistribution_json_1.default.genome.n_smaller, nLarger: ageDistribution_json_1.default.genome.n_larger, barColor: "#73ab3d", xLabel: "Age", yLabel: "Individuals", formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()} individuals` }))),
    react_1.default.createElement("p", null, "Please note that cohorts vary in how they report age (some report the age at diagnosis, others report the age of last visit, etc), so the ages associated with the gnomAD data can be thought of as the last known age of the individual. Information on age was not available for all samples. We have age data for 477,065 exome samples and 31,168 genome samples."),
    react_1.default.createElement("details", null,
        react_1.default.createElement("summary", null, "Expand to see details for past versions"),
        react_1.default.createElement("p", null, "For gnomAD v3, the age distribution is:"),
        react_1.default.createElement(ColumnsWrapper, null,
            react_1.default.createElement(Column, null,
                react_1.default.createElement(Histogram_1.default
                // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                , { 
                    // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                    binEdges: ageDistribution_json_2.default.genome.bin_edges, binValues: ageDistribution_json_2.default.genome.bin_freq, nSmaller: ageDistribution_json_2.default.genome.n_smaller, nLarger: ageDistribution_json_2.default.genome.n_larger, barColor: "#73ab3d", xLabel: "Age", yLabel: "Individuals", formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()} individuals` }))),
        react_1.default.createElement("p", null, "For gnomAD v2, the age distribution is:"),
        react_1.default.createElement(ColumnsWrapper, null,
            react_1.default.createElement(Column, null,
                react_1.default.createElement("p", null, "Exomes"),
                react_1.default.createElement(Histogram_1.default
                // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                , { 
                    // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                    binEdges: ageDistribution_json_3.default.exome.bin_edges, binValues: ageDistribution_json_3.default.exome.bin_freq, nSmaller: ageDistribution_json_3.default.exome.n_smaller, nLarger: ageDistribution_json_3.default.exome.n_larger, barColor: "#428bca", xLabel: "Age", yLabel: "Individuals", formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()} individuals` })),
            react_1.default.createElement(Column, null,
                react_1.default.createElement("p", null, "Genomes"),
                react_1.default.createElement(Histogram_1.default
                // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                , { 
                    // @ts-expect-error TS(2322) FIXME: Type '{ binEdges: any; binValues: any; nSmaller: a... Remove this comment to see the full error message
                    binEdges: ageDistribution_json_3.default.genome.bin_edges, binValues: ageDistribution_json_3.default.genome.bin_freq, nSmaller: ageDistribution_json_3.default.genome.n_smaller, nLarger: ageDistribution_json_3.default.genome.n_larger, barColor: "#73ab3d", xLabel: "Age", yLabel: "Individuals", formatTooltip: (bin) => `${bin.label}: ${bin.value.toLocaleString()} individuals` }))),
        react_1.default.createElement("p", null, "Please note that cohorts vary in how they report age (some report the age at diagnosis, others report the age of last visit, etc), so the ages associated with the gnomAD data can be thought of as the last known age of the individual. Information on age was not available for all samples. We have age data for 85,462 exome samples and 11,242 genome samples."))));
exports.renderAnswer = renderAnswer;
//# sourceMappingURL=what-is-the-age-distribution-in-gnomad.js.map