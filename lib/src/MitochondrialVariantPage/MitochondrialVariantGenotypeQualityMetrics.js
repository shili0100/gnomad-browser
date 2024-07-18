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
const Link_1 = __importDefault(require("../Link"));
const StackedHistogram_1 = __importDefault(require("../StackedHistogram"));
const LegendWrapper = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  margin-bottom: 1em;
`;
const MitochondrialVariantGenotypeDepth = ({ variant }) => {
    const [showAllIndividuals, setShowAllIndividuals] = (0, react_1.useState)(true);
    const series = [{ label: 'Variant carriers', color: '#73ab3d' }];
    if (showAllIndividuals) {
        series.push({
            label: 'All individuals',
            swatch: react_1.default.createElement(Legend_1.StripedSwatch, { id: "depth-legend-swatch", color: "#73ab3d" }),
        });
    }
    const metric = variant.genotype_quality_metrics.find(({ name }) => name === 'Depth');
    if (metric && metric.alt !== null && metric.all !== null) {
        const binEdges = metric.alt.bin_edges;
        const bins = [
            ...[...Array(binEdges.length - 1)].map((_, i) => `${binEdges[i]}-${binEdges[i + 1]}`),
            `> ${binEdges[binEdges.length - 1]}`,
        ];
        const values = [...metric.alt.bin_freq.map((n) => [n]), [metric.alt.n_larger]];
        const secondaryValues = [...metric.all.bin_freq.map((n) => [n]), [metric.all.n_larger]];
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(LegendWrapper, { style: { marginTop: '1em' } },
                react_1.default.createElement(Legend_1.default, { series: series })),
            react_1.default.createElement(StackedHistogram_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any[];... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any[];... Remove this comment to see the full error message
                id: "variant-depth-plot", bins: bins, values: values, secondaryValues: showAllIndividuals ? secondaryValues : null, xLabel: "Depth", yLabel: "Variant carriers", secondaryYLabel: "All individuals", barColors: ['#73ab3d'], formatTooltip: (bin, variantCarriersInBin, allIndividualsInBin) => {
                    const nVariantCarriers = (0, d3_array_1.sum)(variantCarriersInBin);
                    let tooltipText = `${nVariantCarriers.toLocaleString()} variant carrier${nVariantCarriers !== 1 ? 's' : ''}`;
                    if (showAllIndividuals) {
                        const nTotalIndividuals = (0, d3_array_1.sum)(allIndividualsInBin);
                        tooltipText += ` and ${nTotalIndividuals.toLocaleString()} total individual${nTotalIndividuals !== 1 ? 's' : ''}`;
                    }
                    tooltipText += ` ${nVariantCarriers === 1 && !showAllIndividuals ? 'has' : 'have'} depth in the ${bin} range`;
                    return tooltipText;
                } }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(ui_1.Checkbox, { checked: showAllIndividuals, id: "mt-variant-depth-show-all-individuals", label: "Compare to all individuals", onChange: setShowAllIndividuals }))));
    }
    return null;
};
const FilterOptions = ({ filters }) => (react_1.default.createElement(react_1.default.Fragment, null, filters.map((filter) => {
    const totalFailedFilter = filter.filtered
        ? filter.filtered.bin_freq.reduce((acc, n) => acc + n, 0)
        : 0;
    return (react_1.default.createElement("option", { key: filter.name, value: filter.name },
        filter.name,
        " (",
        totalFailedFilter,
        " individuals failing)"));
})));
const MitochondrialVariantGenotypeQualityFilters = ({ variant, }) => {
    const [selectedFilter, setSelectedFilter] = (0, react_1.useState)(variant.genotype_quality_filters[0].name);
    const filter = variant.genotype_quality_filters.find(({ name }) => name === selectedFilter);
    if (filter && filter.filtered !== null) {
        const histogram = filter.filtered;
        const binEdges = histogram.bin_edges;
        const bins = [...Array(binEdges.length - 1)].map((_, i) => `${binEdges[i]}-${binEdges[i + 1]}`);
        const values = histogram.bin_freq.map((n) => [n]);
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { height: '16px', margin: '1em 0' } }),
            react_1.default.createElement(StackedHistogram_1.default
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any; x... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ id: string; bins: string[]; values: any; x... Remove this comment to see the full error message
                id: "mt-genotype-filter-plot", bins: bins, values: values, xLabel: "Heteroplasmy level", yLabel: "Individuals failing filter", barColors: ['#73ab3d'], formatTooltip: (bin, individualsInBin) => {
                    const nIndividuals = (0, d3_array_1.sum)(individualsInBin);
                    return `${nIndividuals.toLocaleString()} individuals${nIndividuals === 1 ? 's' : ''} with a heteroplasmy level in the ${bin} range failed the ${selectedFilter} filter`;
                } }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", { htmlFor: "mt-genotype-quality-filter" },
                    "Filter: ",
                    react_1.default.createElement(ui_1.Select, { id: "mt-genotype-quality-filter", onChange: (e) => {
                            setSelectedFilter(e.target.value);
                        }, value: selectedFilter },
                        react_1.default.createElement(FilterOptions, { filters: variant.genotype_quality_filters })))),
            react_1.default.createElement("p", null,
                "Note: This plot may include low-quality genotypes that were excluded from allele counts in the tables above.",
                ' ',
                react_1.default.createElement(Link_1.default, { to: "/help/what-are-the-meanings-of-the-mitochondrial-specific-filters-and-flags" }, "More information."))));
    }
    return null;
};
const MitochondrialVariantGenotypeQualityMetrics = ({ variant, }) => {
    const [selectedTab, setSelectedTab] = (0, react_1.useState)('depth'); // 'depth' or 'filter'
    return (react_1.default.createElement(ui_1.Tabs, { activeTabId: selectedTab, onChange: setSelectedTab, tabs: [
            {
                id: 'depth',
                label: 'Depth',
                render: () => react_1.default.createElement(MitochondrialVariantGenotypeDepth, { variant: variant }),
            },
            {
                id: 'filters',
                label: 'Filters',
                render: () => react_1.default.createElement(MitochondrialVariantGenotypeQualityFilters, { variant: variant }),
            },
        ] }));
};
exports.default = MitochondrialVariantGenotypeQualityMetrics;
//# sourceMappingURL=MitochondrialVariantGenotypeQualityMetrics.js.map