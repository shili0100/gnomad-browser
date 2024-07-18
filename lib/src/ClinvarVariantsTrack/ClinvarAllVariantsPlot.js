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
const d3_shape_1 = require("d3-shape");
const lodash_es_1 = require("lodash-es");
const react_1 = __importStar(require("react"));
const ui_1 = require("@gnomad/ui");
const clinvarVariantCategories_1 = require("./clinvarVariantCategories");
const ClinvarVariantTooltip_1 = __importDefault(require("./ClinvarVariantTooltip"));
const symbolColor = (clinical_significance) => clinvarVariantCategories_1.CLINICAL_SIGNIFICANCE_CATEGORY_COLORS[clinical_significance];
// For a description of HGVS frameshift notation, see
// https://varnomen.hgvs.org/recommendations/protein/variant/frameshift/
const getGlobalFrameshiftCoordinates = (variant, transcript) => {
    if (!transcript || !variant.hgvsp) {
        return [variant.pos, variant.pos];
    }
    const match = /^p\.[a-z]{3}(\d+)[a-z]{3,}?fsTer(\d+|\?)$/i.exec(variant.hgvsp);
    // If HGVSp annotation does not match a frameshift, draw the termination site at the variant's position
    if (!match) {
        return [variant.pos, variant.pos];
    }
    // Codon of the first amino acid changed
    const position = Number(match[1]);
    // Codon within the new reading frame of the termination site
    const terminationSitePosition = match[2];
    // Codon numbers in HGVSp notation start from the 5' end for the + strand and the 3' end for the - strand.
    const exons = (0, lodash_es_1.sortBy)(transcript.exons, (exon) => transcript.strand === '+' ? exon.start : -exon.start);
    // Codon positions extracted from HGVS notation start at the CDS region and may extend into the downstream UTR
    const codingAndDownstreamExons = exons.slice(exons.findIndex((exon) => exon.feature_type === 'CDS'));
    // Termination site position may be "?" if the new reading frame does not encounter a stop codon
    // In this case, place the termination site at the end of the transcript
    const lastExon = codingAndDownstreamExons[codingAndDownstreamExons.length - 1];
    const transcriptEnd = transcript.strand === '+' ? lastExon.stop : lastExon.start;
    // Codon numbers are 1 indexed
    const startOffsetFromCDS = position * 3 - 2;
    const { remainingIntervals, globalCoordinate: startCoordinate } = advanceOverIntervals(codingAndDownstreamExons, startOffsetFromCDS, transcript.strand);
    if (terminationSitePosition === '?') {
        return [startCoordinate || transcriptEnd, transcriptEnd];
    }
    // Offset in bases from the start of the transcript's CDS region to the termination site
    // The extra "+2" at the end is because we start at the first nucleotide of
    // the first codon, and end with the last nucleotide (rather than the first)
    // of some downstream codon.
    const lengthInNucleotides = (Number(terminationSitePosition) - 1) * 3 + 2;
    const { globalCoordinate: endCoordinate } = advanceOverIntervals(remainingIntervals, lengthInNucleotides, transcript.strand);
    return [startCoordinate || transcriptEnd, endCoordinate || transcriptEnd];
};
const advanceOverIntervals = (intervals, distance, strand) => {
    if (intervals.length === 0) {
        return { remainingIntervals: [], globalCoordinate: null };
    }
    const [interval, ...remainingIntervals] = intervals;
    const intervalSize = interval.stop - interval.start + 1;
    if (intervalSize < distance) {
        return advanceOverIntervals(remainingIntervals, distance - intervalSize, strand);
    }
    if (intervalSize === distance) {
        const intervalDownstreamEnd = strand === '+' ? interval.stop : interval.start;
        return { remainingIntervals, globalCoordinate: intervalDownstreamEnd };
    }
    const globalCoordinate = strand === '+' ? interval.start + distance - 1 : interval.stop - distance + 1;
    const newLeadingInterval = strand === '+'
        ? { start: globalCoordinate + 1, stop: interval.stop }
        : { start: interval.start, stop: globalCoordinate - 1 };
    return { globalCoordinate, remainingIntervals: [newLeadingInterval, ...remainingIntervals] };
};
const UTRLineSegment = ({ x1, x2, y, opacity }) => (react_1.default.createElement("line", { x1: x1, y1: y, x2: x2, y2: y, stroke: "#333", strokeDasharray: "2 5", strokeWidth: 0.5, opacity: opacity, style: { cursor: 'pointer' } }));
const CDSLineSegment = ({ x1, x2, y, opacity }) => (react_1.default.createElement("line", { x1: x1, y1: y, x2: x2, y2: y, stroke: "#333", strokeWidth: 0.5, opacity: opacity, style: { cursor: 'pointer' } }));
const circle = (0, d3_shape_1.symbol)().size(32).type(d3_shape_1.symbolCircle)();
const cross = (0, d3_shape_1.symbol)().size(40).type(d3_shape_1.symbolCross)();
const diamond = (0, d3_shape_1.symbol)().size(32).type(d3_shape_1.symbolDiamond)();
const triangle = (0, d3_shape_1.symbol)().size(32).type(d3_shape_1.symbolTriangle)();
/**
 * Render symbol based on variant's consequence
 * - LoF / essential splice site: square
 * - Frameshift: triangle dash square
 * - Missense / in-frame indel: triangle
 * - Non-essential splice region: diamond
 * - Synonymous / non-coding: circle
 * - Other: star
 */
const VariantLine = ({ point, highlightedCategory, transcripts, scalePosition, onClickVariant, plotHeight, }) => {
    const { variant, clinicalSignificance } = point;
    const category = (0, clinvarVariantCategories_1.clinvarVariantConsequenceCategory)(variant);
    const fill = symbolColor(clinicalSignificance);
    let opacity = 1;
    if (highlightedCategory &&
        !(highlightedCategory === category ||
            (category === 'synonymous' && highlightedCategory === 'other'))) {
        opacity = 0.2;
    }
    if (category === 'frameshift') {
        const transcript = transcripts.find((t) => t.transcript_id === variant.transcript_id);
        const [endpoint1, endpoint2] = getGlobalFrameshiftCoordinates(variant, transcript);
        const frameshiftMinPos = Math.min(endpoint1, endpoint2);
        const frameshiftMaxPos = Math.max(endpoint1, endpoint2);
        const terminationPos = transcript && transcript.strand === '+' ? frameshiftMaxPos : frameshiftMinPos;
        // if a frameshift variant-consequence pair from ClinVar exists for a transcript
        //   that the browser doesn't recognize, use an empty array for exon information
        const frameshiftExonRegions = transcript
            ? transcript.exons
                .sort((e1, e2) => e1.start - e2.start)
                .filter((e) => e.start <= frameshiftMaxPos && e.stop >= frameshiftMinPos)
                .map((e) => ({
                start: Math.max(e.start, frameshiftMinPos),
                stop: Math.min(e.stop, frameshiftMaxPos),
                feature_type: e.feature_type,
            }))
            : [];
        return (react_1.default.createElement(ui_1.TooltipAnchor, { key: point.variant.variant_id, tooltipComponent: ClinvarVariantTooltip_1.default, 
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; key: any; tooltipCompon... Remove this comment to see the full error message
            variant: point.variant },
            react_1.default.createElement("g", { onClick: () => onClickVariant(variant) },
                react_1.default.createElement("rect", { x: point.xStart, y: plotHeight - point.y - 5, width: point.xEnd - point.xStart, height: 10, 
                    // transparent instead of none is necessary for tooltip hover
                    fill: "transparent", opacity: opacity, style: { cursor: 'pointer' } }),
                frameshiftExonRegions.map((r, i, regions) => {
                    const lineY = plotHeight - point.y;
                    return (react_1.default.createElement(react_1.default.Fragment, { key: `${r.start}-${r.stop}` },
                        i !== 0 &&
                            regions[i - 1].feature_type === 'CDS' &&
                            regions[i].feature_type === 'CDS' && (react_1.default.createElement(UTRLineSegment, { x1: scalePosition(regions[i - 1].stop), x2: scalePosition(r.start), y: lineY, opacity: opacity })),
                        r.feature_type === 'CDS' ? (react_1.default.createElement(CDSLineSegment, { x1: scalePosition(r.start), x2: scalePosition(r.stop), y: lineY, opacity: opacity })) : (react_1.default.createElement(UTRLineSegment, { x1: scalePosition(r.start), x2: scalePosition(r.stop), y: lineY, opacity: opacity }))));
                }),
                react_1.default.createElement("path", { 
                    // @ts-expect-error TS(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
                    d: cross, transform: `translate(${scalePosition(terminationPos)},${plotHeight - point.y}) rotate(45)`, fill: fill, stroke: "#666", strokeWidth: 0.5, opacity: opacity, style: { cursor: 'pointer' } }))));
    }
    let symbolPath = circle;
    let symbolRotation = 0;
    let symbolOffset = 0;
    if (category === 'other_lof') {
        symbolPath = cross;
        symbolRotation = 45;
    }
    else if (category === 'missense') {
        symbolPath = triangle;
        symbolOffset = 1;
    }
    else if (category === 'splice_region') {
        symbolPath = diamond;
    }
    return (react_1.default.createElement(ui_1.TooltipAnchor, { key: point.variant.variant_id, tooltipComponent: ClinvarVariantTooltip_1.default, 
        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; key: any; tooltipCompon... Remove this comment to see the full error message
        variant: point.variant },
        react_1.default.createElement("path", { 
            // @ts-expect-error TS(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
            d: symbolPath, transform: `translate(${point.xStart},${plotHeight - point.y + symbolOffset}) rotate(${symbolRotation})`, fill: fill, stroke: "#666", strokeWidth: 0.5, opacity: opacity, onClick: () => onClickVariant(variant), style: { cursor: 'pointer' } })));
};
const ClinvarAllVariantsPlot = ({ scalePosition, transcripts, variants, width, onClickVariant, }) => {
    const [highlightedCategory, _setHighlightedCategory] = (0, react_1.useState)(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const setHighlightedCategory = (0, react_1.useCallback)((0, lodash_es_1.debounce)(_setHighlightedCategory, 150), [
        _setHighlightedCategory,
    ]);
    const variantsByClinicalSignificance = {
        pathogenic: [],
        uncertain: [],
        benign: [],
        other: [],
    };
    variants.forEach((variant) => {
        const category = (0, clinvarVariantCategories_1.clinvarVariantClinicalSignificanceCategory)(variant);
        variantsByClinicalSignificance[category].push(variant);
    });
    const layerOrdering = ['pathogenic', 'uncertain', 'benign', 'other'];
    const rows = [];
    const pointSpacing = 9;
    const rowHeight = 10;
    layerOrdering.forEach((layerName) => {
        variantsByClinicalSignificance[layerName].forEach((variant) => {
            let xStart;
            let xEnd;
            if (variant.major_consequence === 'frameshift_variant') {
                const transcript = transcripts.find((t) => t.transcript_id === variant.transcript_id);
                const [endpoint1, endpoint2] = getGlobalFrameshiftCoordinates(variant, transcript);
                // The order in which getGlobalFrameshiftCoordinates returns the
                // endpoints isn't guaranteed, i.e. either might be smaller than the
                // other.
                xStart = scalePosition(Math.min(endpoint1, endpoint2));
                xEnd = scalePosition(Math.max(endpoint1, endpoint2));
            }
            else {
                xStart = scalePosition(variant.pos);
                xEnd = xStart;
            }
            let rowIndex = rows.findIndex((rowPoints) => !rowPoints.some((p) => xStart < p.xEnd + pointSpacing && xEnd >= p.xStart - pointSpacing));
            if (rowIndex === -1) {
                rows.push([]);
                rowIndex = rows.length - 1;
            }
            rows[rowIndex].push({
                variant,
                xStart,
                xEnd,
                clinicalSignificance: layerName,
                y: rowHeight * (rowIndex + 0.5),
            });
        });
    });
    const plotHeight = rows.length * rowHeight;
    return (react_1.default.createElement("svg", { height: plotHeight + 25, width: width },
        react_1.default.createElement("g", { transform: "translate(0, 9)" },
            react_1.default.createElement("g", { onMouseEnter: () => setHighlightedCategory('frameshift'), onMouseLeave: () => setHighlightedCategory(null) },
                react_1.default.createElement("line", { x1: 0, y1: 0, x2: 10, y2: 0, stroke: "#333", strokeWidth: 0.5 }),
                react_1.default.createElement("path", { d: cross, fill: "#333", stroke: "none", transform: "translate(10,0) rotate(45)" }),
                react_1.default.createElement("text", { dy: "0.3em", fontSize: 12, x: 16 }, "Frameshift")),
            react_1.default.createElement("g", { transform: "translate(86,0)", onMouseEnter: () => setHighlightedCategory('other_lof'), onMouseLeave: () => setHighlightedCategory(null) },
                react_1.default.createElement("path", { d: cross, fill: "#333", stroke: "none", transform: "rotate(45)" }),
                react_1.default.createElement("text", { dy: "0.3em", fontSize: 12, x: 6 }, "Other pLoF")),
            react_1.default.createElement("g", { transform: "translate(165,0)", onMouseEnter: () => setHighlightedCategory('missense'), onMouseLeave: () => setHighlightedCategory(null) },
                react_1.default.createElement("path", { d: triangle, fill: "#333", stroke: "none" }),
                react_1.default.createElement("text", { dy: "0.3em", fontSize: 12, x: 6 }, "Missense / Inframe indel")),
            react_1.default.createElement("g", { transform: "translate(318,0)", onMouseEnter: () => setHighlightedCategory('splice_region'), onMouseLeave: () => setHighlightedCategory(null) },
                react_1.default.createElement("path", { d: diamond, fill: "#333", stroke: "none" }),
                react_1.default.createElement("text", { dy: "0.3em", fontSize: 12, x: 6 }, "Splice region")),
            react_1.default.createElement("g", { transform: "translate(406,0)", onMouseEnter: () => setHighlightedCategory('other'), onMouseLeave: () => setHighlightedCategory(null) },
                react_1.default.createElement("path", { d: circle, fill: "#333", stroke: "none" }),
                react_1.default.createElement("text", { dy: "0.3em", fontSize: 12, x: 7 }, "Synonymous / non-coding"))),
        react_1.default.createElement("g", { transform: "translate(0, 25)" }, rows.map((points, rowIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        react_1.default.createElement(react_1.default.Fragment, { key: rowIndex }, points.map((point) => (react_1.default.createElement(VariantLine, { key: `${point.xStart}-${point.xEnd}`, point: point, highlightedCategory: highlightedCategory, transcripts: transcripts, scalePosition: scalePosition, onClickVariant: onClickVariant, plotHeight: plotHeight }))))))),
        react_1.default.createElement("line", { x1: 0, y1: plotHeight + 25, x2: width, y2: plotHeight + 25, stroke: "#424242" })));
};
exports.default = ClinvarAllVariantsPlot;
//# sourceMappingURL=ClinvarAllVariantsPlot.js.map