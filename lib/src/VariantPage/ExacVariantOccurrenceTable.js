"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const sampleCounts_1 = __importDefault(require("../../dataset-metadata/sampleCounts"));
const QCFilter_1 = __importDefault(require("../QCFilter"));
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
const ExacVariantOccurrenceTable = ({ variant }) => {
    // Display a warning if a variant's AN is < 50% of the max AN.
    // Max AN is 2 * sample count, so 50% max AN is equal to sample count.
    const hasLowAlleleNumber = variant.exome.an < sampleCounts_1.default.exac.total;
    const coverage = (variant.coverage.exome || { mean: null }).mean;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Table, null,
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null),
                    react_1.default.createElement("th", { scope: "col" }, "Exomes")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Quality control filters that this variant failed (if any)" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Filters"))),
                    react_1.default.createElement("td", null, variant.exome.filters.length === 0 ? (react_1.default.createElement(ui_1.Badge, { level: "success" }, "Pass")) : (
                    // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type '"AC0" | "... Remove this comment to see the full error message
                    variant.exome.filters.map((filter) => react_1.default.createElement(QCFilter_1.default, { key: filter, filter: filter }))))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Alternate allele count in high quality genotypes" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Allele Count"))),
                    react_1.default.createElement("td", null, variant.exome.ac)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Total number of called high quality genotypes" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Allele Number"))),
                    react_1.default.createElement("td", null,
                        variant.exome.an,
                        hasLowAlleleNumber && ' *')),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Alternate allele frequency in high quality genotypes" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Allele Frequency"))),
                    react_1.default.createElement("td", null, variant.exome.an === 0 ? 0 : (variant.exome.ac / variant.exome.an).toPrecision(4))),
                variant.chrom !== 'Y' && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Number of individuals homozygous for alternate allele" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Number of homozygotes"))),
                    react_1.default.createElement("td", null, variant.exome.ac_hom))),
                (variant.chrom === 'X' || variant.chrom === 'Y') && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Number of individuals hemizygous for alternate allele" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Number of hemizygotes"))),
                    react_1.default.createElement("td", null, variant.exome.ac_hemi))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Mean depth of coverage at this variant's locus" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Mean depth of coverage"))),
                    react_1.default.createElement("td", null, coverage !== null ? coverage.toFixed(1) : '–')))),
        hasLowAlleleNumber && (react_1.default.createElement("p", null,
            react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Warning"),
            " This variant is covered in fewer than 50% of individuals in ExAC. Allele frequency estimates may not be reliable."))));
};
exports.default = ExacVariantOccurrenceTable;
//# sourceMappingURL=ExacVariantOccurrenceTable.js.map