import { fireEvent, render, screen } from "@testing-library/react";
import DownloadHistory from "../DownloadHistory";
import { IHistory } from "@/app/types";
import React from "react";
const tempData: IHistory[] = [
    {
        oldText: "This is old text",
        generatedText: "This is generated text",
        created: new Date().toString(),
    },
];

jest.spyOn(React, "useState");

global.URL.createObjectURL = jest.fn(() => "mocked-url");
global.URL.revokeObjectURL = jest.fn(() => "mocked-url");

describe("DownloadHistory Component", () => {
    test("Should display download button if data is received", () => {
        render(<DownloadHistory data={tempData} />);
        const button = screen.getByTestId("download");
        expect(button).toBeInTheDocument();
    });
});
