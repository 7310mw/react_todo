import { describe, expect, test } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("App", () => {
  test("アプリタイトルが表示されている", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {name: "Todo アプリ!"})
    ).toBeInTheDocument();
  });

  test("TODOを追加することができる", () => {
    render(<App />);

    const input = screen.getByRole("textbox", {name: "新しいタスクを入力"});
    const addButton = screen.getByRole("button", {name: "追加"});

    fireEvent.change(input, {target: {value: "テストタスク"}});
    fireEvent.click(addButton);

    const list = screen.getByRole("list");
    expect(within(list).getByText("テストタスク")).toBeInTheDocument();
  });

  test("TODOを完了にすることができる", () => {
    render(<App />);

    const input = screen.getByRole("textbox", {name: "新しいタスクを入力"});
    const addButton = screen.getByRole("button", {name: "追加"});
    fireEvent.change(input, {target: {value: "完了タスク"}});
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    const lastCheckbox = checkboxes[checkboxes.length - 1];
    fireEvent.click(lastCheckbox);
    expect(lastCheckbox).toBeChecked();
  });

  test("完了したTODOの数が表示されている", () => {
    render(<App />);
    const input = screen.getByRole("textbox", {name: "新しいタスクを入力"});
    const addButton = screen.getByRole("button", {name: "追加"});
    fireEvent.change(input, {target: {value: "タスク１"}});
    fireEvent.click(addButton);
    fireEvent.change(input, {target: {value: "タスク２"}});
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(screen.getByText("完了済み: 1 / 2")).toBeInTheDocument();
  });
});
