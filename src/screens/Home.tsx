import { useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/App.routes";

export function Home() {
  const [groups, setGroups] = useState([
    "costa",
    "ombro",
    "peito",
    "perna",
    "biceps",
    "triceps",
    "abdomen",
    "gluteo",
  ]);
  const [groupSelected, setGroupSelected] = useState("");
  const [exercises, setExercises] = useState(["Puxada", "Terra", "Remada"]);

  const navigation = useNavigation<AppNavigationRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              String(groupSelected).toLocaleUpperCase() ===
              item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxHeight={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exerxícios
          </Heading>
          <Text color="gray.200" fontSize="md">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
