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
const copyNumberVariantTypes_1 = require("./copyNumberVariantTypes");
const columns = [
    {
        label: 'Variant ID',
        getValue: (variant) => variant.variant_id,
    },
    {
        label: 'Class',
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        getValue: (variant) => copyNumberVariantTypes_1.cnvTypeLabels[variant.type] || variant.type,
    },
    {
        label: 'Position',
        getValue: (variant) => {
            return `${variant.pos}-${variant.end}`;
        },
    },
    {
        label: 'Size',
        getValue: (variant) => {
            return `${variant.length}`;
        },
    },
    {
        label: 'Site Count',
        getValue: (variant) => JSON.stringify(variant.sc),
    },
    {
        label: 'Site Number',
        getValue: (variant) => JSON.stringify(variant.sn),
    },
    {
        label: 'Site Frequency',
        getValue: (variant) => JSON.stringify(variant.sf),
    },
];
const exportVariantsToCsv = (variants, baseFileName) => {
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
const ExportCopyNumberVariantsButton = (_a) => {
    var { exportFileName, variants } = _a, rest = __rest(_a, ["exportFileName", "variants"]);
    return (react_1.default.createElement(ui_1.Button, Object.assign({}, rest, { onClick: () => {
            exportVariantsToCsv(variants, exportFileName);
        } }), "Export variants to CSV"));
};
exports.default = ExportCopyNumberVariantsButton;
//# sourceMappingURL=ExportCopyNumberVariantsButton.js.map