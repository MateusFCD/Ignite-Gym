import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import { Perfil } from "@screens/Perfil";

describe("Perfil screen", () => {
  it("checks if show correctly user input name placeholder", () => {
    const { getByPlaceholderText } = render(<Perfil />);
    const inputName = getByPlaceholderText("Nome");
    expect(inputName).toBeTruthy();
  });

  it("checks if user data has been loaded", () => {
    const { getByTestId } = render(<Perfil />);

    const inputName = getByTestId("input-name");
    const inputLastName = getByTestId("input-lastname");

    expect(inputName.props.value).toEqual("John");
    expect(inputLastName.props.value).toEqual("Doe");
  });

  it("checks if title render correctly", () => {
    const { getByTestId } = render(<Perfil />);

    const textTitle = getByTestId("text-title");

    expect(textTitle.props.children).toContain("Perfil");
  });
});
