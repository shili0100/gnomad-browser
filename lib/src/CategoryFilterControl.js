"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const check_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/check.svg"));
const polished_1 = require("polished");
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const CategoryButton = styled_components_1.default.button `
  box-sizing: border-box;
  width: 35px;
  height: 20px;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 0.75em;
  background: none;
  cursor: pointer;
  user-select: none;
  line-height: 18px;
  outline: none;

  &:active,
  &:hover {
    border-color: ${(0, polished_1.darken)(0.15, '#ddd')};
  }

  &:focus {
    box-shadow: 0 0 0 0.2em ${(0, polished_1.transparentize)(0.5, '#ddd')};
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;
const CheckboxIcon = styled_components_1.default.span `
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  padding: 1px;
  border-width: 1px;
  margin: 0 0.7em;
  border-color: #000;
  border-radius: 3px;
  border-style: solid;
  font-size: 10px;

  > img {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 10px;
    height: 10px;
  }
`;
const Checkbox = styled_components_1.default.input.attrs({ type: 'checkbox' }) `
  ${(0, polished_1.hideVisually)()};

  :focus + ${CheckboxIcon} {
    border-color: #428bca;
    box-shadow: 0 0 0 0.2em #428bca;
  }
`;
const CategoryWrapper = styled_components_1.default.span `
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  overflow: hidden;
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  border-width: 1px;

  &:first-child {
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
  }

  &:nth-last-child(2) {
    border-top-right-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }
`;
const background = ({ backgroundColor }) => `linear-gradient(to right, ${backgroundColor}, ${backgroundColor} 2em, rgba(0, 0, 0, 0) 2em, rgba(0, 0, 0, 0))`;
const Label = styled_components_1.default.label `
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  background: ${background};
  background-repeat: no-repeat;
  font-size: 14px;
  user-select: none;
`;
const LabelText = styled_components_1.default.span `
  padding: 0.375em 0.75em;
  line-height: 1.15em;
`;
const SelectAllButton = (0, styled_components_1.default)(ui_1.Button) `
  width: 35px;
  height: 20px;
  padding: 0;
  border-radius: 5px;
  margin: 0 0.5em;
`;
const Wrapper = styled_components_1.default.div `
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;

  @media (max-width: ${(props) => `${props.breakpoint}px`}) {
    ${CategoryWrapper} {
      border-radius: 0.5em;
      margin: 0 0.5em 0.5em 0;
    }

    ${SelectAllButton} {
      margin: 0 0.5em 0.5em;
    }
  }
`;
const CategoryFilterControl = ({ breakpoint = 1200, categories, categorySelections, className, id, onChange, style, }) => (
// @ts-expect-error TS(2769) FIXME: No overload matches this call.
react_1.default.createElement(Wrapper, { breakpoint: breakpoint, className: className, id: id, style: style },
    categories.map((category) => (
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    react_1.default.createElement(CategoryWrapper, { key: category.id, borderColor: category.color },
        react_1.default.createElement(Label, { htmlFor: `${id}-${category.id}`, 
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            backgroundColor: (0, polished_1.transparentize)(0.5, category.color) },
            react_1.default.createElement(Checkbox, { checked: categorySelections[category.id], id: `${id}-${category.id}`, type: "checkbox", onChange: (e) => onChange(Object.assign(Object.assign({}, categorySelections), { [category.id]: e.target.checked })) }),
            react_1.default.createElement(CheckboxIcon, { "aria-hidden": true }, categorySelections[category.id] && react_1.default.createElement("img", { src: check_svg_1.default, alt: "" })),
            react_1.default.createElement(LabelText, null, category.label)),
        react_1.default.createElement(CategoryButton, { onClick: () => onChange(categories.reduce((acc, cat) => (Object.assign(Object.assign({}, acc), { [cat.id]: cat.id === category.id })), {})) }, "only")))),
    react_1.default.createElement(SelectAllButton, { onClick: () => onChange(categories.reduce((acc, cat) => (Object.assign(Object.assign({}, acc), { [cat.id]: true })), {})) }, "all")));
CategoryFilterControl.defaultProps = {
    breakpoint: 1200,
    className: undefined,
    style: undefined,
};
exports.default = CategoryFilterControl;
//# sourceMappingURL=CategoryFilterControl.js.map