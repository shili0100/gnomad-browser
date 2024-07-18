import PropTypes from 'prop-types';
type CopyNumberVariantPropType = {
    alts?: string[] | null;
    sc: number;
    sn: number;
    sf: number;
    chrom: string;
    end: number;
    filters?: string[];
    genes?: string[];
    length: number;
    populations?: {
        id: string;
        sc: number;
        sn: number;
        sf: number;
    }[];
    pos: number;
    qual?: number;
    type: string;
    posmin?: number;
    posmax?: number;
    endmin?: number;
    endmax?: number;
    variant_id: string;
};
declare const CopyNumberVariantPropType: PropTypes.Requireable<CopyNumberVariantPropType>;
export default CopyNumberVariantPropType;
