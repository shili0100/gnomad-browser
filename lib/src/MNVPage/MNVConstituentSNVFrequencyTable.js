"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const QCFilter_1 = __importDefault(require("../QCFilter"));
const Table = styled_components_1.default.table `
  th {
    font-weight: bold;
  }

  th[scope='col'],
  th[scope='colgroup'] {
    padding-left: 30px;
    text-align: left;
  }

  th[scope='row'] {
    text-align: right;
  }

  td {
    padding-left: 30px;
    line-height: 1.5;
  }
`;
const renderVariantFlag = (variant, exomeOrGenome) => {
    if (!variant[exomeOrGenome]) {
        return react_1.default.createElement(ui_1.Badge, { level: "error" }, "No variant");
    }
    const { filters } = variant[exomeOrGenome];
    if (filters.length === 0) {
        return react_1.default.createElement(ui_1.Badge, { level: "success" }, "Pass");
    }
    return filters.map((filter) => react_1.default.createElement(QCFilter_1.default, { key: filter, filter: filter }));
};
const MNVConstituentSNVFrequencyTable = ({ snvs }) => {
    const renderedSNVFrequencies = snvs.map((snv) => {
        const exomeAC = (snv.exome || {}).ac || 0;
        const exomeAN = (snv.exome || {}).an || 0;
        const exomeAF = exomeAN === 0 ? 0 : exomeAC / exomeAN;
        const genomeAC = (snv.genome || {}).ac || 0;
        const genomeAN = (snv.genome || {}).an || 0;
        const genomeAF = genomeAN === 0 ? 0 : genomeAC / genomeAN;
        const totalAC = exomeAC + genomeAC;
        const totalAN = exomeAN + genomeAN;
        const totalAF = totalAN === 0 ? 0 : totalAC / totalAN;
        return {
            variant_id: snv.variant_id,
            exome: snv.exome
                ? {
                    ac: exomeAC,
                    an: exomeAN,
                    af: exomeAF,
                }
                : null,
            genome: snv.genome
                ? {
                    ac: genomeAC,
                    an: genomeAN,
                    af: genomeAF,
                }
                : null,
            total: {
                ac: totalAC,
                an: totalAN,
                af: totalAF,
            },
        };
    });
    return (react_1.default.createElement(Table, { style: { width: '100%' } },
        react_1.default.createElement("colgroup", null,
            react_1.default.createElement("col", null),
            snvs.map((snv) => (
            // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
            react_1.default.createElement("col", { key: snv.variant_id, span: "3" })))),
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null),
                snvs.map((snv) => (
                // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'number'.
                react_1.default.createElement("th", { key: snv.variant_id, colSpan: "3", scope: "colgroup" },
                    react_1.default.createElement(Link_1.default, { to: `/variant/${snv.variant_id}` }, snv.variant_id)))))),
        react_1.default.createElement("tbody", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null),
                snvs.map((snv) => (react_1.default.createElement(react_1.default.Fragment, { key: snv.variant_id },
                    react_1.default.createElement("th", { scope: "col" }, "Exomes"),
                    react_1.default.createElement("th", { scope: "col" }, "Genomes"),
                    react_1.default.createElement("th", { scope: "col" }, "Total"))))),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Filter"),
                snvs.map((snv) => (react_1.default.createElement(react_1.default.Fragment, { key: snv.variant_id },
                    react_1.default.createElement("td", null, renderVariantFlag(snv, 'exome')),
                    react_1.default.createElement("td", null, renderVariantFlag(snv, 'genome')),
                    react_1.default.createElement("td", null)))),
                react_1.default.createElement("td", null)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Allele Count"),
                renderedSNVFrequencies.map((snv) => (react_1.default.createElement(react_1.default.Fragment, { key: snv.variant_id },
                    react_1.default.createElement("td", null, snv.exome && snv.exome.ac),
                    react_1.default.createElement("td", null, snv.genome && snv.genome.ac),
                    react_1.default.createElement("td", null, snv.total.ac))))),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Allele Number"),
                renderedSNVFrequencies.map((snv) => (react_1.default.createElement(react_1.default.Fragment, { key: snv.variant_id },
                    react_1.default.createElement("td", null, snv.exome && snv.exome.an),
                    react_1.default.createElement("td", null, snv.genome && snv.genome.an),
                    react_1.default.createElement("td", null, snv.total.an))))),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Allele Frequency"),
                renderedSNVFrequencies.map((snv) => (react_1.default.createElement(react_1.default.Fragment, { key: snv.variant_id },
                    react_1.default.createElement("td", null, snv.exome && snv.exome.af.toPrecision(4)),
                    react_1.default.createElement("td", null, snv.genome && snv.genome.af.toPrecision(4)),
                    react_1.default.createElement("td", null, snv.total.af.toPrecision(4)))))))));
};
exports.default = MNVConstituentSNVFrequencyTable;
//# sourceMappingURL=MNVConstituentSNVFrequencyTable.js.map