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
exports.TranscriptConsequenceList = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const vepConsequences_1 = require("../vepConsequences");
const TranscriptConsequence_1 = __importDefault(require("./TranscriptConsequence"));
/**
 * Group a list of consequences by a field's value. Maintains sort order of list.
 */
const groupConsequences = (consequences, key) => {
    const uniqueValues = consequences
        .map((csq) => csq[key])
        .filter((value, index, values) => index === values.indexOf(value));
    const groupedConsequences = consequences.reduce((acc, csq) => {
        if (!acc[csq[key]]) {
            acc[csq[key]] = [];
        }
        acc[csq[key]].push(csq);
        return acc;
    }, {});
    return uniqueValues.map((value) => ({
        value,
        consequences: groupedConsequences[value],
    }));
};
const TranscriptInfoWrapper = styled_components_1.default.div `
  margin-top: 0.25em;
`;
const TranscriptInfo = ({ transcriptConsequence }) => {
    if (transcriptConsequence.is_mane_select) {
        if (transcriptConsequence.is_mane_select_version) {
            return (react_1.default.createElement(TranscriptInfoWrapper, null,
                react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.ncbi.nlm.nih.gov/refseq/MANE/" }, "MANE"),
                " Select transcript for ",
                transcriptConsequence.gene_symbol));
        }
        return (react_1.default.createElement(TranscriptInfoWrapper, null,
            "Different version of",
            ' ',
            react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.ncbi.nlm.nih.gov/refseq/MANE/" }, "MANE"),
            " Select transcript for ",
            transcriptConsequence.gene_symbol));
    }
    if (transcriptConsequence.is_canonical) {
        return (react_1.default.createElement(TranscriptInfoWrapper, null,
            "Ensembl canonical transcript for ",
            transcriptConsequence.gene_symbol));
    }
    return null;
};
class ConsequencesInGene extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isExpanded: false,
        };
    }
    render() {
        const { transcriptConsequences } = this.props;
        const { isExpanded } = this.state;
        const { gene_symbol: geneSymbol, major_consequence: consequenceTerm } = transcriptConsequences[0];
        const qualifiedTranscriptId = (csq) => csq.transcript_version ? `${csq.transcript_id}.${csq.transcript_version}` : csq.transcript_id;
        return (
        // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.OrderedList, null,
            transcriptConsequences.slice(0, 3).map((csq) => (
            // @ts-expect-error TS(2769) FIXME: No overload matches this call.
            react_1.default.createElement(ui_1.ListItem, { key: csq.transcript_id },
                react_1.default.createElement(Link_1.default, { to: `/transcript/${csq.transcript_id}` }, qualifiedTranscriptId(csq)),
                react_1.default.createElement(TranscriptInfo, { transcriptConsequence: csq }),
                react_1.default.createElement(TranscriptConsequence_1.default, { consequence: csq })))),
            transcriptConsequences.length > 3 && (
            // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
            react_1.default.createElement(ui_1.ListItem, null,
                react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                        this.setState({ isExpanded: true });
                    } },
                    "and ",
                    transcriptConsequences.length - 3,
                    " more"))),
            isExpanded && (react_1.default.createElement(ui_1.Modal
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
            , { 
                // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initialFocusOnButton: b... Remove this comment to see the full error message
                initialFocusOnButton: false, onRequestClose: () => {
                    this.setState({ isExpanded: false });
                }, title: `${(0, vepConsequences_1.getLabelForConsequenceTerm)(consequenceTerm)} consequences in ${geneSymbol}` },
                react_1.default.createElement(ui_1.OrderedList, null, transcriptConsequences.map((csq) => (
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                react_1.default.createElement(ui_1.ListItem, { key: csq.transcript_id },
                    react_1.default.createElement(Link_1.default, { to: `/transcript/${csq.transcript_id}` }, qualifiedTranscriptId(csq)),
                    react_1.default.createElement(TranscriptInfo, { transcriptConsequence: csq }),
                    react_1.default.createElement(TranscriptConsequence_1.default, { consequence: csq })))))))));
    }
}
const ConsequenceListWrapper = styled_components_1.default.ol `
  display: flex;
  flex-flow: row wrap;
  padding: 0;
  list-style-type: none;
  margin-bottom: 1em;

  h3,
  h4 {
    margin: 0 0 0.5em;
  }
`;
const ConsequenceListItem = styled_components_1.default.li `
  margin-right: 2em;
`;
const TranscriptConsequenceList = ({ transcriptConsequences, }) => (react_1.default.createElement(ConsequenceListWrapper, null, groupConsequences(transcriptConsequences, 'major_consequence').map(({ value: consequenceTerm, consequences }) => (react_1.default.createElement(ConsequenceListItem, { key: consequenceTerm },
    react_1.default.createElement("h3", null, (0, vepConsequences_1.getLabelForConsequenceTerm)(consequenceTerm)),
    react_1.default.createElement(ui_1.OrderedList, null, groupConsequences(consequences, 'gene_id').map(
    // @ts-expect-error TS(7031) FIXME: Binding element 'geneId' implicitly has an 'any' t... Remove this comment to see the full error message
    ({ value: geneId, consequences: consequencesInGene }) => {
        const geneSymbol = consequencesInGene[0].gene_symbol;
        return (
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        react_1.default.createElement(ui_1.ListItem, { key: geneId },
            react_1.default.createElement("h4", null,
                react_1.default.createElement(Link_1.default, { to: `/gene/${geneId}` }, geneSymbol)),
            react_1.default.createElement(ConsequencesInGene, { transcriptConsequences: consequencesInGene })));
    })))))));
exports.TranscriptConsequenceList = TranscriptConsequenceList;
//# sourceMappingURL=TranscriptConsequenceList.js.map