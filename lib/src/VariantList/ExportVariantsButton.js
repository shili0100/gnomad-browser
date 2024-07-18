"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVersionSpecificColumns = exports.getPolyphen = exports.getSift = exports.getPhylop = exports.getPangolin = exports.getSpliceAI = exports.getRevel = exports.getCadd = exports.getGenomeFAFFreq = exports.getGenomeFAFGroup = exports.getV2ExomeFAFFreq = exports.getV2ExomeFAFGroup = exports.getV4ExomeFAFFreq = exports.getV4ExomeFAFGroup = exports.getExomeFilters = exports.getJointFAFFreq = exports.getJointFAFGroup = exports.getJointFilters = exports.createPopulationColumns = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const metadata_1 = require("../../dataset-metadata/metadata");
const getValueGivenProperty = (popId, variant, property) => {
    return variant.populations.filter((v) => v.id === popId)[0]
        ? JSON.stringify(variant.populations.filter((v) => v.id === popId)[0][property])
        : '';
};
const createPopulationColumns = (datasetId) => {
    const datasetPopulations = (0, gnomadPopulations_1.getPopulationsInDataset)(datasetId);
    let populationColumns = [];
    datasetPopulations.forEach((popId) => {
        const popName = gnomadPopulations_1.GNOMAD_POPULATION_NAMES[popId];
        populationColumns = populationColumns.concat([
            {
                label: `Allele Count ${popName}`,
                getValue: (variant) => getValueGivenProperty(popId, variant, 'ac'),
            },
            {
                label: `Allele Number ${popName}`,
                getValue: (variant) => getValueGivenProperty(popId, variant, 'an'),
            },
            {
                label: `Homozygote Count ${popName}`,
                getValue: (variant) => getValueGivenProperty(popId, variant, 'ac_hom'),
            },
            {
                label: `Hemizygote Count ${popName}`,
                getValue: (variant) => getValueGivenProperty(popId, variant, 'ac_hemi'),
            },
        ]);
    });
    return populationColumns;
};
exports.createPopulationColumns = createPopulationColumns;
const getJointFilters = (variant) => {
    const v4Variant = variant;
    return v4Variant.joint.filters.length === 0 ? 'PASS' : v4Variant.joint.filters.join(',');
};
exports.getJointFilters = getJointFilters;
const getJointFAFGroup = (variant) => {
    const v4Variant = variant;
    return v4Variant.joint.fafmax.faf95_max_gen_anc !== null
        ? v4Variant.joint.fafmax.faf95_max_gen_anc
        : '';
};
exports.getJointFAFGroup = getJointFAFGroup;
const getJointFAFFreq = (variant) => {
    const v4Variant = variant;
    return v4Variant.joint.fafmax.faf95_max !== null
        ? JSON.stringify(v4Variant.joint.fafmax.faf95_max)
        : '';
};
exports.getJointFAFFreq = getJointFAFFreq;
const getExomeFilters = (variant) => {
    const v4Variant = variant;
    return !v4Variant.exome || v4Variant.exome.filters.length === 0
        ? 'PASS'
        : v4Variant.exome.filters.join(',');
};
exports.getExomeFilters = getExomeFilters;
const getV4ExomeFAFGroup = (variant) => {
    const v4Variant = variant;
    return v4Variant.exome && v4Variant.exome.fafmax.faf95_max_gen_anc !== null
        ? v4Variant.exome.fafmax.faf95_max_gen_anc
        : '';
};
exports.getV4ExomeFAFGroup = getV4ExomeFAFGroup;
const getV4ExomeFAFFreq = (variant) => {
    const v4Variant = variant;
    return v4Variant.exome && v4Variant.exome.fafmax.faf95_max !== null
        ? JSON.stringify(v4Variant.exome.fafmax.faf95_max)
        : '';
};
exports.getV4ExomeFAFFreq = getV4ExomeFAFFreq;
const getV2ExomeFAFGroup = (variant) => {
    const v2Variant = variant;
    return v2Variant.exome && v2Variant.exome.faf95.popmax_population !== null
        ? v2Variant.exome.faf95.popmax_population
        : '';
};
exports.getV2ExomeFAFGroup = getV2ExomeFAFGroup;
const getV2ExomeFAFFreq = (variant) => {
    const v2Variant = variant;
    return v2Variant.exome && v2Variant.exome.faf95.popmax !== null
        ? JSON.stringify(v2Variant.exome.faf95.popmax)
        : '';
};
exports.getV2ExomeFAFFreq = getV2ExomeFAFFreq;
const getGenomeFAFGroup = (variant) => {
    const v2Variant = variant;
    return v2Variant.genome && v2Variant.genome.faf95.popmax_population !== null
        ? v2Variant.genome.faf95.popmax_population
        : '';
};
exports.getGenomeFAFGroup = getGenomeFAFGroup;
const getGenomeFAFFreq = (variant) => {
    const v2Variant = variant;
    return v2Variant.genome && v2Variant.genome.faf95.popmax !== null
        ? JSON.stringify(v2Variant.genome.faf95.popmax)
        : '';
};
exports.getGenomeFAFFreq = getGenomeFAFFreq;
const getPredictorValue = (variant, id) => {
    const v4Variant = variant;
    return v4Variant.in_silico_predictors.filter((predictor) => predictor.id === id).length > 0
        ? v4Variant.in_silico_predictors.filter((predictor) => predictor.id === id)[0].value
        : '';
};
const getCadd = (variant) => getPredictorValue(variant, 'cadd');
exports.getCadd = getCadd;
const getRevel = (variant) => getPredictorValue(variant, 'revel_max');
exports.getRevel = getRevel;
const getSpliceAI = (variant) => getPredictorValue(variant, 'spliceai_ds_max');
exports.getSpliceAI = getSpliceAI;
const getPangolin = (variant) => getPredictorValue(variant, 'pangolin_largest_ds');
exports.getPangolin = getPangolin;
const getPhylop = (variant) => getPredictorValue(variant, 'phylop');
exports.getPhylop = getPhylop;
const getSift = (variant) => getPredictorValue(variant, 'sift_max');
exports.getSift = getSift;
const getPolyphen = (variant) => getPredictorValue(variant, 'polyphen_max');
exports.getPolyphen = getPolyphen;
const inSilicoColumns = [
    { label: 'cadd', getValue: exports.getCadd },
    { label: 'revel_max', getValue: exports.getRevel },
    { label: 'spliceai_ds_max', getValue: exports.getSpliceAI },
    { label: 'pangolin_largest_ds', getValue: exports.getPangolin },
    { label: 'phylop', getValue: exports.getPhylop },
    { label: 'sift_max', getValue: exports.getSift },
    { label: 'polyphen_max', getValue: exports.getPolyphen },
];
const createVersionSpecificColumns = (datasetId) => {
    if ((0, metadata_1.isV4)(datasetId)) {
        if ((0, metadata_1.hasJointFrequencyData)(datasetId)) {
            return [
                {
                    label: 'Filters - joint',
                    getValue: exports.getJointFilters,
                },
                {
                    label: 'GroupMax FAF group',
                    getValue: exports.getJointFAFGroup,
                },
                {
                    label: 'GroupMax FAF frequency',
                    getValue: exports.getJointFAFFreq,
                },
                ...inSilicoColumns,
            ];
        }
        return [
            {
                label: 'Filters - exome',
                getValue: exports.getExomeFilters,
            },
            {
                label: 'Exome GroupMax FAF group',
                getValue: exports.getV4ExomeFAFGroup,
            },
            {
                label: 'Exome GroupMax FAF frequency',
                getValue: exports.getV4ExomeFAFFreq,
            },
            ...inSilicoColumns,
        ];
    }
    if ((0, metadata_1.isV2)(datasetId)) {
        return [
            {
                label: 'Exome GroupMax FAF group',
                getValue: exports.getV2ExomeFAFGroup,
            },
            {
                label: 'Exome GroupMax FAF frequency',
                getValue: exports.getV2ExomeFAFFreq,
            },
            {
                label: 'Genome GroupMax FAF group',
                getValue: exports.getGenomeFAFGroup,
            },
            {
                label: 'Genome GroupMax FAF frequency',
                getValue: exports.getGenomeFAFFreq,
            },
        ];
    }
    return [];
};
exports.createVersionSpecificColumns = createVersionSpecificColumns;
const exportVariantsToCsv = (variants, datasetId, baseFileName) => {
    const DEFAULT_COLUMNS = [
        {
            label: 'gnomAD ID',
            getValue: (variant) => variant.variant_id,
        },
        {
            label: 'Chromosome',
            getValue: (variant) => variant.variant_id.split('-')[0],
        },
        {
            label: 'Position',
            getValue: (variant) => JSON.stringify(variant.pos),
        },
        {
            label: 'rsIDs',
            getValue: (variant) => (variant.rsids || []).join(';'),
        },
        {
            label: 'Reference',
            getValue: (variant) => variant.variant_id.split('-')[2],
        },
        {
            label: 'Alternate',
            getValue: (variant) => variant.variant_id.split('-')[3],
        },
        {
            label: 'Source',
            getValue: datasetId === 'exac'
                ? () => 'ExAC'
                : (variant) => {
                    const sources = [];
                    if (variant.exome) {
                        sources.push('gnomAD Exomes');
                    }
                    if (variant.genome) {
                        sources.push('gnomAD Genomes');
                    }
                    return sources.join(',');
                },
        },
        {
            label: 'Filters - exomes',
            getValue: (variant) => {
                if (!variant.exome) {
                    return 'NA';
                }
                return variant.exome.filters.length === 0 ? 'PASS' : variant.exome.filters.join(',');
            },
        },
        {
            label: 'Filters - genomes',
            getValue: (variant) => {
                if (!variant.genome) {
                    return 'NA';
                }
                return variant.genome.filters.length === 0 ? 'PASS' : variant.genome.filters.join(',');
            },
        },
        {
            label: 'Transcript',
            getValue: (variant) => variant.transcript_id ? `${variant.transcript_id}.${variant.transcript_version}` : '',
        },
        {
            label: 'HGVS Consequence',
            getValue: (variant) => variant.hgvs || '',
        },
        {
            label: 'Protein Consequence',
            getValue: (variant) => variant.hgvsp || '',
        },
        {
            label: 'Transcript Consequence',
            getValue: (variant) => variant.hgvsc || '',
        },
        {
            label: 'VEP Annotation',
            getValue: (variant) => variant.consequence || '',
        },
        {
            label: 'ClinVar Clinical Significance',
            getValue: (variant) => variant.clinical_significance || '',
        },
        {
            label: 'ClinVar Variation ID',
            getValue: (variant) => variant.clinvar_variation_id || '',
        },
        {
            label: 'Flags',
            getValue: (variant) => variant.flags.join(','),
        },
        {
            label: 'Allele Count',
            getValue: (variant) => JSON.stringify(variant.ac),
        },
        {
            label: 'Allele Number',
            getValue: (variant) => JSON.stringify(variant.an),
        },
        {
            label: 'Allele Frequency',
            getValue: (variant) => JSON.stringify(variant.af),
        },
        {
            label: 'Homozygote Count',
            getValue: (variant) => JSON.stringify(variant.ac_hom),
        },
        {
            label: 'Hemizygote Count',
            getValue: (variant) => JSON.stringify(variant.ac_hemi),
        },
    ];
    const versionSpecificColumns = (0, exports.createVersionSpecificColumns)(datasetId);
    const populationColumns = (0, exports.createPopulationColumns)(datasetId);
    const columns = DEFAULT_COLUMNS.concat(versionSpecificColumns, populationColumns);
    const headerRow = columns.map((c) => c.label);
    const csv = `${headerRow}\r\n${variants
        .map((variant) => columns
        .map((c) => c.getValue(variant))
        .map((val) => val.includes(',') || val.includes('"') || val.includes("'")
        ? `"${val.replace('"', '""')}"`
        : val)
        .join(','))
        .join('\r\n')}\r\n`;
    const date = new Date();
    const timestamp = `${date.getFullYear()}_${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}_${date.getDate().toString().padStart(2, '0')}_${date
        .getHours()
        .toString()
        .padStart(2, '0')}_${date.getMinutes().toString().padStart(2, '0')}_${date
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${baseFileName.replace(/\s+/g, '_')}_${timestamp}.csv`);
    // @ts-expect-error TS(2551) FIXME: Property 'onClick' does not exist on type 'HTMLAnc... Remove this comment to see the full error message
    link.onClick = () => {
        URL.revokeObjectURL(url);
        link.remove();
    };
    document.body.appendChild(link);
    link.click();
};
const ExportVariantsButton = (_a) => {
    var { datasetId, exportFileName, variants } = _a, rest = __rest(_a, ["datasetId", "exportFileName", "variants"]);
    return (react_1.default.createElement(ui_1.Button, Object.assign({}, rest, { onClick: () => {
            exportVariantsToCsv(variants, datasetId, exportFileName);
        } }), "Export variants to CSV"));
};
exports.default = ExportVariantsButton;
//# sourceMappingURL=ExportVariantsButton.js.map