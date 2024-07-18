"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CopyNumberVariantPlot = ({ color, isHighlighted, isPositionDefined, scalePosition, variant, width, }) => {
    const trackHeight = 14;
    const barHeight = 10;
    const barY = Math.floor((trackHeight - barHeight) / 2);
    const arrowWidth = 3;
    const halfBarHeight = barHeight / 2;
    // For SV classes that are not represented by a single point, exclude the padding base from the track.
    // See https://github.com/broadinstitute/gnomad-browser/issues/687
    let startX = scalePosition(variant.pos + 1);
    let stopX = scalePosition(variant.end);
    const startIsDefined = isPositionDefined(variant.pos + 1);
    const stopIsDefined = isPositionDefined(variant.end);
    // Set a minimum width for bars.
    if (startIsDefined && stopIsDefined && stopX - startX < 3) {
        const diff = 3 - (stopX - startX);
        startX -= diff / 2;
        stopX += diff / 2;
    }
    // If one endpoint is undefined, which should only happen if the SV extends outside the visible region,
    // offset the start/stop coordinate to make room for the arrow marker at the end of the bar.
    if (!startIsDefined) {
        startX += arrowWidth;
    }
    if (!stopIsDefined) {
        stopX -= arrowWidth;
    }
    return (react_1.default.createElement("svg", { height: trackHeight, width: width, style: { overflow: 'visible' } },
        isHighlighted && (react_1.default.createElement("rect", { x: 1, y: 1, width: width - 2, height: trackHeight - 2, fill: "none", stroke: "black", strokeDasharray: "3, 3", strokeWidth: 1 })),
        react_1.default.createElement("line", { x1: 0, x2: width, y1: trackHeight / 2, y2: trackHeight / 2, stroke: "#bdbdbd", strokeWidth: 1 }),
        "(",
        react_1.default.createElement(react_1.default.Fragment, null,
            !startIsDefined && (react_1.default.createElement("path", { d: `M ${startX} ${barY} l -${arrowWidth} ${halfBarHeight} l ${arrowWidth} ${halfBarHeight} z`, fill: color })),
            react_1.default.createElement("rect", { x: startX, y: barY, width: stopX - startX, height: barHeight, fill: color }),
            !stopIsDefined && (react_1.default.createElement("path", { d: `M ${stopX} ${barY} l ${arrowWidth} ${halfBarHeight} l -${arrowWidth} ${halfBarHeight} z`, fill: color }))),
        ")"));
};
exports.default = CopyNumberVariantPlot;
//# sourceMappingURL=CopyNumberVariantPlot.js.map