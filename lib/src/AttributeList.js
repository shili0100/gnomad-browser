"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeListItem = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
const AttributeList = styled_components_1.default.dl `
  margin: 0;

  dt,
  dd {
    display: inline-block;
    line-height: 1.75;
  }

  dt {
    font-weight: bold;
    vertical-align: top;
  }

  dd {
    margin-left: 0.5ch;
  }

  @media (max-width: 600px) {
    dt,
    dd {
      display: block;
    }

    dd {
      margin-left: 2ch;
    }
  }
`;
const AttributeListItem = ({ children, label, tooltip }) => (react_1.default.createElement("div", null,
    react_1.default.createElement("dt", null, tooltip ? (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; tooltip: any; }' is not... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.TooltipAnchor, { tooltip: tooltip },
        react_1.default.createElement(ui_1.TooltipHint, null, label))) : (label)),
    react_1.default.createElement("dd", null, children)));
exports.AttributeListItem = AttributeListItem;
exports.default = AttributeList;
//# sourceMappingURL=AttributeList.js.map