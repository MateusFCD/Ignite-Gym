import { VStack, Image } from "native-base";
import BackgorundImg from "@assets/background.png";

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgorundImg}
        alt=""
        resizeMode="contain"
        position="absolute"
      />
    </VStack>
  );
}
