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
const identifiers_1 = require("@gnomad/identifiers");
const ui_1 = require("@gnomad/ui");
const metadata_1 = require("../../dataset-metadata/metadata");
const InputGroup = styled_components_1.default.div `
  margin-bottom: 1em;
`;
const FormValidationMessage = styled_components_1.default.span `
  display: inline-block;
  margin-top: 0.5em;
  color: #ff583f;
`;
const SubmitButton = (0, styled_components_1.default)(ui_1.PrimaryButton).attrs({ type: 'submit' }) ``;
// @ts-expect-error TS(7022) FIXME: 'VariantCoocurrenceVariantIdsForm' implicitly has ... Remove this comment to see the full error message
const VariantCoocurrenceVariantIdsForm = ({ datasetId, defaultValues, onSubmit }) => {
    const [variant1Id, setVariant1Id] = (0, react_1.useState)(defaultValues[0] || '');
    const [variant2Id, setVariant2Id] = (0, react_1.useState)(defaultValues[1] || '');
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setSubmitted(false);
    }, [variant1Id, variant2Id]);
    let variant1ValidationError = null;
    if (variant1Id) {
        if (!(0, identifiers_1.isVariantId)(variant1Id)) {
            variant1ValidationError =
                'Variants must be specified as chromosome-position-reference-alternate';
        }
        else if (variant2Id && variant1Id === variant2Id) {
            variant1ValidationError = 'Two different variants must be provided';
        }
    }
    const isVariant1Invalid = Boolean(variant1ValidationError);
    let variant2ValidationError = null;
    if (variant2Id) {
        if (!(0, identifiers_1.isVariantId)(variant2Id)) {
            variant2ValidationError =
                'Variants must be specified as chromosome-position-reference-alternate';
        }
        else if (variant1Id && variant2Id === variant1Id) {
            variant2ValidationError = 'Two different variants must be provided';
        }
    }
    const isVariant2Invalid = Boolean(variant2ValidationError);
    return (react_1.default.createElement("form", { onSubmit: (e) => {
            e.preventDefault();
            setSubmitted(true);
            onSubmit([variant1Id, variant2Id]);
        } },
        react_1.default.createElement(InputGroup, null,
            react_1.default.createElement("label", { htmlFor: "cooccurrence-variant1", style: { display: 'block' } },
                "Variant 1 (required)",
                react_1.default.createElement(ui_1.Input, { "aria-describedby": isVariant1Invalid ? 'cooccurrence-variant1-error' : undefined, id: "cooccurrence-variant1", placeholder: `chromosome-position-reference-alternate (${(0, metadata_1.referenceGenome)(datasetId)})`, required: true, value: variant1Id, onChange: (e) => {
                        setVariant1Id(e.target.value);
                    } })),
            isVariant1Invalid && (react_1.default.createElement(FormValidationMessage, { id: "cooccurrence-variant1-error" }, variant1ValidationError))),
        react_1.default.createElement(InputGroup, null,
            react_1.default.createElement("label", { htmlFor: "cooccurrence-variant2", style: { display: 'block' } },
                "Variant 2 (required)",
                react_1.default.createElement(ui_1.Input, { "aria-describedby": isVariant2Invalid ? 'cooccurrence-variant2-error' : undefined, id: "cooccurrence-variant2", placeholder: `chromosome-position-reference-alternate (${(0, metadata_1.referenceGenome)(datasetId)})`, required: true, value: variant2Id, onChange: (e) => {
                        setVariant2Id(e.target.value);
                    } })),
            isVariant2Invalid && (react_1.default.createElement(FormValidationMessage, { id: "cooccurrence-variant2-error" }, variant2ValidationError))),
        react_1.default.createElement(SubmitButton, { disabled: !variant1Id || !variant2Id || isVariant1Invalid || isVariant2Invalid || submitted }, "Submit")));
};
VariantCoocurrenceVariantIdsForm.defaultProps = {
    defaultValues: [],
};
exports.default = VariantCoocurrenceVariantIdsForm;
//# sourceMappingURL=VariantCooccurrenceVariantIdsForm.js.map