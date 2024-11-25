import { fireEvent, render, screen } from "@testing-library/react";
import Explanation from "../Explanation";
const tempGeneratedText = "This is a generated text";
const tempOldText = "This is a old text";
describe("Explanation Component", () => {
    test("Should render explain button on initial render", () => {
        render(<Explanation generatedText={tempGeneratedText} oldText={tempOldText} />);
        const button = screen.getByRole("button", { name: /Explain/i });
        expect(button).toBeInTheDocument();
    });

    test("Should show loader on clicking explain button", () => {
        render(<Explanation generatedText={tempGeneratedText} oldText={tempOldText} />);
        fireEvent.click(screen.getByRole("button", { name: /Explain/i }));
        expect(screen.getByTestId("loader")).toBeInTheDocument();
        expect(screen.getByText("Loading explanation...")).toBeInTheDocument();
    });
});
