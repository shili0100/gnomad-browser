"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const SubmissionsList_1 = __importDefault(require("./SubmissionsList"));
const shallow_1 = require("react-test-renderer/shallow");
const ClinvarVariant_1 = __importDefault(require("./__factories__/ClinvarVariant"));
(0, globals_1.describe)('SubmissionsList', () => {
    const clinvarVariant = ClinvarVariant_1.default.build();
    (0, globals_1.test)('has no unexpected changes', () => {
        const tree = (0, shallow_1.createRenderer)().render(react_1.default.createElement(SubmissionsList_1.default, { submissions: clinvarVariant.submissions }));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=SubmissionsList.spec.js.map