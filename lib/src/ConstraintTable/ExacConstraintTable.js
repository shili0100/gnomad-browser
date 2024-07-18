"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const constraintMetrics_1 = require("./constraintMetrics");
const ExacConstraintTable = ({ constraint }) => (
// @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
react_1.default.createElement(ui_1.BaseTable, null,
    react_1.default.createElement("thead", null,
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { scope: "col" }, "Category"),
            react_1.default.createElement("th", { scope: "col" }, "Expected SNVs"),
            react_1.default.createElement("th", { scope: "col" }, "Observed SNVs"),
            react_1.default.createElement("th", { scope: "col" }, "Constraint metric"))),
    react_1.default.createElement("tbody", null,
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { scope: "row" }, "Synonymous"),
            react_1.default.createElement("td", null, (0, constraintMetrics_1.renderRoundedNumber)(constraint.exp_syn)),
            react_1.default.createElement("td", null, constraint.obs_syn),
            react_1.default.createElement("td", null,
                "Z =",
                ' ',
                (0, constraintMetrics_1.renderRoundedNumber)(constraint.syn_z, {
                    precision: 2,
                    tooltipPrecision: 3,
                    highlightColor: constraint.syn_z > 3.71 ? '#ff2600' : null,
                }))),
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { scope: "row" }, "Missense"),
            react_1.default.createElement("td", null, (0, constraintMetrics_1.renderRoundedNumber)(constraint.exp_mis)),
            react_1.default.createElement("td", null, constraint.obs_mis),
            react_1.default.createElement("td", null,
                "Z =",
                ' ',
                (0, constraintMetrics_1.renderRoundedNumber)(constraint.mis_z, {
                    precision: 2,
                    tooltipPrecision: 3,
                    highlightColor: constraint.mis_z > 3.09 ? '#ff9300' : null,
                }))),
        react_1.default.createElement("tr", null,
            react_1.default.createElement("th", { scope: "row" }, "pLoF"),
            react_1.default.createElement("td", null, (0, constraintMetrics_1.renderRoundedNumber)(constraint.exp_lof)),
            react_1.default.createElement("td", null, constraint.obs_lof),
            react_1.default.createElement("td", null,
                "pLI =",
                ' ',
                (0, constraintMetrics_1.renderRoundedNumber)(constraint.pLI, {
                    precision: 2,
                    tooltipPrecision: 3,
                    highlightColor: constraint.pLI > 0.9 ? '#ff9300' : null,
                }))))));
exports.default = ExacConstraintTable;
//# sourceMappingURL=ExacConstraintTable.js.map