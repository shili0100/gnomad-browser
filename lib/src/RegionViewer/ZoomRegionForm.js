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
const ZoomRegionOverview_1 = __importDefault(require("./ZoomRegionOverview"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1em;

  input {
    margin-top: 0.25em;
  }
`;
const RegionControlsWrapper = (0, styled_components_1.default)(Wrapper) `
  justify-content: space-around;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }

  label,
  input {
    max-width: 130px;
  }
`;
const ZoomRegionForm = (0, react_1.forwardRef)(({ defaultZoomRegion, regionViewerRegions, renderOverview, onSubmit }, ref) => {
    const overviewRef = (0, react_1.useRef)(null);
    const [zoomRegion, _setZoomRegion] = (0, react_1.useState)(defaultZoomRegion || {
        start: regionViewerRegions[0].start,
        stop: regionViewerRegions[regionViewerRegions.length - 1].stop,
    });
    const setZoomRegion = (0, react_1.useCallback)((newZoomRegion) => {
        _setZoomRegion(newZoomRegion);
        if (overviewRef.current) {
            ;
            overviewRef.current.setZoomRegion(newZoomRegion);
        }
    }, []);
    const size = zoomRegion.stop - zoomRegion.start + 1;
    let startPositionValidationError = null;
    let stopPositionValidationError = null;
    if (zoomRegion.start > zoomRegion.stop) {
        stopPositionValidationError = 'Stop position must be greater than or equal to start position.';
    }
    if (zoomRegion.start < regionViewerRegions[0].start) {
        startPositionValidationError = `Start position must be greater than or equal to ${regionViewerRegions[0].start.toLocaleString()}.`;
    }
    else if (zoomRegion.start > regionViewerRegions[regionViewerRegions.length - 1].stop) {
        startPositionValidationError = `Start position must be less than or equal to ${regionViewerRegions[regionViewerRegions.length - 1].stop.toLocaleString()}.`;
    }
    if (zoomRegion.stop < regionViewerRegions[0].start) {
        stopPositionValidationError = `Stop position must be greater than or equal to ${regionViewerRegions[0].start.toLocaleString()}.`;
    }
    else if (zoomRegion.stop > regionViewerRegions[regionViewerRegions.length - 1].stop) {
        stopPositionValidationError = `Stop position must be less than or equal to ${regionViewerRegions[regionViewerRegions.length - 1].stop.toLocaleString()}.`;
    }
    const isStartPositionValid = startPositionValidationError === null;
    const isStopPositionValid = stopPositionValidationError === null;
    const isValid = isStartPositionValid && isStopPositionValid;
    const submit = (0, react_1.useCallback)(() => {
        if (isValid) {
            onSubmit(zoomRegion.start > regionViewerRegions[0].start ||
                zoomRegion.stop < regionViewerRegions[regionViewerRegions.length - 1].stop
                ? zoomRegion
                : null);
        }
    }, [isValid, regionViewerRegions, zoomRegion, onSubmit]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        submit: () => {
            submit();
        },
    }));
    return (react_1.default.createElement("form", { ref: ref, onSubmit: (e) => {
            e.preventDefault();
            submit();
        } },
        react_1.default.createElement(RegionControlsWrapper, null,
            react_1.default.createElement("label", { htmlFor: "zoom-region-start" },
                "Start",
                react_1.default.createElement(ui_1.Input, { id: "zoom-region-start", type: "number", "aria-invalid": !isStartPositionValid, "aria-describedby": isStartPositionValid ? undefined : '#zoom-region-start-validation-error', min: regionViewerRegions[0].start, max: regionViewerRegions[regionViewerRegions.length - 1].stop, pattern: "[0-9]*", required: true, value: zoomRegion.start, onChange: (e) => {
                        const newStart = Number(e.target.value);
                        setZoomRegion((prevZoomRegion) => (Object.assign(Object.assign({}, prevZoomRegion), { start: newStart })));
                    } })),
            react_1.default.createElement("label", { htmlFor: "zoom-region-stop" },
                "Stop",
                react_1.default.createElement(ui_1.Input, { id: "zoom-region-stop", type: "number", "aria-invalid": !isStopPositionValid, "aria-describedby": isStopPositionValid ? undefined : '#zoom-region-stop-validation-error', min: regionViewerRegions[0].start, max: regionViewerRegions[regionViewerRegions.length - 1].stop, pattern: "[0-9]*", required: true, value: zoomRegion.stop, onChange: (e) => {
                        const newStop = Number(e.target.value);
                        setZoomRegion((prevZoomRegion) => (Object.assign(Object.assign({}, prevZoomRegion), { stop: newStop })));
                    } }))),
        react_1.default.createElement("p", { style: { textAlign: 'center' } },
            "Total region size: ",
            size.toLocaleString(),
            " bases"),
        !isStartPositionValid && (react_1.default.createElement("p", { id: "zoom-region-start-validation-error", style: { textAlign: 'center' } }, startPositionValidationError)),
        !isStopPositionValid && (react_1.default.createElement("p", { id: "zoom-region-stop-validation-error", style: { textAlign: 'center' } }, stopPositionValidationError)),
        react_1.default.createElement("div", { style: { textAlign: 'center' } },
            react_1.default.createElement(ui_1.Button, { onClick: () => {
                    setZoomRegion({
                        start: regionViewerRegions[0].start,
                        stop: regionViewerRegions[regionViewerRegions.length - 1].stop,
                    });
                } }, "Reset to full region")),
        react_1.default.createElement("input", { type: "submit", disabled: !isValid, style: { display: 'none' }, value: "Submit" }),
        react_1.default.createElement("div", { style: { marginTop: '1em' } },
            react_1.default.createElement(ZoomRegionOverview_1.default, { ref: overviewRef, readOnly: false, regions: regionViewerRegions, renderOverview: renderOverview, zoomRegion: zoomRegion, onChangeZoomRegion: setZoomRegion }))));
});
ZoomRegionForm.defaultProps = {
    // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type '{ start: nu... Remove this comment to see the full error message
    defaultZoomRegion: null,
};
exports.default = ZoomRegionForm;
//# sourceMappingURL=ZoomRegionForm.js.map