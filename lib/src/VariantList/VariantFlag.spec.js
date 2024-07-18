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
const globals_1 = require("@jest/globals");
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const VariantFlag_1 = __importStar(require("./VariantFlag"));
(0, globals_1.describe)('Variant flag', () => {
    const realFlags = Object.keys(VariantFlag_1.FLAGS_CONFIG);
    realFlags.forEach((flag) => {
        (0, globals_1.test)(`correctly formats with key of '${flag}'`, () => {
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(VariantFlag_1.default, { key: flag, type: flag, variant: {} }));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
    (0, globals_1.test)('correctly formats as nothing when given a non-existent variant flag', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(VariantFlag_1.default, { key: "not-a-real-flag", type: "not-a-real-flag", variant: {} }));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=VariantFlag.spec.js.map