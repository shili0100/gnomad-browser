export declare const VEP_CONSEQUENCE_CATEGORIES: string[];
export declare const VEP_CONSEQUENCE_CATEGORY_LABELS: {
    lof: string;
    missense: string;
    synonymous: string;
    other: string;
};
export declare const getCategoryFromConsequence: (consequenceTerm: any) => any;
export declare const getLabelForConsequenceTerm: (consequenceTerm: any) => any;
export declare const getConsequenceRank: (consequenceTerm: any) => number;
export declare const registerConsequences: (consequences: any) => void;
