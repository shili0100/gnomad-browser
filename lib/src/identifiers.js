"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStructuralVariantId = void 0;
const metadata_1 = require("../dataset-metadata/metadata");
const V2_STRUCTURAL_VARIANT_ID_REGEX = /^(BND|CPX|CTX|DEL|DUP|INS|INV|MCNV|OTH)_(\d+|X|Y)_([1-9][0-9]*)$/i;
const V3_STRUCTURAL_VARIANT_ID_REGEX = /^(BND|CPX|CTX|DEL|DUP|INS|INV|CNV)_CHR(\d+|X|Y)_([0-9a-f]*)$/i;
const isStructuralVariantId = (str, datasetId) => {
    const svRegex = (0, metadata_1.isV4SVs)(datasetId)
        ? V3_STRUCTURAL_VARIANT_ID_REGEX
        : V2_STRUCTURAL_VARIANT_ID_REGEX;
    const match = svRegex.exec(str);
    if (!match) {
        return false;
    }
    const chrom = match[2];
    const chromNumber = Number(chrom);
    if (!Number.isNaN(chromNumber) && (chromNumber < 1 || chromNumber > 22)) {
        return false;
    }
    if (!(0, metadata_1.isV4SVs)(datasetId)) {
        const id = Number(match[3]);
        if (id > 1e9) {
            return false;
        }
    }
    return true;
};
exports.isStructuralVariantId = isStructuralVariantId;
//# sourceMappingURL=identifiers.js.map