import React from 'react';
type CategoryFilterControlProps = {
    breakpoint?: number;
    categories: {
        id: string;
        label: string;
        color: string;
    }[];
    categorySelections: {
        [key: string]: boolean;
    };
    className?: string;
    id: string;
    onChange: (...args: any[]) => any;
    style?: {
        [key: string]: string | number;
    };
};
declare const CategoryFilterControl: {
    ({ breakpoint, categories, categorySelections, className, id, onChange, style, }: CategoryFilterControlProps): React.JSX.Element;
    defaultProps: {
        breakpoint: number;
        className: undefined;
        style: undefined;
    };
};
export default CategoryFilterControl;
