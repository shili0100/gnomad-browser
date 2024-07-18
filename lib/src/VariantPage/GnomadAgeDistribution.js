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
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const ageDistribution_json_1 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v2/ageDistribution.json"));
const ageDistribution_json_2 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v3/ageDistribution.json"));
const ageDistribution_json_3 = __importDefault(require("../../dataset-metadata/datasets/gnomad-v4/ageDistribution.json"));
const metadata_1 = require("../../dataset-metadata/metadata");
const Legend_1 = __importStar(require("../Legend"));
const StackedHistogram_1 = __importDefault(require("../StackedHistogram"));
const ControlSection_1 = __importDefault(require("./ControlSection"));
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
const prepareVariantData = ({ includeExomes, includeGenomes, includeHeterozygotes, includeHomozygotes, variant, }) => {
    const histogram = (variant.exome || variant.genome).age_distribution.het;
    const nBins = histogram.bin_freq.length;
    const exomeData = includeExomes && variant.exome ? variant.exome.age_distribution : null;
    const genomeData = includeGenomes && variant.genome ? variant.genome.age_distribution : null;
    return [
        [
            exomeData
                ? (includeHeterozygotes && exomeData.het ? exomeData.het.n_smaller : 0) +
                    (includeHomozygotes && exomeData.hom ? exomeData.hom.n_smaller : 0)
                : 0,
            genomeData
                ? (includeHeterozygotes && genomeData.het ? genomeData.het.n_smaller : 0) +
                    (includeHomozygotes && genomeData.hom ? genomeData.hom.n_smaller : 0)
                : 0,
        ],
        ...[...Array(nBins)].map((_, i) => [
            exomeData
                ? (includeHeterozygotes && exomeData.het ? exomeData.het.bin_freq[i] : 0) +
                    (includeHomozygotes && exomeData.hom ? exomeData.hom.bin_freq[i] : 0)
                : 0,
            genomeData
                ? (includeHeterozygotes && genomeData.het ? genomeData.het.bin_freq[i] : 0) +
                    (includeHomozygotes && genomeData.hom ? genomeData.hom.bin_freq[i] : 0)
                : 0,
        ]),
        [
            exomeData
                ? (includeHeterozygotes && exomeData.het ? exomeData.het.n_larger : 0) +
                    (includeHomozygotes && exomeData.hom ? exomeData.hom.n_larger : 0)
                : 0,
            genomeData
                ? (includeHeterozygotes && genomeData.het ? genomeData.het.n_larger : 0) +
                    (includeHomozygotes && genomeData.hom ? genomeData.hom.n_larger : 0)
                : 0,
        ],
    ];
};
const prepareOverallData = ({ datasetId, includeExomes, includeGenomes }) => {
    let overallAgeDistribution = null;
    if ((0, metadata_1.isV4)(datasetId)) {
        overallAgeDistribution = ageDistribution_json_3.default;
    }
    else if ((0, metadata_1.isV3)(datasetId)) {
        overallAgeDistribution = ageDistribution_json_2.default;
    }
    else if ((0, metadata_1.isV2)(datasetId)) {
        overallAgeDistribution = ageDistribution_json_1.default;
    }
    if (!overallAgeDistribution) {
        return null;
    }
    // @ts-expect-error
    const nBins = (overallAgeDistribution.exome || overallAgeDistribution.genome).bin_freq.length;
    const exomeData = 
    // @ts-expect-error
    includeExomes && overallAgeDistribution.exome ? overallAgeDistribution.exome : null;
    const genomeData = includeGenomes && overallAgeDistribution.genome ? overallAgeDistribution.genome : null;
    return [
        [exomeData ? exomeData.n_smaller : 0, genomeData ? genomeData.n_smaller : 0],
        ...[...Array(nBins)].map((_, i) => [
            exomeData ? exomeData.bin_freq[i] : 0,
            genomeData ? genomeData.bin_freq[i] : 0,
        ]),
        [exomeData ? exomeData.n_larger : 0, genomeData ? genomeData.n_larger : 0],
    ];
};
const getDefaultSelectedSequencingType = (variant) => {
    const hasExome = Boolean(variant.exome);
    const hasGenome = Boolean(variant.genome);
    if (hasExome && hasGenome) {
        return 'eg';
    }
    if (hasExome) {
        return 'e';
    }
    return 'g';
};
const GnomadAgeDistribution = ({ datasetId, variant }) => {
    const [selectedSequencingType, setSelectedSequencingType] = (0, react_1.useState)(getDefaultSelectedSequencingType(variant));
    const [includeHeterozygotes, setIncludeHeterozygotes] = (0, react_1.useState)(true);
    const [includeHomozygotes, setIncludeHomozygotes] = (0, react_1.useState)(true);
    const showVariantCarriers = includeHeterozygotes || includeHomozygotes;
    const [showAllIndividuals, setShowAllIndividuals] = (0, react_1.useState)((0, metadata_1.showAllIndividualsInAgeDistributionByDefault)(datasetId));
    const hasAgeDistribution = (variant.exome && variant.exome.age_distribution && variant.exome.age_distribution.het) ||
        (variant.genome && variant.genome.age_distribution && variant.genome.age_distribution.het);
    if (!hasAgeDistribution) {
        return react_1.default.createElement(react_1.default.Fragment, null, "Age distribution not available for this variant.");
    }
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const binEdges = (variant.exome || variant.genome).age_distribution.het.bin_edges;
    const bins = [
        `< ${binEdges[0]}`,
        ...[...Array(binEdges.length - 1)].map((_, i) => `${binEdges[i]}-${binEdges[i + 1]}`),
        `> ${binEdges[binEdges.length - 1]}`,
    ];
    const variantCarrierValues = prepareVariantData({
        includeExomes: selectedSequencingType.includes('e'),
        includeGenomes: selectedSequencingType.includes('g'),
        includeHeterozygotes,
        includeHomozygotes,
        variant,
    });
    const allIndividualsValues = prepareOverallData({
        datasetId,
        includeExomes: selectedSequencingType.includes('e'),
        includeGenomes: selectedSequencingType.includes('g'),
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(LegendWrapper, null,
            react_1.default.createElement(Legend_1.default, { series: [
                    { label: 'Exome', color: '#428bca' },
                    { label: 'Genome', color: '#73ab3d' },
                ] }),
            showAllIndividuals && (react_1.default.createElement(Legend_1.default, { series: [
                    { label: 'Variant carriers', color: '#999' },
                    {
                        label: 'All individuals',
                        swatch: react_1.default.createElement(Legend_1.StripedSwatch, { id: "age-distribution-legend-swatch", color: "#999" }),
                    },
                ] }))),
        react_1.default.createElement(StackedHistogram_1.default
        // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any[][... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any[][... Remove this comment to see the full error message
            id: "age-distribution-plot", bins: bins, values: variantCarrierValues, secondaryValues: showAllIndividuals ? allIndividualsValues : null, xLabel: "Age", yLabel: "Variant carriers", secondaryYLabel: "All individuals", barColors: ['#428bca', '#73ab3d'], formatTooltip: (bin, variantCarriersInBin, allIndividualsInBin) => {
                if (!showVariantCarriers && !showAllIndividuals) {
                    return `${bin} age range`;
                }
                let tooltipText = '';
                const nVariantCarriers = showVariantCarriers ? (0, d3_array_1.sum)(variantCarriersInBin) : 0;
                if (showVariantCarriers) {
                    let carriersDescription = '';
                    if (includeHeterozygotes && !includeHomozygotes) {
                        carriersDescription = 'heterozygous ';
                    }
                    else if (!includeHeterozygotes && includeHomozygotes) {
                        carriersDescription = 'homozygous ';
                    }
                    tooltipText = `${nVariantCarriers.toLocaleString()} ${carriersDescription}variant carrier${nVariantCarriers !== 1 ? 's' : ''}`;
                }
                const nTotalIndividuals = showAllIndividuals && allIndividualsInBin ? (0, d3_array_1.sum)(allIndividualsInBin) : 0;
                if (showAllIndividuals && allIndividualsInBin) {
                    if (showVariantCarriers) {
                        tooltipText += ' and ';
                    }
                    tooltipText += `${nTotalIndividuals.toLocaleString()} total individual${nTotalIndividuals ? 's' : ''}`;
                }
                tooltipText += ` ${showVariantCarriers !== showAllIndividuals && nVariantCarriers + nTotalIndividuals === 1
                    ? 'is'
                    : 'are'} in the ${bin} age range`;
                return tooltipText;
            } }),
        react_1.default.createElement(ControlSection_1.default, null,
            react_1.default.createElement(CheckboxWrapper, null,
                react_1.default.createElement(ui_1.Checkbox, { checked: includeHeterozygotes, id: "age-distribution-include-heterozygotes", label: "Include heterozygous variant carriers", onChange: setIncludeHeterozygotes }),
                react_1.default.createElement(ui_1.Checkbox, { checked: includeHomozygotes, id: "age-distribution-include-homozygotes", label: variant.chrom === 'X' || variant.chrom === 'Y'
                        ? 'Include homozygous and hemizygous variant carriers'
                        : 'Include homozygous variant carriers', onChange: setIncludeHomozygotes }),
                react_1.default.createElement(ui_1.Checkbox, { checked: showAllIndividuals, disabled: allIndividualsValues === null, id: "age-distribution-show-all-individuals", label: "Compare to all individuals", onChange: setShowAllIndividuals })),
            react_1.default.createElement("label", { htmlFor: "age-distribution-sequencing-type" },
                "Sequencing types: ",
                react_1.default.createElement(ui_1.Select, { id: "age-distribution-sequencing-type", disabled: !variant.exome || !variant.genome, onChange: (e) => {
                        setSelectedSequencingType(e.target.value);
                    }, value: selectedSequencingType },
                    react_1.default.createElement("option", { value: "eg" }, "Exome and Genome"),
                    react_1.default.createElement("option", { value: "e" }, "Exome"),
                    react_1.default.createElement("option", { value: "g" }, "Genome"))))));
};
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ het: Validator<Infe... Remove this comment to see the full error message
const AgeDistributionPropType = prop_types_1.default.shape({
    het: prop_types_1.default.shape({
        bin_edges: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
        bin_freq: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
        n_smaller: prop_types_1.default.number,
        n_larger: prop_types_1.default.number,
    }).isRequired,
    hom: prop_types_1.default.shape({
        bin_edges: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
        bin_freq: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
        n_smaller: prop_types_1.default.number,
        n_larger: prop_types_1.default.number,
    }).isRequired,
});
exports.default = GnomadAgeDistribution;
//# sourceMappingURL=GnomadAgeDistribution.js.map