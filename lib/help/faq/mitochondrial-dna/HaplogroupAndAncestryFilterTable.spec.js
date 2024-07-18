"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
require("jest-styled-components");
const how_many_samples_are_in_each_mtdna_haplogroup_for_each_nuclear_ancestry_population_1 = require("./how-many-samples-are-in-each-mtdna-haplogroup-for-each-nuclear-ancestry-population");
(0, globals_1.test)('has no unexpected changes', () => {
    const tree = react_test_renderer_1.default.create((0, how_many_samples_are_in_each_mtdna_haplogroup_for_each_nuclear_ancestry_population_1.renderAnswer)());
    (0, globals_1.expect)(tree).toMatchSnapshot();
});
//# sourceMappingURL=HaplogroupAndAncestryFilterTable.spec.js.map