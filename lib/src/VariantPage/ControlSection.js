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
/* stylelint-disable block-no-empty */
const ControlWrapper = styled_components_1.default.span ``;
/* stylelint-enable block-no-empty */
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;

    ${ControlWrapper} {
      margin-bottom: 1em;
    }
  }
`;
// @ts-expect-error TS(7022) FIXME: 'ControlSection' implicitly has type 'any' because... Remove this comment to see the full error message
const ControlSection = (_a) => {
    var { children } = _a, otherProps = __rest(_a, ["children"]);
    return (react_1.default.createElement(Wrapper, Object.assign({}, otherProps), react_1.default.Children.map(children, (child) => (react_1.default.createElement(ControlWrapper, null, child)))));
};
ControlSection.defaultProps = {
    children: undefined,
};
exports.default = ControlSection;
//# sourceMappingURL=ControlSection.js.map