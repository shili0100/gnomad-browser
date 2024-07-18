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
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const gtex_1 = require("../gtex");
const sortedTranscripts_1 = __importDefault(require("./sortedTranscripts"));
const TranscriptsTissueExpressionPlot_1 = __importDefault(require("./TranscriptsTissueExpressionPlot"));
const ScrollWrapper = styled_components_1.default.div `
  display: inline-block;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
`;
const isTranscriptCoding = (transcript) => transcript.exons.some((exon) => exon.feature_type === 'CDS');
// @ts-expect-error TS(7022) FIXME: 'TranscriptsTissueExpression' implicitly has type ... Remove this comment to see the full error message
const TranscriptsTissueExpression = ({ transcripts, includeNonCodingTranscripts, preferredTranscriptId, preferredTranscriptDescription, defaultSortTissuesBy, }) => {
    const [sortTranscriptsBy, setSortTranscriptsBy] = (0, react_1.useState)('default');
    let renderedTranscripts = sortTranscriptsBy === 'default'
        ? (0, sortedTranscripts_1.default)(transcripts, preferredTranscriptId)
        : [...transcripts].sort((t1, t2) => {
            const t1Expression = t1.gtex_tissue_expression[sortTranscriptsBy] || 0;
            const t2Expression = t2.gtex_tissue_expression[sortTranscriptsBy] || 0;
            if (t1Expression === t2Expression) {
                return t1.transcript_id.localeCompare(t2.transcript_id);
            }
            return t2Expression - t1Expression;
        });
    const [sortTissuesBy, setSortTissuesBy] = (0, react_1.useState)(defaultSortTissuesBy);
    let tissues;
    if (sortTissuesBy === 'mean-expression') {
        const meanExpressionByTissue = Object.keys(gtex_1.GTEX_TISSUE_NAMES).reduce((acc, tissueId) => (Object.assign(Object.assign({}, acc), { [tissueId]: (0, d3_array_1.mean)(transcripts.map((transcript) => transcript.gtex_tissue_expression[tissueId] || 0)) })), {});
        tissues = Object.entries(gtex_1.GTEX_TISSUE_NAMES)
            .sort((t1, t2) => {
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const t1Expression = meanExpressionByTissue[t1[0]];
            // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const t2Expression = meanExpressionByTissue[t2[0]];
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
    if (!includeNonCodingTranscripts) {
        renderedTranscripts = renderedTranscripts.filter(isTranscriptCoding);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { style: { marginBottom: '1em' } },
            react_1.default.createElement("label", { htmlFor: "transcript-tissue-expression-sort-transcripts-by" },
                "Sort transcripts by:",
                ' ',
                react_1.default.createElement(ui_1.Select, { id: "transcript-tissue-expression-sort-transcripts-by", value: sortTranscriptsBy, onChange: (e) => setSortTranscriptsBy(e.target.value) },
                    react_1.default.createElement("option", { value: "default" }, "Default"),
                    react_1.default.createElement("optgroup", { label: "Expression in tissue" }, Object.entries(gtex_1.GTEX_TISSUE_NAMES).map(([tissueId, tissueName]) => {
                        return (react_1.default.createElement("option", { key: tissueId, value: tissueId }, tissueName));
                    }))))),
        react_1.default.createElement("div", { style: { marginBottom: '1em' } },
            react_1.default.createElement("label", { htmlFor: "transcript-tissue-expression-sort-tissues-by" },
                "Sort tissues by: ",
                react_1.default.createElement(ui_1.Select, { id: "transcript-tissue-expression-sort-tissues-by", value: sortTissuesBy, onChange: (e) => setSortTissuesBy(e.target.value) },
                    react_1.default.createElement("option", { value: "alphabetical" }, "Alphabetical"),
                    react_1.default.createElement("option", { value: "mean-expression" }, "Mean transcript expression in tissue")))),
        preferredTranscriptDescription && react_1.default.createElement("p", null,
            "* ",
            preferredTranscriptDescription),
        react_1.default.createElement(ScrollWrapper, null,
            react_1.default.createElement(TranscriptsTissueExpressionPlot_1.default, { tissues: tissues, transcripts: renderedTranscripts, starredTranscriptId: preferredTranscriptId }))));
};
TranscriptsTissueExpression.defaultProps = {
    preferredTranscriptId: null,
    preferredTranscriptDescription: null,
    defaultSortTissuesBy: 'alphabetical',
};
exports.default = TranscriptsTissueExpression;
//# sourceMappingURL=TranscriptsTissueExpression.js.map