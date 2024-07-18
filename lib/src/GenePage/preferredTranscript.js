"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreferredTranscript = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const getPreferredTranscript = (gene) => {
    let preferredTranscriptId = null;
    let preferredTranscriptDescription = null;
    const hasManeSelectTranscript = gene.mane_select_transcript &&
        gene.transcripts.some((transcript) => transcript.transcript_id === gene.mane_select_transcript.ensembl_id);
    if (hasManeSelectTranscript) {
        preferredTranscriptId = gene.mane_select_transcript.ensembl_id;
        const maneSelectTranscriptMatchesVersion = !!gene.mane_select_transcript &&
            gene.transcripts.some((transcript) => transcript.transcript_id === gene.mane_select_transcript.ensembl_id &&
                transcript.transcript_version === gene.mane_select_transcript.ensembl_version);
        if (maneSelectTranscriptMatchesVersion) {
            preferredTranscriptDescription = (react_1.default.createElement(react_1.default.Fragment, null,
                "Transcript is the",
                ' ',
                react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.ncbi.nlm.nih.gov/refseq/MANE/" }, "MANE"),
                " Select transcript for this gene"));
        }
        else {
            preferredTranscriptDescription = (react_1.default.createElement(react_1.default.Fragment, null,
                "Transcript is a different version of the",
                ' ',
                react_1.default.createElement(ui_1.ExternalLink, { href: "https://www.ncbi.nlm.nih.gov/refseq/MANE/" }, "MANE"),
                " Select transcript for this gene"));
        }
    }
    else {
        const hasCanonicalTranscript = gene.canonical_transcript_id &&
            gene.transcripts.some((transcript) => transcript.transcript_id === gene.canonical_transcript_id);
        if (hasCanonicalTranscript) {
            preferredTranscriptId = gene.canonical_transcript_id;
            preferredTranscriptDescription =
                'Transcript is the Ensembl canonical transcript for this gene';
        }
    }
    return { preferredTranscriptId, preferredTranscriptDescription };
};
exports.getPreferredTranscript = getPreferredTranscript;
//# sourceMappingURL=preferredTranscript.js.map