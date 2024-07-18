export declare const haplogroups: readonly ["A", "B", "C", "D", "E", "F", "G", "H", "HV", "I", "J", "K", "L0", "L1", "L2", "L3", "L4", "L5", "M", "N", "P", "R", "T", "U", "V", "W", "X", "Y", "Z"];
export type Haplogroup = typeof haplogroups[number];
export declare const codeToAncestryName: {
    readonly afr: "African/African American";
    readonly ami: "Amish";
    readonly amr: "Latino/Admixed American";
    readonly asj: "Ashkenazi Jewish";
    readonly eas: "East Asian";
    readonly fin: "European (Finnish)";
    readonly mid: "Middle Eastern";
    readonly nfe: "European (non-Finnish)";
    readonly oth: "Other";
    readonly sas: "South Asian";
};
type AncestryCode = keyof typeof codeToAncestryName;
export type AncestryName = typeof codeToAncestryName[AncestryCode];
export interface MtdnaHaplogroupSampleCount {
    haplogroup: Haplogroup;
    ancestry: AncestryCode;
    n: number;
}
declare const mtdnaHaplogroupSampleData: MtdnaHaplogroupSampleCount[];
export default mtdnaHaplogroupSampleData;
