import { Stack } from "expo-router";

export default function RootLayout() {


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name='movie/[id]' options={{ headerShown: false }} />
      <Stack.Screen name='person/[id]' options={{ headerShown: false }} />
    </Stack>
  );
}
