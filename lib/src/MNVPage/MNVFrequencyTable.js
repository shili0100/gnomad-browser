"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Table = styled_components_1.default.table `
  /* To vertically align with the right column's heading */
  margin-top: 1.25em;

  th {
    font-weight: bold;
  }

  th[scope='col'] {
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
const MNVFrequencyTable = ({ variant }) => {
    const isPresentInExome = Boolean(variant.exome);
    const isPresentInGenome = Boolean(variant.genome);
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const exomeIndividuals = isPresentInExome ? variant.exome.n_individuals : 0;
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const genomeIndividuals = isPresentInGenome ? variant.genome.n_individuals : 0;
    const totalIndividuals = exomeIndividuals + genomeIndividuals;
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const exomeAC = isPresentInExome ? variant.exome.ac : 0;
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const genomeAC = isPresentInGenome ? variant.genome.ac : 0;
    const totalAC = exomeAC + genomeAC;
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const exomeACHom = isPresentInExome ? variant.exome.ac_hom : 0;
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    const genomeACHom = isPresentInGenome ? variant.genome.ac_hom : 0;
    const totalACHom = exomeACHom + genomeACHom;
    return (react_1.default.createElement(Table, null,
        react_1.default.createElement("tbody", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null),
                react_1.default.createElement("th", { scope: "col" }, "Exomes"),
                react_1.default.createElement("th", { scope: "col" }, "Genomes"),
                react_1.default.createElement("th", { scope: "col" }, "Total")),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Number of Individuals"),
                react_1.default.createElement("td", null, isPresentInExome && exomeIndividuals),
                react_1.default.createElement("td", null, isPresentInGenome && genomeIndividuals),
                react_1.default.createElement("td", null, totalIndividuals)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Allele Count"),
                react_1.default.createElement("td", null, isPresentInExome && exomeAC),
                react_1.default.createElement("td", null, isPresentInGenome && genomeAC),
                react_1.default.createElement("td", null, totalAC)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", { scope: "row" }, "Number of Homozygotes"),
                react_1.default.createElement("td", null, isPresentInExome && exomeACHom),
                react_1.default.createElement("td", null, isPresentInGenome && genomeACHom),
                react_1.default.createElement("td", null, totalACHom)))));
};
exports.default = MNVFrequencyTable;
//# sourceMappingURL=MNVFrequencyTable.js.map