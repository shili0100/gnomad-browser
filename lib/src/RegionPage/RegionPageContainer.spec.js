"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const shallow_1 = require("react-test-renderer/shallow");
const datasets_1 = require("../../../tests/__helpers__/datasets");
const RegionPageContainer_1 = __importDefault(require("./RegionPageContainer"));
(0, datasets_1.forAllDatasets)('RegionPageContainer with dataset %s', (datasetId) => {
    (0, globals_1.test)('queries API with correct parameters', () => {
        const renderer = (0, shallow_1.createRenderer)();
        renderer.render(react_1.default.createElement(RegionPageContainer_1.default, { datasetId: datasetId, regionId: "12-345-678" }));
        (0, globals_1.expect)(renderer.getRenderOutput()).toMatchSnapshot();
    });
});
//# sourceMappingURL=RegionPageContainer.spec.js.map