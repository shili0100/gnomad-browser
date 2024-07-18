"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
require("jest-styled-components");
const ReferenceList_1 = require("./ReferenceList");
(0, globals_1.describe)('ReferenceLists NCBI external link', () => {
    (0, globals_1.test)('is formatted as single hyperlink if the given array only contains 1 rsid', () => (0, globals_1.expect)((0, ReferenceList_1.NcbiReference)(['rs12345'])).toMatchSnapshot());
    (0, globals_1.test)('is formatted as multiple comma seperated hyperlinks if the given array contains more than 1 rsid', () => (0, globals_1.expect)((0, ReferenceList_1.NcbiReference)(['rs12345', 'rs23456', 'rs34567'])).toMatchSnapshot());
});
(0, globals_1.describe)('ReferenceLists ClinVar external link', () => {
    (0, globals_1.test)('is formatted as single hyperlink with the given clinvar id', () => (0, globals_1.expect)((0, ReferenceList_1.ClinvarReference)('12345')).toMatchSnapshot());
});
//# sourceMappingURL=ReferenceList.spec.js.map