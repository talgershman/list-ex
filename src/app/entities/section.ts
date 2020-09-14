export interface ISection {
    sectionId: number;
    sourceGuid: string;
    destinationGuid: string;
    complianceLevel: number;
    violationsCount: number;
    hasMultipleSections: boolean;
    hasUncomputedResults: boolean;
    hasErrors: boolean;
}