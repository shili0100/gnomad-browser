"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const TranscriptConsequenceList_1 = require("./TranscriptConsequenceList");
const VariantTranscriptConsequences = ({ variant }) => {
    const { transcript_consequences } = variant;
    const transcriptConsequences = transcript_consequences || [];
    const numTranscripts = transcriptConsequences.length;
    const geneIds = Array.from(new Set(transcriptConsequences.map((csq) => csq.gene_id)));
    const numGenes = geneIds.length;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null,
            "This variant falls on ",
            numTranscripts,
            " transcript",
            numTranscripts !== 1 && 's',
            " in ",
            numGenes,
            ' ',
            "gene",
            numGenes !== 1 && 's',
            "."),
        react_1.default.createElement("p", null,
            react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
            " The gene symbols shown below are provided by VEP and may differ from the symbol shown on gene pages."),
        react_1.default.createElement(TranscriptConsequenceList_1.TranscriptConsequenceList, { transcriptConsequences: transcriptConsequences })));
};
exports.default = VariantTranscriptConsequences;
//# sourceMappingURL=VariantTranscriptConsequences.js.map