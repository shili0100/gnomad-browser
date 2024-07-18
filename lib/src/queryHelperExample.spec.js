"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// There is a certain amount of boilerplate involved in using the query
// test helpers, so this file exists as an annotated working example.
//
// Start like you would any test:
const react_1 = __importDefault(require("react"));
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
// These next imports must appear in this order
const globals_1 = require("@jest/globals");
const queries_1 = require("../../tests/__helpers__/queries");
const Query_1 = __importStar(require("./Query"));
// You'd think that you can wrap this in a helper function in queries.tsx,
// but it won't work if you do.
globals_1.jest.mock('./Query', () => {
    const originalModule = globals_1.jest.requireActual('./Query');
    return Object.assign(Object.assign({ __esModule: true }, originalModule), { default: globals_1.jest.fn(), BaseQuery: globals_1.jest.fn() });
});
// This is the API that your tests will use to interact with the mock queries
const { resetMockApiCalls, resetMockApiResponses, simulateApiResponse, setMockApiResponses } = (0, queries_1.mockQueries)();
// You can do this on a test-by-test basis too, rather than beforeEach.
beforeEach(() => {
    Query_1.default.mockImplementation(globals_1.jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('Query', query, children, operationName, variables)));
    Query_1.BaseQuery.mockImplementation(globals_1.jest.fn(({ query, children, operationName, variables }) => simulateApiResponse('BaseQuery', query, children, operationName, variables)));
});
// Mock query calls are not cleaned up automatically
afterEach(() => {
    resetMockApiCalls();
    resetMockApiResponses();
});
// Now for the example code proper.
const ExampleInnerComponent = ({ content }) => (react_1.default.createElement(react_1.default.Fragment, null,
    "My content is as follows:",
    react_1.default.createElement("pre", null, JSON.stringify(content))));
// The following is a simplified version, with no loading state or error
// handling, of the Query/BaseQuery boilerplate that's copy/pasted throughout
// the code.
const ExampleQuery = () => (react_1.default.createElement(Query_1.BaseQuery, { query: "fakeQuery", operationName: "exampleOperation", variables: {} }, ({ data }) => {
    return react_1.default.createElement(ExampleInnerComponent, { content: data.content });
}));
const ExampleOuterComponent = () => (react_1.default.createElement("div", null,
    "The fake query results go here: ",
    react_1.default.createElement(ExampleQuery, null)));
describe('query helpers', () => {
    test('get out the data you put in', () => {
        // The argument to setMockApiResponses is keyed by operation name
        setMockApiResponses({
            exampleOperation: () => ({
                content: ['a', { one: 'two' }, 999],
            }),
        });
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(ExampleOuterComponent, null));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=queryHelperExample.spec.js.map