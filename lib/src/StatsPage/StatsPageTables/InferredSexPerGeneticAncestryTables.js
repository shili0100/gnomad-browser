"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InferredSexNonUKBV4Table = exports.InferredSexAllV4Table = void 0;
const react_1 = __importDefault(require("react"));
const DownloadFigure_1 = require("../DownloadFigure");
const InferredSexPerGeneticAncestryData_json_1 = __importDefault(require("./InferredSexPerGeneticAncestryData.json"));
const TableStyles_1 = require("./TableStyles");
const gnomadPopulations_1 = require("../../../dataset-metadata/gnomadPopulations");
const InferredSexAllV4Table = () => {
    const elementId = 'inferred-sex-by-genetic-ancestry-group-table';
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TableStyles_1.StatsTable, { id: elementId },
            react_1.default.createElement("thead", null,
                react_1.default.createElement(TableStyles_1.StatsTableHeaderRow, null,
                    react_1.default.createElement("th", { colSpan: 2 }, "Genetic Ancestry"),
                    react_1.default.createElement("th", { colSpan: 3 }, "v4 Exomes"),
                    react_1.default.createElement("th", { colSpan: 3 }, "v4 Genomes"),
                    react_1.default.createElement("th", { colSpan: 3 }, "Combined")),
                react_1.default.createElement(TableStyles_1.StatsTableSubHeaderRow, null,
                    react_1.default.createElement("th", null, "Genetic Ancestry"),
                    react_1.default.createElement("th", { className: "rb" }, "Genetic Ancestry "),
                    react_1.default.createElement("th", null, "Sample Count"),
                    react_1.default.createElement("th", null, "XX"),
                    react_1.default.createElement("th", { className: "rb" }, "XY"),
                    react_1.default.createElement("th", null, "Sample Count"),
                    react_1.default.createElement("th", null, "XX"),
                    react_1.default.createElement("th", { className: "rb" }, "XY"),
                    react_1.default.createElement("th", null, "Sample Count"),
                    react_1.default.createElement("th", null, "XX"),
                    react_1.default.createElement("th", null, "XY"))),
            react_1.default.createElement(TableStyles_1.StatsTableBody, null, InferredSexPerGeneticAncestryData_json_1.default.gnomADV4
                .filter((tableRowData) => tableRowData.geneticAncestryGroup !== 'total')
                .map((tableRowData) => {
                const exomesCombined = tableRowData.exomes.XX + tableRowData.exomes.XY;
                const genomesCombined = tableRowData.genomes.XX + tableRowData.genomes.XY;
                return (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, (0, gnomadPopulations_1.populationName)(tableRowData.geneticAncestryGroup)),
                    react_1.default.createElement("td", { className: "rb" }, tableRowData.geneticAncestryGroup),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(exomesCombined)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XX)),
                    react_1.default.createElement("td", { className: "rb" }, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XY)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(genomesCombined)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.genomes.XX)),
                    react_1.default.createElement("td", { className: "rb" }, (0, TableStyles_1.renderNumberOrDash)(tableRowData.genomes.XY)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(exomesCombined + genomesCombined)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XX + tableRowData.genomes.XX)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XY + tableRowData.genomes.XY))));
            })),
            react_1.default.createElement(TableStyles_1.StatsTableFooter, null, InferredSexPerGeneticAncestryData_json_1.default.gnomADV4
                .filter((tableRowData) => tableRowData.geneticAncestryGroup === 'total')
                .map((tableRowData) => {
                const exomesCombined = tableRowData.exomes.XX + tableRowData.exomes.XY;
                const genomesCombined = tableRowData.genomes.XX + tableRowData.genomes.XY;
                return (react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, "Total"),
                    react_1.default.createElement("td", null),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(exomesCombined)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XX)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XY)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(genomesCombined)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.genomes.XX)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.genomes.XY)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(exomesCombined + genomesCombined)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XX + tableRowData.genomes.XX)),
                    react_1.default.createElement("td", null, (0, TableStyles_1.renderNumberOrDash)(tableRowData.exomes.XY + tableRowData.genomes.XY))));
            })),
            react_1.default.createElement(TableStyles_1.StatsTableCaption, null,
                react_1.default.createElement("div", null, "Inferred sex counts of gnomAD v4 samples per genetic ancestry group"))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(DownloadFigure_1.DownloadElementAsPNGButton, { elementId: elementId }))));
};
exports.InferredSexAllV4Table = InferredSexAllV4Table;
const InferredSexNonUKBV4Table = () => {
    const elementId = 'non-ukb-inferred-sex-by-genetic-ancestry-group-table';
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(TableStyles_1.StatsTable, { id: elementId },
            react_1.default.createElement("thead", null,
                react_1.default.createElement(TableStyles_1.StatsTableHeaderRow, null,
                    react_1.default.createElement("th", { colSpan: 2 }, "Genetic Ancestry"),
                    react_1.default.createElement("th", { colSpan: 3 }, "v4 Exomes")),
                react_1.default.createElement(TableStyles_1.StatsTableSubHeaderRow, null,
                    react_1.default.createElement("th", null, "Genetic Ancestry"),
                    react_1.default.createElement("th", { className: "rb" }, "Genetic Ancestry "),
                    react_1.default.createElement("th", null, "Sample Count"),
                    react_1.default.createElement("th", null, "XX"),
                    react_1.default.createElement("th", null, "XY"))),
            react_1.default.createElement(TableStyles_1.StatsTableBody, null, InferredSexPerGeneticAncestryData_json_1.default.gnomADV4NonUkb
                .filter((tableRowData) => tableRowData.geneticAncestryGroup !== 'total')
                .map((tableRowData) => (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, (0, gnomadPopulations_1.populationName)(tableRowData.geneticAncestryGroup)),
                react_1.default.createElement("td", { className: "rb" }, tableRowData.geneticAncestryGroup),
                react_1.default.createElement("td", null, (tableRowData.exomes.XX + tableRowData.exomes.XY).toLocaleString()),
                react_1.default.createElement("td", null, tableRowData.exomes.XX.toLocaleString()),
                react_1.default.createElement("td", null, tableRowData.exomes.XY.toLocaleString()))))),
            react_1.default.createElement(TableStyles_1.StatsTableFooter, null, InferredSexPerGeneticAncestryData_json_1.default.gnomADV4NonUkb
                .filter((tableRowData) => tableRowData.geneticAncestryGroup === 'total')
                .map((tableRowData) => (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "Total"),
                react_1.default.createElement("td", null),
                react_1.default.createElement("td", null, (tableRowData.exomes.XX + tableRowData.exomes.XY).toLocaleString()),
                react_1.default.createElement("td", null, tableRowData.exomes.XX.toLocaleString()),
                react_1.default.createElement("td", null, tableRowData.exomes.XY.toLocaleString()))))),
            react_1.default.createElement(TableStyles_1.StatsTableCaption, null,
                react_1.default.createElement("div", null, "Inferred sex counts of the gnomAD v4 samples per genetic ancestry group not including UK Biobank samples"))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(DownloadFigure_1.DownloadElementAsPNGButton, { elementId: elementId }))));
};
exports.InferredSexNonUKBV4Table = InferredSexNonUKBV4Table;
//# sourceMappingURL=InferredSexPerGeneticAncestryTables.js.map