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
const d3_array_1 = require("d3-array");
const d3_scale_1 = require("d3-scale");
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const track_regions_1 = require("@gnomad/track-regions");
const ui_1 = require("@gnomad/ui");
const gtex_1 = require("../gtex");
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const analytics_1 = require("../analytics");
const TranscriptsTissueExpression_1 = __importDefault(require("./TranscriptsTissueExpression"));
const getPlotRegions = (expressionRegions, getValueForRegion) => {
    const roundedRegions = expressionRegions.map((region) => ({
        start: region.start,
        stop: region.stop,
        value: Math.round(getValueForRegion(region) * 10) / 10,
    }));
    const plotRegions = [];
    let currentRegion = roundedRegions[0];
    for (let i = 1; i < roundedRegions.length; i += 1) {
        const r = roundedRegions[i];
        if (r.start <= currentRegion.stop + 1 && r.value === currentRegion.value) {
            currentRegion.stop = r.stop;
        }
        else {
            plotRegions.push(currentRegion);
            currentRegion = r;
        }
    }
    plotRegions.push(currentRegion);
    return plotRegions;
};
const RegionBackground = styled_components_1.default.rect `
  fill: none;
  stroke: none;
`;
const Region = styled_components_1.default.rect ``;
const RegionHoverTarget = styled_components_1.default.g `
  pointer-events: visible;
  fill: none;

  &:hover {
    ${RegionBackground} {
      fill: rgba(0, 0, 0, 0.05);
    }

    ${Region} {
      fill: #000;
      stroke: #000;
    }
  }
`;
const TRACK_HEIGHT = 20;
const heightScale = (0, d3_scale_1.scaleLinear)().domain([0, 1]).range([0, TRACK_HEIGHT]).clamp(true);
const PextRegionsPlot = ({ color, regions, scalePosition, width }) => {
    return (react_1.default.createElement("svg", { width: width, height: TRACK_HEIGHT }, regions.map((region) => {
        const x1 = scalePosition(region.start);
        const x2 = scalePosition(region.stop);
        const height = heightScale(region.value);
        return (react_1.default.createElement(ui_1.TooltipAnchor, { key: `${region.start}-${region.stop}`, 
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; key: string; tooltip: s... Remove this comment to see the full error message
            tooltip: `${region.start.toLocaleString()}-${region.stop.toLocaleString()}: pext = ${region.value.toLocaleString()}` },
            react_1.default.createElement(RegionHoverTarget, null,
                react_1.default.createElement(RegionBackground, { x: x1, y: 0, width: x2 - x1, height: TRACK_HEIGHT }),
                react_1.default.createElement(Region, { x: x1, y: TRACK_HEIGHT - height, width: x2 - x1, height: height, fill: color, stroke: color }))));
    })));
};
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
`;
const InnerWrapper = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const TissueName = styled_components_1.default.div `
  display: flex;
  align-items: center;
  height: 31px;
  margin-right: 5px;
  font-size: 10px;
`;
const PlotWrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  margin: 5px 0;

  &:hover {
    background: #e2e2e2;
  }
`;
const NotExpressedMessage = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 21px;
  margin: 5px 0;
  color: gray;
  font-size: 10px;
`;
// @ts-expect-error TS(7022) FIXME: 'IndividualTissueTrack' implicitly has type 'any' ... Remove this comment to see the full error message
const IndividualTissueTrack = ({ exons, expressionRegions, maxTranscriptExpressionInTissue, maxMeanTranscriptExpressionInAnyTissue, meanTranscriptExpressionInTissue, tissue, transcriptWithMaxExpressionInTissue, }) => {
    const isExpressed = expressionRegions.some((region) => region.tissues[tissue] !== 0);
    return (react_1.default.createElement(region_viewer_1.Track
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    , { 
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        renderLeftPanel: () => react_1.default.createElement(TissueName, null, gtex_1.GTEX_TISSUE_NAMES[tissue]), renderRightPanel: ({ width }) => width > 36 && (react_1.default.createElement("svg", { width: width, height: 31 },
            react_1.default.createElement("line", { x1: 0, y1: 6, x2: 0, y2: 25, stroke: "#333" }),
            react_1.default.createElement("g", { transform: "translate(0, 6)" },
                react_1.default.createElement("line", { x1: 0, y1: 0, x2: 3, y2: 0, stroke: "#333" }),
                react_1.default.createElement("text", { x: 5, y: 0, dy: "0.45em", fill: "#000", fontSize: 10, textAnchor: "start" }, "1")),
            react_1.default.createElement("g", { transform: "translate(0, 24)" },
                react_1.default.createElement("line", { x1: 0, y1: 0, x2: 3, y2: 0, stroke: "#333" }),
                react_1.default.createElement("text", { x: 5, y: 0, dy: "0.1em", fill: "#000", fontSize: 10, textAnchor: "start" }, "0")),
            react_1.default.createElement(ui_1.TooltipAnchor
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message
                tooltip: isExpressed
                    ? `Mean transcript expression in this tissue = ${meanTranscriptExpressionInTissue.toFixed(2)} TPM\nMax transcript expression in this tissue = ${maxTranscriptExpressionInTissue.toFixed(2)} (${transcriptWithMaxExpressionInTissue.transcript_id}.${transcriptWithMaxExpressionInTissue.transcript_version})`
                    : // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        `Gene is not expressed in ${gtex_1.GTEX_TISSUE_NAMES[tissue]}` },
                react_1.default.createElement("rect", { x: 12, y: 2, width: 25, height: 27, fill: "none", pointerEvents: "visible" })),
            react_1.default.createElement("circle", { cx: 25, cy: 15, r: Math.sqrt(meanTranscriptExpressionInTissue === 0
                    ? 0
                    : 0.25 +
                        63.75 *
                            (maxMeanTranscriptExpressionInAnyTissue === 0
                                ? 0
                                : meanTranscriptExpressionInTissue /
                                    maxMeanTranscriptExpressionInAnyTissue)), fill: "#333", pointerEvents: "none" }))) }, ({ scalePosition, width }) => {
        if (!isExpressed) {
            return react_1.default.createElement(NotExpressedMessage, null, "Gene is not expressed in this tissue");
        }
        return (react_1.default.createElement(PlotWrapper, { key: tissue },
            react_1.default.createElement(PextRegionsPlot
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                color: gtex_1.GTEX_TISSUE_COLORS[tissue], regions: getPlotRegions(expressionRegions, (r) => r.tissues[tissue]), scalePosition: scalePosition, width: width }),
            react_1.default.createElement(track_regions_1.RegionsPlot, { axisColor: "rgba(0,0,0,0)", height: 1, regions: exons, scalePosition: scalePosition, width: width })));
    }));
};
IndividualTissueTrack.defaultProps = {
    transcriptWithMaxExpressionInTissue: null,
};
const FLAG_DESCRIPTIONS = {
    low_max_pext: 'For this gene, RSEM assigns higher expression to non-coding transcripts than protein coding transcripts. This likely represents an artifact in the isoform expression quantification and results in a low pext value for all bases in the gene.',
};
const tissuePredicate = (tissueFilterText) => {
    const filterWords = tissueFilterText
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(/\s+/)
        .filter(Boolean);
    return (tissue) => {
        const tissueWords = tissue
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .split(/\s+/)
            .filter(Boolean);
        return filterWords.every((filterWord) => tissueWords.some((tissueWord) => tissueWord.includes(filterWord)));
    };
};
const ControlsWrapper = styled_components_1.default.div `
  margin: 1em 0 0.5em -115px;
`;
const RightPanel = styled_components_1.default.div `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.375em;
  margin-top: 1.25em;
`;
// @ts-expect-error TS(7022) FIXME: 'TissueExpressionTrack' implicitly has type 'any' ... Remove this comment to see the full error message
const TissueExpressionTrack = ({ exons, expressionRegions, flags, transcripts, preferredTranscriptId, preferredTranscriptDescription, }) => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const [showTranscriptTissueExpressionModal, setShowTranscriptTissueExpressionModal] = (0, react_1.useState)(false);
    const [tissueFilterText, setTissueFilterText] = (0, react_1.useState)('');
    const mainTrack = (0, react_1.useRef)();
    const [sortTissuesBy, setSortTissuesBy] = (0, react_1.useState)('alphabetical');
    const expressionByTissue = Object.keys(gtex_1.GTEX_TISSUE_NAMES).reduce((acc, tissueId) => {
        let maxTranscriptExpressionInTissue = 0;
        let transcriptWithMaxExpressionInTissue = null;
        transcripts.forEach((transcript) => {
            const expressionInTissue = transcript.gtex_tissue_expression[tissueId];
            if (expressionInTissue > maxTranscriptExpressionInTissue) {
                maxTranscriptExpressionInTissue = expressionInTissue;
                transcriptWithMaxExpressionInTissue = transcript;
            }
        });
        const meanTranscriptExpressionInTissue = (0, d3_array_1.mean)(transcripts.map((transcript) => transcript.gtex_tissue_expression[tissueId]));
        return Object.assign(Object.assign({}, acc), { [tissueId]: {
                maxTranscriptExpressionInTissue,
                meanTranscriptExpressionInTissue,
                transcriptWithMaxExpressionInTissue,
            } });
    }, {});
    const maxMeanTranscriptExpressionInAnyTissue = (0, d3_array_1.max)(Object.values(expressionByTissue).map((v) => v.meanTranscriptExpressionInTissue));
    let tissues;
    if (sortTissuesBy === 'mean-expression') {
        tissues = Object.entries(gtex_1.GTEX_TISSUE_NAMES)
            .sort((t1, t2) => {
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const t1Expression = expressionByTissue[t1[0]].meanTranscriptExpressionInTissue;
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const t2Expression = expressionByTissue[t2[0]].meanTranscriptExpressionInTissue;
            if (t1Expression === t2Expression) {
                return t1[1].localeCompare(t2[1]);
            }
            return t2Expression - t1Expression;
        })
            .map((t) => t[0]);
    }
    else {
        tissues = Object.entries(gtex_1.GTEX_TISSUE_NAMES)
            .sort((t1, t2) => t1[1].localeCompare(t2[1]))
            .map((t) => t[0]);
    }
    const isExpressed = expressionRegions.some((region) => region.mean !== 0);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(InnerWrapper, { ref: mainTrack },
                react_1.default.createElement(region_viewer_1.Track, { renderLeftPanel: () => (react_1.default.createElement(TissueName, { style: { fontSize: '12px', justifyContent: 'space-between', marginRight: 0 } },
                        react_1.default.createElement(ui_1.Button, { disabled: !isExpressed, style: {
                                height: 'auto',
                                width: '70px',
                                paddingLeft: '0.25em',
                                paddingRight: '0.25em',
                            }, onClick: () => {
                                if (!isExpanded) {
                                    (0, analytics_1.logButtonClick)('User expanded v2 tissue expression track');
                                }
                                setIsExpanded(!isExpanded);
                            } },
                            isExpanded ? 'Hide' : 'Show',
                            " tissues"),
                        react_1.default.createElement("span", { style: { marginRight: '0.25em', textAlign: 'right' } }, "Mean pext"),
                        react_1.default.createElement(InfoButton_1.default, { topic: "pext", style: { display: 'inline' } }))), renderRightPanel: ({ width }) => width > 50 && (react_1.default.createElement("svg", { width: width, height: 31 },
                        react_1.default.createElement("line", { x1: 0, y1: 6, x2: 0, y2: 25, stroke: "#333" }),
                        react_1.default.createElement("g", { transform: "translate(0, 6)" },
                            react_1.default.createElement("line", { x1: 0, y1: 0, x2: 3, y2: 0, stroke: "#333" }),
                            react_1.default.createElement("text", { x: 5, y: 0, dy: "0.45em", fill: "#000", fontSize: 10, textAnchor: "start" }, "1")),
                        react_1.default.createElement("g", { transform: "translate(0, 24)" },
                            react_1.default.createElement("line", { x1: 0, y1: 0, x2: 3, y2: 0, stroke: "#333" }),
                            react_1.default.createElement("text", { x: 5, y: 0, dy: "0.1em", fill: "#000", fontSize: 10, textAnchor: "start" }, "0")))) }, ({ scalePosition, width }) => {
                    if (!isExpressed) {
                        return (react_1.default.createElement(NotExpressedMessage, null, "Gene is not expressed in GTEx tissues"));
                    }
                    return (react_1.default.createElement(PlotWrapper, null,
                        react_1.default.createElement(PextRegionsPlot, { color: "#428bca", regions: getPlotRegions(expressionRegions, (r) => r.mean), scalePosition: scalePosition, width: width }),
                        react_1.default.createElement(track_regions_1.RegionsPlot, { axisColor: "rgba(0,0,0,0)", height: 1, regions: exons, scalePosition: scalePosition, width: width })));
                })),
            flags.map((flag) => (react_1.default.createElement(InnerWrapper, { key: flag },
                react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Warning"),
                " ",
                FLAG_DESCRIPTIONS[flag]))),
            isExpanded && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(region_viewer_1.Track, { renderRightPanel: ({ width }) => {
                        return (width > 30 && (react_1.default.createElement(RightPanel, null,
                            react_1.default.createElement(InfoButton_1.default, { topic: "pext-track-transcript-tissue-expression" }))));
                    } }, () => {
                    return (react_1.default.createElement(ControlsWrapper, null,
                        react_1.default.createElement("label", { htmlFor: "tissue-expression-track-sort-tissues-by" },
                            "Sort tissues by:",
                            ' ',
                            react_1.default.createElement(ui_1.Select, { id: "tissue-expression-track-sort-tissues-by", value: sortTissuesBy, onChange: (e) => setSortTissuesBy(e.target.value) },
                                react_1.default.createElement("option", { value: "alphabetical" }, "Alphabetical"),
                                react_1.default.createElement("option", { value: "mean-expression" }, "Mean transcript expression in tissue"))),
                        react_1.default.createElement(ui_1.Button, { style: { marginLeft: '1ch' }, onClick: () => {
                                setShowTranscriptTissueExpressionModal(true);
                            } }, "Show transcript tissue expression"),
                        react_1.default.createElement("label", { htmlFor: "tissue-expression-track-filter", style: { marginLeft: '1ch' } },
                            "Filter tissues:",
                            ' ',
                            react_1.default.createElement(ui_1.SearchInput
                            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; placeholder: string; value: st... Remove this comment to see the full error message
                            , { 
                                // @ts-expect-error TS(2322) FIXME: Type '{ id: string; placeholder: string; value: st... Remove this comment to see the full error message
                                id: "tissue-expression-track-filter", placeholder: "tissue", value: tissueFilterText, onChange: setTissueFilterText }))));
                }),
                (tissueFilterText ? tissues.filter(tissuePredicate(tissueFilterText)) : tissues).map((tissue) => (react_1.default.createElement(IndividualTissueTrack, { key: tissue, exons: exons, expressionRegions: expressionRegions, maxTranscriptExpressionInTissue: 
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    expressionByTissue[tissue].maxTranscriptExpressionInTissue, maxMeanTranscriptExpressionInAnyTissue: maxMeanTranscriptExpressionInAnyTissue, meanTranscriptExpressionInTissue: 
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    expressionByTissue[tissue].meanTranscriptExpressionInTissue, transcriptWithMaxExpressionInTissue: 
                    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    expressionByTissue[tissue].transcriptWithMaxExpressionInTissue, tissue: tissue }))),
                react_1.default.createElement("span", null,
                    react_1.default.createElement(ui_1.Button, { onClick: () => {
                            setIsExpanded(false);
                            setTimeout(() => {
                                // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
                                mainTrack.current.scrollIntoView();
                            }, 0);
                        } }, "Hide tissues"))))),
        showTranscriptTissueExpressionModal && (react_1.default.createElement(ui_1.Modal
        // @ts-expect-error TS(2820) FIXME: Type '"xlarge"' is not assignable to type '"small"... Remove this comment to see the full error message
        , { 
            // @ts-expect-error TS(2820) FIXME: Type '"xlarge"' is not assignable to type '"small"... Remove this comment to see the full error message
            size: "xlarge", title: "Transcript tissue expression", onRequestClose: () => {
                setShowTranscriptTissueExpressionModal(false);
            } },
            react_1.default.createElement(TranscriptsTissueExpression_1.default, { transcripts: transcripts, includeNonCodingTranscripts: true, preferredTranscriptId: preferredTranscriptId, preferredTranscriptDescription: preferredTranscriptDescription, defaultSortTissuesBy: sortTissuesBy })))));
};
TissueExpressionTrack.defaultProps = {
    preferredTranscriptId: null,
    preferredTranscriptDescription: null,
};
exports.default = TissueExpressionTrack;
//# sourceMappingURL=TissueExpressionTrack.js.map