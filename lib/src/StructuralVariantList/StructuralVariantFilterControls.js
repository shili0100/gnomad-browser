"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const CategoryFilterControl_1 = __importDefault(require("../CategoryFilterControl"));
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const structuralVariantConsequences_1 = require("./structuralVariantConsequences");
const structuralVariantTypes_1 = require("./structuralVariantTypes");
const CategoryFilterLabel = styled_components_1.default.span `
  margin-bottom: 0.5em;
  font-weight: bold;
`;
const CategoryFiltersWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    align-items: center;
  }
`;
const CheckboxWrapper = styled_components_1.default.div `
  /* stylelint-ignore-line block-no-empty */
`;
const SearchWrapper = styled_components_1.default.div `
  /* stylelint-ignore-line block-no-empty */
`;
const SettingsWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;
const StructuralVariantFilterControls = ({ onChange, colorKey, value }) => (react_1.default.createElement(SettingsWrapper, null,
    react_1.default.createElement(CategoryFiltersWrapper, null,
        react_1.default.createElement(CategoryFilterLabel, null,
            "Consequences",
            react_1.default.createElement(InfoButton_1.default, { topic: "sv-effect-overview" })),
        react_1.default.createElement(CategoryFilterControl_1.default, { categories: ['lof', 'dup_lof', 'copy_gain', 'other'].map((category) => ({
                id: category,
                label: structuralVariantConsequences_1.svConsequenceCategoryLabels[category],
                color: colorKey === 'consequence' ? structuralVariantConsequences_1.svConsequenceCategoryColors[category] : 'gray',
            })), categorySelections: value.includeConsequenceCategories, id: "sv-consequence-category-filter", onChange: (includeConsequenceCategories) => {
                onChange(Object.assign(Object.assign({}, value), { includeConsequenceCategories }));
            } }),
        react_1.default.createElement(CategoryFilterLabel, null,
            "Classes",
            react_1.default.createElement(InfoButton_1.default, { topic: "sv-class-overview" })),
        react_1.default.createElement(CategoryFilterControl_1.default, { categories: structuralVariantTypes_1.svTypes.map((type) => ({
                id: type,
                label: type,
                color: colorKey === 'type' && structuralVariantTypes_1.svTypeColors[type] ? structuralVariantTypes_1.svTypeColors[type] : 'gray',
            })), categorySelections: value.includeTypes, id: "sv-type-category-filter", onChange: (includeTypes) => {
                onChange(Object.assign(Object.assign({}, value), { includeTypes }));
            } })),
    react_1.default.createElement(CheckboxWrapper, null,
        react_1.default.createElement("span", null,
            react_1.default.createElement(ui_1.Checkbox, { checked: value.includeFilteredVariants, id: "sv-qc-filter", label: "Include filtered variants", onChange: (includeFilteredVariants) => {
                    onChange(Object.assign(Object.assign({}, value), { includeFilteredVariants }));
                } }))),
    react_1.default.createElement(SearchWrapper, null,
        react_1.default.createElement(ui_1.SearchInput, { placeholder: "Search variant table", onChange: (searchText) => {
                onChange(Object.assign(Object.assign({}, value), { searchText }));
            }, value: value.searchText }))));
exports.default = StructuralVariantFilterControls;
//# sourceMappingURL=StructuralVariantFilterControls.js.map