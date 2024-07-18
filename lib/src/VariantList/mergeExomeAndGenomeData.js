"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeExomeAndGenomeData = exports.mergeExomeGenomeAndJointPopulationData = void 0;
const gnomadPopulations_1 = require("../../dataset-metadata/gnomadPopulations");
// safe math on possibly null values
const add = (n1, n2) => (n1 || 0) + (n2 || 0);
const emptyAncestries = (ancestry) => {
    return [
        { id: ancestry, ac: 0, an: 0, ac_hemi: 0, ac_hom: 0 },
        { id: `${ancestry}_XX`, ac: 0, an: 0, ac_hemi: 0, ac_hom: 0 },
        { id: `${ancestry}_XY`, ac: 0, an: 0, ac_hemi: 0, ac_hom: 0 },
    ];
};
const findAncestries = (target, candidates) => {
    const foundAncestries = candidates.filter((ancestry) => ancestry.id.startsWith(target));
    return foundAncestries.length > 0 ? foundAncestries : undefined;
};
// include placeholders for any ancestries missing from the dataset
const addMissingAncestries = (currentAncestries, versionAncestries) => {
    const fullAncestries = versionAncestries.flatMap((versionAncestry) => findAncestries(versionAncestry, currentAncestries) || emptyAncestries(versionAncestry));
    const totalXX = currentAncestries.filter((ancestry) => ancestry.id === 'XX');
    const totalXY = currentAncestries.filter((ancestry) => ancestry.id === 'XY');
    const fullAncestriesWithTotalKaryotypes = fullAncestries.concat(totalXX, totalXY);
    return fullAncestriesWithTotalKaryotypes;
};
const mergeExomeGenomeAndJointPopulationData = ({ datasetId, exomePopulations = [], genomePopulations = [], jointPopulations = null, }) => {
    const datasetPopulations = datasetId ? (0, gnomadPopulations_1.getPopulationsInDataset)(datasetId) : undefined;
    if (jointPopulations) {
        const reshapedJointPopulations = jointPopulations
            // filter to remove duplicate XX an XY keys from joint populations array
            .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id))
            .map((jointPopulation) => (Object.assign(Object.assign({}, jointPopulation), { ac_hemi: jointPopulation.hemizygote_count, ac_hom: jointPopulation.homozygote_count })));
        const reshapedJointPopulationWithAddedAncestries = datasetPopulations
            ? addMissingAncestries(reshapedJointPopulations, datasetPopulations)
            : reshapedJointPopulations;
        return reshapedJointPopulationWithAddedAncestries;
    }
    const populations = {};
    exomePopulations.forEach((exomePopulation) => {
        populations[exomePopulation.id] = {
            id: exomePopulation.id,
            ac: exomePopulation.ac,
            an: exomePopulation.an,
            ac_hemi: exomePopulation.ac_hemi,
            ac_hom: exomePopulation.ac_hom,
        };
    });
    genomePopulations.forEach((genomePopulation) => {
        if (genomePopulation.id in populations) {
            const entry = populations[genomePopulation.id];
            populations[genomePopulation.id] = {
                id: genomePopulation.id,
                ac: add(entry.ac, genomePopulation.ac),
                an: add(entry.an, genomePopulation.an),
                ac_hemi: add(entry.ac_hemi, genomePopulation.ac_hemi),
                ac_hom: add(entry.ac_hom, genomePopulation.ac_hom),
            };
        }
        else {
            populations[genomePopulation.id] = {
                id: genomePopulation.id,
                ac: genomePopulation.ac,
                an: genomePopulation.an,
                ac_hemi: genomePopulation.ac_hemi,
                ac_hom: genomePopulation.ac_hom,
            };
        }
    });
    const reshapedMergedPopulations = Object.values(populations);
    const reshapedMergedPopulationsWithAddedAncestries = datasetPopulations
        ? addMissingAncestries(reshapedMergedPopulations, datasetPopulations)
        : reshapedMergedPopulations;
    return reshapedMergedPopulationsWithAddedAncestries;
};
exports.mergeExomeGenomeAndJointPopulationData = mergeExomeGenomeAndJointPopulationData;
const mergeExomeAndGenomeData = ({ datasetId, variants, }) => {
    const mergedVariants = variants.map((variant) => {
        const { exome, genome, joint } = variant;
        if (joint) {
            const exomeFilters = exome ? exome.filters : [];
            const genomeFilters = genome ? genome.filters : [];
            const jointFilters = exomeFilters.concat(genomeFilters, joint.filters);
            return Object.assign(Object.assign({}, variant), { ac: joint.ac, an: joint.an, af: joint.ac / joint.an, allele_freq: joint.ac / joint.an, ac_hemi: joint.hemizygote_count, ac_hom: joint.homozygote_count, filters: jointFilters, populations: joint.populations.map((population) => (Object.assign(Object.assign({}, population), { ac_hemi: population.hemizygote_count, ac_hom: population.homozygote_count }))) });
        }
        const emptySequencingType = {
            ac: 0,
            ac_hemi: 0,
            ac_hom: 0,
            faf95: {
                popmax: null,
                popmax_population: null,
            },
            an: 0,
            af: 5,
            filters: [],
            populations: [],
        };
        const exomeOrNone = exome || emptySequencingType;
        const genomeOrNone = genome || emptySequencingType;
        const combinedAC = add(exomeOrNone.ac, genomeOrNone.ac);
        const combinedAN = add(exomeOrNone.an, genomeOrNone.an);
        const combinedAF = combinedAC ? combinedAC / combinedAN : 0;
        const combinedHemizygoteCount = add(exomeOrNone.ac_hemi, genomeOrNone.ac_hemi);
        const combinedHomozygoteCount = add(exomeOrNone.ac_hom, genomeOrNone.ac_hom);
        const exomeFilters = exomeOrNone.filters;
        const genomeFilters = genomeOrNone.filters;
        const combinedFilters = exomeFilters.concat(genomeFilters);
        const combinedPopulations = (0, exports.mergeExomeGenomeAndJointPopulationData)({
            datasetId,
            exomePopulations: exomeOrNone.populations,
            genomePopulations: genomeOrNone.populations,
        });
        return Object.assign(Object.assign({}, variant), { ac: combinedAC, an: combinedAN, af: combinedAF, allele_freq: combinedAF, ac_hemi: combinedHemizygoteCount, ac_hom: combinedHomozygoteCount, filters: combinedFilters, populations: combinedPopulations });
    });
    return mergedVariants;
};
exports.mergeExomeAndGenomeData = mergeExomeAndGenomeData;
exports.default = exports.mergeExomeAndGenomeData;
//# sourceMappingURL=mergeExomeAndGenomeData.js.map