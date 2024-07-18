"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const datasets_1 = require("../../../tests/__helpers__/datasets");
const SVReferenceList_1 = __importDefault(require("./SVReferenceList"));
const StructuralVariant_1 = __importDefault(require("../__factories__/StructuralVariant"));
const structuralVariantTypes_1 = require("../StructuralVariantList/structuralVariantTypes");
(0, datasets_1.forAllDatasets)('SVReferenceList with dataset %s selected', (datasetId) => {
    globals_1.describe.each(structuralVariantTypes_1.svTypes)('for SV of type %s', (variantType) => {
        (0, globals_1.test)('has no unexpected changes', () => {
            const sv = StructuralVariant_1.default.build({ type: variantType });
            const tree = react_test_renderer_1.default.create(react_1.default.createElement(SVReferenceList_1.default, { variant: sv, datasetId: datasetId }));
            (0, globals_1.expect)(tree).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=SVReferenceList.spec.js.map