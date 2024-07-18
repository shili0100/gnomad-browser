import React from 'react';
type LocalAncestryPopulationsTableProps = {
    populations: {
        id: string;
        ac: number;
        an: number;
    }[];
};
declare const LocalAncestryPopulationsTable: ({ populations }: LocalAncestryPopulationsTableProps) => React.JSX.Element;
export default LocalAncestryPopulationsTable;
