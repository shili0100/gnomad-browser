"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GnomadVariantOccurrenceTable = void 0;
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const sampleCounts_1 = __importDefault(require("../../dataset-metadata/sampleCounts"));
const metadata_1 = require("../../dataset-metadata/metadata");
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const Link_1 = __importDefault(require("../Link"));
const QCFilter_1 = __importDefault(require("../QCFilter"));
const Table = styled_components_1.default.table `
  /* To vertically align with the right column's heading */
  margin-top: 1.25em;

  th {
    font-weight: bold;
  }

  th[scope='col'] {
    padding-left: 30px;
    text-align: left;
  }

  th[scope='row'] {
    text-align: right;
  }

  td {
    padding-left: 30px;
    line-height: 1.5;
  }
`;
const NoWrap = styled_components_1.default.span `
  white-space: nowrap;
`;
const renderGnomadVariantFlag = (variant, context) => {
    if (!variant[context]) {
        let badgeName = 'No variant';
        let badgeDescription = 'Variant is not present in this data type. All called sample genotypes from this data type are homozygous reference';
        if (variant.joint) {
            if ((context === 'exome' && variant.joint.filters.includes('not_called_in_exomes')) ||
                (context === 'genome' && variant.joint.filters.includes('not_called_in_genomes'))) {
                badgeName = 'No data';
                badgeDescription = `This variant was not called in the gnomAD ${context} callset; no ${context} samples had any genotype call (no reference or alternate calls)`;
            }
        }
        return context === 'joint' ? (react_1.default.createElement("div", null)) : (react_1.default.createElement(ui_1.Badge, { level: "error", tooltip: badgeDescription }, badgeName));
    }
    const { filters } = variant[context];
    if (filters.length === 0) {
        return context === 'joint' ? react_1.default.createElement("div", null) : react_1.default.createElement(ui_1.Badge, { level: "success" }, "Pass");
    }
    return filters.map((filter) => {
        const data = filter === 'discrepant_frequencies'
            ? {
                pValue: variant.joint.freq_comparison_stats.stat_union.p_value,
                testName: variant.joint.freq_comparison_stats.stat_union.stat_test_name,
                geneticAncestry: variant.joint.freq_comparison_stats.stat_union.gen_ancs[0] || undefined,
            }
            : {};
        return react_1.default.createElement(QCFilter_1.default, { key: filter, filter: filter, data: data });
    });
};
const FilteringAlleleFrequencyPopulation = styled_components_1.default.div `
  display: none;
  white-space: nowrap;

  @media print {
    display: block;
  }
`;
// @ts-expect-error TS(7022) FIXME: 'FilteringAlleleFrequency' implicitly has type 'an... Remove this comment to see the full error message
const FilteringAlleleFrequency = ({ popmax, popmax_population: popmaxPopulation, }) => {
    if (popmax === null) {
        return react_1.default.createElement("span", null, "\u2014");
    }
    if (popmax === 0) {
        return react_1.default.createElement("span", null, "0");
    }
    return (react_1.default.createElement("span", null,
        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: gnomadPopulations_1.GNOMAD_POPULATION_NAMES[popmaxPopulation.toLowerCase()] },
            react_1.default.createElement(ui_1.TooltipHint, null, popmax.toPrecision(4))),
        react_1.default.createElement(FilteringAlleleFrequencyPopulation, null, gnomadPopulations_1.GNOMAD_POPULATION_NAMES[popmaxPopulation.toLowerCase()])));
};
FilteringAlleleFrequency.defaultProps = {
    popmax: null,
    popmax_population: null,
};
const LowAlleleNumberWarning = ({ datasetId, hasLowAlleleNumberInExomes, hasLowAlleleNumberInGenomes, }) => {
    const datasetLabel = (0, metadata_1.labelForDataset)(datasetId);
    let sampleSet = null;
    if (hasLowAlleleNumberInGenomes) {
        sampleSet = hasLowAlleleNumberInExomes
            ? `both ${datasetLabel} exomes and genomes`
            : `${datasetLabel} genomes`;
    }
    else if (hasLowAlleleNumberInExomes) {
        sampleSet = `${datasetLabel} exomes`;
    }
    const noticeLevel = hasLowAlleleNumberInGenomes ? 'error' : 'warning';
    return (react_1.default.createElement("p", null,
        react_1.default.createElement(ui_1.Badge, { level: noticeLevel }, "Warning"),
        " This variant is covered in fewer than 50% of individuals in ",
        sampleSet,
        ".",
        ' ',
        hasLowAlleleNumberInGenomes
            ? 'This may indicate a low-quality site'
            : 'Allele frequency estimates may not be reliable',
        "."));
};
const GnomadVariantOccurrenceTable = ({ datasetId, showExomes, showGenomes, variant, }) => {
    var _a, _b;
    const showTotal = showExomes && showGenomes;
    const isPresentInExome = Boolean(variant.exome);
    const isPresentInGenome = Boolean(variant.genome);
    const hasJointFrequencyData = Boolean(variant.joint);
    const notCalledInExomes = hasJointFrequencyData && variant.joint.filters.includes('not_called_in_exomes');
    const notCalledInGenomes = hasJointFrequencyData && variant.joint.filters.includes('not_called_in_genomes');
    const exomeAlleleCount = isPresentInExome ? variant.exome.ac : 0;
    const exomeAlleleNumber = isPresentInExome ? variant.exome.an : 0;
    const genomeAlleleCount = isPresentInGenome ? variant.genome.ac : 0;
    const genomeAlleleNumber = isPresentInGenome ? variant.genome.an : 0;
    const exomeAlleleFrequency = exomeAlleleNumber === 0 ? 0 : exomeAlleleCount / exomeAlleleNumber;
    const genomeAlleleFrequency = genomeAlleleNumber === 0 ? 0 : genomeAlleleCount / genomeAlleleNumber;
    const totalAlleleCount = hasJointFrequencyData
        ? variant.joint.ac
        : exomeAlleleCount + genomeAlleleCount;
    const totalAlleleNumber = hasJointFrequencyData
        ? variant.joint.an
        : exomeAlleleNumber + genomeAlleleNumber;
    const totalAlleleFrequency = totalAlleleNumber === 0 ? 0 : totalAlleleCount / totalAlleleNumber;
    const exomeHomozygoteCount = isPresentInExome ? variant.exome.ac_hom : 0;
    const genomeHomozygoteCount = isPresentInGenome ? variant.genome.ac_hom : 0;
    const totalHomozygoteCount = hasJointFrequencyData
        ? (_a = variant.joint) === null || _a === void 0 ? void 0 : _a.homozygote_count
        : exomeHomozygoteCount + genomeHomozygoteCount;
    const exomeHemizygoteCount = isPresentInExome ? variant.exome.ac_hemi : 0;
    const genomeHemizygoteCount = isPresentInGenome ? variant.genome.ac_hemi : 0;
    const totalHemizygoteCount = hasJointFrequencyData
        ? (_b = variant.joint) === null || _b === void 0 ? void 0 : _b.hemizygote_count
        : exomeHemizygoteCount + genomeHemizygoteCount;
    const exomeCoverage = {
        mean: (variant.coverage.exome || { mean: null }).mean,
        over20: (variant.coverage.exome || { over_20: null }).over_20,
    };
    const genomeCoverage = {
        mean: (variant.coverage.genome || { mean: null }).mean,
        over20: (variant.coverage.genome || { over_20: null }).over_20,
    };
    // Display a warning if a variant's AN is < 50% of the max AN for exomes/genomes.
    // Max AN is 2 * sample count, so 50% max AN is equal to sample count.
    const datasetSampleCounts = sampleCounts_1.default[datasetId];
    let exomeMaxAN;
    let genomeMaxAN;
    if (variant.chrom === 'X') {
        exomeMaxAN = datasetSampleCounts.exomes
            ? datasetSampleCounts.exomes.XX * 2 + datasetSampleCounts.exomes.XY
            : null;
        genomeMaxAN = datasetSampleCounts.genomes
            ? datasetSampleCounts.genomes.XX * 2 + datasetSampleCounts.genomes.XY
            : null;
    }
    else if (variant.chrom === 'Y') {
        exomeMaxAN = datasetSampleCounts.exomes ? datasetSampleCounts.exomes.XY : null;
        genomeMaxAN = datasetSampleCounts.genomes ? datasetSampleCounts.genomes.XY : null;
    }
    else {
        exomeMaxAN = datasetSampleCounts.exomesTotal * 2;
        genomeMaxAN = datasetSampleCounts.genomesTotal * 2;
    }
    const hasLowAlleleNumberInExomes = isPresentInExome && variant.exome.an < exomeMaxAN / 2;
    const hasLowAlleleNumberInGenomes = isPresentInGenome && variant.genome.an < genomeMaxAN / 2;
    // Display a warning if there are some high allele balance samples that may have been misinterpreted as heterozygous.
    // See https://gnomad.broadinstitute.org/help/why-are-some-variants-depleted-for-homozygotes-out-of-hardy-weinberg-equilibrium
    const exomeHighAlleleBalanceSamples = isPresentInExome && variant.exome.quality_metrics.allele_balance.alt
        ? variant.exome.quality_metrics.allele_balance.alt.bin_freq[18] +
            variant.exome.quality_metrics.allele_balance.alt.bin_freq[19]
        : 0;
    const genomeHighAlleleBalanceSamples = isPresentInGenome && variant.genome.quality_metrics.allele_balance.alt
        ? variant.genome.quality_metrics.allele_balance.alt.bin_freq[18] +
            variant.genome.quality_metrics.allele_balance.alt.bin_freq[19]
        : 0;
    const totalHighAlleleBalanceSamples = exomeHighAlleleBalanceSamples + genomeHighAlleleBalanceSamples;
    const showExomeHighAlleleBalanceWarning = exomeHighAlleleBalanceSamples > 0 &&
        (exomeHomozygoteCount === 0 || exomeHighAlleleBalanceSamples / exomeHomozygoteCount >= 0.02);
    const showGenomeHighAlleleBalanceWarning = genomeHighAlleleBalanceSamples > 0 &&
        (genomeHomozygoteCount === 0 || genomeHighAlleleBalanceSamples / genomeHomozygoteCount >= 0.02);
    const showHighAlleleBalanceWarning = showExomeHighAlleleBalanceWarning || showGenomeHighAlleleBalanceWarning;
    const highAlleleBalanceWarningMessage = exomeHighAlleleBalanceSamples > 0 && genomeHighAlleleBalanceSamples > 0
        ? `Up to ${totalHighAlleleBalanceSamples} individuals (${exomeHighAlleleBalanceSamples} in exomes and ${genomeHighAlleleBalanceSamples} in genomes) called as heterozygous for this variant have a skewed allele balance which suggests that some may actually be homozygous for the alternative allele.`
        : `Up to ${totalHighAlleleBalanceSamples} individuals called as heterozygous for this variant have a skewed allele balance which suggests that some may actually be homozygous for the alternative allele.`;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Table, null,
            react_1.default.createElement("tbody", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", null),
                    showExomes && react_1.default.createElement("th", { scope: "col" }, "Exomes"),
                    showGenomes && react_1.default.createElement("th", { scope: "col" }, "Genomes"),
                    showTotal && react_1.default.createElement("th", { scope: "col" }, "Total")),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Quality control filters that this variant failed (if any)" },
                            react_1.default.createElement(ui_1.TooltipHint, null,
                                "Filters ",
                                react_1.default.createElement(InfoButton_1.default, { topic: "what-do-the-flags-on-the-browser-mean" })))),
                    showExomes && react_1.default.createElement("td", null, renderGnomadVariantFlag(variant, 'exome')),
                    showGenomes && react_1.default.createElement("td", null, renderGnomadVariantFlag(variant, 'genome')),
                    showTotal && react_1.default.createElement("td", null, renderGnomadVariantFlag(variant, 'joint'))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Alternate allele count in high quality genotypes" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Allele Count"))),
                    showExomes && (react_1.default.createElement("td", null,
                        isPresentInExome && exomeAlleleCount,
                        notCalledInExomes && '-',
                        hasJointFrequencyData && !isPresentInExome && !notCalledInExomes && 0)),
                    showGenomes && (react_1.default.createElement("td", null,
                        isPresentInGenome && genomeAlleleCount,
                        notCalledInGenomes && '-',
                        hasJointFrequencyData && !isPresentInGenome && !notCalledInGenomes && 0)),
                    showTotal && react_1.default.createElement("td", null, totalAlleleCount)),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Total number of called high quality genotypes" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Allele Number"))),
                    showExomes && (react_1.default.createElement("td", null,
                        isPresentInExome && exomeAlleleNumber,
                        notCalledInExomes && '-',
                        hasJointFrequencyData &&
                            !isPresentInExome &&
                            !notCalledInExomes &&
                            totalAlleleNumber - genomeAlleleNumber,
                        hasLowAlleleNumberInExomes && ' *')),
                    showGenomes && (react_1.default.createElement("td", null,
                        isPresentInGenome && genomeAlleleNumber,
                        notCalledInGenomes && '-',
                        hasJointFrequencyData &&
                            !isPresentInGenome &&
                            !notCalledInGenomes &&
                            totalAlleleNumber - exomeAlleleNumber,
                        hasLowAlleleNumberInGenomes && ' *')),
                    showTotal && (react_1.default.createElement("td", null,
                        totalAlleleNumber,
                        (hasLowAlleleNumberInExomes || hasLowAlleleNumberInGenomes) && ' *'))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Alternate allele frequency in high quality genotypes" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Allele Frequency"))),
                    showExomes && (react_1.default.createElement("td", null,
                        isPresentInExome && exomeAlleleFrequency.toPrecision(4),
                        notCalledInExomes && '-')),
                    showGenomes && (react_1.default.createElement("td", null,
                        isPresentInGenome && genomeAlleleFrequency.toPrecision(4),
                        notCalledInGenomes && '-')),
                    showTotal && react_1.default.createElement("td", null, totalAlleleFrequency.toPrecision(4))),
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(NoWrap, null,
                            "Grpmax Filtering AF ",
                            react_1.default.createElement(InfoButton_1.default, { topic: "faf" })),
                        react_1.default.createElement("br", null),
                        "(95% confidence)"),
                    showExomes && (react_1.default.createElement("td", null,
                        isPresentInExome && react_1.default.createElement(FilteringAlleleFrequency, Object.assign({}, variant.exome.faf95)),
                        notCalledInExomes && '-')),
                    showGenomes && (react_1.default.createElement("td", null,
                        isPresentInGenome && react_1.default.createElement(FilteringAlleleFrequency, Object.assign({}, variant.genome.faf95)),
                        notCalledInGenomes && '-')),
                    showTotal && (react_1.default.createElement("td", null, hasJointFrequencyData && react_1.default.createElement(FilteringAlleleFrequency, Object.assign({}, variant.joint.faf95))))),
                variant.chrom !== 'Y' && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Number of individuals homozygous for alternate allele" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Number of homozygotes"))),
                    showExomes && (react_1.default.createElement("td", null,
                        isPresentInExome && exomeHomozygoteCount,
                        notCalledInExomes && '-',
                        showExomeHighAlleleBalanceWarning && ' *')),
                    showGenomes && (react_1.default.createElement("td", null,
                        isPresentInGenome && genomeHomozygoteCount,
                        notCalledInGenomes && '-',
                        showGenomeHighAlleleBalanceWarning && ' *')),
                    showTotal && (react_1.default.createElement("td", null,
                        totalHomozygoteCount,
                        showHighAlleleBalanceWarning && ' *')))),
                (variant.chrom === 'X' || variant.chrom === 'Y') && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Number of individuals hemizygous for alternate allele" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Number of hemizygotes"))),
                    showExomes && react_1.default.createElement("td", null, isPresentInExome && exomeHemizygoteCount),
                    showGenomes && react_1.default.createElement("td", null, isPresentInGenome && genomeHemizygoteCount),
                    showTotal && react_1.default.createElement("td", null, totalHemizygoteCount))),
                !(0, metadata_1.isV4)(datasetId) && (react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { scope: "row" },
                        react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: "Mean depth of coverage at this variant's locus" },
                            react_1.default.createElement(ui_1.TooltipHint, null, "Mean depth of coverage"))),
                    showExomes && (react_1.default.createElement("td", null, exomeCoverage.mean !== null ? exomeCoverage.mean.toFixed(1) : '–')),
                    showGenomes && (react_1.default.createElement("td", null, genomeCoverage.mean !== null ? genomeCoverage.mean.toFixed(1) : '–')),
                    showTotal && react_1.default.createElement("td", null))))),
        (hasLowAlleleNumberInExomes || hasLowAlleleNumberInGenomes) && (react_1.default.createElement(LowAlleleNumberWarning, { datasetId: datasetId, hasLowAlleleNumberInExomes: hasLowAlleleNumberInExomes, hasLowAlleleNumberInGenomes: hasLowAlleleNumberInGenomes })),
        showHighAlleleBalanceWarning && (react_1.default.createElement("p", null,
            react_1.default.createElement(ui_1.Badge, { level: "warning" }, "Warning"),
            " ",
            highAlleleBalanceWarningMessage,
            ' ',
            react_1.default.createElement(Link_1.default, { to: "/help/why-are-some-variants-depleted-for-homozygotes-out-of-hardy-weinberg-equilibrium" }, "More details.")))));
};
exports.GnomadVariantOccurrenceTable = GnomadVariantOccurrenceTable;
// @ts-expect-error TS(2322) FIXME: Type 'Requireable<InferProps<{ bin_edges: Validato... Remove this comment to see the full error message
const histogramPropType = prop_types_1.default.shape({
    bin_edges: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
    bin_freq: prop_types_1.default.arrayOf(prop_types_1.default.number).isRequired,
    n_smaller: prop_types_1.default.number.isRequired,
    n_larger: prop_types_1.default.number.isRequired,
});
exports.GnomadVariantOccurrenceTable.defaultProps = {
    showExomes: true,
    showGenomes: true,
};
//# sourceMappingURL=VariantOccurrenceTable.js.map