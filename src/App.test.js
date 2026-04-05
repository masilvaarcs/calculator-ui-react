import React from "react";
import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Calculadora", () => {
    it("calcula adição corretamente", () => {
        render(<App />);
        const num1Input = screen.getByTestId("num1");
        const num2Input = screen.getByTestId("num2");
        const operationSelect = screen.getByTestId("operation-select");
        const calculateButton = screen.getByTestId("calculate-button");

        fireEvent.change(num1Input, { target: { value: "10" } });
        fireEvent.change(num2Input, { target: { value: "5" } });
        fireEvent.change(operationSelect, { target: { value: "add" } });
        fireEvent.click(calculateButton);

        const resultElement = screen.getByTestId("result-text");
        expect(resultElement).toBeInTheDocument("Result: 10");
    });

    it("calcula subtração corretamente", () => {
        render(<App />);
        const num1Input = screen.getByTestId("num1");
        const num2Input = screen.getByTestId("num2");
        const operationSelect = screen.getByTestId("operation-select");
        const calculateButton = screen.getByTestId("calculate-button");

        fireEvent.change(num1Input, { target: { value: "10" } });
        fireEvent.change(num2Input, { target: { value: "5" } });
        fireEvent.change(operationSelect, { target: { value: "subtract" } });
        fireEvent.click(calculateButton);

        const resultElement = screen.getByTestId("result-text");
        expect(resultElement).toBeInTheDocument("Result: 5");
    });

    it("calcula multiplicação corretamente", () => {
        render(<App />);
        const num1Input = screen.getByTestId("num1");
        const num2Input = screen.getByTestId("num2");
        const operationSelect = screen.getByTestId("operation-select");
        const calculateButton = screen.getByTestId("calculate-button");

        fireEvent.change(num1Input, { target: { value: "10" } });
        fireEvent.change(num2Input, { target: { value: "5" } });
        fireEvent.change(operationSelect, { target: { value: "multiply" } });
        fireEvent.click(calculateButton);

        const resultElement = screen.getByTestId("result-text");
        expect(resultElement).toBeInTheDocument("Result: 50");
    });

    it("calcula divisão corretamente", () => {
        render(<App />);
        const num1Input = screen.getByTestId("num1");
        const num2Input = screen.getByTestId("num2");
        const operationSelect = screen.getByTestId("operation-select");
        const calculateButton = screen.getByTestId("calculate-button");

        fireEvent.change(num1Input, { target: { value: "10" } });
        fireEvent.change(num2Input, { target: { value: "5" } });
        fireEvent.change(operationSelect, { target: { value: "divide" } });
        fireEvent.click(calculateButton);

        const resultElement = screen.getByTestId("result-text");
        expect(resultElement).toBeInTheDocument("Result: 2");
    });

    it("não calcula divisão por zero", () => {
        render(<App />);
        const num1Input = screen.getByTestId("num1");
        const num2Input = screen.getByTestId("num2");
        const operationSelect = screen.getByTestId("operation-select");
        const calculateButton = screen.getByTestId("calculate-button");

        fireEvent.change(num1Input, { target: { value: "10" } });
        fireEvent.change(num2Input, { target: { value: "0" } });
        fireEvent.change(operationSelect, { target: { value: "divide" } });
        fireEvent.click(calculateButton);

        const errorElement = screen.getByText("Error: Division by zero");
        expect(errorElement).toBeInTheDocument();
    });
});
