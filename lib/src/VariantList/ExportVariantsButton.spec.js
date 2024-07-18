"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const datasets_1 = require("../../../tests/__helpers__/datasets");
const ExportVariantsButton_1 = require("./ExportVariantsButton");
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
const getAllPopulationColumns = (columns) => {
    let populationColumns = [];
    columns.forEach((column) => {
        populationColumns = populationColumns.concat(column.label);
    });
    return populationColumns;
};
const createExpectedPopulationColumns = (populations) => {
    const columnCategories = [
        'Allele Count',
        'Allele Number',
        'Homozygote Count',
        'Hemizygote Count',
    ];
    let populationColumns = [];
    populations.forEach((population) => {
        columnCategories.forEach((category) => {
            populationColumns = populationColumns.concat(`${category} ${gnomadPopulations_1.GNOMAD_POPULATION_NAMES[population]}`);
        });
    });
    return populationColumns;
};
(0, datasets_1.forAllDatasets)('ExportVariantsButton with "%s" selected', (datasetId) => {
    (0, globals_1.test)('returns the expected genetic ancestry group columns', () => {
        const expectedPopulations = (0, gnomadPopulations_1.getPopulationsInDataset)(datasetId);
        const result = (0, ExportVariantsButton_1.createPopulationColumns)(datasetId);
        (0, globals_1.expect)(getAllPopulationColumns(result)).toStrictEqual(createExpectedPopulationColumns(expectedPopulations));
    });
});
const JOINT_FILTERS_LABEL = 'Filters - joint';
const JOINT_GROUPMAX_GROUP_LABEL = 'GroupMax FAF group';
const JOINT_GROUPMAX_FREQ_LABEL = 'GroupMax FAF frequency';
const CADD_LABEL = 'cadd';
const REVEL_MAX_LABEL = 'revel_max';
const SPLICEAI_DS_MAX_LABEL = 'spliceai_ds_max';
const PANGOLIN_LARGEST_DS_LABEL = 'pangolin_largest_ds';
const PHYLOP_LABEL = 'phylop';
const SIFT_MAX_LABEL = 'sift_max';
const POLYPHEN_MAX_LABEL = 'polyphen_max';
const EXOME_FILTERS_LABEL = 'Filters - exome';
const EXOME_GROUPMAX_GROUP_LABEL = 'Exome GroupMax FAF group';
const EXOME_GROUPMAX_FREQ_LABEL = 'Exome GroupMax FAF frequency';
const GENOME_GROUPMAX_GROUP_LABEL = 'Genome GroupMax FAF group';
const GENOME_GROUPMAX_FREQ_LABEL = 'Genome GroupMax FAF frequency';
const expectedVersionSpecificColumns = {
    exac: [],
    gnomad_r2_1: [
        { label: EXOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFGroup },
        { label: EXOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFFreq },
        { label: GENOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFGroup },
        { label: GENOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFFreq },
    ],
    gnomad_r2_1_controls: [
        { label: EXOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFGroup },
        { label: EXOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFFreq },
        { label: GENOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFGroup },
        { label: GENOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFFreq },
    ],
    gnomad_r2_1_non_cancer: [
        { label: EXOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFGroup },
        { label: EXOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFFreq },
        { label: GENOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFGroup },
        { label: GENOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFFreq },
    ],
    gnomad_r2_1_non_neuro: [
        { label: EXOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFGroup },
        { label: EXOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFFreq },
        { label: GENOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFGroup },
        { label: GENOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFFreq },
    ],
    gnomad_r2_1_non_topmed: [
        { label: EXOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFGroup },
        { label: EXOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getV2ExomeFAFFreq },
        { label: GENOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFGroup },
        { label: GENOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getGenomeFAFFreq },
    ],
    gnomad_r3: [],
    gnomad_r3_controls_and_biobanks: [],
    gnomad_r3_non_cancer: [],
    gnomad_r3_non_neuro: [],
    gnomad_r3_non_topmed: [],
    gnomad_r3_non_v2: [],
    gnomad_sv_r2_1: [],
    gnomad_sv_r2_1_controls: [],
    gnomad_sv_r2_1_non_neuro: [],
    gnomad_sv_r4: [
        { label: JOINT_FILTERS_LABEL, getValue: ExportVariantsButton_1.getJointFilters },
        { label: JOINT_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getJointFAFGroup },
        { label: JOINT_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getJointFAFFreq },
        { label: CADD_LABEL, getValue: ExportVariantsButton_1.getCadd },
        { label: REVEL_MAX_LABEL, getValue: ExportVariantsButton_1.getRevel },
        { label: SPLICEAI_DS_MAX_LABEL, getValue: ExportVariantsButton_1.getSpliceAI },
        { label: PANGOLIN_LARGEST_DS_LABEL, getValue: ExportVariantsButton_1.getPangolin },
        { label: PHYLOP_LABEL, getValue: ExportVariantsButton_1.getPhylop },
        { label: SIFT_MAX_LABEL, getValue: ExportVariantsButton_1.getSift },
        { label: POLYPHEN_MAX_LABEL, getValue: ExportVariantsButton_1.getPolyphen },
    ],
    gnomad_cnv_r4: [
        { label: JOINT_FILTERS_LABEL, getValue: ExportVariantsButton_1.getJointFilters },
        { label: JOINT_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getJointFAFGroup },
        { label: JOINT_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getJointFAFFreq },
        { label: CADD_LABEL, getValue: ExportVariantsButton_1.getCadd },
        { label: REVEL_MAX_LABEL, getValue: ExportVariantsButton_1.getRevel },
        { label: SPLICEAI_DS_MAX_LABEL, getValue: ExportVariantsButton_1.getSpliceAI },
        { label: PANGOLIN_LARGEST_DS_LABEL, getValue: ExportVariantsButton_1.getPangolin },
        { label: PHYLOP_LABEL, getValue: ExportVariantsButton_1.getPhylop },
        { label: SIFT_MAX_LABEL, getValue: ExportVariantsButton_1.getSift },
        { label: POLYPHEN_MAX_LABEL, getValue: ExportVariantsButton_1.getPolyphen },
    ],
    gnomad_r4: [
        { label: JOINT_FILTERS_LABEL, getValue: ExportVariantsButton_1.getJointFilters },
        { label: JOINT_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getJointFAFGroup },
        { label: JOINT_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getJointFAFFreq },
        { label: CADD_LABEL, getValue: ExportVariantsButton_1.getCadd },
        { label: REVEL_MAX_LABEL, getValue: ExportVariantsButton_1.getRevel },
        { label: SPLICEAI_DS_MAX_LABEL, getValue: ExportVariantsButton_1.getSpliceAI },
        { label: PANGOLIN_LARGEST_DS_LABEL, getValue: ExportVariantsButton_1.getPangolin },
        { label: PHYLOP_LABEL, getValue: ExportVariantsButton_1.getPhylop },
        { label: SIFT_MAX_LABEL, getValue: ExportVariantsButton_1.getSift },
        { label: POLYPHEN_MAX_LABEL, getValue: ExportVariantsButton_1.getPolyphen },
    ],
    gnomad_r4_non_ukb: [
        { label: EXOME_FILTERS_LABEL, getValue: ExportVariantsButton_1.getExomeFilters },
        { label: EXOME_GROUPMAX_GROUP_LABEL, getValue: ExportVariantsButton_1.getV4ExomeFAFGroup },
        { label: EXOME_GROUPMAX_FREQ_LABEL, getValue: ExportVariantsButton_1.getV4ExomeFAFFreq },
        { label: CADD_LABEL, getValue: ExportVariantsButton_1.getCadd },
        { label: REVEL_MAX_LABEL, getValue: ExportVariantsButton_1.getRevel },
        { label: SPLICEAI_DS_MAX_LABEL, getValue: ExportVariantsButton_1.getSpliceAI },
        { label: PANGOLIN_LARGEST_DS_LABEL, getValue: ExportVariantsButton_1.getPangolin },
        { label: PHYLOP_LABEL, getValue: ExportVariantsButton_1.getPhylop },
        { label: SIFT_MAX_LABEL, getValue: ExportVariantsButton_1.getSift },
        { label: POLYPHEN_MAX_LABEL, getValue: ExportVariantsButton_1.getPolyphen },
    ],
};
(0, datasets_1.forAllDatasets)('createVersionSpecificColumns for %s dataset', (datasetId) => {
    const expectedColumns = expectedVersionSpecificColumns[datasetId];
    const expectedLabels = expectedColumns.map((column) => column.label);
    (0, globals_1.test)(`returns the columns ${expectedLabels.join(', ')}`, () => {
        const actual = (0, ExportVariantsButton_1.createVersionSpecificColumns)(datasetId);
        (0, globals_1.expect)(actual).toEqual(expectedColumns);
    });
});
//# sourceMappingURL=ExportVariantsButton.spec.js.map