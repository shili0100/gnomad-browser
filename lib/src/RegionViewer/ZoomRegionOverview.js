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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_es_1 = require("lodash-es");
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importStar(require("react"));
const react_slider_1 = __importDefault(require("react-slider"));
const styled_components_1 = __importDefault(require("styled-components"));
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
const grip_lines_vertical_svg_1 = __importDefault(require("@fortawesome/fontawesome-free/svgs/solid/grip-lines-vertical.svg"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const AutosizedRegionViewer_1 = __importDefault(require("./AutosizedRegionViewer"));
const draggable = (C) => {
    class DraggableComponent extends react_1.Component {
        constructor(props) {
            super(props);
            this.onMouseDown = (e) => {
                this.dragStart = e.clientX;
                document.addEventListener('mouseup', this.onMouseUp);
                document.addEventListener('mousemove', this.onMouseMove);
            };
            this.onMouseUp = () => {
                this.dragStart = null;
                document.removeEventListener('mouseup', this.onMouseUp);
                document.removeEventListener('mousemove', this.onMouseMove);
            };
            this.onMouseMove = (0, lodash_es_1.throttle)((e) => {
                // @ts-expect-error TS(2339) FIXME: Property 'onDrag' does not exist on type 'Readonly... Remove this comment to see the full error message
                const { onDrag } = this.props;
                if (this.dragStart !== null) {
                    onDrag(e.clientX - this.dragStart);
                    this.dragStart = e.clientX;
                }
            }, 16);
            this.dragStart = null;
        }
        render() {
            // @ts-expect-error TS(2339) FIXME: Property 'onDrag' does not exist on type 'Readonly... Remove this comment to see the full error message
            const _a = this.props, { onDrag: _onDrag } = _a, otherProps = __rest(_a, ["onDrag"]);
            return (react_1.default.createElement(C, Object.assign({}, otherProps, { onMouseDown: this.onMouseDown, style: Object.assign(Object.assign({}, otherProps.style), { cursor: 'grab' }) })));
        }
    }
    DraggableComponent.displayName = `Draggable(${C.displayName || C.name || 'Component'})`;
    DraggableComponent.propTypes = {
        onDrag: prop_types_1.default.func.isRequired,
    };
    return DraggableComponent;
};
const OverviewWrapper = styled_components_1.default.div `
  position: relative;
  box-sizing: border-box;
  padding: 1em 0;
`;
const ZoomRegionOverlay = styled_components_1.default.div `
  position: absolute;
  top: 0;
  box-sizing: border-box;
  height: 100%;
  border: 1px solid #333;
  background: rgba(0, 0, 0, 0.1);
`;
const DraggableZoomRegionOverlay = draggable(ZoomRegionOverlay);
const StyledSlider = (0, styled_components_1.default)(react_slider_1.default) `
  width: 100%;
  height: 25px;
  margin-top: 3px;
`;
const SliderThumb = styled_components_1.default.div `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #6c757d;
  border-radius: 3px;
  background: #f8f9fa;
  cursor: grab;
  line-height: 24px;
  text-align: center;
`;
const SliderTrack = styled_components_1.default.div `
  top: 9px;
  height: 4px;
  border: 1px solid #333;
  border-radius: 4px;
  background: ${(props) => (props.index === 1 ? '#428bca' : '#f8f9fa')};
`;
const ZoomRegionOverview = (0, react_1.forwardRef)(({ readOnly, regions, renderOverview, zoomRegion: initialZoomRegion, onChangeZoomRegion: onChangeZoomRegionCallback, onChangeZoomRegionDebounceDelay, }, ref) => {
    const [zoomRegion, setZoomRegion] = (0, react_1.useState)(initialZoomRegion);
    (0, react_1.useImperativeHandle)(ref, () => ({
        setZoomRegion,
    }), []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnChangeZoomRegionCallback = (0, react_1.useCallback)((0, lodash_es_1.debounce)(onChangeZoomRegionCallback, onChangeZoomRegionDebounceDelay), [onChangeZoomRegionDebounceDelay]);
    const onChangeZoomRegion = (0, react_1.useCallback)((newZoomRegion) => {
        setZoomRegion(newZoomRegion);
        debouncedOnChangeZoomRegionCallback(newZoomRegion);
    }, [debouncedOnChangeZoomRegionCallback]);
    return (react_1.default.createElement(AutosizedRegionViewer_1.default, { regions: regions, leftPanelWidth: 0, rightPanelWidth: 0 },
        react_1.default.createElement(region_viewer_1.Track, null, (_a) => {
            var { scalePosition, width } = _a, otherArgs = __rest(_a, ["scalePosition", "width"]);
            const zoomRegionStartX = scalePosition(zoomRegion.start);
            const zoomRegionStopX = scalePosition(zoomRegion.stop);
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(OverviewWrapper, null,
                    renderOverview(Object.assign({ scalePosition, width }, otherArgs)),
                    readOnly ? (react_1.default.createElement(ZoomRegionOverlay, { style: {
                            left: `${zoomRegionStartX}px`,
                            width: `${zoomRegionStopX - zoomRegionStartX}px`,
                        } })) : (react_1.default.createElement(DraggableZoomRegionOverlay, { onDrag: (offset) => {
                            onChangeZoomRegion({
                                start: Math.max(regions[0].start, scalePosition.invert(zoomRegionStartX + offset)),
                                stop: Math.min(regions[regions.length - 1].stop, scalePosition.invert(zoomRegionStopX + offset)),
                            });
                        }, style: {
                            left: `${zoomRegionStartX}px`,
                            width: `${zoomRegionStopX - zoomRegionStartX}px`,
                        } }))),
                !readOnly && (react_1.default.createElement(StyledSlider, { ariaLabel: ['Start position of zoom window', 'Stop position of zoom window'], ariaValuetext: (state) => state.value
                        .map((n) => scalePosition.invert(n).toLocaleString())
                        .join(' to '), min: 0, max: width, value: [zoomRegionStartX, zoomRegionStopX], minDistance: 1, renderThumb: (props) => (react_1.default.createElement(SliderThumb, Object.assign({}, props),
                        react_1.default.createElement("img", { src: grip_lines_vertical_svg_1.default, alt: "", "aria-hidden": "true", width: 16, height: 16 }))), renderTrack: (props, state) => (react_1.default.createElement(SliderTrack, Object.assign({}, props, { index: state.index }))), onChange: (value) => {
                        onChangeZoomRegion({
                            start: scalePosition.invert(value[0]),
                            stop: scalePosition.invert(value[1]),
                        });
                    } }))));
        })));
});
ZoomRegionOverview.defaultProps = {
    readOnly: true,
    onChangeZoomRegion: () => { },
    onChangeZoomRegionDebounceDelay: 0,
};
exports.default = ZoomRegionOverview;
//# sourceMappingURL=ZoomRegionOverview.js.map