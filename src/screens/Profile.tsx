import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  VStack,
  ScrollView,
  Center,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  password: yup.string().required("Senha obrigatória"),
  newPassword: yup
    .string()
    .min(6, "Mínimo de 6 caracteres")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  confirmNewPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref("newPassword"), null], "As senhas não coincidem")
    .required("Confirmação de senha obrigatória")
    .transform((value) => (value === "" ? null : value)),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/MateusFCD.png"
  );

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(schema),
  });

  async function handleSelectImage() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (photoSelected.canceled) return;

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "A imagem deve ter no máximo 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleUpdateProfile(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", { data });

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao atualizar perfil";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
    }
  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={33}
              h={33}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto usuário"
              size={33}
            />
          )}
          <TouchableOpacity onPress={handleSelectImage}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                isDisabled
                bg="gray.600"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.newPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirmNewPassword?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
