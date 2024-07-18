"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const vepConsequences_1 = require("../vepConsequences");
const MitochondrialVariantTranscriptConsequence_1 = __importDefault(require("./MitochondrialVariantTranscriptConsequence"));
/**
 * Group a list of consequences by a field's value. Maintains sort order of list.
 */
const groupConsequences = (consequences, key) => {
    const uniqueValues = consequences
        .map((csq) => csq[key])
        .filter((value, index, values) => index === values.indexOf(value));
    const groupedConsequences = consequences.reduce((acc, csq) => {
        const accKey = csq[key];
        if (accKey) {
            if (!acc[accKey]) {
                acc[accKey] = [];
            }
            acc[accKey].push(csq);
        }
        return acc;
    }, {});
    return uniqueValues.map((value) => ({
        value,
        consequences: groupedConsequences[value],
    }));
};
const ConsequencesInGene = ({ transcriptConsequences, variant }) => {
    return (
    // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.OrderedList, null, transcriptConsequences.slice(0, 3).map((csq) => (
    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
    react_1.default.createElement(ui_1.ListItem, { key: csq.transcript_id },
        react_1.default.createElement(Link_1.default, { to: `/transcript/${csq.transcript_id}` },
            csq.transcript_id,
            ".",
            csq.transcript_version),
        react_1.default.createElement(MitochondrialVariantTranscriptConsequence_1.default, { consequence: csq, variant: variant }))))));
};
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
const MitochondrialVariantTranscriptConsequenceList = ({ variant, }) => (react_1.default.createElement(ConsequenceListWrapper, null, groupConsequences(variant.transcript_consequences, 'major_consequence').map(({ value: consequenceTerm, consequences }) => (react_1.default.createElement(ConsequenceListItem, { key: consequenceTerm },
    react_1.default.createElement("h3", null, (0, vepConsequences_1.getLabelForConsequenceTerm)(consequenceTerm)),
    react_1.default.createElement(ui_1.OrderedList, null, groupConsequences(consequences, 'gene_id').map(({ value: geneId, consequences: consequencesInGene }) => {
        const geneSymbol = consequencesInGene[0].gene_symbol;
        return (
        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
        react_1.default.createElement(ui_1.ListItem, { key: geneId },
            react_1.default.createElement("h4", null,
                react_1.default.createElement(Link_1.default, { to: `/gene/${geneId}` }, geneSymbol)),
            react_1.default.createElement(ConsequencesInGene, { transcriptConsequences: consequencesInGene, variant: variant })));
    })))))));
exports.default = MitochondrialVariantTranscriptConsequenceList;
//# sourceMappingURL=MitochondrialVariantTranscriptConsequenceList.js.map