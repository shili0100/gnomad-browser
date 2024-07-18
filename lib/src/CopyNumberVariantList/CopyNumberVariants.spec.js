"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const globals_1 = require("@jest/globals");
const CopyNumberVariants_1 = __importDefault(require("./CopyNumberVariants"));
const CopyNumberVariant_1 = __importDefault(require("../__factories__/CopyNumberVariant"));
const shallow_1 = require("react-test-renderer/shallow");
(0, globals_1.describe)('CopyNumberVariants', () => {
    const context = { chrom: '12' };
    const variants = CopyNumberVariant_1.default.buildList(3).map((v) => (Object.assign({}, v)));
    (0, globals_1.test)('has no unexpected changes', () => {
        // We can't do a full render because the Grid component invoked a couple of
        // layers down uses react-sizeme. Since Grid is defined in GBTK, not this
        // project, the sizeme mock in this project isn't applied.
        const tree = (0, shallow_1.createRenderer)().render(react_1.default.createElement(CopyNumberVariants_1.default, { context: context, exportFileName: "somefile.tar.gz", variants: variants }));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=CopyNumberVariants.spec.js.map