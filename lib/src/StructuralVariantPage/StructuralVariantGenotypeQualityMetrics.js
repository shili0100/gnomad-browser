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
const Legend_1 = __importStar(require("../Legend"));
const StackedHistogram_1 = __importDefault(require("../StackedHistogram"));
const LegendWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;
const StructuralVariantGenotypeQualityMetrics = ({ variant }) => {
    const [showAllIndividuals, setShowAllIndividuals] = (0, react_1.useState)(true);
    const series = [{ label: 'Variant carriers', color: '#73ab3d' }];
    if (showAllIndividuals) {
        series.push({
            label: 'All individuals',
            // @ts-expect-error TS(2345) FIXME: Argument of type '{ label: string; swatch: JSX.Ele... Remove this comment to see the full error message
            swatch: react_1.default.createElement(Legend_1.StripedSwatch, { id: "sv-genotype-quality-legend-swatch", color: "#73ab3d" }),
        });
    }
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const binEdges = variant.genotype_quality.alt.bin_edges;
    const bins = [
        ...[...Array(binEdges.length - 1)].map((_, i) => `${binEdges[i]}-${binEdges[i + 1]}`),
        `> ${binEdges[binEdges.length - 1]}`,
    ];
    const values = [
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ...variant.genotype_quality.alt.bin_freq.map((n) => [n]),
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        [variant.genotype_quality.alt.n_larger],
    ];
    const secondaryValues = [
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ...variant.genotype_quality.all.bin_freq.map((n) => [n]),
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        [variant.genotype_quality.all.n_larger],
    ];
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(LegendWrapper, { style: { marginTop: '1em' } },
            react_1.default.createElement(Legend_1.default, { series: series })),
        react_1.default.createElement(StackedHistogram_1.default
        // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: number... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: number... Remove this comment to see the full error message
            id: "sv-genotype-quality", bins: bins, values: values, secondaryValues: showAllIndividuals ? secondaryValues : null, xLabel: "Genotype quality", yLabel: "Variant carriers", secondaryYLabel: "All individuals", barColors: ['#73ab3d'], formatTooltip: (bin, variantCarriersInBin, allIndividualsInBin) => {
                const nVariantCarriers = (0, d3_array_1.sum)(variantCarriersInBin);
                let tooltipText = `${nVariantCarriers.toLocaleString()} variant carrier${nVariantCarriers !== 1 ? 's' : ''}`;
                if (showAllIndividuals) {
                    const nTotalIndividuals = (0, d3_array_1.sum)(allIndividualsInBin);
                    tooltipText += ` and ${nTotalIndividuals.toLocaleString()} total individual${nTotalIndividuals !== 1 ? 's' : ''}`;
                }
                tooltipText += ` ${nVariantCarriers === 1 && !showAllIndividuals ? 'has' : 'have'} genotype quality in the ${bin} range`;
                return tooltipText;
            } }),
        react_1.default.createElement("div", null,
            react_1.default.createElement(ui_1.Checkbox, { checked: showAllIndividuals, id: "sv-genotype-quality-show-all-individuals", label: "Compare to all individuals", onChange: setShowAllIndividuals }))));
};
exports.default = StructuralVariantGenotypeQualityMetrics;
//# sourceMappingURL=StructuralVariantGenotypeQualityMetrics.js.map