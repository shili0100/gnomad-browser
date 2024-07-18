"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const VariantCooccurrenceCountsPerSeverityAndAf_1 = require("../__factories__/VariantCooccurrenceCountsPerSeverityAndAf");
const VariantCooccurrenceCountsTable_1 = __importDefault(require("./VariantCooccurrenceCountsTable"));
const datasets_1 = require("../../../tests/__helpers__/datasets");
const v2Regexp = /_r2/;
(0, datasets_1.forDatasetsNotMatching)(v2Regexp, 'VariantCoocurrenceCountsTable with non v2 dataset "%s"', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes and renders as placeholder text', () => {
        const heterozygousCounts = VariantCooccurrenceCountsPerSeverityAndAf_1.HeterozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
        const homozygousCounts = VariantCooccurrenceCountsPerSeverityAndAf_1.HomozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
        const tableContent = (0, react_2.render)(react_1.default.createElement(VariantCooccurrenceCountsTable_1.default, { datasetId: datasetId, heterozygous_variant_cooccurrence_counts: heterozygousCounts, homozygous_variant_cooccurrence_counts: homozygousCounts }));
        const normalContentFragment = tableContent.asFragment();
        (0, globals_1.expect)(normalContentFragment.querySelectorAll('p').length).toEqual(1);
        (0, globals_1.expect)(normalContentFragment.querySelectorAll('table').length).toEqual(0);
        (0, globals_1.expect)(normalContentFragment).toMatchSnapshot();
    });
});
(0, datasets_1.forDatasetsMatching)(v2Regexp, 'VariantCoocurrenceCountsTable with v2 dataset "%s"', (datasetId) => {
    (0, globals_1.test)('has no unexpected changes and renders as a table', () => {
        const heterozygousCounts = VariantCooccurrenceCountsPerSeverityAndAf_1.HeterozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
        const homozygousCounts = VariantCooccurrenceCountsPerSeverityAndAf_1.HomozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
        const tableContent = (0, react_2.render)(react_1.default.createElement(VariantCooccurrenceCountsTable_1.default, { datasetId: datasetId, heterozygous_variant_cooccurrence_counts: heterozygousCounts, homozygous_variant_cooccurrence_counts: homozygousCounts }));
        const normalContentFragment = tableContent.asFragment();
        (0, globals_1.expect)(normalContentFragment.querySelectorAll('p').length).toEqual(0);
        (0, globals_1.expect)(normalContentFragment.querySelectorAll('table').length).toEqual(2);
        (0, globals_1.expect)(normalContentFragment).toMatchSnapshot();
    });
});
(0, globals_1.describe)('VariantCooccurrenceCountsTable', () => {
    (0, globals_1.test)('renders correct data into correct table cells in both regular and extended mode', () => {
        const heterozygousCounts = VariantCooccurrenceCountsPerSeverityAndAf_1.HeterozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
        const homozygousCounts = VariantCooccurrenceCountsPerSeverityAndAf_1.HomozygousVariantCooccurrenceCountsPerSeverityAndAfFactory.build();
        const tableContent = (0, react_2.render)(react_1.default.createElement(VariantCooccurrenceCountsTable_1.default, { datasetId: "gnomad_r2_1", heterozygous_variant_cooccurrence_counts: heterozygousCounts, homozygous_variant_cooccurrence_counts: homozygousCounts }));
        const normalContentFragment = tableContent.asFragment();
        const tables = normalContentFragment.querySelectorAll('table');
        (0, globals_1.expect)(tables.length).toEqual(2);
        const [normalHeterozygousTable, homozygousTable] = tables;
        (0, globals_1.expect)(normalHeterozygousTable.querySelectorAll('td').length).toEqual(24);
        (0, globals_1.expect)(homozygousTable.querySelectorAll('td').length).toEqual(24);
        (0, globals_1.expect)(normalContentFragment).toMatchSnapshot();
        const expandButton = tableContent.getByText('expand');
        expandButton.click();
        const expandedTableFragment = tableContent.asFragment();
        (0, globals_1.expect)(expandedTableFragment.querySelectorAll('td').length).toEqual(66);
        (0, globals_1.expect)(expandedTableFragment).toMatchSnapshot();
        const collapseButton = tableContent.getByText('collapse');
        collapseButton.click();
        const collapsedTableFragment = tableContent.asFragment();
        (0, globals_1.expect)(collapsedTableFragment).toEqual(normalContentFragment);
    });
    (0, globals_1.test)('fills in missing data with zeroes', () => {
        const tableContent = (0, react_2.render)(react_1.default.createElement(VariantCooccurrenceCountsTable_1.default, { datasetId: "gnomad_r2_1", heterozygous_variant_cooccurrence_counts: {}, homozygous_variant_cooccurrence_counts: {} }));
        const normalContentFragment = tableContent.asFragment();
        const tables = normalContentFragment.querySelectorAll('table');
        (0, globals_1.expect)(tables.length).toEqual(2);
        const [normalHeterozygousTable, homozygousTable] = tables;
        (0, globals_1.expect)(normalHeterozygousTable.querySelectorAll('td').length).toEqual(24);
        (0, globals_1.expect)(homozygousTable.querySelectorAll('td').length).toEqual(24);
        (0, globals_1.expect)(normalContentFragment).toMatchSnapshot();
        const expandButton = tableContent.getByText('expand');
        expandButton.click();
        const expandedTableFragment = tableContent.asFragment();
        (0, globals_1.expect)(expandedTableFragment.querySelectorAll('td').length).toEqual(66);
        (0, globals_1.expect)(expandedTableFragment).toMatchSnapshot();
        const collapseButton = tableContent.getByText('collapse');
        collapseButton.click();
        const collapsedTableFragment = tableContent.asFragment();
        (0, globals_1.expect)(collapsedTableFragment).toEqual(normalContentFragment);
    });
});
//# sourceMappingURL=VariantCooccurrenceCountsTable.spec.js.map