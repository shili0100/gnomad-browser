"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const polished_1 = require("polished");
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const Icon = styled_components_1.default.span `
  padding: 1px 4px;
  border: 1px ${(props) => (props.isFiltered ? 'dashed' : 'solid')} #000;
  border-radius: 3px;
  margin-left: 10px;
  background-color: ${(props) => 
// @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 3.
props.isFiltered ? (0, polished_1.transparentize)(0.5, props.color, props.color) : props.color};
  color: white;
`;
const abbreviations = {
    exome: 'E',
    genome: 'G',
};
const colors = {
    exome: 'rgb(70, 130, 180)',
    genome: 'rgb(115, 171, 61)',
};
const SampleSourceIcon = ({ source, filters }) => {
    const isFiltered = filters.length > 0;
    let tooltip = `This variant is found in ${source} samples`;
    if (isFiltered) {
        tooltip += `, where it failed the following filters: ${filters.join(', ')}`;
    }
    return (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: string; }' is ... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltip },
        react_1.default.createElement(Icon, { color: colors[source], isFiltered: isFiltered }, abbreviations[source])));
};
exports.default = SampleSourceIcon;
//# sourceMappingURL=SampleSourceIcon.js.map