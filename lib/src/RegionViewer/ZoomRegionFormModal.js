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
const ui_1 = require("@gnomad/ui");
const ZoomRegionForm_1 = __importDefault(require("./ZoomRegionForm"));
// @ts-expect-error TS(7022) FIXME: 'ZoomRegionFormModal' implicitly has type 'any' be... Remove this comment to see the full error message
const ZoomRegionFormModal = ({ defaultZoomRegion, regionViewerRegions, renderOverview, onRequestClose, onSubmitForm, }) => {
    const formRef = (0, react_1.useRef)(null);
    return (
    // @ts-expect-error TS(2741) FIXME: Property 'size' is missing in type '{ children: El... Remove this comment to see the full error message
    react_1.default.createElement(ui_1.Modal, { id: "region-viewer-select-zoom-region-modal", title: "Select regions to zoom in on", footer: react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(ui_1.Button, { onClick: () => {
                    onRequestClose();
                } }, "Cancel"),
            react_1.default.createElement(ui_1.PrimaryButton, { onClick: () => {
                    if (formRef.current) {
                        ;
                        formRef.current.submit();
                    }
                }, style: { marginLeft: '1em' } }, "Ok")), onRequestClose: onRequestClose },
        react_1.default.createElement("p", null, "All tracks (coverage, transcripts, ClinVar and gnomAD variants, etc.) and the variants table will show data only from the selected region."),
        react_1.default.createElement(ZoomRegionForm_1.default, { ref: formRef, defaultZoomRegion: defaultZoomRegion, regionViewerRegions: regionViewerRegions, renderOverview: renderOverview, onSubmit: (value) => {
                onRequestClose();
                onSubmitForm(value);
            } })));
};
ZoomRegionFormModal.defaultProps = {
    defaultZoomRegion: null,
};
exports.default = ZoomRegionFormModal;
//# sourceMappingURL=ZoomRegionFormModal.js.map