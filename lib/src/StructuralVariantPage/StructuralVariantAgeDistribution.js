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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const ageDistribution_json_1 = __importDefault(require("../../dataset-metadata/datasets/gnomad-sv-v2/ageDistribution.json"));
const Legend_1 = __importStar(require("../Legend"));
const StackedHistogram_1 = __importDefault(require("../StackedHistogram"));
const ControlSection_1 = __importDefault(require("../VariantPage/ControlSection"));
const LegendWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;
const CheckboxWrapper = styled_components_1.default.div `
  label {
    display: block;
    line-height: 1.5;
  }
`;
const StructuralVariantAgeDistribution = ({ variant }) => {
    const [includeHeterozygotes, setIncludeHeterozygotes] = (0, react_1.useState)(true);
    const [includeHomozygotes, setIncludeHomozygotes] = (0, react_1.useState)(true);
    const [showAllIndividuals, setShowAllIndividuals] = (0, react_1.useState)(true);
    // Only show histogram if there is data to show
    const isAgeDataAvailable = [
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ...variant.age_distribution.het.bin_freq,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        variant.age_distribution.het.n_smaller,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        variant.age_distribution.het.n_larger,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ...variant.age_distribution.hom.bin_freq,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        variant.age_distribution.hom.n_smaller,
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        variant.age_distribution.hom.n_larger,
    ].some((n) => n !== 0);
    if (!isAgeDataAvailable) {
        return react_1.default.createElement("p", null, "Age data is not available for this variant.");
    }
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const binEdges = variant.age_distribution.het.bin_edges;
    const bins = [
        `< ${binEdges[0]}`,
        ...[...Array(binEdges.length - 1)].map((_, i) => `${binEdges[i]}-${binEdges[i + 1]}`),
        `> ${binEdges[binEdges.length - 1]}`,
    ];
    const values = [
        [
            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
            (includeHeterozygotes ? variant.age_distribution.het.n_smaller : 0) +
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                (includeHomozygotes ? variant.age_distribution.hom.n_smaller : 0),
        ],
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ...[...Array(variant.age_distribution.het.bin_freq.length)].map((_, i) => [
            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
            (includeHeterozygotes ? variant.age_distribution.het.bin_freq[i] : 0) +
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                (includeHomozygotes ? variant.age_distribution.hom.bin_freq[i] : 0),
        ]),
        [
            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
            (includeHeterozygotes ? variant.age_distribution.het.n_larger : 0) +
                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                (includeHomozygotes ? variant.age_distribution.hom.n_larger : 0),
        ],
    ];
    const secondaryValues = [
        [ageDistribution_json_1.default.n_smaller],
        ...ageDistribution_json_1.default.bin_freq.map((n) => [n]),
        [ageDistribution_json_1.default.n_larger],
    ];
    const series = [{ label: 'Variant carriers', color: '#73ab3d' }];
    if (showAllIndividuals) {
        series.push({
            label: 'All individuals',
            // @ts-expect-error TS(2345) FIXME: Argument of type '{ label: string; swatch: JSX.Ele... Remove this comment to see the full error message
            swatch: react_1.default.createElement(Legend_1.StripedSwatch, { id: "age-distribution-legend-swatch", color: "#73ab3d" }),
        });
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(LegendWrapper, null,
            react_1.default.createElement(Legend_1.default, { series: series })),
        react_1.default.createElement(StackedHistogram_1.default
        // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: number... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: number... Remove this comment to see the full error message
            id: "age-distribution-plot", bins: bins, values: values, secondaryValues: showAllIndividuals ? secondaryValues : null, xLabel: "Age", yLabel: "Variant carriers", secondaryYLabel: "All individuals", barColors: ['#73ab3d'], formatTooltip: (bin, variantCarriersInBin, allIndividualsInBin) => {
                const nVariantCarriers = (0, d3_array_1.sum)(variantCarriersInBin);
                let tooltipText = `${nVariantCarriers.toLocaleString()} variant carrier${nVariantCarriers !== 1 ? 's' : ''}`;
                if (showAllIndividuals && allIndividualsInBin) {
                    const nTotalIndividuals = (0, d3_array_1.sum)(allIndividualsInBin);
                    tooltipText += ` and ${nTotalIndividuals.toLocaleString()} total individual${nTotalIndividuals !== 1 ? 's' : ''}`;
                }
                tooltipText += ` are in the ${bin} age range`;
                return tooltipText;
            } }),
        react_1.default.createElement(ControlSection_1.default, null,
            react_1.default.createElement(CheckboxWrapper, null,
                react_1.default.createElement(ui_1.Checkbox, { checked: includeHeterozygotes, id: "sv-age-distribution-include-heterozygotes", label: "Include heterozygous variant carriers", onChange: setIncludeHeterozygotes }),
                react_1.default.createElement(ui_1.Checkbox, { checked: includeHomozygotes, id: "sv-age-distribution-include-homozygotes", label: "Include homozygous variant carriers", onChange: setIncludeHomozygotes }),
                react_1.default.createElement(ui_1.Checkbox, { checked: showAllIndividuals, id: "age-distribution-show-all-individuals", label: "Compare to all individuals", onChange: setShowAllIndividuals })))));
};
exports.default = StructuralVariantAgeDistribution;
//# sourceMappingURL=StructuralVariantAgeDistribution.js.map