import PropTypes from 'prop-types';
declare const DocumentTitle: {
    ({ title }: any): null;
    propTypes: {
        title: PropTypes.Requireable<string>;
    };
    defaultProps: {
        title: null;
    };
};
export default DocumentTitle;
