"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const TableWrapper_1 = __importDefault(require("../TableWrapper"));
const GnomadPopulationsTable_1 = require("./GnomadPopulationsTable");
const LocalAncestryPopulationsTable_1 = __importDefault(require("./LocalAncestryPopulationsTable"));
const HGDPPopulationsTable_1 = __importDefault(require("./HGDPPopulationsTable"));
const TGPPopulationsTable_1 = __importDefault(require("./TGPPopulationsTable"));
const VariantPopulationFrequencies = ({ datasetId, variant }) => {
    if ((0, metadata_1.hasLocalAncestryPopulations)(datasetId) && variant.genome) {
        const genome = variant.genome;
        const genomePopulations = genome.populations.filter((pop) => !(pop.id.startsWith('hgdp:') || pop.id.startsWith('1kg:')));
        const exomePopulations = variant.exome
            ? variant.exome.populations.filter((pop) => !(pop.id.startsWith('hgdp:') || pop.id.startsWith('1kg:')))
            : [];
        const hgdpPopulations = genome.populations
            .filter((pop) => pop.id.startsWith('hgdp:'))
            .map((pop) => (Object.assign(Object.assign({}, pop), { id: pop.id.slice(5) }))); // Remove hgdp: prefix
        const tgpPopulations = genome.populations
            .filter((pop) => pop.id.startsWith('1kg:'))
            .map((pop) => (Object.assign(Object.assign({}, pop), { id: pop.id.slice(4) }))); // Remove 1kg: prefix
        const localAncestryPopulations = genome.local_ancestry_populations || [];
        return (
        // @ts-expect-error TS(2741) FIXME: Property 'onChange' is missing in type '{ tabs: { ... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.Tabs, { tabs: [
                {
                    id: 'gnomAD',
                    label: 'gnomAD',
                    render: () => (react_1.default.createElement(TableWrapper_1.default, null,
                        react_1.default.createElement(GnomadPopulationsTable_1.GnomadPopulationsTable, { datasetId: datasetId, exomePopulations: exomePopulations, genomePopulations: genomePopulations, jointPopulations: variant.joint ? variant.joint.populations : null, showHemizygotes: variant.chrom === 'X' || variant.chrom === 'Y' }))),
                },
                {
                    id: 'HGDP',
                    label: 'HGDP',
                    render: () => {
                        if (hgdpPopulations.length === 0) {
                            return react_1.default.createElement("p", null, "HGDP population frequencies are not available for this variant.");
                        }
                        return (react_1.default.createElement(TableWrapper_1.default, null,
                            react_1.default.createElement(HGDPPopulationsTable_1.default, { populations: hgdpPopulations, showHemizygotes: variant.chrom === 'X' || variant.chrom === 'Y', datasetId: datasetId })));
                    },
                },
                {
                    id: '1KG',
                    label: '1KG',
                    render: () => {
                        if (tgpPopulations.length === 0) {
                            return (react_1.default.createElement("p", null, "1000 Genomes Project population frequencies are not available for this variant."));
                        }
                        if ((0, metadata_1.has1000GenomesPopulationFrequencies)(datasetId)) {
                            return (react_1.default.createElement("p", null, "1000 Genomes Project population frequencies are not available for this subset."));
                        }
                        return (react_1.default.createElement(TableWrapper_1.default, null,
                            react_1.default.createElement(TGPPopulationsTable_1.default, { populations: tgpPopulations, showHemizygotes: variant.chrom === 'X' || variant.chrom === 'Y' })));
                    },
                },
                {
                    id: 'local-ancestry',
                    label: 'Local Ancestry',
                    render: () => {
                        if ((0, metadata_1.isSubset)(datasetId)) {
                            return react_1.default.createElement("p", null, "Local ancestry is not available for subsets of gnomAD v3.");
                        }
                        if (localAncestryPopulations.length === 0) {
                            return (react_1.default.createElement("p", null, "Local ancestry is not available for this variant. Local ancestry is only available for bi-allelic variants with high call rates and with an allele frequency > 0.1% within the Latino/Admixed American gnomAD population."));
                        }
                        return (react_1.default.createElement(TableWrapper_1.default, null,
                            react_1.default.createElement(LocalAncestryPopulationsTable_1.default, { populations: localAncestryPopulations })));
                    },
                },
            ] }));
    }
    return (react_1.default.createElement(TableWrapper_1.default, null,
        react_1.default.createElement(GnomadPopulationsTable_1.GnomadPopulationsTable, { datasetId: datasetId, exomePopulations: variant.exome ? variant.exome.populations : [], genomePopulations: variant.genome ? variant.genome.populations : [], jointPopulations: variant.joint ? variant.joint.populations : null, showHemizygotes: variant.chrom === 'X' || variant.chrom === 'Y' })));
};
exports.default = VariantPopulationFrequencies;
//# sourceMappingURL=VariantPopulationFrequencies.js.map