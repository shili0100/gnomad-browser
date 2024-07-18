"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_scale_1 = require("d3-scale");
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const BinHoverTarget = styled_components_1.default.rect `
  pointer-events: visible;
  fill: none;

  &:hover {
    fill: rgba(0, 0, 0, 0.05);
  }
`;
// @ts-expect-error TS(7022) FIXME: 'BinnedVariantsPlot' implicitly has type 'any' bec... Remove this comment to see the full error message
const BinnedVariantsPlot = ({ categoryColor, formatTooltip, height, scalePosition, variantCategory, variantCategories, variants, width, }) => {
    const nBins = Math.min(100, Math.floor(width / 8));
    const binWidth = width / nBins;
    const binPadding = 1;
    const initialCategoryCounts = variantCategories.reduce(
    // @ts-expect-error TS(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
    (acc, category) => (Object.assign(Object.assign({}, acc), { [category]: 0 })), {});
    const bins = [...Array(nBins)].map(() => (Object.assign({}, initialCategoryCounts)));
    const variantBinIndex = (variant) => {
        const variantPosition = scalePosition(variant.pos);
        return Math.floor(variantPosition / binWidth);
    };
    variants.forEach((variant) => {
        const category = variantCategory(variant);
        const binIndex = variantBinIndex(variant);
        if (binIndex >= 0 && binIndex < bins.length) {
            bins[binIndex][category] += 1;
        }
    });
    const maxVariantsInBin = bins.reduce((max, bin) => {
        const binTotal = Object.values(bin).reduce((a, b) => a + b, 0);
        // @ts-expect-error TS(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        return Math.max(max, binTotal);
    }, 1);
    const y = (0, d3_scale_1.scaleLinear)().domain([0, maxVariantsInBin]).range([0, height]);
    return (react_1.default.createElement("svg", { height: height, width: width, style: { overflow: 'visible' } },
        react_1.default.createElement("g", null,
            react_1.default.createElement("text", { x: -7, y: 0, dy: "0.3em", textAnchor: "end" }, maxVariantsInBin),
            react_1.default.createElement("line", { x1: -5, y1: 0, x2: 0, y2: 0, stroke: "#000", strokeWidth: 1 }),
            react_1.default.createElement("text", { x: -7, y: height, dy: "0.3em", textAnchor: "end" }, "0"),
            react_1.default.createElement("line", { x1: -5, y1: height, x2: 0, y2: height, stroke: "#000", strokeWidth: 1 }),
            react_1.default.createElement("line", { x1: 0, y1: 0, x2: 0, y2: height, stroke: "#000", strokeWidth: 1 })),
        react_1.default.createElement("g", null, bins.map((bin, binIndex) => {
            let yOffset = 0;
            return (
            // eslint-disable-next-line react/no-array-index-key
            react_1.default.createElement("g", { key: binIndex, transform: `translate(${binIndex * binWidth + binPadding},0)` },
                variantCategories.map((category) => {
                    const barHeight = y(bin[category]);
                    const bar = (react_1.default.createElement("rect", { key: category, x: binPadding, y: height - yOffset - barHeight, width: binWidth - binPadding * 2, height: barHeight, fill: categoryColor(category) }));
                    yOffset += barHeight;
                    return bar;
                }),
                react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: formatTooltip(bin) },
                    react_1.default.createElement(BinHoverTarget, { x: 0, y: 0, height: height, width: binWidth }))));
        })),
        react_1.default.createElement("line", { x1: 0, y1: height, x2: width, y2: height, stroke: "#000" })));
};
BinnedVariantsPlot.defaultProps = {
    categoryColor: () => '#424242',
    height: 50,
    variantCategory: () => 'undefined',
    variantCategories: ['undefined'],
};
exports.default = BinnedVariantsPlot;
//# sourceMappingURL=BinnedVariantsPlot.js.map