import { Factory } from 'fishery';
import { VariantTableVariant } from '../VariantList/ExportVariantsButton';
import { Variant, SequencingType, Histogram, Population } from '../VariantPage/VariantPage';
type AncestryGroupShorthand = {
    id: string;
    value: number;
};
export declare const createAncestryGroupObjects: (shorthands: AncestryGroupShorthand[], includeJointFields: boolean) => Population[];
export declare const defaultHistogram: Histogram;
export declare const variantFactory: Factory<Variant, any, Variant>;
export declare const populationFactory: Factory<Population, any, Population>;
export declare const variantTableVariantFactory: Factory<VariantTableVariant, any, VariantTableVariant>;
export declare const sequencingFactory: Factory<SequencingType, any, SequencingType>;
export declare const v2SequencingFactory: Factory<SequencingType, any, SequencingType>;
export declare const v3SequencingFactory: Factory<SequencingType, any, SequencingType>;
export declare const v2VariantFactory: Factory<Variant, any, Variant>;
export declare const v3VariantFactory: Factory<Variant, any, Variant>;
export {};
