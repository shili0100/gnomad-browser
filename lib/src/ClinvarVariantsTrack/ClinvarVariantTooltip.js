"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const vepConsequences_1 = require("../vepConsequences");
const ClinvarVariantTooltipWrapper = styled_components_1.default.div `
  max-width: 100%;
`;
const ClinvarVariantAttributeList = styled_components_1.default.dl `
  margin: 0.5em 0;

  div {
    overflow: hidden;
    margin-bottom: 0.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  dt,
  dd {
    display: inline;
  }

  dt {
    font-weight: bold;
  }

  dd {
    margin: 0 0 0 0.5em;
  }
`;
const renderInGnomad = (variant) => {
    if (variant.gnomad) {
        if (variant.gnomad.exome && variant.gnomad.genome) {
            return `Yes - exomes${variant.gnomad.exome.filters.length ? ' (filtered)' : ''} and genomes${variant.gnomad.genome.filters.length ? ' (filtered)' : ''}`;
        }
        if (variant.gnomad.exome) {
            return `Yes - exomes${variant.gnomad.exome.filters.length ? ' (filtered)' : ''}`;
        }
        if (variant.gnomad.genome) {
            return `Yes - genomes${variant.gnomad.genome.filters.length ? ' (filtered)' : ''}`;
        }
    }
    return 'No';
};
const renderGnomadAF = (variant) => {
    if (!variant.gnomad) {
        return '–';
    }
    const ac = ((variant.gnomad.exome || {}).ac || 0) + ((variant.gnomad.genome || {}).ac || 0);
    const an = ((variant.gnomad.exome || {}).an || 0) + ((variant.gnomad.genome || {}).an || 0);
    const af = an === 0 ? 0 : ac / an;
    const truncated = Number(af.toPrecision(3));
    return truncated === 0 || truncated === 1 ? af.toFixed(0) : af.toExponential(2);
};
const ClinvarVariantTooltip = ({ variant }) => (react_1.default.createElement(ClinvarVariantTooltipWrapper, null,
    react_1.default.createElement("strong", null, variant.variant_id),
    react_1.default.createElement(ClinvarVariantAttributeList, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "Clinical significance"),
            react_1.default.createElement("dd", null, variant.clinical_significance)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "HGVS consequence"),
            react_1.default.createElement("dd", null, variant.hgvsp || variant.hgvsc || '–')),
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "VEP annotation"),
            react_1.default.createElement("dd", null, (0, vepConsequences_1.getLabelForConsequenceTerm)(variant.major_consequence))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "Review status"),
            react_1.default.createElement("dd", null,
                variant.review_status,
                " (",
                variant.gold_stars,
                ' ',
                variant.gold_stars === 1 ? 'star' : 'stars',
                ")")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("dt", null, "In gnomAD?"),
            react_1.default.createElement("dd", null, renderInGnomad(variant))),
        variant.in_gnomad && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "gnomAD allele count"),
                react_1.default.createElement("dd", null, ((variant.gnomad.exome || {}).ac || 0) + ((variant.gnomad.genome || {}).ac || 0))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("dt", null, "gnomAD allele frequency"),
                react_1.default.createElement("dd", null, renderGnomadAF(variant)))))),
    "Click for more information"));
exports.default = ClinvarVariantTooltip;
//# sourceMappingURL=ClinvarVariantTooltip.js.map