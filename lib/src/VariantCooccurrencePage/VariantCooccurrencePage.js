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
exports.noPredictionPossible = exports.transThreshold = exports.cisThreshold = void 0;
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const DocumentTitle_1 = __importDefault(require("../DocumentTitle"));
const GnomadPageHeading_1 = __importDefault(require("../GnomadPageHeading"));
const Link_1 = __importDefault(require("../Link"));
const Query_1 = __importDefault(require("../Query"));
const StatusMessage_1 = __importDefault(require("../StatusMessage"));
const TranscriptConsequenceList_1 = require("../VariantPage/TranscriptConsequenceList");
const VariantCooccurrenceDetailsTable_1 = __importDefault(require("./VariantCooccurrenceDetailsTable"));
const VariantCooccurrenceHaplotypeCountsTable_1 = __importDefault(require("./VariantCooccurrenceHaplotypeCountsTable"));
const VariantCooccurrenceSummaryTable_1 = __importDefault(require("./VariantCooccurrenceSummaryTable"));
const VariantCooccurrenceVariantIdsForm_1 = __importDefault(require("./VariantCooccurrenceVariantIdsForm"));
exports.cisThreshold = 0.02;
exports.transThreshold = 0.55;
const distantCisThreshold = 50000;
const Section = styled_components_1.default.section `
  width: 100%;
`;
const ResponsiveSection = (0, styled_components_1.default)(Section) `
  width: calc(50% - 15px);

  @media (max-width: 992px) {
    width: 100%;
  }
`;
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
const renderProbabilityCompoundHeterozygous = (p) => {
    if (p === 1) {
        return '100%';
    }
    if (p > 0.99) {
        return '>99%';
    }
    if (p === 0) {
        return '0%';
    }
    if (p < 0.01) {
        return '<1%';
    }
    return `${(p * 100).toFixed(0)}%`;
};
const cooccurrenceDescriptions = {
    one_not_present: 'One of these variants is not observed in',
    neither_present: 'These variants are not observed',
    in_cis: 'Based on their co-occurrence pattern in gnomAD, these variants are likely found on the same haplotype in most',
    in_trans: 'Based on their co-occurrence pattern in gnomAD, these variants are likely found on different haplotypes in most',
    no_prediction: 'The co-occurrence pattern for these variants doesn’t allow us to give a robust assessment of whether these variants are on the same haplotype or not in',
};
const makePrediction = ({ p_compound_heterozygous, genotype_counts, }) => {
    if (p_compound_heterozygous === null) {
        const variantASum = genotype_counts.het_ref +
            genotype_counts.het_het +
            genotype_counts.het_hom +
            genotype_counts.hom_ref +
            genotype_counts.hom_het +
            genotype_counts.hom_hom;
        const variantAOccurs = variantASum > 0;
        const variantBSum = genotype_counts.ref_het +
            genotype_counts.ref_hom +
            genotype_counts.het_het +
            genotype_counts.het_hom +
            genotype_counts.hom_het +
            genotype_counts.hom_hom;
        const variantBOccurs = variantBSum > 0;
        if (!variantAOccurs || !variantBOccurs) {
            if (variantAOccurs || variantBOccurs) {
                return 'one_not_present';
            }
            return 'neither_present';
        }
    }
    if (p_compound_heterozygous > exports.transThreshold) {
        return 'in_trans';
    }
    if (p_compound_heterozygous < exports.cisThreshold) {
        return 'in_cis';
    }
    return 'no_prediction';
};
const getCooccurrenceDescription = (prediction, selectedPopulation = 'All') => {
    const baseDescription = cooccurrenceDescriptions[prediction];
    return selectedPopulation === 'All'
        ? `${baseDescription} individuals in gnomAD.`
        : `${baseDescription} individuals in the ${gnomadPopulations_1.GNOMAD_POPULATION_NAMES[selectedPopulation]} population in gnomAD.`;
};
const isCisSingleton = (genotype_counts) => {
    const totalSum = Object.values(genotype_counts).reduce((a, b) => a + b) - genotype_counts.ref_ref;
    return genotype_counts.het_het === 1 && totalSum === 1;
};
const noPredictionPossible = ({ genotype_counts, p_compound_heterozygous, }) => p_compound_heterozygous === null || isCisSingleton(genotype_counts);
exports.noPredictionPossible = noPredictionPossible;
const variantDistance = ({ variant_ids: [variantId1, variantId2] }) => {
    const [_chrom1, pos1String] = variantId1.split('-');
    const [_chrom2, pos2String] = variantId2.split('-');
    const pos1 = Number.parseInt(pos1String, 10);
    const pos2 = Number.parseInt(pos2String, 10);
    return Math.abs(pos1 - pos2);
};
const VariantCoocurrence = ({ cooccurrenceData }) => {
    const [selectedPopulation, setSelectedPopulation] = (0, react_1.useState)('All');
    const cooccurrenceInSelectedPopulation = selectedPopulation === 'All'
        ? cooccurrenceData
        : cooccurrenceData.populations.find((pop) => pop.id === selectedPopulation);
    const prediction = makePrediction(cooccurrenceInSelectedPopulation);
    const cooccurrenceDescription = getCooccurrenceDescription(prediction, selectedPopulation);
    // If no individual carries both variants, the co-occurrence tables are generated from the public variant data.
    const sharedCarrierExists = cooccurrenceData.genotype_counts.het_het +
        cooccurrenceData.genotype_counts.het_hom +
        cooccurrenceData.genotype_counts.hom_het +
        cooccurrenceData.genotype_counts.hom_hom >
        0;
    const anyPopulationWithoutPrediction = [cooccurrenceData, ...cooccurrenceData.populations].some(exports.noPredictionPossible);
    const isDistantCis = prediction === 'in_cis' && variantDistance(cooccurrenceData) > distantCisThreshold;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Section, { style: { marginBottom: '2em' } },
            react_1.default.createElement("h2", null, "Overview"),
            react_1.default.createElement(VariantCooccurrenceSummaryTable_1.default, { cooccurrenceData: cooccurrenceData, selectedPopulation: selectedPopulation, onSelectPopulation: setSelectedPopulation }),
            sharedCarrierExists && (react_1.default.createElement("p", null,
                react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                " Only samples covered at both variant sites are included in this table.")),
            anyPopulationWithoutPrediction && (react_1.default.createElement("p", null, "* A likely co-occurrence pattern cannot be calculated in some cases, such as when only one of the variants is observed in a genetic ancestry group, or when both variants are singletons and were seen in the same individual.")),
            isDistantCis && (react_1.default.createElement("p", null,
                "Accuracy is lower (< 85%) for variants predicted to be in cis that are > 10",
                react_1.default.createElement("sup", null, "5"),
                " bp away from each other."))),
        react_1.default.createElement("h2", null, selectedPopulation === 'All'
            ? 'Details'
            : // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                `Details for ${gnomadPopulations_1.GNOMAD_POPULATION_NAMES[selectedPopulation]} Population`),
        react_1.default.createElement("p", null, "Select a genetic ancestry group in the overview table to view genotype counts for that group."),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h3", null, "Genotype Counts"),
                react_1.default.createElement(VariantCooccurrenceDetailsTable_1.default, { variantIds: cooccurrenceData.variant_ids, genotypeCounts: cooccurrenceInSelectedPopulation.genotype_counts }),
                cooccurrenceDescription && react_1.default.createElement("p", null, cooccurrenceDescription),
                sharedCarrierExists ? (react_1.default.createElement("p", null,
                    react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                    " Only samples covered at both variant sites are included in this table.")) : (react_1.default.createElement("p", null,
                    react_1.default.createElement(ui_1.Badge, { level: "info" }, "Note"),
                    " Because no individual in gnomAD carries both variants, this table was computed based on the separate variant information and does not account for the possibility that some samples may not be covered at both variant sites."))),
            !isCisSingleton(cooccurrenceData.genotype_counts) && (react_1.default.createElement(ResponsiveSection, null,
                react_1.default.createElement("h3", null,
                    cooccurrenceInSelectedPopulation.genotype_counts.het_het > 0 && react_1.default.createElement(react_1.default.Fragment, null, "Estimated "),
                    "Haplotype Counts"),
                react_1.default.createElement(VariantCooccurrenceHaplotypeCountsTable_1.default, { variantIds: cooccurrenceData.variant_ids, haplotypeCounts: cooccurrenceInSelectedPopulation.haplotype_counts }),
                cooccurrenceInSelectedPopulation.p_compound_heterozygous !== null && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("p", null,
                        "The estimated probability that these variants occur in different haplotypes is",
                        ' ',
                        renderProbabilityCompoundHeterozygous(cooccurrenceInSelectedPopulation.p_compound_heterozygous),
                        "."),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Note"),
                        " Probability values are not well calibrated, particularly where both variants are extremely rare. Interpret with caution. Please see",
                        ' ',
                        react_1.default.createElement(ui_1.ExternalLink, { href: "https://gnomad.broadinstitute.org/news/2021-07-variant-co-occurrence-phasing-information-in-gnomad/" }, "our blog post on variant co-occurrence"),
                        ' ',
                        "for accuracy estimates and additional detail."))))))));
};
const operationName = 'VariantCooccurrence';
const query = `
query ${operationName}($variants: [String!]!, $variant1: String!, $variant2: String, $datasetId: DatasetId!) {
  variant_cooccurrence(variants: $variants, dataset: $datasetId) {
    variant_ids
    genotype_counts
    haplotype_counts
    p_compound_heterozygous
    populations {
      id
      genotype_counts
      haplotype_counts
      p_compound_heterozygous
    }
  }
  variant1: variant(variantId: $variant1, dataset: $datasetId) {
    exome {
      ac
      an
    }
    genome {
      ac
      an
    }
    multi_nucleotide_variants {
      combined_variant_id
      other_constituent_snvs
    }
    transcript_consequences {
      gene_id
      gene_version
      gene_symbol
      hgvs
      hgvsc
      hgvsp
      is_canonical
      is_mane_select
      is_mane_select_version
      lof
      lof_flags
      lof_filter
      major_consequence
      polyphen_prediction
      sift_prediction
      transcript_id
      transcript_version
    }
  }
  variant2: variant(variantId: $variant2, dataset: $datasetId) {
    exome {
      ac
      an
    }
    genome {
      ac
      an
    }
    multi_nucleotide_variants {
      combined_variant_id
      other_constituent_snvs
    }
    transcript_consequences {
      gene_id
      gene_version
      gene_symbol
      hgvs
      hgvsc
      hgvsp
      is_canonical
      is_mane_select
      is_mane_select_version
      lof
      lof_flags
      lof_filter
      major_consequence
      polyphen_prediction
      sift_prediction
      transcript_id
      transcript_version
    }
  }
}
`;
const structureCounts = (population) => {
    const { genotype_counts, haplotype_counts } = population;
    const structuredGenotypeCounts = {
        ref_ref: genotype_counts[0],
        ref_het: genotype_counts[1],
        ref_hom: genotype_counts[2],
        het_ref: genotype_counts[3],
        het_het: genotype_counts[4],
        het_hom: genotype_counts[5],
        hom_ref: genotype_counts[6],
        hom_het: genotype_counts[7],
        hom_hom: genotype_counts[8],
    };
    const structuredHaplotypeCounts = {
        ref_ref: haplotype_counts[0],
        hom_ref: haplotype_counts[1],
        ref_hom: haplotype_counts[2],
        hom_hom: haplotype_counts[3],
    };
    return Object.assign(Object.assign({}, population), { genotype_counts: structuredGenotypeCounts, haplotype_counts: structuredHaplotypeCounts });
};
const normalizeCooccurrenceData = (cooccurrenceData) => {
    const populations = cooccurrenceData.populations
        ? cooccurrenceData.populations.map(structureCounts)
        : cooccurrenceData.populations;
    const topLevel = structureCounts(cooccurrenceData);
    return Object.assign(Object.assign({}, topLevel), { populations });
};
const VariantCoocurrenceContainer = ({ datasetId, variantIds, }) => {
    return (react_1.default.createElement(Query_1.default, { errorMessage: "Unable to load co-occurrence", loadingMessage: "Loading co-occurrence", operationName: operationName, query: query, variables: {
            variants: variantIds,
            variant1: variantIds[0],
            variant2: variantIds[1],
            datasetId,
        }, success: (data) => data.variant_cooccurrence }, ({ data }) => {
        const variant_cooccurrence = normalizeCooccurrenceData(data.variant_cooccurrence);
        const genesInCommon = [data.variant1, data.variant2]
            .map((v) => new Set(v.transcript_consequences.map((csq) => csq.gene_id)))
            .reduce((acc, genes) => new Set([...acc].filter((geneId) => genes.has(geneId))));
        // @ts-expect-error TS(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
        const geneSymbols = data.variant1.transcript_consequences.reduce((acc, csq) => (Object.assign(Object.assign({}, acc), { [csq.gene_id]: csq.gene_symbol })));
        const multiNucleotideVariants = ((data.variant1 || {}).multi_nucleotide_variants || []).filter((mnv) => mnv.other_constituent_snvs.includes(variantIds[1]));
        return (react_1.default.createElement(react_1.default.Fragment, null,
            multiNucleotideVariants.length > 0 && (react_1.default.createElement(Section, null,
                react_1.default.createElement("h2", null, "Multi-nucleotide Variants"),
                react_1.default.createElement("p", null,
                    "These variants are found in-phase in some individuals as",
                    ' ',
                    multiNucleotideVariants.length === 1
                        ? 'a multi-nucleotide variant'
                        : 'multi-nucleotide variants',
                    "."),
                react_1.default.createElement(ui_1.List, null, multiNucleotideVariants.map((mnv) => (
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                react_1.default.createElement(ui_1.ListItem, { key: mnv.combined_variant_id },
                    react_1.default.createElement(Link_1.default, { to: `/variant/${mnv.combined_variant_id}` }, mnv.combined_variant_id))))))),
            react_1.default.createElement(VariantCoocurrence, { cooccurrenceData: variant_cooccurrence }),
            react_1.default.createElement(Section, null,
                react_1.default.createElement("h2", null, "VEP Annotations"),
                react_1.default.createElement("p", null,
                    "These variants both occur in ",
                    genesInCommon.size,
                    " gene",
                    genesInCommon.size === 1 ? '' : 's',
                    ":",
                    ' ',
                    Array.from(genesInCommon)
                        .map((geneId) => (react_1.default.createElement(Link_1.default, { key: geneId, to: `/gene/${geneId}` }, geneSymbols[geneId])))
                        .flatMap((el) => [', ', el])
                        .slice(1),
                    ". Only annotations for ",
                    genesInCommon.size === 1 ? 'this gene' : 'these genes',
                    " are shown here."),
                react_1.default.createElement(Wrapper, null,
                    react_1.default.createElement(ResponsiveSection, null,
                        react_1.default.createElement("h3", null,
                            react_1.default.createElement(Link_1.default, { to: `/variant/${variantIds[0]}` }, variantIds[0])),
                        react_1.default.createElement(TranscriptConsequenceList_1.TranscriptConsequenceList, { transcriptConsequences: data.variant1.transcript_consequences.filter((csq) => genesInCommon.has(csq.gene_id)) })),
                    react_1.default.createElement(ResponsiveSection, null,
                        react_1.default.createElement("h3", null,
                            react_1.default.createElement(Link_1.default, { to: `/variant/${variantIds[1]}` }, variantIds[1])),
                        react_1.default.createElement(TranscriptConsequenceList_1.TranscriptConsequenceList, { transcriptConsequences: data.variant2.transcript_consequences.filter((csq) => genesInCommon.has(csq.gene_id)) }))))));
    }));
};
const VariantCoocurrencePage = ({ datasetId }) => {
    const history = (0, react_router_dom_1.useHistory)();
    const location = (0, react_router_dom_1.useLocation)();
    let { variant: variantIds } = query_string_1.default.parse(location.search);
    if (variantIds === undefined) {
        variantIds = [];
    }
    else if (typeof variantIds === 'string') {
        variantIds = [variantIds];
    }
    return (
    // @ts-expect-error TS(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Page, null,
        react_1.default.createElement(DocumentTitle_1.default, { title: "Variant Co-occurrence" }),
        react_1.default.createElement(GnomadPageHeading_1.default, { datasetOptions: {
                // Co-occurrence data only available for gnomAD v2
                includeExac: false,
                includeGnomad2: true,
                includeGnomad2Subsets: false,
                includeGnomad3: false,
                includeStructuralVariants: false,
            }, selectedDataset: datasetId }, "Variant Co-Occurrence"),
        datasetId === 'gnomad_r2_1' ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null,
                "For more information about co-occurrence data and how to use this tool, see our",
                ' ',
                react_1.default.createElement(ui_1.ExternalLink, { href: "https://gnomad.broadinstitute.org/news/2021-07-variant-co-occurrence-phasing-information-in-gnomad/" }, "\u201CVariant Co-Occurrence (Phasing) Information in gnomAD\u201D blog post"),
                "."),
            react_1.default.createElement(Section, { style: { marginBottom: '2em' } },
                react_1.default.createElement("h2", null, "Select a variant pair"),
                react_1.default.createElement("p", null, "Co-occurrence is available for coding and UTR variants that:"),
                react_1.default.createElement(ui_1.List, null,
                    react_1.default.createElement(ui_1.ListItem, null, "Occur in the same gene"),
                    react_1.default.createElement(ui_1.ListItem, null, "Appear in gnomAD exome samples"),
                    react_1.default.createElement(ui_1.ListItem, null, "Have a global allele frequency \u2264 5%")),
                react_1.default.createElement(VariantCooccurrenceVariantIdsForm_1.default, { datasetId: datasetId, defaultValues: variantIds, onSubmit: (newVariantIds) => {
                        history.push(Object.assign(Object.assign({}, location), { search: query_string_1.default.stringify({
                                variant: newVariantIds,
                                dataset: datasetId,
                            }) }));
                    } })),
            variantIds.length === 2 && (react_1.default.createElement(VariantCoocurrenceContainer, { datasetId: datasetId, variantIds: variantIds })))) : (react_1.default.createElement(StatusMessage_1.default, null,
            "Variant co-occurrence is only available for gnomAD v2.1.1",
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Link_1.default, { to: `${location.pathname}?dataset=gnomad_r2_1`, preserveSelectedDataset: false }, "View variant co-occurrence in gnomAD v2.1.1")))));
};
exports.default = VariantCoocurrencePage;
//# sourceMappingURL=VariantCooccurrencePage.js.map