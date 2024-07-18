"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const constraintMetrics_1 = require("./constraintMetrics");
const Table = (0, styled_components_1.default)(ui_1.BaseTable) `
  @media (max-width: 600px) {
    td,
    th {
      padding-right: 10px;

      /* Drop sparkline column */
      &:nth-child(5) {
        display: none;
      }
    }
  }
`;
const OEMetrics = styled_components_1.default.span `
  display: inline-block;
  margin-top: 0.5em;
  white-space: nowrap;
`;
// @ts-expect-error TS(7022) FIXME: 'Graph' implicitly has type 'any' because it does ... Remove this comment to see the full error message
const Graph = ({ value, lower, upper, color }) => {
    const width = 60;
    const xPadding = 13;
    const x = (n) => Math.max(0, Math.min(xPadding + n * (width - xPadding * 2), width - xPadding));
    const y = 18;
    return (react_1.default.createElement("svg", { height: 30, width: width },
        react_1.default.createElement("text", { x: 0, y: 26, fontSize: "12px", textAnchor: "start" }, "0"),
        react_1.default.createElement("line", { x1: xPadding, y1: 25, x2: width - xPadding, y2: 25, stroke: "#333" }),
        react_1.default.createElement("rect", { x: x(lower), y: y - 7, height: 14, width: x(upper) - x(lower), fill: "#aaa" }),
        value >= 1 ? (react_1.default.createElement("path", { d: "M 47,14 52,18 47,22 z", fill: "#e2e2e2", strokeWidth: 1, stroke: "#000" })) : (react_1.default.createElement("circle", { cx: x(value), cy: y, r: 3, strokeWidth: 1, stroke: "#000", fill: color || '#e2e2e2' })),
        react_1.default.createElement("text", { x: width, y: 26, fontSize: "12px", textAnchor: "end" }, "1")));
};
Graph.defaultProps = {
    color: undefined,
};
const renderOEMetrics = (constraint, category, highlightColor) => {
    const value = constraint[`oe_${category}`];
    const lower = constraint[`oe_${category}_lower`];
    const upper = constraint[`oe_${category}_upper`];
    return (react_1.default.createElement(OEMetrics, null,
        "o/e = ",
        (0, constraintMetrics_1.renderRoundedNumber)(value, { precision: 2, tooltipPrecision: 3 }),
        lower !== null && upper !== null && (react_1.default.createElement(react_1.default.Fragment, null,
            ' ',
            "(",
            (0, constraintMetrics_1.renderRoundedNumber)(lower, { precision: 2, tooltipPrecision: 3 }),
            " -",
            ' ',
            (0, constraintMetrics_1.renderRoundedNumber)(upper, {
                precision: 2,
                tooltipPrecision: 3,
                highlightColor,
                formatTooltip: category === 'lof' ? (n) => `LOEUF = ${n}` : (n) => `${n}`,
            }),
            ")"))));
};
const renderOEGraph = (constraint, category, color) => {
    const value = constraint[`oe_${category}`];
    const lower = constraint[`oe_${category}_lower`];
    const upper = constraint[`oe_${category}_upper`];
    return (value !== null &&
        lower !== null &&
        upper !== null && react_1.default.createElement(Graph, { lower: lower, upper: upper, value: value, color: color }));
};
// Duplicate flag descriptions (e.g. lof_too_many and outlier_lof) exist because
//   several of these fields got renamed between v2 and v4
const CONSTRAINT_FLAG_DESCRIPTIONS = {
    lof_too_many: 'More pLoF variants than expected',
    outlier_lof: 'More pLoF variants than expected',
    mis_too_many: 'More missense variants than expected',
    outlier_mis: 'More missense variants than expected',
    no_exp_lof: 'Zero expected pLoF variants',
    no_exp_mis: 'Zero expected missense variants',
    no_exp_syn: 'Zero expected synonymous variants',
    no_variants: 'Zero observed synonymous, missense, pLoF variants',
    syn_outlier: 'More or fewer synonymous variants than expected',
    outlier_syn: 'More or fewer synonymous variants than expected',
};
const GnomadConstraintTable = ({ constraint }) => {
    let lofHighlightColor = null;
    if (constraint.oe_lof_upper !== null) {
        if (constraint.oe_lof_upper < 0.33) {
            lofHighlightColor = '#ff2600';
        }
        else if (constraint.oe_lof_upper < 0.66) {
            lofHighlightColor = '#ff9300';
        }
        else if (constraint.oe_lof_upper < 1) {
            lofHighlightColor = '#ffc000';
        }
    }
    const constraintFlags = (constraint.flags || []).filter((flag) => !flag.startsWith('no_'));
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Table, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "col" }, "Category"),
                    react_1.default.createElement("th", { scope: "col" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Expected variant counts were predicted using a depth corrected probability of mutation for each gene. More details can be found in the gnomAD flagship paper. Note that the expected variant counts for bases with a median depth <1 were removed from the totals." },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Expected SNVs"))),
                    react_1.default.createElement("th", { scope: "col" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Includes single nucleotide changes that occurred in the canonical transcript that were found at a frequency of <0.1%, passed all filters, and at sites with a median depth \u22651. The counts represent the number of unique variants and not the allele count of these variants." },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Observed SNVs"))),
                    react_1.default.createElement("th", { scope: "col" }, "Constraint metrics"),
                    react_1.default.createElement("td", null))),
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" }, "Synonymous"),
                    react_1.default.createElement("td", null, (0, constraintMetrics_1.renderRoundedNumber)(constraint.exp_syn)),
                    react_1.default.createElement("td", null, constraint.obs_syn === null ? '—' : constraint.obs_syn),
                    react_1.default.createElement("td", null,
                        "Z =",
                        ' ',
                        (0, constraintMetrics_1.renderRoundedNumber)(constraint.syn_z, {
                            precision: 2,
                            tooltipPrecision: 3,
                            highlightColor: constraint.syn_z > 3.71 ? '#ff2600' : null,
                        }),
                        react_1.default.createElement("br", null),
                        renderOEMetrics(constraint, 'syn')),
                    react_1.default.createElement("td", null, renderOEGraph(constraint, 'syn'))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" }, "Missense"),
                    react_1.default.createElement("td", null, (0, constraintMetrics_1.renderRoundedNumber)(constraint.exp_mis)),
                    react_1.default.createElement("td", null, constraint.obs_mis === null ? '—' : constraint.obs_mis),
                    react_1.default.createElement("td", null,
                        "Z =",
                        ' ',
                        (0, constraintMetrics_1.renderRoundedNumber)(constraint.mis_z, {
                            precision: 2,
                            tooltipPrecision: 3,
                            highlightColor: constraint.mis_z > 3.09 ? '#ff9300' : null,
                        }),
                        react_1.default.createElement("br", null),
                        renderOEMetrics(constraint, 'mis')),
                    react_1.default.createElement("td", null, renderOEGraph(constraint, 'mis'))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" }, "pLoF"),
                    react_1.default.createElement("td", null, (0, constraintMetrics_1.renderRoundedNumber)(constraint.exp_lof)),
                    react_1.default.createElement("td", null, constraint.obs_lof === null ? '—' : constraint.obs_lof),
                    react_1.default.createElement("td", null,
                        "pLI = ",
                        (0, constraintMetrics_1.renderRoundedNumber)(constraint.pLI, { precision: 2, tooltipPrecision: 3 }),
                        react_1.default.createElement("br", null),
                        renderOEMetrics(constraint, 'lof', lofHighlightColor)),
                    react_1.default.createElement("td", null, renderOEGraph(constraint, 'lof', lofHighlightColor))))),
        constraintFlags.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
            constraintFlags.map((flag) => {
                let flagDescription;
                if (flag in CONSTRAINT_FLAG_DESCRIPTIONS) {
                    /* @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */
                    flagDescription = CONSTRAINT_FLAG_DESCRIPTIONS[flag];
                }
                else {
                    flagDescription = (react_1.default.createElement("span", null,
                        "Gene constraint flag: ",
                        react_1.default.createElement("code", null, flag)));
                }
                return (react_1.default.createElement("p", { key: flag, style: { maxWidth: '460px' } },
                    react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                    " ",
                    flagDescription));
            }),
            react_1.default.createElement("p", null,
                react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: "/help/why-are-constraint-metrics-missing-for-this-gene-or-annotated-with-a-note" }, "More information on constraint flags."))))));
};
exports.default = GnomadConstraintTable;
//# sourceMappingURL=GnomadConstraintTable.js.map