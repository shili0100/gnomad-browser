"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const PopulationPropType = prop_types_1.default.shape({
    id: prop_types_1.default.string.isRequired,
    sc: prop_types_1.default.number.isRequired,
    sn: prop_types_1.default.number.isRequired,
    sf: prop_types_1.default.number.isRequired,
});
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ ac: Validator<numbe... Remove this comment to see the full error message
const CopyNumberVariantPropType = prop_types_1.default.shape({
    alts: prop_types_1.default.arrayOf(prop_types_1.default.string),
    sc: prop_types_1.default.number.isRequired,
    sn: prop_types_1.default.number.isRequired,
    sf: prop_types_1.default.number,
    chrom: prop_types_1.default.string.isRequired,
    end: prop_types_1.default.number.isRequired,
    filters: prop_types_1.default.arrayOf(prop_types_1.default.string.isRequired),
    genes: prop_types_1.default.arrayOf(prop_types_1.default.string),
    length: prop_types_1.default.number.isRequired,
    populations: prop_types_1.default.arrayOf(PopulationPropType),
    pos: prop_types_1.default.number.isRequired,
    qual: prop_types_1.default.number,
    type: prop_types_1.default.string.isRequired,
    posmin: prop_types_1.default.number.isRequired,
    posmax: prop_types_1.default.number.isRequired,
    endmin: prop_types_1.default.number.isRequired,
    endmax: prop_types_1.default.number.isRequired,
    variant_id: prop_types_1.default.string.isRequired,
});
exports.default = CopyNumberVariantPropType;
//# sourceMappingURL=CopyNumberVariantPropType.js.map