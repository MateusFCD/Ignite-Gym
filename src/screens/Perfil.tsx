import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export function Perfil() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        placeholder="Nome"
        autoCorrect={false}
        testID="input-name"
        value="John"
      />
      <TextInput
        placeholder="Sobrenome"
        autoCorrect={false}
        testID="input-lastname"
        value="Doe"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
