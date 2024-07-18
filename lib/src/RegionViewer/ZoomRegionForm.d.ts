import React from 'react';
type Props = {
    defaultZoomRegion?: {
        start: number;
        stop: number;
    };
    regionViewerRegions: {
        start: number;
        stop: number;
    }[];
    renderOverview: (...args: any[]) => any;
    onSubmit: (...args: any[]) => any;
};
declare const ZoomRegionForm: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
export default ZoomRegionForm;
