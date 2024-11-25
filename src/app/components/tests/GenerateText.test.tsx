import { render, screen } from "@testing-library/react";
import { IHistory } from "@/app/types";
import React from "react";
import GenerateText from "../GeneratedText";

const tempGeneratedText = "This is a generated text";
const tempOldText = "This is a old text";

describe("GenerateText Component", () => {
    test("Should display results", () => {
        render(<GenerateText generatedText={tempGeneratedText} oldText={tempOldText} />);
        expect(screen.getByText("Results:")).toBeInTheDocument();
        expect(screen.getByText("Original")).toBeInTheDocument();
        expect(screen.getByText(tempOldText)).toBeInTheDocument();
        expect(screen.getByText("Rewritten")).toBeInTheDocument();
        expect(screen.getByText(tempGeneratedText)).toBeInTheDocument();
    });
});
