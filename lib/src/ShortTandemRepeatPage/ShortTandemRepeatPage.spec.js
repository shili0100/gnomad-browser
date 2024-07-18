"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const shallow_1 = require("react-test-renderer/shallow");
const ShortTandemRepeat_1 = __importDefault(require("../__factories__/ShortTandemRepeat"));
const datasets_1 = require("../../../tests/__helpers__/datasets");
const ShortTandemRepeatPage_1 = __importDefault(require("./ShortTandemRepeatPage"));
(0, datasets_1.forAllDatasets)('ShortTandemRepeatPage with "%s" dataset', (datasetId) => {
    (0, globals_1.test)('has no unexected changes', () => {
        const shortTandemRepeat = ShortTandemRepeat_1.default.build();
        const renderer = (0, shallow_1.createRenderer)();
        renderer.render(react_1.default.createElement(ShortTandemRepeatPage_1.default, { datasetId: datasetId, shortTandemRepeat: shortTandemRepeat }));
        (0, globals_1.expect)(renderer.getRenderOutput()).toMatchSnapshot();
    });
});
//# sourceMappingURL=ShortTandemRepeatPage.spec.js.map