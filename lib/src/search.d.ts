import { DatasetId } from '../dataset-metadata/metadata';
export declare const fetchSearchResults: (datasetId: DatasetId, query: string) => Promise<{
    label: string;
    value: string;
}[]>;
export declare const fetchVariantSearchResults: (datasetId: any, query: any) => Promise<any>;
