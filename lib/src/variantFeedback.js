"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantFeedbackUrl = void 0;
const query_string_1 = __importDefault(require("query-string"));
const metadata_1 = require("../dataset-metadata/metadata");
const variantFeedbackUrl = (variant, datasetId) => {
    if (process.env.REPORT_VARIANT_URL) {
        const params = {};
        if (process.env.REPORT_VARIANT_VARIANT_ID_PARAMETER) {
            params[process.env.REPORT_VARIANT_VARIANT_ID_PARAMETER] = variant.variant_id;
        }
        const datasetName = (0, metadata_1.variantFeedbackDescription)(datasetId);
        if (datasetName && process.env.REPORT_VARIANT_DATASET_PARAMETER) {
            params[process.env.REPORT_VARIANT_DATASET_PARAMETER] = datasetName;
        }
        return `${process.env.REPORT_VARIANT_URL}?${query_string_1.default.stringify(params)}`;
    }
    return 'mailto:gnomad@broadinstitute.org';
};
exports.variantFeedbackUrl = variantFeedbackUrl;
//# sourceMappingURL=variantFeedback.js.map