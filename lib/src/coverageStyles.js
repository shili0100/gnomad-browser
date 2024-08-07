"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverageConfigNew = exports.coverageConfigClassic = void 0;
const coverageConfigClassic = (exomeCoverage, genomeCoverage) => {
    const coverage = [];
    if (exomeCoverage) {
        coverage.push({
            color: 'rgb(70, 130, 180)',
            buckets: exomeCoverage,
            name: 'exome',
        });
    }
    if (genomeCoverage) {
        coverage.push({
            color: 'rgb(115, 171, 61)',
            buckets: genomeCoverage,
            name: 'genome',
        });
    }
    return coverage;
};
exports.coverageConfigClassic = coverageConfigClassic;
const coverageConfigNew = (exomeCoverage, genomeCoverage) => {
    const coverage = [];
    if (exomeCoverage) {
        coverage.push({
            color: 'rgb(70, 130, 180)',
            buckets: exomeCoverage,
            name: 'exome',
            opacity: 0.7,
        });
    }
    if (genomeCoverage) {
        coverage.push({
            color: 'rgb(115, 171, 61)',
            buckets: genomeCoverage,
            name: 'genome',
            opacity: 0.5,
        });
    }
    return coverage;
};
exports.coverageConfigNew = coverageConfigNew;
//# sourceMappingURL=coverageStyles.js.map