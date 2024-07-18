"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const constraintMetrics_1 = require("./constraintMetrics");
const RegionalGenomicConstraintTrack_1 = require("../RegionalGenomicConstraintTrack");
const Table = (0, styled_components_1.default)(ui_1.BaseTable) `
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    td,
    th {
      padding-right: 10px;
    }
  }
`;
const ViewSurroundingRegion = styled_components_1.default.div `
  margin-top: 1rem;
`;
const GnomadNonCodingConstraintTableVariant = ({ variantId, chrom, nonCodingConstraint, }) => {
    if (nonCodingConstraint === null) {
        return react_1.default.createElement(react_1.default.Fragment, null, "This variant does not have non coding constraint data for the surrounding region.");
    }
    const regionBuffer = 20000;
    const variantLocation = parseInt(variantId.split('-')[1], 10);
    const surroundingLocation = `${chrom}-${variantLocation - regionBuffer}-${variantLocation + regionBuffer}`;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("p", null, `Genomic constraint values displayed are for the region: ${chrom}-${nonCodingConstraint.start}-${nonCodingConstraint.stop}`),
            react_1.default.createElement("p", null,
                react_1.default.createElement("a", { href: "https://gnomad.broadinstitute.org/news/2022-10-the-addition-of-a-genomic-constraint-metric-to-gnomad/" }, "Read more"),
                ' ',
                "about this constraint.")),
        react_1.default.createElement(Table, null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "col" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "The expected number of variants is predicted using an improved mutational model that takes into account both local sequence context and a variety of genomic features." },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Expected"))),
                    react_1.default.createElement("th", { scope: "col" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "The observed number of variants is the count of rare (MAF<=1%) varaints in this 1kb window as identified in gnomAD v3.1.2" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Observed"))),
                    react_1.default.createElement("th", { scope: "col" }, "Constraint"))),
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null, (0, constraintMetrics_1.renderRoundedNumber)(nonCodingConstraint.expected)),
                    react_1.default.createElement("td", null, nonCodingConstraint.observed),
                    react_1.default.createElement("td", null,
                        "Z =",
                        ' ',
                        (0, constraintMetrics_1.renderRoundedNumber)(nonCodingConstraint.z, {
                            precision: 2,
                            tooltipPrecision: 3,
                            highlightColor: (0, RegionalGenomicConstraintTrack_1.regionColor)(nonCodingConstraint),
                        }),
                        react_1.default.createElement("br", null),
                        "o/e =",
                        ' ',
                        (0, constraintMetrics_1.renderRoundedNumber)(nonCodingConstraint.oe, {
                            precision: 2,
                            tooltipPrecision: 3,
                            highlightColor: null,
                        }))))),
        react_1.default.createElement(RegionalGenomicConstraintTrack_1.Legend, null),
        react_1.default.createElement(ViewSurroundingRegion, null,
            react_1.default.createElement("p", null,
                `View the genomic constraint values for the ${(regionBuffer * 2) / 1000}kb region surrounding this variant: `,
                react_1.default.createElement(Link_1.default, { to: { pathname: `/region/${surroundingLocation}`, search: `variant=${variantId}` } }, surroundingLocation)))));
};
exports.default = GnomadNonCodingConstraintTableVariant;
//# sourceMappingURL=GnomadNonCodingConstraintTableVariant.js.map