"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readsApiOutputFactory = exports.exomeReadApiOutputFactory = void 0;
const fishery_1 = require("fishery"); // eslint-disable-line import/no-extraneous-dependencies
exports.exomeReadApiOutputFactory = fishery_1.Factory.define(({ sequence }) => ({
    category: 'hom',
    bamPath: `dummy_bampath_${sequence}`,
    indexPath: `dummy_indexpath_${sequence}`,
    readGroup: `dummy_readgroup_${sequence}`,
}));
exports.readsApiOutputFactory = fishery_1.Factory.define(({ sequence }) => ({
    variant_0: {
        variantId: `123-${45 + sequence}-A-C`,
        exome: [],
        genome: [],
    },
}));
//# sourceMappingURL=ReadData.js.map