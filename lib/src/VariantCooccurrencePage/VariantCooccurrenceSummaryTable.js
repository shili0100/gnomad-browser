"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const VariantCooccurrencePage_1 = require("./VariantCooccurrencePage");
const getCooccurrencePattern = (cooccurrenceData) => {
    if ((0, VariantCooccurrencePage_1.noPredictionPossible)(cooccurrenceData)) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            "No prediction",
            react_1.default.createElement("sup", null, "*")));
    }
    if (cooccurrenceData.p_compound_heterozygous > VariantCooccurrencePage_1.transThreshold) {
        return 'Different haplotypes';
    }
    if (cooccurrenceData.p_compound_heterozygous < VariantCooccurrencePage_1.cisThreshold) {
        return 'Same haplotype';
    }
    return 'Uncertain';
};
const Table = (0, styled_components_1.default)(ui_1.BaseTable) `
  td,
  th {
    padding-left: 2em;
  }

  th:first-child,
  td:first-child {
    padding-right: 2em;
    padding-left: 1ch;
    white-space: nowrap;

    button {
      text-align: left;
    }
  }

  td:nth-child(2),
  td:nth-child(3),
  td:nth-child(4) {
    padding-right: 4em;
    text-align: right;
  }
`;
const VariantCooccurrenceSummaryTable = ({ cooccurrenceData, selectedPopulation, onSelectPopulation, }) => {
    return (react_1.default.createElement(Table, null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "col" }, "Genetic ancestry group"),
                react_1.default.createElement("th", { scope: "col" }, "Samples consistent with variants appearing in isolation or on different haplotypes"),
                react_1.default.createElement("th", { scope: "col" }, "Samples consistent with variants appearing on the same haplotype"),
                react_1.default.createElement("th", { scope: "col" }, "Samples consistent with either co-occurrence pattern"),
                react_1.default.createElement("th", { scope: "col" }, "Likely co\u2011occurrence pattern"))),
        react_1.default.createElement("tbody", null, cooccurrenceData.populations.map((pop) => (react_1.default.createElement("tr", { key: pop.id, style: pop.id === selectedPopulation ? { background: '#eee' } : undefined },
            react_1.default.createElement("th", { scope: "row" },
                react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                        onSelectPopulation(pop.id);
                    } }, gnomadPopulations_1.GNOMAD_POPULATION_NAMES[pop.id])),
            react_1.default.createElement("td", null, (pop.genotype_counts.ref_het +
                pop.genotype_counts.ref_hom +
                pop.genotype_counts.het_ref +
                pop.genotype_counts.hom_ref).toLocaleString()),
            react_1.default.createElement("td", null, (pop.genotype_counts.het_hom +
                pop.genotype_counts.hom_het +
                pop.genotype_counts.hom_hom).toLocaleString()),
            react_1.default.createElement("td", null, pop.genotype_counts.het_het.toLocaleString()),
            react_1.default.createElement("td", null, getCooccurrencePattern(pop)))))),
        react_1.default.createElement("tfoot", null,
            react_1.default.createElement("tr", { style: selectedPopulation === 'All' ? { background: '#eee' } : undefined },
                react_1.default.createElement("th", { scope: "row", style: { borderTop: '2px solid #aaa' } },
                    react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                            onSelectPopulation('All');
                        }, style: { fontWeight: 'bold' } }, "All")),
                react_1.default.createElement("td", { style: { borderTop: '2px solid #aaa' } }, (cooccurrenceData.genotype_counts.ref_het +
                    cooccurrenceData.genotype_counts.ref_hom +
                    cooccurrenceData.genotype_counts.het_ref +
                    cooccurrenceData.genotype_counts.hom_ref).toLocaleString()),
                react_1.default.createElement("td", { style: { borderTop: '2px solid #aaa' } }, (cooccurrenceData.genotype_counts.het_hom +
                    cooccurrenceData.genotype_counts.hom_het +
                    cooccurrenceData.genotype_counts.hom_hom).toLocaleString()),
                react_1.default.createElement("td", { style: { borderTop: '2px solid #aaa' } }, cooccurrenceData.genotype_counts.het_het.toLocaleString()),
                react_1.default.createElement("td", { style: { borderTop: '2px solid #aaa' } }, getCooccurrencePattern(cooccurrenceData))))));
};
exports.default = VariantCooccurrenceSummaryTable;
//# sourceMappingURL=VariantCooccurrenceSummaryTable.js.map