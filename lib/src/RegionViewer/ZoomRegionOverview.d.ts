import React from 'react';
type ZoomRegionOverviewProps = {
    readOnly?: boolean;
    regions: {
        start: number;
        stop: number;
    }[];
    renderOverview: (...args: any[]) => any;
    zoomRegion: {
        start: number;
        stop: number;
    };
    onChangeZoomRegion: (...args: any[]) => any;
    onChangeZoomRegionDebounceDelay?: number;
};
declare const ZoomRegionOverview: React.ForwardRefExoticComponent<ZoomRegionOverviewProps & React.RefAttributes<any>>;
export default ZoomRegionOverview;
