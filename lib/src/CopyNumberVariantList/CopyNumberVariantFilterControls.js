"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const CategoryFilterControl_1 = __importDefault(require("../CategoryFilterControl"));
const copyNumberVariantTypes_1 = require("./copyNumberVariantTypes");
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
const CopyNumberVariantFilterControls = ({ onChange, colorKey, value }) => (react_1.default.createElement(SettingsWrapper, null,
    react_1.default.createElement(CategoryFiltersWrapper, null,
        react_1.default.createElement(CategoryFilterLabel, null, "Classes"),
        react_1.default.createElement(CategoryFilterControl_1.default, { categories: copyNumberVariantTypes_1.cnvTypes.map((type) => ({
                id: type,
                label: type,
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                color: colorKey === 'type' ? copyNumberVariantTypes_1.cnvTypeColors[type] : 'gray',
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
exports.default = CopyNumberVariantFilterControls;
//# sourceMappingURL=CopyNumberVariantFilterControls.js.map