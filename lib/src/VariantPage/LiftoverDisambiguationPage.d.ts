import React from 'react';
import { DatasetId } from '../../dataset-metadata/metadata';
type LiftoverDisambiguationPageProps = {
    fromVariantId: string;
    fromDatasetId: DatasetId;
    toDatasetId: DatasetId;
};
declare const LiftoverDisambiguationPage: ({ fromVariantId, fromDatasetId, toDatasetId, }: LiftoverDisambiguationPageProps) => React.JSX.Element;
export default LiftoverDisambiguationPage;
