import React from "react";
import { render } from "@testing-library/react-native";

import { Input } from "@components/Input";
import { NativeBaseProvider } from "native-base";
import { theme } from "src/theme";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Provider: React.FC = ({ children }: any) => (
  <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>
);

describe("Input component", () => {
  it("must have specific border color when active", () => {
    const { getByTestId, debug } = render(
      <Input
        testID="input"
        placeholder="e-mail"
        keyboardType="email-address"
        autoCorrect={false}
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500",
        }}
      />,
      {
        wrapper: Provider,
      }
    );

    debug();

    const inputComponent = getByTestId("input");
    expect(inputComponent.props.style[0].borderColor).toEqual("green.500");
  });
});
