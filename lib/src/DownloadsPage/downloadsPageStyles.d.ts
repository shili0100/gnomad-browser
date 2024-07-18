import React from 'react';
export declare const FileList: import("styled-components").StyledComponent<"ul", any, object, never>;
export declare const SectionTitle: import("styled-components").StyledComponent<{
    ({ children, id, theme }: any): React.JSX.Element;
    displayName: string;
    propTypes: {
        children: import("prop-types").Validator<NonNullable<import("prop-types").ReactNodeLike>>;
        id: import("prop-types").Validator<string>;
    };
}, any, {}, never>;
export declare const StyledParagraph: import("styled-components").StyledComponent<"p", any, {}, never>;
export declare const ColumnsWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const Column: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const DownloadsSection: import("styled-components").StyledComponent<"section", any, {}, never>;
export declare const GetUrlButtons: any;
type DownloadLinksProps = {
    label: string;
    path: string;
    size?: string;
    md5?: string;
    crc32c?: string;
    gcsBucket?: string;
    includeGCP?: boolean;
    includeAWS?: boolean;
    includeAzure?: boolean;
    associatedFileType?: string;
    logClicks?: boolean;
};
export declare const DownloadLinks: ({ label, path, size, md5, crc32c, gcsBucket, includeGCP, includeAWS, includeAzure, associatedFileType, }: DownloadLinksProps) => React.JSX.Element;
export {};
