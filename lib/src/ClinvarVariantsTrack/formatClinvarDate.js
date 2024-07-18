"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateFormatter = new Intl.DateTimeFormat([], { dateStyle: 'long' });
// Dates in ClinVar date are formatted YYYY-MM-DD
const formatClinvarDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return dateFormatter.format(date);
};
exports.default = formatClinvarDate;
//# sourceMappingURL=formatClinvarDate.js.map