"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const BinnedVariantsPlot_1 = __importDefault(require("../BinnedVariantsPlot"));
const clinvarVariantCategories_1 = require("./clinvarVariantCategories");
const TooltipContent = styled_components_1.default.div `
  line-height: 1;
  text-align: left;

  ${ui_1.List} {
    /* margin-top: 0; */
  }

  ${ui_1.ListItem} {
    &:last-child {
      margin: 0;
    }
  }

  p {
    margin-bottom: 0.5em;
  }
`;
const formatTooltip = (bin, includedCategories) => {
    return (react_1.default.createElement(TooltipContent, null,
        "This bin contains:",
        react_1.default.createElement(ui_1.List, null, clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORIES.filter((category) => includedCategories[category]).map((category) => {
            return (
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            react_1.default.createElement(ui_1.ListItem, { key: category },
                bin[category],
                " ",
                clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORY_LABELS[category].toLowerCase(),
                ' ',
                "variant",
                bin[category] !== 1 ? 's' : ''));
        })),
        "Click \"Expand to all variants\" to see individual variants."));
};
const ClinvarBinnedVariantsPlot = (_a) => {
    var { includedCategories } = _a, props = __rest(_a, ["includedCategories"]);
    return (react_1.default.createElement(BinnedVariantsPlot_1.default, Object.assign({}, props, { 
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        categoryColor: (category) => clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORY_COLORS[category], formatTooltip: (bin) => formatTooltip(bin, includedCategories), variantCategory: clinvarVariantCategories_1.clinvarVariantClinicalSignificanceCategory, variantCategories: clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORIES })));
};
exports.default = ClinvarBinnedVariantsPlot;
//# sourceMappingURL=ClinvarBinnedVariantsPlot.js.map