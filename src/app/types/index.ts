export interface IHistory {
    oldText: string;
    generatedText: string;
    created: string;
}

export interface ExplanationProps {
    generatedText: string;
    oldText: string;
}

export interface GenerateTextProps {
    generatedText: string;
    oldText: string;
    error?: string;
    loading?: boolean;
    showTitle?: boolean;
    showExplain?: boolean;
}
