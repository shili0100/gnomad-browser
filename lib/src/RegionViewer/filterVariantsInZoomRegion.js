"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCopyNumberVariantsInZoomRegion = exports.filterStructuralVariantsInZoomRegion = void 0;
const lodash_es_1 = require("lodash-es");
const filterVariantsInZoomRegion = (variants, zoomRegion) => {
    if (!zoomRegion) {
        return variants;
    }
    const { start, stop } = zoomRegion;
    const startIndex = (0, lodash_es_1.sortedIndexBy)(variants, { pos: start }, (variant) => variant.pos);
    const stopIndex = (0, lodash_es_1.sortedLastIndexBy)(variants, { pos: stop }, (variant) => variant.pos);
    return variants.slice(startIndex, stopIndex + 1);
};
exports.default = filterVariantsInZoomRegion;
const filterStructuralVariantsInZoomRegion = (structuralVariants, zoomRegion) => {
    if (!zoomRegion) {
        return structuralVariants;
    }
    const { start, stop } = zoomRegion;
    return structuralVariants.filter((variant) => (variant.pos <= stop && variant.end >= start) ||
        (variant.pos2 <= stop && variant.end2 >= start));
};
exports.filterStructuralVariantsInZoomRegion = filterStructuralVariantsInZoomRegion;
const filterCopyNumberVariantsInZoomRegion = (copyNumberVariants, zoomRegion) => {
    if (!zoomRegion) {
        return copyNumberVariants;
    }
    const { start, stop } = zoomRegion;
    return copyNumberVariants.filter((variant) => variant.pos <= stop && variant.end >= start);
};
exports.filterCopyNumberVariantsInZoomRegion = filterCopyNumberVariantsInZoomRegion;
//# sourceMappingURL=filterVariantsInZoomRegion.js.map