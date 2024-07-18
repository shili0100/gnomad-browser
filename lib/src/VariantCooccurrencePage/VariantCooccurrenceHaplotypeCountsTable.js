"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const identifiers_1 = require("@gnomad/identifiers");
const Link_1 = __importDefault(require("../Link"));
const Table = styled_components_1.default.table `
  border-collapse: collapse;
  border-spacing: 0;

  td,
  th {
    padding: 0.5em 10px;
  }

  td {
    text-align: right;
  }
`;
const truncate = (str, maxLength = 5) => {
    if (str.length > maxLength - 1) {
        return `${str.slice(0, maxLength - 1)}\u2026`;
    }
    return str;
};
const VariantCooccurrenceHaplotypeCountsTable = ({ variantIds, haplotypeCounts, }) => {
    const variant1 = (0, identifiers_1.parseVariantId)(variantIds[0]);
    const variant2 = (0, identifiers_1.parseVariantId)(variantIds[1]);
    // haplotypeCounts: ref/ref alt/ref ref/alt alt/alt
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Table, null,
            react_1.default.createElement("colgroup", { span: "2" }),
            react_1.default.createElement("colgroup", { span: "2" }),
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 2 }),
                    react_1.default.createElement("th", { colSpan: 2, scope: "colgroup" },
                        react_1.default.createElement(Link_1.default, { to: `/variant/${variantIds[1]}` },
                            variant2.chrom,
                            "-",
                            variant2.pos,
                            "-",
                            truncate(variant2.ref),
                            "-",
                            truncate(variant2.alt))))),
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 2 }),
                    react_1.default.createElement("th", { scope: "col" }, truncate(variant2.ref)),
                    react_1.default.createElement("th", { scope: "col" }, truncate(variant2.alt))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { rowSpan: 2, scope: "rowgroup" },
                        react_1.default.createElement(Link_1.default, { to: `/variant/${variantIds[0]}` },
                            variant1.chrom,
                            "-",
                            variant1.pos,
                            "-",
                            truncate(variant1.ref),
                            "-",
                            truncate(variant1.alt))),
                    react_1.default.createElement("th", { scope: "row" }, truncate(variant1.ref)),
                    react_1.default.createElement("td", null, Number(haplotypeCounts.ref_ref.toFixed(1)).toLocaleString()),
                    react_1.default.createElement("td", null, Number(haplotypeCounts.hom_ref.toFixed(1)).toLocaleString())),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" }, truncate(variant1.alt)),
                    react_1.default.createElement("td", null, Number(haplotypeCounts.ref_hom.toFixed(1)).toLocaleString()),
                    react_1.default.createElement("td", null, Number(haplotypeCounts.hom_hom.toFixed(1)).toLocaleString()))))));
};
exports.default = VariantCooccurrenceHaplotypeCountsTable;
//# sourceMappingURL=VariantCooccurrenceHaplotypeCountsTable.js.map