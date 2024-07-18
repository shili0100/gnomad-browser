"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const d3_scale_1 = require("d3-scale");
const react_1 = __importDefault(require("react"));
const axis_1 = require("@visx/axis");
const ui_1 = require("@gnomad/ui");
const gtex_1 = require("../gtex");
const mergeOverlappingRegions = (regions) => {
    if (regions.length === 0) {
        return [];
    }
    const mergedRegions = [Object.assign({}, regions[0])];
    let previousRegion = mergedRegions[0];
    for (let i = 1; i < regions.length; i += 1) {
        const nextRegion = regions[i];
        if (nextRegion.start <= previousRegion.stop + 1) {
            if (nextRegion.stop > previousRegion.stop) {
                previousRegion.stop = nextRegion.stop;
            }
        }
        else {
            previousRegion = Object.assign({}, nextRegion);
            mergedRegions.push(previousRegion);
        }
    }
    return mergedRegions;
};
const regionViewerScale = (domainRegions, range) => {
    const totalRegionSize = domainRegions.reduce((acc, region) => acc + (region.stop - region.start + 1), 0);
    const scale = (position) => {
        const distanceToPosition = domainRegions
            .filter((region) => region.start <= position)
            .reduce((acc, region) => region.start <= position && position <= region.stop
            ? acc + position - region.start
            : acc + (region.stop - region.start + 1), 0);
        return range[0] + (range[1] - range[0]) * (distanceToPosition / totalRegionSize);
    };
    return scale;
};
const TranscriptsPlot = ({ transcripts, width }) => {
    const composite = mergeOverlappingRegions(transcripts
        .flatMap((transcript) => transcript.exons)
        .filter((exon) => exon.feature_type !== 'UTR')
        .map((exon) => (Object.assign(Object.assign({}, exon), { start: Math.max(exon.start - 25, 0), stop: exon.stop + 25 })))
        .sort((r1, r2) => r1.start - r2.start));
    const xScale = regionViewerScale(composite, [0, width]);
    return (react_1.default.createElement("g", null, transcripts.map((transcript, i) => {
        return (react_1.default.createElement("g", { key: transcript.transcript_id, transform: `translate(0, ${i * (18 * 1.2) + 18 * 0.1})` }, transcript.exons
            .filter((exon) => exon.feature_type !== 'UTR')
            .map((exon) => {
            const x1 = xScale(exon.start);
            const x2 = xScale(exon.stop);
            return (react_1.default.createElement("rect", { key: `${exon.start}-${exon.stop}`, x: x1, y: 6, width: x2 - x1, height: 6, fill: exon.feature_type === 'CDS' ? '#424242' : '#bdbdbd' }));
        })));
    })));
};
const margin = {
    bottom: 150,
    left: 120,
    right: 10,
    top: 45,
};
// @ts-expect-error TS(7022) FIXME: 'TranscriptsTissueExpressionPlot' implicitly has t... Remove this comment to see the full error message
const TranscriptsTissueExpressionPlot = ({ tissues, transcripts, starredTranscriptId, }) => {
    const renderedTissues = ['Mean', 'Median', ...tissues];
    const transcriptsWithMeanAndMedianExpresion = transcripts.map((transcript) => {
        const expressionValues = Object.values(transcript.gtex_tissue_expression);
        return Object.assign(Object.assign({}, transcript), { gtex_tissue_expression: Object.assign(Object.assign({}, transcript.gtex_tissue_expression), { 
                // @ts-expect-error TS(2345) FIXME: Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
                Mean: (0, d3_array_1.mean)(expressionValues), 
                // @ts-expect-error TS(2345) FIXME: Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
                Median: (0, d3_array_1.median)(expressionValues) }) });
    });
    const maxTissueExpression = (0, d3_array_1.max)(transcripts.flatMap((transcript) => Object.values(transcript.gtex_tissue_expression)));
    // @ts-expect-error TS(2345) FIXME: Argument of type '(string | number | undefined)[]'... Remove this comment to see the full error message
    const opacityScale = (0, d3_scale_1.scaleLinear)().domain([0, maxTissueExpression]).range([0, 1]);
    const transcriptsWidth = 150;
    const cellSize = 18;
    const padding = 0.2;
    const gutterWidth = 9;
    const plotWidth = 1 + renderedTissues.length * cellSize + gutterWidth;
    const plotHeight = transcripts.length * cellSize * (1 + padding);
    const height = plotHeight + margin.top + margin.bottom;
    const width = plotWidth + margin.left + margin.right + transcriptsWidth;
    const baseXScale = (0, d3_scale_1.scaleBand)()
        .domain(renderedTissues)
        .range([1, plotWidth - gutterWidth]);
    const xBandWidth = baseXScale.bandwidth();
    const xScale = (0, d3_scale_1.scaleOrdinal)()
        .domain(renderedTissues)
        .range([
        ...renderedTissues.slice(0, 2).map(baseXScale),
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ...renderedTissues.slice(2).map((tissueId) => baseXScale(tissueId) + gutterWidth),
    ]);
    const xAxisScale = (0, d3_scale_1.scaleOrdinal)()
        .domain(renderedTissues)
        .range([
        ...renderedTissues.slice(0, 2).map(baseXScale),
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        ...renderedTissues.slice(2).map((tissueId) => baseXScale(tissueId) + gutterWidth),
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    ].map((x) => x + xBandWidth / 2));
    const yScale = (0, d3_scale_1.scaleBand)()
        .domain(transcriptsWithMeanAndMedianExpresion.map((t) => t.transcript_id))
        .range([0, plotHeight])
        .padding(padding);
    const yBandWidth = yScale.bandwidth();
    const halfYPadding = (yScale.step() * yScale.paddingInner()) / 2;
    const transcriptLabels = transcripts.reduce(
    // @ts-expect-error TS(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
    (acc, transcript) => (Object.assign(Object.assign({}, acc), { [transcript.transcript_id]: `${transcript.transcript_id}.${transcript.transcript_version}` })), {});
    if (starredTranscriptId) {
        transcriptLabels[starredTranscriptId] += '*';
    }
    return (react_1.default.createElement("svg", { height: height, width: width },
        react_1.default.createElement("defs", null,
            react_1.default.createElement("linearGradient", { id: "expression-gradient" },
                react_1.default.createElement("stop", { offset: "0%", stopColor: "#3f007d00" }),
                react_1.default.createElement("stop", { offset: "100%", stopColor: "#3f007d" }))),
        react_1.default.createElement("g", { transform: "translate(10, 10)" },
            react_1.default.createElement("text", { x: 10, y: 7, dx: "-0.25em", dy: "0.25em", fontSize: 10, textAnchor: "end" }, "0"),
            react_1.default.createElement("rect", { x: 10, y: 0, height: 14, width: 60, fill: "url(#expression-gradient)" }),
            react_1.default.createElement("text", { x: 70, y: 7, dx: "0.25em", dy: "0.25em", fontSize: 10, textAnchor: "start" }, maxTissueExpression.toPrecision(4))),
        transcripts.slice(1).map((transcript) => {
            // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
            const y = margin.top + yScale(transcript.transcript_id) - halfYPadding;
            return (react_1.default.createElement("line", { key: transcript.transcript_id, x1: 0, y1: y, x2: width, y2: y, stroke: "#ccc", strokeWidth: 1 }));
        }),
        react_1.default.createElement(axis_1.AxisLeft, { left: margin.left, numTicks: transcripts.length, tickFormat: (transcriptId) => transcriptLabels[transcriptId], tickLabelProps: () => ({
                dx: -112,
                dy: '0.25em',
                fill: '#000',
                fontSize: 10,
                textAnchor: 'start',
            }), top: margin.top, scale: yScale, stroke: "#333" }),
        react_1.default.createElement("line", { x1: margin.left, y1: margin.top + plotHeight, x2: margin.left + plotWidth, y2: margin.top + plotHeight, stroke: "#333", strokeWidth: 1 }),
        react_1.default.createElement(axis_1.AxisBottom, { left: margin.left, top: margin.top + plotHeight, 
            // @ts-expect-error TS(2322) FIXME: Type 'ScaleOrdinal<string, unknown, never>' is not... Remove this comment to see the full error message
            scale: xAxisScale, stroke: "#333", 
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            tickFormat: (t) => gtex_1.GTEX_TISSUE_NAMES[t] || t, tickLabelProps: (value) => ({
                dx: '-0.25em',
                dy: '0.25em',
                fill: '#000',
                fontSize: 10,
                textAnchor: 'end',
                // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
                transform: `translate(0, 0), rotate(-40 ${xScale(value) + xBandWidth / 2}, 0)`,
            }), tickLength: 3 }),
        react_1.default.createElement("g", { transform: `translate(${margin.left},${margin.top})` }, transcriptsWithMeanAndMedianExpresion.map((transcript) => (react_1.default.createElement("g", { key: transcript.transcript_id, transform: `translate(0, ${yScale(transcript.transcript_id)})` }, renderedTissues.map((tissueId) => {
            let tooltipText;
            if (tissueId === 'Mean' || tissueId === 'Median') {
                tooltipText = `${transcript.transcript_id} ${tissueId} expression: ${transcript.gtex_tissue_expression[tissueId].toFixed(2)} TPM`;
            }
            else {
                tooltipText = `${transcript.transcript_id} expression in ${
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                gtex_1.GTEX_TISSUE_NAMES[tissueId]} tissues: ${transcript.gtex_tissue_expression[tissueId].toFixed(2)} TPM`;
            }
            return (react_1.default.createElement(react_1.default.Fragment, { key: tissueId },
                react_1.default.createElement("rect", { 
                    // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
                    x: xScale(tissueId) + 1, y: 1, width: xBandWidth - 2, height: yBandWidth - 2, rx: 3, fill: "#3f007d", opacity: opacityScale(transcript.gtex_tissue_expression[tissueId]) }),
                react_1.default.createElement(ui_1.TooltipAnchor, { key: tissueId, tooltip: tooltipText },
                    react_1.default.createElement("rect", { 
                        // @ts-expect-error TS(2322) FIXME: Type 'unknown' is not assignable to type 'string |... Remove this comment to see the full error message
                        x: xScale(tissueId), y: 0, width: xBandWidth, height: yBandWidth, fill: "none", pointerEvents: "visible" }))));
        }))))),
        react_1.default.createElement("text", { x: width - transcriptsWidth, y: margin.top - 10, dy: "0.25em", fill: "#000" }, "Exons"),
        react_1.default.createElement("g", { transform: `translate(${width - transcriptsWidth}, ${margin.top})` },
            react_1.default.createElement(TranscriptsPlot, { transcripts: transcripts, width: transcriptsWidth }))));
};
TranscriptsTissueExpressionPlot.defaultProps = {
    tissues: Object.entries(gtex_1.GTEX_TISSUE_NAMES)
        .sort((t1, t2) => t1[1].localeCompare(t2[1]))
        .map((t) => t[0]),
    starredTranscriptId: null,
};
exports.default = TranscriptsTissueExpressionPlot;
//# sourceMappingURL=TranscriptsTissueExpressionPlot.js.map