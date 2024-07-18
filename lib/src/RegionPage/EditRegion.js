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
const query_string_1 = __importDefault(require("query-string"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const ui_1 = require("@gnomad/ui");
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
const HUMAN_CHROMOSOMES = [...Array.from(new Array(22), (x, i) => `${i + 1}`), 'X', 'Y'];
class EditRegionModal extends react_1.Component {
    constructor(props) {
        super(props);
        const { initialRegion } = props;
        this.state = {
            chrom: initialRegion.chrom,
            start: initialRegion.start,
            stop: initialRegion.stop,
        };
    }
    render() {
        const { initialRegion, onRequestClose, onSubmit } = this.props;
        const { chrom: initialChrom, start: initialStart, stop: initialStop } = initialRegion;
        const { chrom, start, stop } = this.state;
        const size = stop - start + 1;
        const isChromosomeValid = HUMAN_CHROMOSOMES.includes(chrom);
        const isPositionValid = stop >= start && start > 0;
        const isValid = isPositionValid;
        return (
        // @ts-expect-error TS(2741) FIXME: Property 'size' is missing in type '{ children: El... Remove this comment to see the full error message
        react_1.default.createElement(ui_1.Modal, { id: "edit-region", title: "Edit Region", footer: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Button, { onClick: onRequestClose }, "Cancel"),
                react_1.default.createElement(ui_1.PrimaryButton, { disabled: !isValid, onClick: () => {
                        onSubmit({ chrom, start, stop });
                    }, style: { marginLeft: '1em' } }, "Ok")), onRequestClose: onRequestClose },
            react_1.default.createElement("form", { onSubmit: (e) => {
                    e.preventDefault();
                    onSubmit({ chrom, start, stop });
                } },
                react_1.default.createElement(RegionControlsWrapper, null,
                    react_1.default.createElement("label", { htmlFor: "edit-region-chrom" },
                        "Chromosome",
                        react_1.default.createElement(ui_1.Input, { id: "edit-region-chrom", type: "text", "aria-invalid": !isChromosomeValid, "aria-describedby": isChromosomeValid ? undefined : '#edit-region-chrom-validation-error', required: true, value: chrom, onChange: (e) => {
                                this.setState({ chrom: e.target.value.toUpperCase() });
                            } })),
                    react_1.default.createElement("label", { htmlFor: "edit-region-start" },
                        "Start",
                        react_1.default.createElement(ui_1.Input, { id: "edit-region-start", type: "number", "aria-invalid": !isPositionValid, "aria-describedby": isPositionValid ? undefined : '#edit-region-position-validation-error', pattern: "[0-9]*", required: true, value: start, onChange: (e) => {
                                this.setState({ start: Number(e.target.value) });
                            } })),
                    react_1.default.createElement("label", { htmlFor: "edit-region-stop" },
                        "Stop",
                        react_1.default.createElement(ui_1.Input, { id: "edit-region-stop", type: "number", "aria-invalid": !isPositionValid, "aria-describedby": isPositionValid ? undefined : '#edit-region-position-validation-error', pattern: "[0-9]*", required: true, value: stop, onChange: (e) => {
                                this.setState({ stop: Number(e.target.value) });
                            } }))),
                react_1.default.createElement("p", { style: { textAlign: 'center' } },
                    "Region size: ",
                    size.toLocaleString(),
                    " bp"),
                !isChromosomeValid && (react_1.default.createElement("p", { id: "edit-region-chrom-validation-error", style: { textAlign: 'center' } }, "Chromosome must be one of 1-22, X, or Y.")),
                !isPositionValid && (react_1.default.createElement("p", { id: "edit-region-position-validation-error", style: { textAlign: 'center' } }, "Start position must be less than or equal to stop position.")),
                react_1.default.createElement("div", { style: { textAlign: 'center' } },
                    react_1.default.createElement(ui_1.Button, { onClick: () => {
                            this.setState({
                                chrom: initialChrom,
                                start: initialStart,
                                stop: initialStop,
                            });
                        } }, "Reset to original region")),
                react_1.default.createElement("input", { type: "submit", disabled: !isValid, style: { display: 'none' }, value: "Submit" }))));
    }
}
const EditRegion = (_a) => {
    var { initialRegion, onSubmit } = _a, otherProps = __rest(_a, ["initialRegion", "onSubmit"]);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        isModalOpen && (react_1.default.createElement(EditRegionModal, { initialRegion: initialRegion, onRequestClose: () => {
                setIsModalOpen(false);
            }, onSubmit: (region) => {
                setIsModalOpen(false);
                onSubmit(region);
            } })),
        react_1.default.createElement(ui_1.Button, Object.assign({}, otherProps, { disabled: isModalOpen, onClick: () => {
                setIsModalOpen(true);
            } }), "Change")));
};
const GnomadEditRegion = (0, react_router_dom_1.withRouter)((_a) => {
    var { history, location, match: _match } = _a, otherProps = __rest(_a, ["history", "location", "match"]);
    return (react_1.default.createElement(EditRegion, Object.assign({}, otherProps, { onSubmit: (region) => {
            const regionId = `${region.chrom}-${region.start}-${region.stop}`;
            const currentParams = query_string_1.default.parse(location.search);
            const next = {
                pathname: `/region/${regionId}`,
                search: query_string_1.default.stringify({ dataset: currentParams.dataset }),
            };
            history.push(next);
        } })));
});
exports.default = GnomadEditRegion;
//# sourceMappingURL=EditRegion.js.map