"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DownloadFigure_1 = require("../DownloadFigure");
const GeneticAncestryGroupsByVersionData_json_1 = __importDefault(require("./GeneticAncestryGroupsByVersionData.json"));
const TableStyles_1 = require("./TableStyles");
const gnomadPopulations_1 = require("../../../dataset-metadata/gnomadPopulations");
const GeneticAncestryGroupsByVersionTable = () => {
    const elementId = 'genetic-ancestry-group-size-by-version-table';
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TableStyles_1.StatsTable, { id: elementId },
            react_1.default.createElement("thead", null,
                react_1.default.createElement(TableStyles_1.StatsTableHeaderRow, null,
                    react_1.default.createElement("th", null, "\u00A0"),
                    react_1.default.createElement("th", null, "ExAC"),
                    react_1.default.createElement("th", null, "gnomAD v2"),
                    react_1.default.createElement("th", null, "gnomAD v3"),
                    react_1.default.createElement("th", { colSpan: 5 }, "gnomAD v4*")),
                react_1.default.createElement(TableStyles_1.StatsTableSubHeaderRow, null,
                    react_1.default.createElement("th", { className: "rb" }, "\u00A0"),
                    react_1.default.createElement("th", { className: "rb" }, "Sample count"),
                    react_1.default.createElement("th", { className: "rb" }, "Sample count"),
                    react_1.default.createElement("th", { className: "rb" }, "Sample count"),
                    react_1.default.createElement("th", null, "Sample count"),
                    react_1.default.createElement("th", null, "%"),
                    react_1.default.createElement("th", null, "Increase from v2"))),
            react_1.default.createElement(TableStyles_1.StatsTableBody, null, GeneticAncestryGroupsByVersionData_json_1.default.data
                .filter((tableRow) => tableRow.geneticAncestryGroup !== 'total')
                .map((tableRow) => {
                return (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { className: "rb" }, `${(0, gnomadPopulations_1.populationName)(tableRow.geneticAncestryGroup)}${tableRow.optionalSymbol}`),
                    react_1.default.createElement("td", { className: "rb" }, (0, TableStyles_1.renderNumberOrDash)(tableRow.EXaC.sampleCount)),
                    react_1.default.createElement("td", { className: "rb" }, (0, TableStyles_1.renderNumberOrDash)(tableRow.gnomADV2.sampleCount)),
                    react_1.default.createElement("td", { className: "rb" }, (0, TableStyles_1.renderNumberOrDash)(tableRow.gnomADV3.sampleCount)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRow.gnomADV4.sampleCount)),
                    react_1.default.createElement("td", null, `${tableRow.gnomADV4.percentOfSamples}%`),
                    react_1.default.createElement("td", null, `${tableRow.gnomADV4.foldIncreaseFromV2}x`)));
            })),
            react_1.default.createElement(TableStyles_1.StatsTableFooter, null, GeneticAncestryGroupsByVersionData_json_1.default.data
                .filter((tableRow) => tableRow.geneticAncestryGroup === 'total')
                .map((tableRow) => {
                return (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Total"),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRow.EXaC.sampleCount)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRow.gnomADV2.sampleCount)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRow.gnomADV3.sampleCount)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRow.gnomADV4.sampleCount)),
                    react_1.default.createElement("td", null, "-"),
                    react_1.default.createElement("td", null, "-")));
            })),
            react_1.default.createElement(TableStyles_1.StatsTableCaption, null,
                react_1.default.createElement("div", null, "*v4 includes all v3 samples."),
                react_1.default.createElement("div", null, "^ Due to small sample size, Amish are included in remaining individuals, and based on population proximity Finns are included in European totals. Both are presented separately in the v4 browser as before."))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(DownloadFigure_1.DownloadElementAsPNGButton, { elementId: elementId }))));
};
exports.default = GeneticAncestryGroupsByVersionTable;
//# sourceMappingURL=GeneticAncestryGroupsByVersionTable.js.map