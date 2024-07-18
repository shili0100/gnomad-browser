"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCooccurrenceProbability = void 0;
const renderCooccurrenceProbability = (probability) => {
    if (probability === null) {
        return '–';
    }
    if (probability === 0) {
        return '0%';
    }
    if (probability < 0.01) {
        return '<1%';
    }
    return `${Math.round(probability * 100)}%`;
};
exports.renderCooccurrenceProbability = renderCooccurrenceProbability;
//# sourceMappingURL=cooccurrenceProbability.js.map