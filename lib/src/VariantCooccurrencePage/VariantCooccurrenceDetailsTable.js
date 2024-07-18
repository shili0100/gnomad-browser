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
const LegendSwatch = styled_components_1.default.span `
  position: relative;
  top: 2px;
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #000;
  background: ${(props) => props.color};
`;
const truncate = (str, maxLength = 5) => {
    if (str.length > maxLength - 1) {
        return `${str.slice(0, maxLength - 1)}\u2026`;
    }
    return str;
};
const DIFFERENT_HAPLOTYPES_HIGHLIGHT_COLOR = 'rgb(255, 119, 114)';
const SAME_HAPLOTYPE_HIGHLIGHT_COLOR = 'rgb(0, 202, 235)';
const INDETERMINATE_HIGHLIGHT_COLOR = 'rgb(191, 117, 240)';
const VariantCooccurrenceDetailsTable = ({ variantIds, genotypeCounts, }) => {
    const variant1 = (0, identifiers_1.parseVariantId)(variantIds[0]);
    const variant2 = (0, identifiers_1.parseVariantId)(variantIds[1]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Table, null,
            react_1.default.createElement("colgroup", { span: "2" }),
            react_1.default.createElement("colgroup", { span: "3" }),
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 2 }),
                    react_1.default.createElement("th", { colSpan: 3, scope: "colgroup" },
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
                    react_1.default.createElement("th", { scope: "col" },
                        truncate(variant2.ref),
                        "/",
                        truncate(variant2.ref)),
                    react_1.default.createElement("th", { scope: "col" },
                        truncate(variant2.ref),
                        "/",
                        truncate(variant2.alt)),
                    react_1.default.createElement("th", { scope: "col" },
                        truncate(variant2.alt),
                        "/",
                        truncate(variant2.alt))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { rowSpan: 3, scope: "rowgroup" },
                        react_1.default.createElement(Link_1.default, { to: `/variant/${variantIds[0]}` },
                            variant1.chrom,
                            "-",
                            variant1.pos,
                            "-",
                            truncate(variant1.ref),
                            "-",
                            truncate(variant1.alt))),
                    react_1.default.createElement("th", { scope: "row" },
                        truncate(variant1.ref),
                        "/",
                        truncate(variant1.ref)),
                    react_1.default.createElement("td", null, genotypeCounts.ref_ref.toLocaleString()),
                    react_1.default.createElement("td", { style: {
                            background: DIFFERENT_HAPLOTYPES_HIGHLIGHT_COLOR,
                        } }, genotypeCounts.ref_het.toLocaleString()),
                    react_1.default.createElement("td", { style: {
                            background: DIFFERENT_HAPLOTYPES_HIGHLIGHT_COLOR,
                        } }, genotypeCounts.ref_hom.toLocaleString())),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        truncate(variant1.ref),
                        "/",
                        truncate(variant1.alt)),
                    react_1.default.createElement("td", { style: {
                            background: DIFFERENT_HAPLOTYPES_HIGHLIGHT_COLOR,
                        } }, genotypeCounts.het_ref.toLocaleString()),
                    react_1.default.createElement("td", { style: {
                            background: INDETERMINATE_HIGHLIGHT_COLOR,
                        } }, genotypeCounts.het_het.toLocaleString()),
                    react_1.default.createElement("td", { style: { background: SAME_HAPLOTYPE_HIGHLIGHT_COLOR } }, genotypeCounts.het_hom.toLocaleString())),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        truncate(variant1.alt),
                        "/",
                        truncate(variant1.alt)),
                    react_1.default.createElement("td", { style: {
                            background: DIFFERENT_HAPLOTYPES_HIGHLIGHT_COLOR,
                        } }, genotypeCounts.hom_ref.toLocaleString()),
                    react_1.default.createElement("td", { style: { background: SAME_HAPLOTYPE_HIGHLIGHT_COLOR } }, genotypeCounts.hom_het.toLocaleString()),
                    react_1.default.createElement("td", { style: {
                            background: SAME_HAPLOTYPE_HIGHLIGHT_COLOR,
                        } }, genotypeCounts.hom_hom.toLocaleString())))),
        react_1.default.createElement("p", null,
            react_1.default.createElement(LegendSwatch, { color: DIFFERENT_HAPLOTYPES_HIGHLIGHT_COLOR }),
            " Samples consistent with variants appearing in isolation or on different haplotypes.",
            react_1.default.createElement("br", null),
            react_1.default.createElement(LegendSwatch, { color: SAME_HAPLOTYPE_HIGHLIGHT_COLOR }),
            " Samples consistent with variants appearing on the same haplotype.",
            react_1.default.createElement("br", null),
            react_1.default.createElement(LegendSwatch, { color: INDETERMINATE_HIGHLIGHT_COLOR }),
            " Samples consistent with either co-occurrence pattern.")));
};
exports.default = VariantCooccurrenceDetailsTable;
//# sourceMappingURL=VariantCooccurrenceDetailsTable.js.map