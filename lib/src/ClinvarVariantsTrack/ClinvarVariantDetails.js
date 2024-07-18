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
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const AttributeList_1 = __importStar(require("../AttributeList"));
const SubmissionsList_1 = __importDefault(require("../SubmissionsList"));
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const formatClinvarDate_1 = __importDefault(require("./formatClinvarDate"));
const ClinvarVariantDetailsGnomadData = ({ clinvarVariant, }) => {
    const ac = 
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    ((clinvarVariant.gnomad.exome || {}).ac || 0) + ((clinvarVariant.gnomad.genome || {}).ac || 0);
    const an = 
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    ((clinvarVariant.gnomad.exome || {}).an || 0) + ((clinvarVariant.gnomad.genome || {}).an || 0);
    const af = an === 0 ? 0 : ac / an;
    const truncatedAF = Number(af.toPrecision(3));
    const formattedAF = truncatedAF === 0 || truncatedAF === 1 ? af.toFixed(0) : af.toExponential(2);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(AttributeList_1.default, null,
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Allele count" }, ac),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Allele number" }, an),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Allele frequency" }, formattedAF))));
};
const ClinvarVariantDetails = ({ clinvarVariant, clinvarReleaseDate, }) => {
    const conditions = clinvarVariant.submissions
        .flatMap((submission) => submission.conditions)
        .reduce((acc, condition) => (Object.assign(Object.assign({}, acc), { [`${condition.medgen_id}-${condition.name}`]: condition })), {});
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h3", null, "ClinVar"),
        react_1.default.createElement("p", null,
            react_1.default.createElement(ui_1.ExternalLink, { href: `https://www.ncbi.nlm.nih.gov/clinvar/variation/${clinvarVariant.clinvar_variation_id}/` }, "View more information on the ClinVar website")),
        react_1.default.createElement(AttributeList_1.default, null,
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "ClinVar Variation ID" }, clinvarVariant.clinvar_variation_id),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Conditions" }, Object.values(conditions)
                .map((condition) => condition.medgen_id ? (
            // @ts-expect-error TS(2786) FIXME: 'ExternalLink' cannot be used as a JSX component.
            react_1.default.createElement(ui_1.ExternalLink, { key: condition.medgen_id, href: `https://www.ncbi.nlm.nih.gov/medgen/${condition.medgen_id}/` }, condition.name)) : (react_1.default.createElement("span", null, condition.name)))
                .reduce((acc, el, i) => (i === 0 ? [...acc, el] : [...acc, ', ', el]), [])),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Clinical significance" }, clinvarVariant.clinical_significance),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Review status" },
                clinvarVariant.review_status,
                " (",
                clinvarVariant.gold_stars,
                ' ',
                clinvarVariant.gold_stars === 1 ? 'star' : 'stars',
                ")"),
            react_1.default.createElement(AttributeList_1.AttributeListItem, { label: "Last evaluated" }, clinvarVariant.last_evaluated ? (0, formatClinvarDate_1.default)(clinvarVariant.last_evaluated) : '–')),
        react_1.default.createElement("h4", null, "Submissions"),
        react_1.default.createElement(SubmissionsList_1.default, { submissions: clinvarVariant.submissions }),
        react_1.default.createElement("p", null,
            "Data displayed here is from ClinVar's ",
            (0, formatClinvarDate_1.default)(clinvarReleaseDate),
            " release."),
        clinvarVariant.in_gnomad && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h3", null, "gnomAD"),
            react_1.default.createElement("p", null,
                react_1.default.createElement(Link_1.default, { target: "_blank", to: `/variant/${clinvarVariant.variant_id}` }, "View all gnomAD data for this variant")),
            react_1.default.createElement(ClinvarVariantDetailsGnomadData, { clinvarVariant: clinvarVariant })))));
};
const operationName = 'ClinVarVariant';
const query = `
query ${operationName}($variantId: String!, $referenceGenome: ReferenceGenomeId!) {
  clinvar_variant(variant_id: $variantId, reference_genome: $referenceGenome) {
    clinical_significance
    clinvar_variation_id
    gnomad {
      exome {
        ac
        an
        filters
      }
      genome {
        ac
        an
        filters
      }
    }
    gold_stars
    in_gnomad
    last_evaluated
    review_status
    submissions {
      clinical_significance
      conditions {
        name
        medgen_id
      }
      last_evaluated
      review_status
      submitter_name
    }
    variant_id
  }
  meta {
    clinvar_release_date
  }
}
`;
const ClinvarVariantDetailsContainer = ({ referenceGenome, variantId, }) => {
    return (react_1.default.createElement(Query_1.default, { operationName: operationName, query: query, variables: { referenceGenome, variantId }, loadingMessage: "Loading variant data", errorMessage: "Unable to load variant data", success: (data) => data.clinvar_variant }, ({ data }) => {
        return (react_1.default.createElement(ClinvarVariantDetails, { clinvarReleaseDate: data.meta.clinvar_release_date, clinvarVariant: data.clinvar_variant }));
    }));
};
exports.default = ClinvarVariantDetailsContainer;
//# sourceMappingURL=ClinvarVariantDetails.js.map