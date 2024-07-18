import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type ConnectedVariantsInGeneProps = {
    datasetId: DatasetId;
    gene: {
        gene_id: string;
        pext?: {
            regions: {
                start: number;
                stop: number;
                mean: number;
                tissues: {
                    [key: string]: number;
                };
            }[];
        };
    };
};
declare const ConnectedVariantsInGene: ({ datasetId, gene, ...otherProps }: ConnectedVariantsInGeneProps) => React.JSX.Element;
export default ConnectedVariantsInGene;
