"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
require("jest-styled-components");
const ClinvarVariant_1 = __importDefault(require("../__factories__/ClinvarVariant"));
const react_1 = __importDefault(require("react"));
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const ClinvarVariantTrack_1 = __importDefault(require("./ClinvarVariantTrack"));
const Transcript_1 = __importDefault(require("../__factories__/Transcript"));
const react_2 = require("@testing-library/react");
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
const region_viewer_1 = require("@gnomad/region-viewer");
const react_router_dom_1 = require("react-router-dom");
(0, globals_1.describe)('Clinvar Variants Track', () => {
    const mockClinvarVariants = [
        ClinvarVariant_1.default.build({ gold_stars: 0, major_consequence: 'missense_variant' }),
        ClinvarVariant_1.default.build({ gold_stars: 1, major_consequence: 'missense_variant' }),
        ClinvarVariant_1.default.build({ gold_stars: 2, major_consequence: 'missense_variant' }),
        ClinvarVariant_1.default.build({ gold_stars: 3, major_consequence: 'missense_variant' }),
        ClinvarVariant_1.default.build({ gold_stars: 4, major_consequence: 'missense_variant' }),
    ];
    const mockTranscripts = [
        Transcript_1.default.build(),
        Transcript_1.default.build(),
        Transcript_1.default.build(),
        Transcript_1.default.build(),
    ];
    const childProps = {
        centerPanelWidth: 3,
        isPositionDefined: true,
        leftPanelWidth: 4,
        regions: [],
        rightPanelWidth: 5,
        scalePosition: (i) => i,
    };
    (0, globals_1.test)('renders correctly with default props', () => {
        const tree = react_test_renderer_1.default.create(react_1.default.createElement(region_viewer_1.RegionViewerContext.Provider, { value: childProps },
            react_1.default.createElement(ClinvarVariantTrack_1.default, { referenceGenome: "GRCh38", transcripts: mockTranscripts, variants: mockClinvarVariants })));
        (0, globals_1.expect)(tree).toMatchSnapshot();
    });
    (0, globals_1.test)('Allow user to change to different review status filters', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = user_event_1.default.setup();
        (0, react_2.render)(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(region_viewer_1.RegionViewerContext.Provider, { value: childProps },
                react_1.default.createElement(ClinvarVariantTrack_1.default, { referenceGenome: "GRCh38", transcripts: mockTranscripts, variants: mockClinvarVariants }))));
        const filterSelect = react_2.screen.getByRole('combobox');
        const allStarOpt = react_2.screen.getByRole('option', { name: '0-4 Stars' });
        const OnePlusStarOpt = react_2.screen.getByRole('option', { name: '>=1 Stars' });
        const TwoPlusStarOpt = react_2.screen.getByRole('option', { name: '>=2 Stars' });
        const ThreePlusStarOpt = react_2.screen.getByRole('option', { name: '>=3 Stars' });
        const FourStarOpt = react_2.screen.getByRole('option', { name: '4 Stars' });
        (0, globals_1.expect)(allStarOpt.selected).toBe(true);
        yield user.selectOptions(filterSelect, OnePlusStarOpt);
        (0, globals_1.expect)(OnePlusStarOpt.selected).toBe(true);
        (0, globals_1.expect)(allStarOpt.selected).toBe(false);
        yield user.selectOptions(filterSelect, TwoPlusStarOpt);
        (0, globals_1.expect)(TwoPlusStarOpt.selected).toBe(true);
        (0, globals_1.expect)(OnePlusStarOpt.selected).toBe(false);
        yield user.selectOptions(filterSelect, ThreePlusStarOpt);
        (0, globals_1.expect)(ThreePlusStarOpt.selected).toBe(true);
        (0, globals_1.expect)(TwoPlusStarOpt.selected).toBe(false);
        yield user.selectOptions(filterSelect, FourStarOpt);
        (0, globals_1.expect)(FourStarOpt.selected).toBe(true);
        (0, globals_1.expect)(ThreePlusStarOpt.selected).toBe(false);
    }));
    (0, globals_1.test)('review status selector filters correctly ', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = user_event_1.default.setup();
        (0, react_2.render)(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(region_viewer_1.RegionViewerContext.Provider, { value: childProps },
                react_1.default.createElement(ClinvarVariantTrack_1.default, { referenceGenome: "GRCh38", transcripts: mockTranscripts, variants: mockClinvarVariants }))));
        const filterSelect = react_2.screen.getByRole('combobox');
        (0, globals_1.expect)(react_2.screen.getByText('ClinVar variants (5)')).not.toBeNull();
        yield user.selectOptions(filterSelect, react_2.screen.getByRole('option', { name: '>=1 Stars' }));
        (0, globals_1.expect)(react_2.screen.getByText('ClinVar variants (4)')).not.toBeNull();
        yield user.selectOptions(filterSelect, react_2.screen.getByRole('option', { name: '>=2 Stars' }));
        (0, globals_1.expect)(react_2.screen.getByText('ClinVar variants (3)')).not.toBeNull();
        yield user.selectOptions(filterSelect, react_2.screen.getByRole('option', { name: '>=3 Stars' }));
        (0, globals_1.expect)(react_2.screen.getByText('ClinVar variants (2)')).not.toBeNull();
        yield user.selectOptions(filterSelect, react_2.screen.getByRole('option', { name: '4 Stars' }));
        (0, globals_1.expect)(react_2.screen.getByText('ClinVar variants (1)')).not.toBeNull();
    }));
});
//# sourceMappingURL=ClinvarVariantsTrack.spec.js.map