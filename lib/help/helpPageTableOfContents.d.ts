export type FaqTopic = {
    heading: string;
    topics: string[];
};
declare const helpPageTableOfContents: {
    topics: string[];
    faq: FaqTopic[];
};
export default helpPageTableOfContents;
