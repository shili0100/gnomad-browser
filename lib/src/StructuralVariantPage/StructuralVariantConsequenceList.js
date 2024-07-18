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
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const InfoButton_1 = __importDefault(require("../help/InfoButton"));
const Link_1 = __importDefault(require("../Link"));
const structuralVariantConsequences_1 = require("../StructuralVariantList/structuralVariantConsequences");
const Wrapper = styled_components_1.default.ol `
  display: flex;
  flex-flow: row wrap;
  padding: 0;
  list-style-type: none;
  margin-bottom: 1em;

  h3,
  h4 {
    margin: 0 0 0.5em;
  }
`;
const ConsequenceListItem = styled_components_1.default.li `
  flex-basis: 220px;
`;
class StructuralVariantConsequenceList extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            expandedConsequence: null,
        };
    }
    render() {
        const { variant } = this.props;
        const { expandedConsequence } = this.state;
        const consequences = variant.consequences || [];
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Wrapper, null, consequences.map((consequence) => {
                const consequenceCode = consequence.consequence;
                const genes = consequence.genes || [];
                const category = structuralVariantConsequences_1.svConsequenceCategories[consequenceCode];
                // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                const helpTopic = {
                    lof: 'sv-effect_pLoF',
                    dup_lof: 'sv-effect_IED',
                    copy_gain: 'sv-effect_CG',
                }[category];
                return (react_1.default.createElement(ConsequenceListItem, { key: consequenceCode },
                    react_1.default.createElement("h3", null,
                        structuralVariantConsequences_1.svConsequenceLabels[consequenceCode],
                        ' ',
                        !!helpTopic && react_1.default.createElement(InfoButton_1.default, { topic: helpTopic })),
                    react_1.default.createElement(ui_1.OrderedList, null,
                        genes.slice(0, 3).map((gene) => (
                        // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                        react_1.default.createElement(ui_1.ListItem, { key: gene },
                            react_1.default.createElement(Link_1.default, { to: `/gene/${gene}` }, gene)))),
                        genes.length > 3 && (
                        // @ts-expect-error TS(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
                        react_1.default.createElement(ui_1.ListItem, null,
                            react_1.default.createElement(ui_1.TextButton, { onClick: () => {
                                    this.setState({ expandedConsequence: category });
                                } },
                                "and ",
                                genes.length - 3,
                                " more"))))));
            })),
            expandedConsequence && (
            // @ts-expect-error TS(2741) FIXME: Property 'size' is missing in type '{ children: El... Remove this comment to see the full error message
            react_1.default.createElement(ui_1.Modal, { title: `${structuralVariantConsequences_1.svConsequenceLabels[expandedConsequence]}`, onRequestClose: () => {
                    this.setState({ expandedConsequence: null });
                } },
                react_1.default.createElement(ui_1.OrderedList, null, variant.consequences
                    .find(({ consequence }) => consequence === expandedConsequence)
                    .genes.map((gene) => (
                // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                react_1.default.createElement(ui_1.ListItem, { key: gene },
                    react_1.default.createElement(Link_1.default, { to: `/gene/${gene}` }, gene)))))))));
    }
}
exports.default = StructuralVariantConsequenceList;
//# sourceMappingURL=StructuralVariantConsequenceList.js.map