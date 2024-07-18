"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackPageSection = exports.TrackPage = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
exports.TrackPage = (0, styled_components_1.default)(ui_1.Page) `
  max-width: none;
`;
// Padding neeeds to be kept in sync with region viewer side panel sizes.
// Right panel is currently hidden on gene/region pages when screen width <= 900px.
exports.TrackPageSection = styled_components_1.default.div `
  padding: 0 80px 0 115px;

  @media (max-width: 900px) {
    padding: 0;
  }
`;
//# sourceMappingURL=TrackPage.js.map