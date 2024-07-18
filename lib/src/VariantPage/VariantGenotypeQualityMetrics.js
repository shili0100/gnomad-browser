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
const metadata_1 = require("../../dataset-metadata/metadata");
const Legend_1 = __importStar(require("../Legend"));
const Link_1 = __importDefault(require("../Link"));
const StackedHistogram_1 = __importDefault(require("../StackedHistogram"));
const ControlSection_1 = __importDefault(require("./ControlSection"));
const LegendWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  margin-bottom: 1em;
`;
const prepareData = ({ includeExomes, includeGenomes, includeLargerBin = false, samples, selectedMetric, variant, }) => {
    const histogram = (variant.exome || variant.genome).quality_metrics[selectedMetric][samples];
    const nBins = histogram.bin_freq.length;
    const exomeData = includeExomes && variant.exome ? variant.exome.quality_metrics[selectedMetric][samples] : null;
    const genomeData = includeGenomes && variant.genome
        ? variant.genome.quality_metrics[selectedMetric][samples]
        : null;
    const values = [...Array(nBins)].map((_, i) => [
        exomeData ? exomeData.bin_freq[i] : 0,
        genomeData ? genomeData.bin_freq[i] : 0,
    ]);
    if (includeLargerBin) {
        values.push([exomeData ? exomeData.n_larger : 0, genomeData ? genomeData.n_larger : 0]);
    }
    return values;
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
const createTab = (showAllIndividuals, binEdges, includeExomes, includeGenomes, variant, id, label, xLabel, yLabel, secondaryYLabel, legendSwatchId) => {
    return {
        id,
        label,
        render: () => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(LegendWrapper, null,
                react_1.default.createElement(Legend_1.default, { series: [
                        { label: 'Exome', color: '#428bca' },
                        { label: 'Genome', color: '#73ab3d' },
                    ] }),
                showAllIndividuals && (react_1.default.createElement(Legend_1.default, { series: [
                        { label: 'Variant carriers', color: '#999' },
                        {
                            label: 'All individuals',
                            swatch: react_1.default.createElement(Legend_1.StripedSwatch, { id: legendSwatchId, color: "#999" }),
                        },
                    ] }))),
            react_1.default.createElement(StackedHistogram_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any[][... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any[][... Remove this comment to see the full error message
                id: `variant-${id}-plot`, bins: [
                    ...[...Array(binEdges.length - 1)].map((_, i) => `${binEdges[i]}-${binEdges[i + 1]}`),
                    `> ${binEdges[binEdges.length - 1]}`,
                ], values: prepareData({
                    includeExomes,
                    includeGenomes,
                    includeLargerBin: true,
                    samples: 'alt',
                    selectedMetric: id,
                    variant,
                }), secondaryValues: showAllIndividuals && id !== 'allele_balance'
                    ? prepareData({
                        includeExomes,
                        includeGenomes,
                        includeLargerBin: true,
                        samples: 'all',
                        selectedMetric: id,
                        variant,
                    })
                    : null, xLabel: xLabel, yLabel: yLabel, secondaryYLabel: secondaryYLabel, barColors: ['#428bca', '#73ab3d'], formatTooltip: (bin, variantCarriersInBin, allIndividualsInBin) => {
                    const nVariantCarriers = (0, d3_array_1.sum)(variantCarriersInBin);
                    if (id === 'allele_balance') {
                        return `${nVariantCarriers.toLocaleString()} heterozygous variant carrier${nVariantCarriers !== 1 ? 's have' : ' has'} an allele balance in the ${bin} range`;
                    }
                    let tooltipText = `${nVariantCarriers.toLocaleString()} variant carrier${nVariantCarriers !== 1 ? 's' : ''}`;
                    if (showAllIndividuals) {
                        const nTotalIndividuals = (0, d3_array_1.sum)(allIndividualsInBin);
                        tooltipText += ` and ${nTotalIndividuals.toLocaleString()} total individual${nTotalIndividuals !== 1 ? 's' : ''}`;
                    }
                    tooltipText += ` ${nVariantCarriers === 1 && !showAllIndividuals ? 'has' : 'have'} ${xLabel.toLowerCase()} in the ${bin} range`;
                    return tooltipText;
                } }))),
    };
};
const VariantGenotypeQualityMetrics = ({ datasetId, variant, }) => {
    const [selectedMetric, setSelectedMetric] = (0, react_1.useState)('genotype_quality');
    const [showAllIndividuals, setShowAllIndividuals] = (0, react_1.useState)(true);
    const [selectedSequencingType, setSelectedSequencingType] = (0, react_1.useState)(getDefaultSelectedSequencingType(variant)); // 'eg', 'e', 'g'
    const includeExomes = selectedSequencingType.includes('e');
    const includeGenomes = selectedSequencingType.includes('g');
    const hasQualityMetric = (variant.exome &&
        variant.exome.quality_metrics &&
        variant.exome.quality_metrics[selectedMetric] &&
        variant.exome.quality_metrics[selectedMetric].alt) ||
        (variant.genome &&
            variant.genome.quality_metrics &&
            variant.genome.quality_metrics[selectedMetric] &&
            variant.genome.quality_metrics[selectedMetric].alt);
    if (!hasQualityMetric) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            "Genotype quality metrics not available for this variant. Variants added due to",
            ' ',
            react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/news/2023-11-gnomad-v4-0/#hgdp1kg-genetic-ancestry-group-updates--subset-frequencies" }, "updates to the HGDP and 1KG subset"),
            ' ',
            "do not have quality metrics available."));
    }
    // @ts-ignore
    const binEdges = (variant.exome || variant.genome).quality_metrics[selectedMetric].alt.bin_edges;
    const tabs = [
        createTab(showAllIndividuals, binEdges, includeExomes, includeGenomes, variant, 'genotype_quality', 'Genotype quality', 'Genotype quality', 'Variant carriers', 'All individuals', 'genotype-quality-legend-swatch'),
        createTab(showAllIndividuals, binEdges, includeExomes, includeGenomes, variant, 'genotype_depth', 'Depth', 'Depth', 'Variant carriers', 'All individuals', 'depth-legend-swatch')
    ];
    if ((0, metadata_1.hasAlleleBalance)(datasetId)) {
        tabs.push(createTab(showAllIndividuals, binEdges, includeExomes, includeGenomes, variant, 'allele_balance', 'Allele balance for heterozygotes', 'Allele balance', 'Heterozygous variant carriers', '', // No secondaryYLabel
        ''));
    }
    ;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ui_1.Tabs, { activeTabId: selectedMetric, tabs: tabs, onChange: setSelectedMetric }),
        react_1.default.createElement(ControlSection_1.default, null,
            react_1.default.createElement(ui_1.Checkbox, { checked: selectedMetric !== 'allele_balance' && showAllIndividuals, disabled: selectedMetric === 'allele_balance', id: "genotype-quality-metrics-show-all-individuals", label: "Compare to all individuals", onChange: setShowAllIndividuals }),
            react_1.default.createElement("label", { htmlFor: "genotype-quality-metrics-sequencing-type" },
                "Sequencing types: ",
                react_1.default.createElement(ui_1.Select, { id: "genotype-quality-metrics-sequencing-type", disabled: !variant.exome || !variant.genome, onChange: (e) => {
                        setSelectedSequencingType(e.target.value);
                    }, value: selectedSequencingType },
                    react_1.default.createElement("option", { value: "eg" }, "Exome and Genome"),
                    react_1.default.createElement("option", { value: "e" }, "Exome"),
                    react_1.default.createElement("option", { value: "g" }, "Genome")))),
        (0, metadata_1.metricsIncludeLowQualityGenotypes)(datasetId) && (react_1.default.createElement("p", null, "Note: This plot may include low-quality genotypes that were excluded from allele counts in the tables above."))));
};
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ bin_edges: Validato... Remove this comment to see the full error message
const HistogramPropType = prop_types_1.default.shape({
    bin_edges: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
    bin_freq: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
    n_smaller: prop_types_1.default.number,
    n_larger: prop_types_1.default.number,
});
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ allele_balance: Req... Remove this comment to see the full error message
const GenotypeQualityMetricPropType = prop_types_1.default.shape({
    allele_balance: prop_types_1.default.shape({
        alt: HistogramPropType,
    }),
    genotype_depth: prop_types_1.default.shape({
        all: HistogramPropType,
        alt: HistogramPropType,
    }).isRequired,
    genotype_quality: prop_types_1.default.shape({
        all: HistogramPropType,
        alt: HistogramPropType,
    }).isRequired,
});
exports.default = VariantGenotypeQualityMetrics;
//# sourceMappingURL=VariantGenotypeQualityMetrics.js.map