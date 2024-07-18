"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ consequence_terms: ... Remove this comment to see the full error message
const TranscriptConsequencePropType = prop_types_1.default.shape({
    consequence_terms: prop_types_1.default.arrayOf(prop_types_1.default.string),
    domains: prop_types_1.default.arrayOf(prop_types_1.default.string),
    gene_id: prop_types_1.default.string.isRequired,
    gene_version: prop_types_1.default.string.isRequired,
    gene_symbol: prop_types_1.default.string.isRequired,
    hgvs: prop_types_1.default.string,
    hgvsc: prop_types_1.default.string,
    hgvsp: prop_types_1.default.string,
    is_canonical: prop_types_1.default.bool,
    is_mane_select: prop_types_1.default.bool,
    is_mane_select_version: prop_types_1.default.bool,
    lof: prop_types_1.default.string,
    lof_flags: prop_types_1.default.string,
    lof_filter: prop_types_1.default.string,
    major_consequence: prop_types_1.default.string,
    polyphen_prediction: prop_types_1.default.string,
    sift_prediction: prop_types_1.default.string,
    transcript_id: prop_types_1.default.string.isRequired,
    transcript_version: prop_types_1.default.string.isRequired,
});
exports.default = TranscriptConsequencePropType;
//# sourceMappingURL=TranscriptConsequencePropType.js.map