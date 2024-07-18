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
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const question_circle_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/question-circle.svg"));
const polished_1 = require("polished");
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const HelpTopicModal_1 = __importDefault(require("./HelpTopicModal"));
const Button = styled_components_1.default.button.attrs({ type: 'button' }) `
  display: inline-flex;
  align-self: center;
  outline: none;
  padding: 0 3px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    position: relative;
    top: 0.13em;
    width: 14px;
    height: 14px;
    border-radius: 7px;
  }

  &:focus img {
    box-shadow: 0 0 0 0.2em rgba(70, 130, 180, 0.5);
  }
`;
const InfoButton = (_a) => {
    var { topic: topicId } = _a, otherProps = __rest(_a, ["topic"]);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button, Object.assign({}, otherProps, { onClick: (event) => {
                setIsModalOpen(true);
                event.stopPropagation();
            } }),
            react_1.default.createElement("img", { src: question_circle_svg_1.default, alt: "", "aria-hidden": "true" }),
            react_1.default.createElement("span", { style: (0, polished_1.hideVisually)() }, "More information")),
        isModalOpen && (react_1.default.createElement(HelpTopicModal_1.default
        // @ts-expect-error TS(2322) FIXME: Type '{ initialFocusOnButton: boolean; topicId: st... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2322) FIXME: Type '{ initialFocusOnButton: boolean; topicId: st... Remove this comment to see the full error message
            initialFocusOnButton: false, topicId: topicId, onRequestClose: (event) => {
                event.stopPropagation();
                setIsModalOpen(false);
            } }))));
};
exports.default = InfoButton;
//# sourceMappingURL=InfoButton.js.map