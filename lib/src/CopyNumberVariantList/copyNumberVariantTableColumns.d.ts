import React from 'react';
import { Context } from './CopyNumberVariants';
import { CopyNumberVariant } from '../CopyNumberVariantPage/CopyNumberVariantPage';
declare const copyNumberVariantTableColumns: ({
    key: string;
    heading: string;
    minWidth: number;
    compareFunction: (v1: any, v2: any, order?: string) => any;
    render: (row: any, key: any) => React.JSX.Element;
    shouldShowInContext?: undefined;
    getSearchTerms?: undefined;
    grow?: undefined;
    isRowHeader?: undefined;
} | {
    key: string;
    heading: string;
    minWidth: number;
    compareFunction: (v1: any, v2: any, order?: string) => any;
    render: (row: any, key: any) => React.JSX.Element;
    shouldShowInContext: (context: Context) => boolean;
    getSearchTerms?: undefined;
    grow?: undefined;
    isRowHeader?: undefined;
} | {
    key: string;
    heading: string;
    minWidth: number;
    compareFunction: (v1: any, v2: any, order?: string) => any;
    getSearchTerms: (variant: any) => "deletion" | "duplication";
    render: (variant: CopyNumberVariant, _: any, { colorKey, highlightWords }: any) => React.JSX.Element;
    shouldShowInContext?: undefined;
    grow?: undefined;
    isRowHeader?: undefined;
} | {
    key: string;
    heading: string;
    minWidth: number;
    compareFunction: (v1: any, v2: any, order?: string) => any;
    render: (variant: CopyNumberVariant) => React.JSX.Element;
    shouldShowInContext?: undefined;
    getSearchTerms?: undefined;
    grow?: undefined;
    isRowHeader?: undefined;
} | {
    key: string;
    heading: string;
    grow: number;
    minWidth: number;
    render: (variant: any) => React.JSX.Element;
    compareFunction?: undefined;
    shouldShowInContext?: undefined;
    getSearchTerms?: undefined;
    isRowHeader?: undefined;
} | {
    key: string;
    heading: string;
    isRowHeader: boolean;
    minWidth: number;
    compareFunction: (v1: any, v2: any, order?: string) => any;
    getSearchTerms: (variant: any) => any[];
    render: (variant: any, _: any, { highlightWords }: any) => React.JSX.Element;
    shouldShowInContext?: undefined;
    grow?: undefined;
})[];
export default copyNumberVariantTableColumns;
export declare const getColumnsForContext: (context: Context) => {};
