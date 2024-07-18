"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionList = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Container = styled_components_1.default.div `
  margin-left: 2rem;
`;
const Section = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const SectionHeader = styled_components_1.default.div `
  font-size: 1.1em;
  font-weight: bold;
`;
exports.SectionList = styled_components_1.default.ul `
  margin-top: 0.5em;

  li {
    margin-bottom: 0.5em;
  }
`;
const NumberOfVariantsInGnomadList = () => {
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(Section, null,
            react_1.default.createElement(SectionHeader, null, "Short variants"),
            react_1.default.createElement(exports.SectionList, null,
                react_1.default.createElement("li", null, "Total SNVs: 786,500,648"),
                react_1.default.createElement("li", null, "Total InDels: 122,583,462"),
                react_1.default.createElement("li", null,
                    "Variant type* counts",
                    react_1.default.createElement(exports.SectionList, null,
                        react_1.default.createElement("li", null, "Synonymous: 9,643,254"),
                        react_1.default.createElement("li", null, "Missense: 16,412,219"),
                        react_1.default.createElement("li", null, "Nonsense: 726,924"),
                        react_1.default.createElement("li", null, "Frameshift: 1,186,588"),
                        react_1.default.createElement("li", null, "Canonical splice site: 542,514")))),
            react_1.default.createElement("div", { style: { fontSize: '0.75em' } },
                react_1.default.createElement("i", null, "*This is only a subset of commonly asked for variant types from the dataset."))),
        react_1.default.createElement(Section, null,
            react_1.default.createElement(SectionHeader, null, "Structural variants"),
            react_1.default.createElement(exports.SectionList, null,
                react_1.default.createElement("li", null,
                    "1,199,117 genome SVs",
                    react_1.default.createElement(exports.SectionList, null,
                        react_1.default.createElement("li", null, "627,947 Deletions"),
                        react_1.default.createElement("li", null, "258,882 Duplications"),
                        react_1.default.createElement("li", null, "711 CNVs"),
                        react_1.default.createElement("li", null, "296,184 Insertions"),
                        react_1.default.createElement("li", null, "2,185 Inversions"),
                        react_1.default.createElement("li", null, "13,116 Complex"),
                        react_1.default.createElement("li", null, "92 Canonical reciprocal translocations"))),
                react_1.default.createElement("li", null,
                    `66,903 rare (<1% site frequency (SF)) exome CNVs`,
                    react_1.default.createElement(exports.SectionList, null,
                        react_1.default.createElement("li", null, "30,877 Deletions"),
                        react_1.default.createElement("li", null, "36,026 Duplications"))))),
        react_1.default.createElement(Section, null,
            react_1.default.createElement(SectionHeader, null, "Average number of variants per person"),
            react_1.default.createElement(exports.SectionList, null,
                react_1.default.createElement("li", null,
                    "SNVs per person (",
                    react_1.default.createElement("i", null, "coming soon"),
                    ")"),
                react_1.default.createElement("li", null, `1 rare (<1% SF) coding CNV per individual`),
                react_1.default.createElement("li", null, "11,844 SVs per genome")))));
};
exports.default = NumberOfVariantsInGnomadList;
//# sourceMappingURL=NumberOfVariantsInGnomadList.js.map