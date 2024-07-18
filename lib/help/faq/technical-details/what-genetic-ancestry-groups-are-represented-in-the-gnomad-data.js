"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAnswer = exports.question = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../../../src/Link"));
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const sampleCounts_1 = __importDefault(require("../../dataset-metadata/sampleCounts"));
const TableWrapper_1 = __importDefault(require("../../../src/TableWrapper"));
const SampleCountTable = (0, styled_components_1.default)(ui_1.BaseTable) `
  td {
    text-align: right;
  }

  tbody tr:last-child {
    th,
    td {
      border-bottom-color: #000;
    }
  }
`;
const SampleCountTables = () => (react_1.default.createElement("div", null,
    react_1.default.createElement("div", null,
        react_1.default.createElement("h4", null, "gnomAD v4"),
        react_1.default.createElement("p", null,
            "For current stats on genetic ancestry groups present in v4, please see the",
            ' ',
            react_1.default.createElement(Link_1.default, { to: "/stats#diversity" }, "stats page"),
            ". For technical details, please see our",
            ' ',
            react_1.default.createElement(Link_1.default, { to: "/help/ancestry" }, "Genetic Ancestry in gnomAD"),
            " help text.")),
    react_1.default.createElement("br", null),
    react_1.default.createElement("br", null),
    react_1.default.createElement("details", null,
        react_1.default.createElement("summary", null, "Expand to see details for past versions"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("h4", null, "gnomAD v3"),
            react_1.default.createElement(TableWrapper_1.default, null,
                react_1.default.createElement(SampleCountTable, null,
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", { rowSpan: 2, scope: "col" }, "Genetic ancestry group"),
                            react_1.default.createElement("th", { scope: "col" }, "overall"),
                            react_1.default.createElement("th", { scope: "col" }, "controls/biobanks"),
                            react_1.default.createElement("th", { scope: "col" }, "non-cancer"),
                            react_1.default.createElement("th", { scope: "col" }, "non-neuro"),
                            react_1.default.createElement("th", { scope: "col" }, "non-TOPMed"),
                            react_1.default.createElement("th", { scope: "col" }, "non-v2"))),
                    react_1.default.createElement("tbody", null, ['afr', 'ami', 'amr', 'asj', 'eas', 'fin', 'mid', 'nfe', 'sas', 'oth'].map((popId) => (react_1.default.createElement("tr", { key: popId },
                        react_1.default.createElement("th", { scope: "row" }, gnomadPopulations_1.GNOMAD_POPULATION_NAMES[popId]),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r3.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r3_controls_and_biobanks.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r3_non_cancer.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r3_non_neuro.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r3_non_topmed.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r3_non_v2.genomes[popId] || 0).toLocaleString()))))),
                    react_1.default.createElement("tbody", null, ['XX', 'XY'].map((popId) => (react_1.default.createElement("tr", { key: popId },
                        react_1.default.createElement("th", { scope: "row" }, popId),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_controls_and_biobanks.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_cancer.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_neuro.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_topmed.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_v2.genomes[popId].toLocaleString()))))),
                    react_1.default.createElement("tfoot", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", { scope: "row" }, "Total"),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_controls_and_biobanks.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_cancer.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_neuro.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_topmed.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r3_non_v2.genomesTotal.toLocaleString()))))),
            react_1.default.createElement("h4", null, "gnomAD v2"),
            react_1.default.createElement(TableWrapper_1.default, null,
                react_1.default.createElement(SampleCountTable, null,
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", { rowSpan: 2, scope: "col" }, "Genetic ancestry group"),
                            react_1.default.createElement("th", { colSpan: 2, scope: "col" }, "overall"),
                            react_1.default.createElement("th", { colSpan: 2, scope: "col" }, "controls"),
                            react_1.default.createElement("th", { colSpan: 2, scope: "col" }, "non-cancer"),
                            react_1.default.createElement("th", { colSpan: 2, scope: "col" }, "non-neuro"),
                            react_1.default.createElement("th", { colSpan: 2, scope: "col" }, "non-TOPMed")),
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", { scope: "col" }, "exomes"),
                            react_1.default.createElement("th", { scope: "col" }, "genomes"),
                            react_1.default.createElement("th", { scope: "col" }, "exomes"),
                            react_1.default.createElement("th", { scope: "col" }, "genomes"),
                            react_1.default.createElement("th", { scope: "col" }, "exomes"),
                            react_1.default.createElement("th", { scope: "col" }, "genomes"),
                            react_1.default.createElement("th", { scope: "col" }, "exomes"),
                            react_1.default.createElement("th", { scope: "col" }, "genomes"),
                            react_1.default.createElement("th", { scope: "col" }, "exomes"),
                            react_1.default.createElement("th", { scope: "col" }, "genomes"))),
                    react_1.default.createElement("tbody", null, ['afr', 'ami', 'amr', 'asj', 'eas', 'fin', 'nfe', 'sas', 'oth'].map((popId) => (react_1.default.createElement("tr", { key: popId },
                        react_1.default.createElement("th", { scope: "row" }, gnomadPopulations_1.GNOMAD_POPULATION_NAMES[popId]),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r2_1.exomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, popId === 'sas'
                            ? '*'
                            : (sampleCounts_1.default.gnomad_r2_1.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r2_1_controls.exomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, popId === 'sas'
                            ? '*'
                            : (sampleCounts_1.default.gnomad_r2_1_controls.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r2_1_non_cancer.exomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, popId === 'sas'
                            ? '*'
                            : (sampleCounts_1.default.gnomad_r2_1_non_cancer.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r2_1_non_neuro.exomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, popId === 'sas'
                            ? '*'
                            : (sampleCounts_1.default.gnomad_r2_1_non_neuro.genomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, (sampleCounts_1.default.gnomad_r2_1_non_topmed.exomes[popId] || 0).toLocaleString()),
                        react_1.default.createElement("td", null, popId === 'sas'
                            ? '*'
                            : (sampleCounts_1.default.gnomad_r2_1_non_topmed.genomes[popId] || 0).toLocaleString()))))),
                    react_1.default.createElement("tbody", null, ['XX', 'XY'].map((popId) => (react_1.default.createElement("tr", { key: popId },
                        react_1.default.createElement("th", { scope: "row" }, popId),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1.exomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_controls.exomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_controls.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_cancer.exomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_cancer.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_neuro.exomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_neuro.genomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_topmed.exomes[popId].toLocaleString()),
                        react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_topmed.genomes[popId].toLocaleString()))))),
                    react_1.default.createElement("tfoot", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", { scope: "row" }, "Total"),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1.exomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_controls.exomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_controls.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_cancer.exomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_cancer.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_neuro.exomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_neuro.genomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_topmed.exomesTotal.toLocaleString()),
                            react_1.default.createElement("td", null, sampleCounts_1.default.gnomad_r2_1_non_topmed.genomesTotal.toLocaleString()))))),
            react_1.default.createElement("p", null, "* For v2 genomes, we have a total of only 31 South Asian samples so they are grouped with Remaining individuals.")))));
exports.question = 'What genetic ancestry groups are represented in the gnomAD data?';
const renderAnswer = () => react_1.default.createElement(SampleCountTables, null);
exports.renderAnswer = renderAnswer;
//# sourceMappingURL=what-genetic-ancestry-groups-are-represented-in-the-gnomad-data.js.map