import React from 'react';
type TableColumnSelectionModalProps = {
    availableColumns: {
        key: string;
        heading: string;
        description?: string;
    }[];
    context: any;
    defaultColumns: string[];
    selectedColumns: string[];
    onCancel: (...args: any[]) => any;
    onSave: (...args: any[]) => any;
};
declare const TableColumnSelectionModal: ({ availableColumns, context, defaultColumns, selectedColumns, onCancel, onSave, }: TableColumnSelectionModalProps) => React.JSX.Element;
export default TableColumnSelectionModal;
