"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getVisibleRegions = (regions, clipRegion) => {
    if (!clipRegion) {
        return regions;
    }
    const visibleRegion = [];
    for (let i = 0; i < regions.length; i += 1) {
        const { start, stop } = regions[i];
        if (start <= clipRegion.stop && stop >= clipRegion.start) {
            visibleRegion.push({
                start: Math.max(start, clipRegion.start),
                stop: Math.min(stop, clipRegion.stop),
            });
        }
    }
    return visibleRegion;
};
exports.default = getVisibleRegions;
//# sourceMappingURL=getVisibleRegions.js.map