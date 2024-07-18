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
const ui_1 = require("@gnomad/ui");
const CategoryFilterControl_1 = __importDefault(require("../CategoryFilterControl"));
const vepConsequences_1 = require("../vepConsequences");
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const consequenceCategoryColors = {
    lof: '#FF583F',
    missense: '#F0C94D',
    synonymous: 'green',
    other: '#757575',
};
const SettingsWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const ConsequenceFiltersWrapper = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const CheckboxFiltersWrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1em;
`;
const CheckboxSection = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 2em;
`;
const SearchWrapper = styled_components_1.default.div `
  width: 210px;
  margin-bottom: 1em;
`;
const keyboardShortcuts = {
    lof: 'l',
    missense: 'm',
    synonymous: 's',
    other: 'o',
};
const VariantFilterControls = ({ onChange, value, jumpToRow, position }) => {
    const searchInput = (0, react_1.useRef)(null);
    return (react_1.default.createElement(SettingsWrapper, null,
        react_1.default.createElement(ConsequenceFiltersWrapper, null,
            react_1.default.createElement(CategoryFilterControl_1.default, { categories: vepConsequences_1.VEP_CONSEQUENCE_CATEGORIES.map((category) => ({
                    id: category,
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    label: vepConsequences_1.VEP_CONSEQUENCE_CATEGORY_LABELS[category],
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    color: consequenceCategoryColors[category],
                })), categorySelections: value.includeCategories, id: "variant-consequence-category-filter", onChange: (includeCategories) => {
                    onChange(Object.assign(Object.assign({}, value), { includeCategories }));
                } }),
            ' ',
            react_1.default.createElement(InfoButton_1.default, { topic: "consequence-category-filter" }),
            Object.keys(keyboardShortcuts).map((category) => (react_1.default.createElement(ui_1.KeyboardShortcut, { key: category, handler: () => {
                    onChange(Object.assign(Object.assign({}, value), { includeCategories: Object.assign(Object.assign({}, value.includeCategories), { 
                            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            [category]: !value.includeCategories[category] }) }));
                }, 
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                keys: keyboardShortcuts[category] })))),
        react_1.default.createElement(CheckboxFiltersWrapper, null,
            react_1.default.createElement(CheckboxSection, null,
                react_1.default.createElement(ui_1.Checkbox, { checked: value.includeExomes, disabled: !value.includeGenomes, id: "exome-variant-filter", label: "Exomes", onChange: (includeExomes) => {
                        onChange(Object.assign(Object.assign({}, value), { includeExomes }));
                    } }),
                react_1.default.createElement(ui_1.Checkbox, { checked: value.includeGenomes, disabled: !value.includeExomes, id: "genome-variant-filter", label: "Genomes", onChange: (includeGenomes) => {
                        onChange(Object.assign(Object.assign({}, value), { includeGenomes }));
                    } })),
            react_1.default.createElement(CheckboxSection, null,
                react_1.default.createElement(ui_1.Checkbox, { checked: value.includeSNVs, disabled: !value.includeIndels, id: "snv-variant-filter", label: "SNVs", onChange: (includeSNVs) => {
                        onChange(Object.assign(Object.assign({}, value), { includeSNVs }));
                    } }),
                react_1.default.createElement(ui_1.Checkbox, { checked: value.includeIndels, disabled: !value.includeSNVs, id: "indel-variant-filter", label: "Indels", onChange: (includeIndels) => {
                        onChange(Object.assign(Object.assign({}, value), { includeIndels }));
                    } })),
            react_1.default.createElement(CheckboxSection, null,
                react_1.default.createElement("span", null,
                    react_1.default.createElement(ui_1.Checkbox, { checked: value.includeFilteredVariants, id: "qc-variant-filter", label: "Filtered variants", onChange: (includeFilteredVariants) => {
                            onChange(Object.assign(Object.assign({}, value), { includeFilteredVariants }));
                        } }),
                    react_1.default.createElement(InfoButton_1.default, { topic: "include-filtered-variants" })),
                react_1.default.createElement("span", null,
                    react_1.default.createElement(ui_1.Checkbox, { checked: value.includeContext, id: "context-variant-filter", label: "Display neighboring variants", onChange: (includeContext) => {
                            onChange(Object.assign(Object.assign({}, value), { includeContext }));
                        } })))),
        react_1.default.createElement(SearchWrapper, null,
            react_1.default.createElement(ui_1.SearchInput
            // @ts-expect-error TS(2322) FIXME: Type '{ ref: MutableRefObject<null>; placeholder: ... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ ref: MutableRefObject<null>; placeholder: ... Remove this comment to see the full error message
                ref: searchInput, placeholder: "Search variant table", style: { marginBottom: '1em', width: '210px' }, value: value.searchText, onChange: (searchText) => {
                    jumpToRow(position);
                    onChange(Object.assign(Object.assign({}, value), { searchText }));
                } }),
            react_1.default.createElement(ui_1.KeyboardShortcut
            // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'string[]'... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type 'string[]'... Remove this comment to see the full error message
                keys: "/", 
                // @ts-expect-error TS(2322) FIXME: Type '(e: any) => void' is not assignable to type ... Remove this comment to see the full error message
                handler: (e) => {
                    // preventDefault to avoid typing a "/" in the search input
                    e.preventDefault();
                    if (searchInput.current) {
                        ;
                        searchInput.current.focus();
                    }
                } }))));
};
exports.default = VariantFilterControls;
//# sourceMappingURL=VariantFilterControls.js.map