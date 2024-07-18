"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const react_router_dom_1 = require("react-router-dom");
const StructuralVariantAttributeList_1 = __importDefault(require("./StructuralVariantAttributeList"));
const StructuralVariant_1 = __importDefault(require("../__factories__/StructuralVariant"));
(0, globals_1.test)('StructuralVariantAttributeList tolerates certain variant fields being null', () => {
    const variant = StructuralVariant_1.default.build({
        filters: null,
        algorithms: null,
        length: null,
        evidence: null,
        cpx_intervals: null,
    });
    const tree = react_test_renderer_1.default.create(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(StructuralVariantAttributeList_1.default, { variant: variant })));
    (0, globals_1.expect)(tree).toMatchSnapshot();
});
//# sourceMappingURL=StructuralVariantAttributeList.spec.js.map