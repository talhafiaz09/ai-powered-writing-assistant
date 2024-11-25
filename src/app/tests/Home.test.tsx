import { render, screen } from "@testing-library/react";
import { IHistory } from "@/app/types";
import React from "react";
import Home from "./page";

describe("Home Component", () => {
    test("Should render initial UI", () => {
        render(<Home />);
        expect(screen.getByTestId("tone")).toBeInTheDocument();
        expect(screen.getByTestId("length")).toBeInTheDocument();
        expect(screen.getByTestId("textField")).toBeInTheDocument();
        expect(screen.getByTestId("rewrite")).toBeInTheDocument();
    });
});
