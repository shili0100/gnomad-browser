"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const StructuralVariants_1 = __importDefault(require("./StructuralVariants"));
const StructuralVariant_1 = __importDefault(require("../__factories__/StructuralVariant"));
const shallow_1 = require("react-test-renderer/shallow");
(0, globals_1.describe)('StructuralVariants', () => {
    const context = { chrom: '12' };
    const variants = StructuralVariant_1.default.buildList(3);
    (0, globals_1.test)('has no unexpected changes', () => {
        // We can't do a full render because the Grid component invoked a couple of
        // layers down uses react-sizeme. Since Grid is defined in GBTK, not this
        // project, the sizeme mock in this project isn't applied.
        const tree = (0, shallow_1.createRenderer)().render(react_1.default.createElement(StructuralVariants_1.default, { context: context, exportFileName: "somefile.tar.gz", variants: variants }));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=StructuralVariants.spec.js.map