"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importDefault(require("react"));
const identifiers_1 = require("@gnomad/identifiers");
const metadata_1 = require("../../dataset-metadata/metadata");
const Link_1 = __importDefault(require("../Link"));
const VariantLiftover = ({ variant }) => {
    if (variant.liftover && variant.liftover.length > 0) {
        const liftoverTargetReferenceGenome = variant.reference_genome === 'GRCh37' ? 'GRCh38' : 'GRCh37';
        const liftoverTargetDataset = variant.reference_genome === 'GRCh37' ? 'gnomad_r4' : 'gnomad_r2_1';
        const isPlural = variant.liftover.length > 1;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null,
                "This variant lifts over to the following ",
                liftoverTargetReferenceGenome,
                " variant",
                isPlural ? 's' : '',
                ":"),
            react_1.default.createElement("ul", null, variant.liftover.map((l) => {
                const { chrom, pos } = (0, identifiers_1.parseVariantId)(l.liftover.variant_id);
                return (react_1.default.createElement("li", { key: l.liftover.variant_id },
                    l.liftover.variant_id,
                    react_1.default.createElement("br", null),
                    l.datasets.includes(liftoverTargetDataset) ? (react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                            pathname: `/variant/${l.liftover.variant_id}`,
                            search: query_string_1.default.stringify({ dataset: liftoverTargetDataset }),
                        } },
                        "View variant in ",
                        (0, metadata_1.labelForDataset)(liftoverTargetDataset))) : (react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                            pathname: `/region/${chrom}-${Math.max(1, pos - 20)}-${pos + 20}`,
                            search: query_string_1.default.stringify({ dataset: liftoverTargetDataset }),
                        } },
                        "View region in ",
                        (0, metadata_1.labelForDataset)(liftoverTargetDataset)))));
            }))));
    }
    if (variant.liftover_sources && variant.liftover_sources.length > 0) {
        const liftoverSourceReferenceGenome = variant.reference_genome === 'GRCh37' ? 'GRCh38' : 'GRCh37';
        const liftoverSourceDataset = variant.reference_genome === 'GRCh37' ? 'gnomad_r4' : 'gnomad_r2_1';
        const isPlural = variant.liftover_sources.length > 1;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null,
                "The following ",
                liftoverSourceReferenceGenome,
                " variant",
                isPlural ? 's' : '',
                " lift",
                isPlural ? '' : 's',
                " over to this variant:"),
            react_1.default.createElement("ul", null, variant.liftover_sources.map((l) => {
                const { chrom, pos } = (0, identifiers_1.parseVariantId)(l.source.variant_id);
                return (react_1.default.createElement("li", { key: l.source.variant_id },
                    l.source.variant_id,
                    react_1.default.createElement("br", null),
                    l.datasets.includes(liftoverSourceDataset) ? (react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                            pathname: `/variant/${l.source.variant_id}`,
                            search: query_string_1.default.stringify({ dataset: liftoverSourceDataset }),
                        } },
                        "View variant in ",
                        (0, metadata_1.labelForDataset)(liftoverSourceDataset))) : (react_1.default.createElement(Link_1.default, { preserveSelectedDataset: false, to: {
                            pathname: `/region/${chrom}-${Math.max(1, pos - 20)}-${pos + 20}`,
                            search: query_string_1.default.stringify({ dataset: liftoverSourceDataset }),
                        } },
                        "View region in ",
                        (0, metadata_1.labelForDataset)(liftoverSourceDataset)))));
            }))));
    }
    return null;
};
exports.default = VariantLiftover;
//# sourceMappingURL=VariantLiftover.js.map