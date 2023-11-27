import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { StatusBar, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";

SplashScreen.preventAutoHideAsync();

EStyleSheet.build({
  $font400: "AbhayaLibre-Regular",
  $font500: "AbhayaLibre-Medium",
  $font600: "AbhayaLibre-SemiBold",
  $font700: "AbhayaLibre-Bold",
  $font800: "AbhayaLibre-ExtraBold",
  $formSelectorBg: "rgba(253, 211, 225, 0.40)",
  $formSelectorSelectedBg: "#F4739E",
  $buttonFormBg: "#45B8E9",
  $buttonCarrinhoBg: "#2D3943",
  $buttonFazerPedidoBg: "#276D5C",
  $buttonPedidoFinalizado: "#E47070",
});

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "AbhayaLibre-Regular": require("./assets/fonts/AbhayaLibre-Regular.ttf"), // ? 400
    "AbhayaLibre-Medium": require("./assets/fonts/AbhayaLibre-Medium.ttf"), // ? 500
    "AbhayaLibre-SemiBold": require("./assets/fonts/AbhayaLibre-SemiBold.ttf"), // ? 600
    "AbhayaLibre-Bold": require("./assets/fonts/AbhayaLibre-Bold.ttf"), // ? 700
    "AbhayaLibre-ExtraBold": require("./assets/fonts/AbhayaLibre-ExtraBold.ttf"), // ? 800
  });
  const [userInfo, setUserInfo] = useState(null);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <View onLayout={onLayoutRootView}>
        <StatusBar barStyle="dark-content" />
        {!userInfo ? <Login setUserInfo={setUserInfo} /> : <RootLayout userInfo={userInfo} setUserInfo={setUserInfo} />}
      </View>
    </>
  );
}
