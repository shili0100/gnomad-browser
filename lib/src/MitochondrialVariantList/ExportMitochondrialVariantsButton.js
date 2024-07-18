"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@gnomad/ui");
const VariantFlag_1 = require("../VariantList/VariantFlag");
const vepConsequences_1 = require("../vepConsequences");
const BASE_COLUMNS = [
    {
        label: 'Variant ID',
        getValue: (variant) => variant.variant_id,
    },
    {
        label: 'Filters',
        getValue: (variant) => (variant.filters.length === 0 ? 'PASS' : variant.filters.join(',')),
    },
    {
        label: 'HGVS Consequence',
        getValue: (variant) => variant.hgvsp || variant.hgvsc || '',
    },
    {
        label: 'VEP Annotation',
        getValue: (variant) => variant.consequence ? (0, vepConsequences_1.getLabelForConsequenceTerm)(variant.consequence) : '',
    },
    {
        label: 'ClinVar Clinical Significance',
        getValue: (variant) => variant.clinical_significance || '',
    },
    {
        label: 'ClinVar Variation ID',
        getValue: (variant) => variant.clinvar_variation_id || '',
    },
    {
        label: 'Flags',
        getValue: (variant) => variant.flags.map((flag) => VariantFlag_1.FLAGS_CONFIG[flag].label).join(';'),
    },
    {
        label: 'Allele Number',
        getValue: (variant) => JSON.stringify(variant.an),
    },
    {
        label: 'Homoplasmic Allele Count',
        getValue: (variant) => JSON.stringify(variant.ac_hom),
    },
    {
        label: 'Homoplasmic Allele Frequency',
        getValue: (variant) => JSON.stringify(variant.af_hom),
    },
    {
        label: 'Heteroplasmic Allele Count',
        getValue: (variant) => JSON.stringify(variant.ac_het),
    },
    {
        label: 'Heteroplasmic Allele Frequency',
        getValue: (variant) => JSON.stringify(variant.af_het),
    },
    {
        label: 'Max observed heteroplasmy',
        getValue: (variant) => JSON.stringify(variant.max_heteroplasmy),
    },
];
const exportVariantsToCsv = (variants, baseFileName, includeGene) => {
    const columns = [...BASE_COLUMNS];
    if (includeGene) {
        columns.splice(2, 0, {
            label: 'Gene',
            getValue: (variant) => variant.gene_symbol || '',
        });
    }
    const headerRow = columns.map((c) => c.label);
    const csv = `${headerRow}\r\n${variants
        .map((variant) => columns
        .map((c) => c.getValue(variant))
        .map((val) => val.includes(',') || val.includes('"') || val.includes("'")
        ? `"${val.replace('"', '""')}"`
        : val)
        .join(','))
        .join('\r\n')}\r\n`;
    const date = new Date();
    const timestamp = `${date.getFullYear()}_${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}_${date.getDate().toString().padStart(2, '0')}_${date
        .getHours()
        .toString()
        .padStart(2, '0')}_${date.getMinutes().toString().padStart(2, '0')}_${date
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${baseFileName.replace(/\s+/g, '_')}_${timestamp}.csv`);
    // @ts-expect-error TS(2551) FIXME: Property 'onClick' does not exist on type 'HTMLAnc... Remove this comment to see the full error message
    link.onClick = () => {
        URL.revokeObjectURL(url);
        link.remove();
    };
    document.body.appendChild(link);
    link.click();
};
// @ts-expect-error TS(7022) FIXME: 'ExportMitochondrialVariantsButton' implicitly has... Remove this comment to see the full error message
const ExportMitochondrialVariantsButton = (_a) => {
    var { exportFileName, includeGene, variants } = _a, rest = __rest(_a, ["exportFileName", "includeGene", "variants"]);
    return (react_1.default.createElement(ui_1.Button, Object.assign({}, rest, { onClick: () => {
            exportVariantsToCsv(variants, exportFileName, includeGene);
        } }), "Export variants to CSV"));
};
ExportMitochondrialVariantsButton.defaultProps = {
    includeGene: false,
};
exports.default = ExportMitochondrialVariantsButton;
//# sourceMappingURL=ExportMitochondrialVariantsButton.js.map