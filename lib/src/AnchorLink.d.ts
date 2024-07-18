import PropTypes from 'prop-types';
import React from 'react';
export declare const withAnchor: (Component: any) => {
    ({ children, id, theme }: any): React.JSX.Element;
    displayName: string;
    propTypes: {
        children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        id: PropTypes.Validator<string>;
    };
};
