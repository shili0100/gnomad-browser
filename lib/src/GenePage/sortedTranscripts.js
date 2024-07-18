"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3_array_1 = require("d3-array");
const sortedTranscripts = (transcripts, firstTranscriptId) => {
    return [...transcripts].sort((t1, t2) => {
        // Sort specified transcript first
        // Then sort transcripts by mean expression and transcript ID
        if (t1.transcript_id === firstTranscriptId) {
            return -1;
        }
        if (t2.transcript_id === firstTranscriptId) {
            return 1;
        }
        const t1Mean = (0, d3_array_1.mean)(Object.values(t1.gtex_tissue_expression || {}));
        const t2Mean = (0, d3_array_1.mean)(Object.values(t2.gtex_tissue_expression || {}));
        if (t1Mean === t2Mean) {
            return t1.transcript_id.localeCompare(t2.transcript_id);
        }
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        return t2Mean - t1Mean;
    });
};
exports.default = sortedTranscripts;
//# sourceMappingURL=sortedTranscripts.js.map