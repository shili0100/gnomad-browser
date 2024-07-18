"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const ui_1 = require("@gnomad/ui");
const CategoryFilterControl_1 = __importDefault(require("../CategoryFilterControl"));
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const TrackPage_1 = require("../TrackPage");
const vepConsequences_1 = require("../vepConsequences");
const clinvarVariantCategories_1 = require("./clinvarVariantCategories");
const ClinvarAllVariantsPlot_1 = __importDefault(require("./ClinvarAllVariantsPlot"));
const ClinvarBinnedVariantsPlot_1 = __importDefault(require("./ClinvarBinnedVariantsPlot"));
const ClinvarVariantDetails_1 = __importDefault(require("./ClinvarVariantDetails"));
const TopPanel = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1em;
`;
const ControlRow = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const TitlePanel = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-right: 20px;
`;
const ConsequenceCategoryFiltersWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;

  input[type='checkbox'] {
    position: relative;
    top: 2px;
  }

  label {
    margin-left: 1em;

    &:first-child {
      margin-left: 0;
    }
  }

  @media (max-width: 600px) {
    margin-bottom: 0.5em;
  }
`;
const ConsequenceCategoryFilter = styled_components_1.default.div `
  margin-right: 1ch;
`;
const SelectCategoryButton = (0, styled_components_1.default)(ui_1.Button) `
  width: 35px;
  height: 20px;
  padding: 0;
  border-radius: 5px;
  line-height: 18px;
`;
const FilterRow = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ClinvarVariantTrack = ({ referenceGenome, transcripts, variants }) => {
    const [selectedVariant, setSelectedVariant] = (0, react_1.useState)(null);
    const [includedClinicalSignificanceCategories, setIncludedClinicalSignificanceCategories] = (0, react_1.useState)(clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORIES.reduce((acc, category) => (Object.assign(Object.assign({}, acc), { [category]: true })), {}));
    const [includedConsequenceCategories, setIncludedConsequenceCategories] = (0, react_1.useState)(vepConsequences_1.VEP_CONSEQUENCE_CATEGORIES.reduce((acc, category) => (Object.assign(Object.assign({}, acc), { [category]: true })), {}));
    const [showOnlyGnomad, setShowOnlyGnomad] = (0, react_1.useState)(false);
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const [starFilter, setStarFilter] = (0, react_1.useState)(0);
    const filteredVariants = variants.filter((v) => 
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    includedClinicalSignificanceCategories[(0, clinvarVariantCategories_1.clinvarVariantClinicalSignificanceCategory)(v)] &&
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        includedConsequenceCategories[(0, vepConsequences_1.getCategoryFromConsequence)(v.major_consequence)] &&
        (!showOnlyGnomad || v.in_gnomad) &&
        v.gold_stars >= starFilter);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(TrackPage_1.TrackPageSection, null,
            react_1.default.createElement(TopPanel, null,
                react_1.default.createElement(ControlRow, null,
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(CategoryFilterControl_1.default, { categories: clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORIES.map((category) => ({
                                id: category,
                                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                label: clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORY_LABELS[category],
                                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                color: clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORY_COLORS[category],
                            })), categorySelections: includedClinicalSignificanceCategories, id: "clinvar-track-included-categories", onChange: setIncludedClinicalSignificanceCategories }),
                        ' ',
                        react_1.default.createElement(InfoButton_1.default, { topic: "clinvar-variant-categories" }))),
                react_1.default.createElement(ControlRow, null,
                    react_1.default.createElement(ConsequenceCategoryFiltersWrapper, null,
                        vepConsequences_1.VEP_CONSEQUENCE_CATEGORIES.map((category) => (react_1.default.createElement(ConsequenceCategoryFilter, { key: category },
                            react_1.default.createElement(ui_1.Checkbox, { id: `clinvar-track-include-${category}`, 
                                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                label: vepConsequences_1.VEP_CONSEQUENCE_CATEGORY_LABELS[category], 
                                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                checked: includedConsequenceCategories[category], onChange: (value) => {
                                    setIncludedConsequenceCategories(Object.assign(Object.assign({}, includedConsequenceCategories), { [category]: value }));
                                } }),
                            ' ',
                            react_1.default.createElement(SelectCategoryButton, { onClick: () => {
                                    setIncludedConsequenceCategories(Object.assign({}, vepConsequences_1.VEP_CONSEQUENCE_CATEGORIES.reduce((acc, c) => (Object.assign(Object.assign({}, acc), { [c]: c === category })), {})));
                                } }, "only")))),
                        react_1.default.createElement(SelectCategoryButton, { style: { marginLeft: '0.5em' }, onClick: () => {
                                setIncludedConsequenceCategories(Object.assign({}, vepConsequences_1.VEP_CONSEQUENCE_CATEGORIES.reduce((acc, c) => (Object.assign(Object.assign({}, acc), { [c]: true })), {})));
                            } }, "all")),
                    react_1.default.createElement(ui_1.Button, { onClick: () => {
                            setIsExpanded(!isExpanded);
                        }, style: { flexShrink: 0 } }, isExpanded ? 'Collapse to bins' : 'Expand to all variants')),
                react_1.default.createElement(FilterRow, null,
                    react_1.default.createElement(ui_1.Checkbox, { id: "clinvar-track-in-gnomad", label: "Only show ClinVar variants that are in gnomAD", checked: showOnlyGnomad, onChange: setShowOnlyGnomad }),
                    react_1.default.createElement("label", { htmlFor: "star-filtering" },
                        "Filter by",
                        ' ',
                        react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.ncbi.nlm.nih.gov/clinvar/docs/review_status/" }, "review status"),
                        ": \u00A0",
                        react_1.default.createElement("select", { id: "clinvar-star-filter", value: starFilter, onChange: (e) => setStarFilter(Number(e.target.value)) },
                            react_1.default.createElement("option", { value: 0 }, " 0-4 Stars "),
                            react_1.default.createElement("option", { value: 1 },
                                " ",
                                '>',
                                "=1 Stars "),
                            react_1.default.createElement("option", { value: 2 },
                                " ",
                                '>',
                                "=2 Stars "),
                            react_1.default.createElement("option", { value: 3 },
                                " ",
                                '>',
                                "=3 Stars "),
                            react_1.default.createElement("option", { value: 4 }, " 4 Stars ")))))),
        react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => (react_1.default.createElement(TitlePanel, null,
                "ClinVar variants (",
                filteredVariants.length,
                ")")) }, ({ scalePosition, width }) => {
            return isExpanded ? (react_1.default.createElement(ClinvarAllVariantsPlot_1.default, { scalePosition: scalePosition, transcripts: transcripts, variants: filteredVariants, width: width, onClickVariant: setSelectedVariant })) : (react_1.default.createElement(ClinvarBinnedVariantsPlot_1.default, { includedCategories: includedClinicalSignificanceCategories, 
                // @ts-expect-error TS(2322) FIXME: Type '{ includedCategories: {}; scalePosition: any... Remove this comment to see the full error message
                scalePosition: scalePosition, variants: filteredVariants, width: width }));
        }),
        selectedVariant && (react_1.default.createElement(ui_1.Modal, { size: "large", title: selectedVariant.variant_id, onRequestClose: () => {
                setSelectedVariant(null);
            } },
            react_1.default.createElement(ClinvarVariantDetails_1.default, { referenceGenome: referenceGenome, variantId: selectedVariant.variant_id })))));
};
exports.default = react_1.default.memo(ClinvarVariantTrack);
//# sourceMappingURL=ClinvarVariantTrack.js.map