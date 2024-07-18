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
exports.homozygousVariantCooccurrenceAfCutoffs = exports.heterozygousVariantCooccurrenceAfCutoffs = exports.homozygousVariantCooccurrenceSeverities = exports.heterozygousVariantCooccurrenceSeverities = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
exports.heterozygousVariantCooccurrenceSeverities = [
    'lof_lof',
    'lof_strong_revel_missense_or_worse',
    'lof_moderate_revel_missense_or_worse',
    'lof_supporting_revel_missense_or_worse',
    'strong_revel_missense_or_worse_strong_revel_missense_or_worse',
    'strong_revel_missense_or_worse_moderate_revel_missense_or_worse',
    'strong_revel_missense_or_worse_supporting_revel_missense_or_worse',
    'moderate_revel_missense_or_worse_moderate_revel_missense_or_worse',
    'missense_or_worse_missense_or_worse',
    'synonymous_or_worse_synonymous_or_worse',
    'supporting_revel_missense_or_worse_supporting_revel_missense_or_worse',
];
exports.homozygousVariantCooccurrenceSeverities = [
    'lof',
    'strong_revel_missense_or_worse',
    'moderate_revel_missense_or_worse',
    'supporting_revel_missense_or_worse',
    'missense_or_worse',
    'synonymous_or_worse',
];
exports.heterozygousVariantCooccurrenceAfCutoffs = [
    'af_cutoff_0_05',
    'af_cutoff_0_02',
    'af_cutoff_0_015',
    'af_cutoff_0_01',
    'af_cutoff_0_005',
];
exports.homozygousVariantCooccurrenceAfCutoffs = [
    'af_cutoff_0_05',
    'af_cutoff_0_01',
    'af_cutoff_0_005',
];
const AF_CUTOFF_LABELS = {
    af_cutoff_0_05: '5%',
    af_cutoff_0_02: '2%',
    af_cutoff_0_015: '1.5%',
    af_cutoff_0_01: '1%',
    af_cutoff_0_005: '0.5%',
};
const SEVERITY_LABELS = {
    lof_lof: 'pLoF + pLoF',
    strong_revel_missense_or_worse_strong_revel_missense_or_worse: 'strong missense or worse + strong missense or worse',
    moderate_revel_missense_or_worse_moderate_revel_missense_or_worse: 'moderate missense or worse + moderate missense or worse',
    supporting_revel_missense_or_worse_supporting_revel_missense_or_worse: 'weak missense or worse + weak missense or worse',
    missense_or_worse_missense_or_worse: 'missense or worse + missense or worse',
    synonymous_or_worse_synonymous_or_worse: 'synonymous or worse + synonymous or worse',
    lof_strong_revel_missense_or_worse: 'pLoF + strong missense or worse',
    lof_moderate_revel_missense_or_worse: 'pLoF + moderate missense or worse',
    lof_supporting_revel_missense_or_worse: 'pLoF + weak missense or worse',
    strong_revel_missense_or_worse_moderate_revel_missense_or_worse: 'strong missense or worse + moderate missense or worse',
    strong_revel_missense_or_worse_supporting_revel_missense_or_worse: 'strong missense or worse + weak missense or worse',
    lof: 'pLoF',
    strong_revel_missense_or_worse: 'strong missense or worse',
    moderate_revel_missense_or_worse: 'moderate missense or worse',
    supporting_revel_missense_or_worse: 'weak missense or worse',
    missense_or_worse: 'missense or worse',
    synonymous_or_worse: 'synonymous or worse',
};
const SEVERITY_TOOLTIPS = {
    lof_lof: 'This category includes variant pairs where both variants were pLoF.',
    lof_strong_revel_missense_or_worse: 'This category includes variant pairs where one variant was pLoF and the other variant was a pLoF variant or a missense variant with a REVEL score ≥ 0.932.',
    lof_moderate_revel_missense_or_worse: 'This category includes variant pairs where one variant was pLoF and the other variant was a pLoF variant or a missense variant with a REVEL score ≥ 0.773.',
    lof_supporting_revel_missense_or_worse: 'This category includes variant pairs where one variant was pLoF and the other variant was a pLoF variant or a missense variant with a REVEL score ≥ 0.644.',
    strong_revel_missense_or_worse_strong_revel_missense_or_worse: 'This category includes variant pairs where both variants were either pLoFs or missense variants with a REVEL score ≥ 0.932.',
    strong_revel_missense_or_worse_moderate_revel_missense_or_worse: 'This category includes variant pairs where one variant was either a pLoF variant or a missense variant with a REVEL score ≥ 0.932 and the other variant was either a pLoF variant or a missense variant with a REVEL score ≥ 0.773.',
    strong_revel_missense_or_worse_supporting_revel_missense_or_worse: 'This category includes variant pairs where one variant was either a pLoF variant or a missense variant with a REVEL score ≥ 0.932 and the other variant was either a pLoF variant or a missense variant with a REVEL score ≥ 0.644.',
    moderate_revel_missense_or_worse_moderate_revel_missense_or_worse: 'This category includes variant pairs where both variants were either pLoFs or missense variants with a REVEL score ≥ 0.773.',
    supporting_revel_missense_or_worse_supporting_revel_missense_or_worse: 'This category includes variant pairs where both variants were either pLoFs or missense variants with a REVEL score ≥ 0.644.',
    missense_or_worse_missense_or_worse: 'This category includes variant pairs where both variants were either pLoFs or missense variants (any REVEL score).',
    synonymous_or_worse_synonymous_or_worse: 'This category includes variant pairs where both variants were either pLoFs, missense variants (any REVEL score), or synonymous variants.',
    lof: 'This category includes pLoF variants.',
    strong_revel_missense_or_worse: 'This category includes pLoF variants and missense variants with a REVEL score of ≥ 0.932.',
    moderate_revel_missense_or_worse: 'This category includes pLoF variants and missense variants with a REVEL score of ≥ 0.773.',
    supporting_revel_missense_or_worse: 'This category includes pLoF variants and missense variants with a REVEL score of ≥ 0.644.',
    missense_or_worse: 'This category includes pLoF variants and missense variants (any REVEL score).',
    synonymous_or_worse: 'This category includes pLoF variants, missense variants (any REVEL score), and synonymous variants.',
};
const Table = (0, styled_components_1.default)(ui_1.BaseTable) `
  width: 95%;
`;
const ModeToggle = (0, styled_components_1.default)(ui_1.Button) `
  margin: 1em 0 2em 0;
`;
const HeterozygousCountCell = ({ variant_cooccurrence_counts, severity, afCutoff, }) => {
    const counts = (variant_cooccurrence_counts[severity] &&
        variant_cooccurrence_counts[severity][afCutoff]) || {
        in_cis: 0,
        in_trans: 0,
        unphased: 0,
        two_het_total: 0,
    };
    const tooltipContent = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("table", null,
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "two het variants:"),
                    react_1.default.createElement("td", null, counts.two_het_total)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        "in ",
                        react_1.default.createElement("i", null, "trans"),
                        ":"),
                    react_1.default.createElement("td", null, counts.in_trans)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "unphased:"),
                    react_1.default.createElement("td", null,
                        " ",
                        counts.unphased)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null,
                        "in ",
                        react_1.default.createElement("i", null, "cis"),
                        ":"),
                    react_1.default.createElement("td", null,
                        " ",
                        counts.in_cis))))));
    return (react_1.default.createElement("td", { key: afCutoff },
        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltipContent },
            react_1.default.createElement(ui_1.TooltipHint, null,
                counts.two_het_total,
                " (",
                counts.in_trans,
                ")"))));
};
const HomozygousCountCell = ({ variant_cooccurrence_counts, severity, afCutoff, }) => {
    const counts = (variant_cooccurrence_counts[severity] &&
        variant_cooccurrence_counts[severity][afCutoff]) || { hom_total: 0 };
    return react_1.default.createElement("td", { key: afCutoff }, counts.hom_total);
};
const RowContent = ({ variant_cooccurrence_counts, severity, afCutoffs, dataCellComponent, }) => (react_1.default.createElement(react_1.default.Fragment, null, afCutoffs.map((afCutoff) => dataCellComponent({
    variant_cooccurrence_counts,
    severity,
    afCutoff,
    key: `${afCutoff}`,
}))));
const VariantCooccurrenceCountsTableContent = ({ variant_cooccurrence_counts, afCutoffs, severities, dataCellComponent, caption, }) => {
    const afCutoffWidth = `${45.0 / afCutoffs.length}%`;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("colgroup", null,
            react_1.default.createElement("col", { style: { width: '45%' } }),
            afCutoffs.map((afCutoff) => (react_1.default.createElement("col", { key: afCutoff, style: { width: afCutoffWidth } })))),
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { colSpan: afCutoffs.length + 1 }, caption)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null, "Consequence"),
                react_1.default.createElement("th", { colSpan: afCutoffs.length }, "Allele frequency")),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null),
                afCutoffs.map((afCutoff) => (react_1.default.createElement("th", { key: `${afCutoff}` },
                    "\u2264\u00A0",
                    AF_CUTOFF_LABELS[afCutoff]))))),
        react_1.default.createElement("tbody", null, severities.map((severity) => {
            const severityLabel = SEVERITY_LABELS[severity];
            const tooltipContent = SEVERITY_TOOLTIPS[severity];
            const severityTitle = tooltipContent ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltipContent },
                    react_1.default.createElement(ui_1.TooltipHint, null, severityLabel)))) : (severityLabel);
            return (react_1.default.createElement("tr", { key: `${severity}` },
                react_1.default.createElement("td", null, severityTitle),
                react_1.default.createElement(RowContent, { variant_cooccurrence_counts: variant_cooccurrence_counts, severity: severity, afCutoffs: afCutoffs, dataCellComponent: dataCellComponent, key: `${severity}` })));
        }))));
};
const HeterozygousVariantCooccurrenceCountsTable = ({ variant_cooccurrence_counts, }) => (react_1.default.createElement(Table, null,
    react_1.default.createElement(VariantCooccurrenceCountsTableContent, { variant_cooccurrence_counts: variant_cooccurrence_counts, afCutoffs: [
            'af_cutoff_0_05',
            'af_cutoff_0_01',
            'af_cutoff_0_005',
        ], severities: [
            'lof_lof',
            'strong_revel_missense_or_worse_strong_revel_missense_or_worse',
            'moderate_revel_missense_or_worse_moderate_revel_missense_or_worse',
            'supporting_revel_missense_or_worse_supporting_revel_missense_or_worse',
            'missense_or_worse_missense_or_worse',
            'synonymous_or_worse_synonymous_or_worse',
        ], dataCellComponent: HeterozygousCountCell, caption: react_1.default.createElement(HeterozygousCaption, null) })));
const ExpandedHeterozygousVariantCooccurrenceCountsTable = ({ variant_cooccurrence_counts, }) => (react_1.default.createElement(Table, null,
    react_1.default.createElement(VariantCooccurrenceCountsTableContent, { variant_cooccurrence_counts: variant_cooccurrence_counts, afCutoffs: [
            'af_cutoff_0_05',
            'af_cutoff_0_02',
            'af_cutoff_0_015',
            'af_cutoff_0_01',
            'af_cutoff_0_005',
        ], severities: [
            'lof_lof',
            'lof_strong_revel_missense_or_worse',
            'lof_moderate_revel_missense_or_worse',
            'lof_supporting_revel_missense_or_worse',
            'strong_revel_missense_or_worse_strong_revel_missense_or_worse',
            'strong_revel_missense_or_worse_moderate_revel_missense_or_worse',
            'strong_revel_missense_or_worse_supporting_revel_missense_or_worse',
            'moderate_revel_missense_or_worse_moderate_revel_missense_or_worse',
            'supporting_revel_missense_or_worse_supporting_revel_missense_or_worse',
            'missense_or_worse_missense_or_worse',
            'synonymous_or_worse_synonymous_or_worse',
        ], dataCellComponent: HeterozygousCountCell, caption: react_1.default.createElement(HeterozygousCaption, null) })));
const HomozygousVariantCooccurrenceCountsTable = ({ variant_cooccurrence_counts, }) => (react_1.default.createElement(Table, null,
    react_1.default.createElement(VariantCooccurrenceCountsTableContent, { variant_cooccurrence_counts: variant_cooccurrence_counts, afCutoffs: exports.homozygousVariantCooccurrenceAfCutoffs, severities: exports.homozygousVariantCooccurrenceSeverities, dataCellComponent: HomozygousCountCell, caption: react_1.default.createElement(HomozygousCaption, null) })));
const toggleTableMode = (currentTableMode, setTableMode) => {
    if (currentTableMode === 'normal') {
        setTableMode('expanded');
    }
    else {
        setTableMode('normal');
    }
};
const HeterozygousCaption = () => {
    const tooltipContent = (react_1.default.createElement(react_1.default.Fragment, null,
        "Variants predicted to be in ",
        react_1.default.createElement("i", null, "trans"),
        " by the gnomAD variant co-occurrence tool (gnomad.broadinstitute.org/variant-cooccurrence)."));
    const tooltip = (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltipContent },
            react_1.default.createElement(ui_1.TooltipHint, null,
                "(number predicted in ",
                react_1.default.createElement("i", null, "trans"),
                ")"))));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        "Individuals with ",
        react_1.default.createElement("strong", null, "two heterozygous"),
        " rare variants ",
        tooltip));
};
const HomozygousCaption = () => (react_1.default.createElement(react_1.default.Fragment, null,
    "Individuals with ",
    react_1.default.createElement("strong", null, "homozygous"),
    " rare variants"));
const VariantCooccurrenceCountsTable = ({ datasetId, heterozygous_variant_cooccurrence_counts, homozygous_variant_cooccurrence_counts, }) => {
    const [tableMode, setTableMode] = (0, react_1.useState)('normal');
    if (!(0, metadata_1.hasVariantCoocurrence)(datasetId)) {
        return react_1.default.createElement("p", null, "Variant co-occurrence is only available for gnomAD v2.");
    }
    const buttonLabel = tableMode === 'normal' ? 'expand' : 'collapse';
    const clickCallback = () => toggleTableMode(tableMode, setTableMode);
    const toggleButton = react_1.default.createElement(ModeToggle, { onClick: clickCallback }, buttonLabel);
    return (react_1.default.createElement("div", null, tableMode === 'normal' ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(HeterozygousVariantCooccurrenceCountsTable, { variant_cooccurrence_counts: heterozygous_variant_cooccurrence_counts }),
        toggleButton,
        react_1.default.createElement(HomozygousVariantCooccurrenceCountsTable, { variant_cooccurrence_counts: homozygous_variant_cooccurrence_counts }))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ExpandedHeterozygousVariantCooccurrenceCountsTable, { variant_cooccurrence_counts: heterozygous_variant_cooccurrence_counts }),
        toggleButton))));
};
exports.default = VariantCooccurrenceCountsTable;
//# sourceMappingURL=VariantCooccurrenceCountsTable.js.map