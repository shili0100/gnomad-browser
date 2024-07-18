"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const PublicationsPage_1 = __importDefault(require("./PublicationsPage"));
const react_router_dom_1 = require("react-router-dom");
(0, globals_1.test)('Publications Page has no unexpected changes', () => {
    const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(PublicationsPage_1.default, null)));
    (0, globals_1.expect)(tree).toMatchSnapshot();
});
//# sourceMappingURL=PublicationsPage.spec.js.map