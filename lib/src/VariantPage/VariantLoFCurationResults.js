"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const Link_1 = __importDefault(require("../Link"));
const PROJECT_PUBLICATIONS = {
    all_homozygous: {
        pubmed_id: '32461654',
    },
    haploinsufficient_genes: {
        pubmed_id: '32461655',
    },
};
const LoFCurationResult = ({ result }) => {
    const { verdict, flags = [], project } = result;
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const publication = PROJECT_PUBLICATIONS[project];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Link_1.default, { to: `/gene/${result.gene_id}` }, result.gene_symbol || result.gene_id),
        react_1.default.createElement("div", null,
            "Curated as ",
            verdict),
        flags.length > 0 && react_1.default.createElement("div", null,
            "Contributing factors: ",
            flags.join(', ')),
        publication && (react_1.default.createElement("div", null,
            "For more information about this curation, see",
            ' ',
            react_1.default.createElement(ui_1.ExternalLink, { href: `https://pubmed.ncbi.nlm.nih.gov/${publication.pubmed_id}/` },
                "PMID ",
                publication.pubmed_id)))));
};
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ gene_id: Validator<... Remove this comment to see the full error message
const LoFCurationResultPropType = prop_types_1.default.shape({
    gene_id: prop_types_1.default.string.isRequired,
    gene_symbol: prop_types_1.default.string,
    verdict: prop_types_1.default.string.isRequired,
    flags: prop_types_1.default.arrayOf(prop_types_1.default.string),
    project: prop_types_1.default.string.isRequired,
});
const VariantLoFCurationResults = ({ variant }) => {
    const numGenes = new Set(variant.lof_curations.map((c) => c.gene_id)).size;
    return (react_1.default.createElement("div", null,
        "This variant was manually curated in ",
        numGenes,
        " gene",
        numGenes !== 1 ? 's' : '',
        ".",
        react_1.default.createElement("ul", null, variant.lof_curations.map((result) => (react_1.default.createElement("li", { key: result.gene_id },
            react_1.default.createElement(LoFCurationResult, { result: result })))))));
};
exports.default = VariantLoFCurationResults;
//# sourceMappingURL=VariantLoFCurationResults.js.map