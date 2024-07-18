import { DatasetId } from '../../dataset-metadata/metadata';
import { Filter } from '../QCFilter';
import { Population, Variant } from '../VariantPage/VariantPage';
export declare const mergeExomeGenomeAndJointPopulationData: ({ datasetId, exomePopulations, genomePopulations, jointPopulations, }: {
    datasetId?: DatasetId;
    exomePopulations: Population[];
    genomePopulations: Population[];
    jointPopulations?: Population[] | null;
}) => Population[];
type MergedVariant = Variant & {
    ac: number;
    an: number;
    af: number;
    allele_freq: number;
    ac_hemi: number;
    ac_hom: number;
    filters: Filter[];
    populations: Population[];
};
export declare const mergeExomeAndGenomeData: ({ datasetId, variants, }: {
    datasetId?: DatasetId;
    variants: Variant[];
}) => MergedVariant[];
export default mergeExomeAndGenomeData;
