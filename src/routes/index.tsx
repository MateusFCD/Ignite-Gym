import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";
import { AuthRoutes } from "./Auth.routes";
import { AppRoutes } from "./App.routes";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { user } = useAuth();

  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
