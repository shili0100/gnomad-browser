"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Link_1 = __importDefault(require("../Link"));
const MNVConsequence_1 = __importDefault(require("./MNVConsequence"));
const List = styled_components_1.default.ul `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-left: 0;
  list-style-type: none;
`;
const ListItem = styled_components_1.default.li `
  margin-bottom: 2em;
`;
const MNVConsequenceList = ({ variant }) => (react_1.default.createElement(List, null, variant.consequences.map((consequence) => (react_1.default.createElement(ListItem, { key: consequence.gene_id },
    react_1.default.createElement(Link_1.default, { to: `/gene/${consequence.gene_id}` }, consequence.gene_name),
    " -",
    react_1.default.createElement(Link_1.default, { to: `/transcript/${consequence.transcript_id}` }, consequence.transcript_id),
    react_1.default.createElement(MNVConsequence_1.default, { consequence: consequence }))))));
exports.default = MNVConsequenceList;
//# sourceMappingURL=MNVConsequenceList.js.map