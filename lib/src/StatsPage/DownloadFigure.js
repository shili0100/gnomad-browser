"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadElementAsPNGButton = exports.downloadElementAsPNG = void 0;
const html2canvas_1 = __importDefault(require("html2canvas"));
const react_1 = __importDefault(require("react"));
// @ts-expect-error
const file_download_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/file-download.svg"));
const styled_components_1 = __importDefault(require("styled-components"));
const downloadElementAsPNG = (elementID) => {
    const figure = document.getElementById(elementID);
    if (figure) {
        (0, html2canvas_1.default)(figure).then((canvas) => {
            const link = document.createElement('a');
            link.download = `gnomad_${elementID}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }
};
exports.downloadElementAsPNG = downloadElementAsPNG;
const Button = styled_components_1.default.button.attrs({ type: 'button' }) `
  display: inline-flex;
  align-self: center;
  outline: none;
  padding-left: 7px;
  border: none;
  background: none;
  cursor: pointer;

  img {
    position: relative;
    top: 0.13em;
    width: 14px;
    height: 14px;
    border-radius: 2px;
  }

  &:focus img {
    box-shadow: 0 0 0 0.2em rgba(70, 130, 180, 0.5);
  }
`;
const DownloadElementAsPNGButton = ({ elementId }) => {
    return (react_1.default.createElement("span", null,
        react_1.default.createElement(Button, { onClick: () => (0, exports.downloadElementAsPNG)(elementId) },
            react_1.default.createElement("img", { alt: "Download figure", src: file_download_svg_1.default, height: 15, width: 15 }))));
};
exports.DownloadElementAsPNGButton = DownloadElementAsPNGButton;
//# sourceMappingURL=DownloadFigure.js.map