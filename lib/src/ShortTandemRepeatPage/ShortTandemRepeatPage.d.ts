import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type ShortTandemRepeatRepeatUnit = {
    repeat_unit: string;
    distribution: number[][];
    populations: {
        id: string;
        distribution: number[][];
    }[];
};
export type ShortTandemRepeatAdjacentRepeat = {
    id: string;
    reference_region: {
        chrom: string;
        start: number;
        stop: number;
    };
    reference_repeat_unit: string;
    repeat_units: string[];
    allele_size_distribution: {
        distribution: number[][];
        populations: {
            id: string;
            distribution: number[][];
        }[];
        repeat_units: ShortTandemRepeatRepeatUnit[];
    };
    genotype_distribution: {
        distribution: number[][];
        populations: {
            id: string;
            distribution: number[][];
        }[];
        repeat_units: {
            repeat_units: string[];
            distribution: number[][];
            populations: {
                id: string;
                distribution: number[][];
            }[];
        }[];
    };
};
export type ShortTandemRepeat = {
    id: string;
    gene: {
        ensembl_id: string;
        symbol: string;
        region: string;
    };
    associated_diseases: {
        name: string;
        symbol: string;
        omim_id: string | null;
        inheritance_mode: string;
        repeat_size_classifications: {
            classification: string;
            min: number | null;
            max: number | null;
        }[];
        notes: string | null;
    }[];
    stripy_id: string | null;
    reference_region: {
        chrom: string;
        start: number;
        stop: number;
    };
    reference_repeat_unit: string;
    repeat_units: {
        repeat_unit: string;
        classification: string;
    }[];
    allele_size_distribution: {
        distribution: number[][];
        populations: {
            id: string;
            distribution: number[][];
        }[];
        repeat_units: ShortTandemRepeatRepeatUnit[];
    };
    genotype_distribution: {
        distribution: number[][];
        populations: {
            id: string;
            distribution: number[][];
        }[];
        repeat_units: {
            repeat_units: string[];
            distribution: number[][];
            populations: {
                id: string;
                distribution: number[][];
            }[];
        }[];
    };
    adjacent_repeats: ShortTandemRepeatAdjacentRepeat[];
};
type ShortTandemRepeatPageProps = {
    datasetId: DatasetId;
    shortTandemRepeat: ShortTandemRepeat;
};
declare const ShortTandemRepeatPage: ({ datasetId, shortTandemRepeat }: ShortTandemRepeatPageProps) => React.JSX.Element;
export default ShortTandemRepeatPage;
