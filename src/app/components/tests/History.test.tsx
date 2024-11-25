import { render, screen } from "@testing-library/react";
import History from "../History";
import { IHistory } from "@/app/types";
const tempData: IHistory[] = [
    {
        oldText: "This is old text",
        generatedText: "This is generated text",
        created: new Date().toString(),
    },
];
describe("History Component", () => {
    test("Should render delete button", () => {
        render(<History data={tempData} setData={() => {}} />);
        const button = screen.getByRole("button", { name: /Delete/i });
        expect(button).toBeInTheDocument();
    });
    test("Should receive data from parent and render it", () => {
        render(<History data={tempData} setData={() => {}} />);
        expect(screen.getByText(tempData[0].oldText)).toBeVisible();
    });
    test("Should display download button if data is received", () => {
        render(<History data={tempData} setData={() => {}} />);
        const button = screen.getByTestId("download");
        expect(button).toBeInTheDocument();
    });
});
