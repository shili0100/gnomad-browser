import React from 'react';
declare const AttributeList: import("styled-components").StyledComponent<"dl", any, {}, never>;
type AttributeListItemProps = {
    children: React.ReactNode;
    label: string | React.ReactNode;
    tooltip?: string;
};
export declare const AttributeListItem: ({ children, label, tooltip }: AttributeListItemProps) => React.JSX.Element;
export default AttributeList;
