export declare const CLINICAL_SIGNIFICANCE_CATEGORIES: string[];
declare const CLINICAL_SIGNIFICANCE_GROUPS: {
    readonly pathogenic: Set<string>;
    readonly uncertain: Set<string>;
    readonly benign: Set<string>;
    readonly other: Set<string>;
};
export type ClinicalSignificance = keyof typeof CLINICAL_SIGNIFICANCE_GROUPS;
export declare const clinvarVariantClinicalSignificanceCategory: (variant: any) => "other" | "pathogenic" | "uncertain" | "benign";
export declare const CLINICAL_SIGNIFICANCE_CATEGORY_LABELS: {
    pathogenic: string;
    uncertain: string;
    benign: string;
    other: string;
};
export declare const CLINICAL_SIGNIFICANCE_CATEGORY_COLORS: {
    pathogenic: string;
    uncertain: string;
    benign: string;
    other: string;
};
export declare const CONSEQUENCE_CATEGORIES: string[];
export declare const CONSEQUENCE_CATEGORY_LABELS: {
    frameshift: string;
    other_lof: string;
    missense: string;
    splice_region: string;
    synonymous: string;
    other: string;
};
export declare const clinvarVariantConsequenceCategory: (variant: any) => "other" | "frameshift" | "missense" | "synonymous" | "other_lof" | "splice_region";
export {};
