"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinvarVariantConsequenceCategory = exports.CONSEQUENCE_CATEGORY_LABELS = exports.CONSEQUENCE_CATEGORIES = exports.CLINICAL_SIGNIFICANCE_CATEGORY_COLORS = exports.CLINICAL_SIGNIFICANCE_CATEGORY_LABELS = exports.clinvarVariantClinicalSignificanceCategory = exports.CLINICAL_SIGNIFICANCE_CATEGORIES = void 0;
const vepConsequences_1 = require("../vepConsequences");
exports.CLINICAL_SIGNIFICANCE_CATEGORIES = ['pathogenic', 'uncertain', 'benign', 'other'];
const CLINICAL_SIGNIFICANCE_GROUPS = {
    pathogenic: new Set([
        'Pathogenic',
        'Likely pathogenic',
        'Pathogenic/Likely pathogenic',
        'association',
        'risk factor',
    ]),
    uncertain: new Set([
        'Uncertain significance',
        'Conflicting interpretations of pathogenicity',
        'conflicting data from submitters',
    ]),
    benign: new Set(['Benign', 'Likely benign', 'Benign/Likely benign']),
    other: new Set([
        'other',
        'drug response',
        'Affects',
        'protective',
        'no interpretation for the single variant',
        'not provided',
        'association not found',
    ]),
};
const clinvarVariantClinicalSignificanceCategory = (variant) => {
    const clinicalSignificances = variant.clinical_significance.split(', ');
    if (clinicalSignificances.some((s) => CLINICAL_SIGNIFICANCE_GROUPS.pathogenic.has(s))) {
        return 'pathogenic';
    }
    if (clinicalSignificances.some((s) => CLINICAL_SIGNIFICANCE_GROUPS.uncertain.has(s))) {
        return 'uncertain';
    }
    if (clinicalSignificances.some((s) => CLINICAL_SIGNIFICANCE_GROUPS.benign.has(s))) {
        return 'benign';
    }
    return 'other';
};
exports.clinvarVariantClinicalSignificanceCategory = clinvarVariantClinicalSignificanceCategory;
exports.CLINICAL_SIGNIFICANCE_CATEGORY_LABELS = {
    pathogenic: 'Pathogenic / likely pathogenic',
    uncertain: 'Uncertain significance / conflicting',
    benign: 'Benign / likely benign',
    other: 'Other',
};
exports.CLINICAL_SIGNIFICANCE_CATEGORY_COLORS = {
    pathogenic: '#E6573D',
    uncertain: '#FAB470',
    benign: '#5E6F9E',
    other: '#bababa',
};
exports.CONSEQUENCE_CATEGORIES = [
    'frameshift',
    'other_lof',
    'missense',
    'splice_region',
    'synonymous',
    'other',
];
exports.CONSEQUENCE_CATEGORY_LABELS = {
    frameshift: 'Frameshift',
    other_lof: 'Other pLoF',
    missense: 'Missense',
    splice_region: 'Splice region',
    synonymous: 'Synonymous',
    other: 'Other',
};
const clinvarVariantConsequenceCategory = (variant) => {
    const consequence = variant.major_consequence;
    const consequenceCategory = (0, vepConsequences_1.getCategoryFromConsequence)(consequence);
    if (consequence === 'frameshift_variant') {
        return 'frameshift';
    }
    if (consequenceCategory === 'lof') {
        return 'other_lof';
    }
    if (consequenceCategory === 'missense') {
        return 'missense';
    }
    if (consequence === 'splice_region_variant') {
        return 'splice_region';
    }
    if (consequence === 'synonymous_variant') {
        return 'synonymous';
    }
    return 'other';
};
exports.clinvarVariantConsequenceCategory = clinvarVariantConsequenceCategory;
//# sourceMappingURL=clinvarVariantCategories.js.map