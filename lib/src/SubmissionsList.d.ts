import React from 'react';
type SubmissionsListProps = {
    submissions: {
        clinical_significance?: string;
        conditions?: {
            medgen_id?: string;
            name: string;
        }[];
        last_evaluated?: string;
        review_status: string;
        submitter_name: string;
    }[];
};
declare const SubmissionsList: ({ submissions }: SubmissionsListProps) => React.JSX.Element;
export default SubmissionsList;
