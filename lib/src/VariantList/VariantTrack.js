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
const polished_1 = require("polished");
const react_1 = __importStar(require("react"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const track_variants_1 = __importDefault(require("@gnomad/track-variants"));
const vepConsequences_1 = require("../vepConsequences");
const consequenceCategoryColors = {
    lof: (0, polished_1.transparentize)(0.3, '#FF583F'),
    missense: (0, polished_1.transparentize)(0.3, '#F0C94D'),
    synonymous: (0, polished_1.transparentize)(0.3, 'green'),
    other: (0, polished_1.transparentize)(0.3, '#757575'),
};
const variantColor = (variant) => {
    const category = (0, vepConsequences_1.getCategoryFromConsequence)(variant.consequence) || 'other';
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return consequenceCategoryColors[category];
};
class VariantTrack extends react_1.PureComponent {
    render() {
        return react_1.default.createElement(track_variants_1.default, Object.assign({ variantColor: variantColor }, this.props));
    }
}
exports.default = VariantTrack;
//# sourceMappingURL=VariantTrack.js.map