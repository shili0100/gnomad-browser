import React, { Component } from 'react';
import { DatasetId } from '../dataset-metadata/metadata';
export declare enum MetricOptions {
    mean = "mean",
    median = "median",
    over_1 = "over_1",
    over_5 = "over_5",
    over_10 = "over_10",
    over_15 = "over_15",
    over_20 = "over_20",
    over_25 = "over_25",
    over_30 = "over_30",
    over_50 = "over_50",
    over_100 = "over_100"
}
type OwnCoverageTrackProps = {
    datasets: {
        buckets: {
            pos: number;
            mean?: number;
            median?: number;
        }[];
        color: string;
        name: string;
        opacity?: number;
    }[];
    coverageOverThresholds?: number[];
    filenameForExport?: (...args: any[]) => any;
    height?: number;
    maxCoverage?: number;
    datasetId: DatasetId;
    metric?: MetricOptions;
};
type CoverageTrackState = {
    selectedMetric: MetricOptions;
};
type CoverageTrackProps = OwnCoverageTrackProps & typeof CoverageTrack.defaultProps;
declare class CoverageTrack extends Component<CoverageTrackProps, CoverageTrackState> {
    static defaultProps: {
        filenameForExport: () => string;
        height: number;
        maxCoverage: number;
    };
    plotElement: any;
    constructor(props: CoverageTrackProps);
    plotRef: (el: any) => void;
    exportPlot(): void;
    renderArea({ scaleCoverageMetric, scalePosition }: any): React.JSX.Element[];
    renderBars({ isPositionDefined, scaleCoverageMetric, scalePosition, totalBases, width }: any): React.JSX.Element[];
    renderPlot({ isPositionDefined, regions, scaleCoverageMetric, scalePosition, width }: any): React.JSX.Element[];
    render(): React.JSX.Element;
}
export default CoverageTrack;
