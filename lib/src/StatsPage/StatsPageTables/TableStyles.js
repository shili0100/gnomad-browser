"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsTableCaption = exports.StatsTableBody = exports.StatsTableFooter = exports.StatsTableSubHeaderRow = exports.StatsTableHeaderRow = exports.StatsTable = exports.renderNumberOrDash = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const renderNumberOrDash = (number) => {
    return number ? number.toLocaleString() : '-';
};
exports.renderNumberOrDash = renderNumberOrDash;
exports.StatsTable = styled_components_1.default.table `
  border-collapse: collapse;
  min-width: 400px;
  font-size: 0.9em;

  /* non-zero letter spacing fixes html2canvas rendering errors */
  letter-spacing: 0.01px;

  th,
  td {
    padding: 12px 15px;
    text-align: center;
  }
`;
exports.StatsTableHeaderRow = styled_components_1.default.tr `
  background-color: #0e6fbf;
  color: #fafafa;

  th {
    font-weight: bold;
  }
`;
exports.StatsTableSubHeaderRow = styled_components_1.default.tr `
  /* background-color: #95d3ea; */
  background-color: #41a2f1;
  color: #fafafa;

  th {
    font-weight: normal;
  }

  th.rb {
    border-right: 1px solid #0e6fbf;
  }
`;
exports.StatsTableFooter = styled_components_1.default.tfoot `
  tr {
    background-color: #508a14;
    color: #fafafa;
  }

  td {
    font-weight: bold;
  }
`;
exports.StatsTableBody = styled_components_1.default.tbody `
  tr {
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  td.rb {
    border-right: 1px solid #bbb;
  }
`;
exports.StatsTableCaption = styled_components_1.default.caption `
  caption-side: bottom;
  text-align: left;
`;
//# sourceMappingURL=TableStyles.js.map