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
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const InlineListWrapper = styled_components_1.default.ul `
  display: inline;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    display: inline;

    &::after {
      content: ', ';
    }

    &:last-child::after {
      content: none;
    }
  }
`;
// @ts-expect-error TS(7022) FIXME: 'InlineList' implicitly has type 'any' because it ... Remove this comment to see the full error message
const InlineList = (_a) => {
    var { items, label, maxLength } = _a, otherProps = __rest(_a, ["items", "label", "maxLength"]);
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const hasMore = items.length > maxLength;
    const displayedItems = hasMore ? items.slice(0, maxLength - 1) : items;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(InlineListWrapper, Object.assign({}, otherProps),
            displayedItems.map((item, index) => (react_1.default.createElement("li", { key: index }, item) // eslint-disable-line react/no-array-index-key
            )),
            hasMore && (react_1.default.createElement("li", null,
                react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                        setIsExpanded(true);
                    } },
                    "and ",
                    items.length - displayedItems.length,
                    " more")))),
        isExpanded && (react_1.default.createElement(ui_1.Modal
        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
            initialFocusOnButton: false, title: label, onRequestClose: () => setIsExpanded(false) },
            react_1.default.createElement(ui_1.List, null, items.map((item, index) => (
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            // eslint-disable-next-line react/no-array-index-key
            react_1.default.createElement(ui_1.ListItem, { key: index }, item))))))));
};
InlineList.defaultProps = {
    maxLength: 3,
};
exports.default = InlineList;
//# sourceMappingURL=InlineList.js.map