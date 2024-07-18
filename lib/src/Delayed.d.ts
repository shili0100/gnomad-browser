import PropTypes from 'prop-types';
declare const Delayed: {
    ({ children, delay }: any): any;
    propTypes: {
        children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        delay: PropTypes.Requireable<number>;
    };
    defaultProps: {
        delay: number;
    };
};
export default Delayed;
