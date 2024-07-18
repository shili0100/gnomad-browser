"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotateVariantsWithClinvar = (variants, clinvarVariants) => {
    const clinvarInfo = new Map();
    clinvarVariants.forEach((clinvarVariant) => {
        clinvarInfo.set(clinvarVariant.variant_id, {
            clinical_significance: clinvarVariant.clinical_significance,
            clinvar_variation_id: clinvarVariant.clinvar_variation_id,
        });
    });
    return variants.map((variant) => (Object.assign(Object.assign({}, variant), clinvarInfo.get(variant.variant_id))));
};
exports.default = annotateVariantsWithClinvar;
//# sourceMappingURL=annotateVariantsWithClinvar.js.map