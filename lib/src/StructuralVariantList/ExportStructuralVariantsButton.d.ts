import React from 'react';
import { StructuralVariant } from '../StructuralVariantPage/StructuralVariantPage';
type ExportStructuralVariantsButtonProps = {
    exportFileName: string;
    variants: StructuralVariant[];
};
declare const ExportStructuralVariantsButton: ({ exportFileName, variants, ...rest }: ExportStructuralVariantsButtonProps) => React.JSX.Element;
export default ExportStructuralVariantsButton;
