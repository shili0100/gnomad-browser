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
const react_1 = __importDefault(require("react"));
const AttributeList_1 = __importStar(require("../AttributeList"));
const InlineList_1 = __importDefault(require("../InlineList"));
const Link_1 = __importDefault(require("../Link"));
const ShortTandemRepeatAdjacentRepeatAttributes = ({ adjacentRepeat }) => {
    return (react_1.default.createElement(AttributeList_1.default, null,
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Reference region" },
            react_1.default.createElement(Link_1.default, { to: `/region/${adjacentRepeat.reference_region.chrom}-${adjacentRepeat.reference_region.start}-${adjacentRepeat.reference_region.stop}` },
                adjacentRepeat.reference_region.chrom,
                "-",
                adjacentRepeat.reference_region.start,
                "-",
                adjacentRepeat.reference_region.stop)),
        react_1.default.createElement(AttributeList_1.AttributeListItem, { label: `Repeat unit${adjacentRepeat.repeat_units.length > 1 ? 's' : ''}` },
            react_1.default.createElement(InlineList_1.default, { items: adjacentRepeat.repeat_units.map((repeatUnit) => (react_1.default.createElement("span", null, repeatUnit === adjacentRepeat.reference_repeat_unit &&
                    adjacentRepeat.repeat_units.length > 1
                    ? `${repeatUnit} (reference)`
                    : repeatUnit))), label: `Repeat unit${adjacentRepeat.repeat_units.length > 1 ? 's' : ''}` }))));
};
exports.default = ShortTandemRepeatAdjacentRepeatAttributes;
//# sourceMappingURL=ShortTandemRepeatAdjacentRepeatAttributes.js.map