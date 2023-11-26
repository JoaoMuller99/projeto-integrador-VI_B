import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LoginForm from "../components/Login/LoginForm";
import SignUpForm from "../components/Login/SignUpForm";

export default function Login({ setUserInfo }) {
  const [selectedMenu, setSelectedMenu] = useState("login");

  function changeSelectedMenu(value) {
    setSelectedMenu(value);
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={{
        width: "100%",
        minheight: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
      }}
      style={styles.container}
    >
      <View style={styles.h1Container}>
        <Text style={styles.h1}>Sabor Caseiro</Text>
        <Text style={styles.h1}>Delivery de Marmitas</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.touchableOpacityContainer} onPress={() => changeSelectedMenu("login")}>
          <View style={[styles.buttonView, selectedMenu === "login" ? styles.selectedButtonView : styles.button]}>
            <Text style={[styles.buttonText, selectedMenu === "login" ? styles.selectedButtonText : styles.button]}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacityContainer} onPress={() => changeSelectedMenu("signup")}>
          <View style={[styles.buttonView, selectedMenu === "signup" ? styles.selectedButtonView : styles.button]}>
            <Text style={[styles.buttonText, selectedMenu === "signup" ? styles.selectedButtonText : styles.button]}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
      {selectedMenu === "login" ? <LoginForm setUserInfo={setUserInfo} /> : <SignUpForm setUserInfo={setUserInfo} />}
    </ScrollView>
  );
}

const styles = EStyleSheet.create({
  container: {
    padding: "1.20rem",
  },
  h1Container: {
    marginBottom: "2.3rem",
  },
  h1: {
    fontFamily: "$font600",
    fontSize: "2.25rem",
    textAlign: "center",
    lineHeight: "2.875rem",
    letterSpacing: "-0.045rem",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: "14.375rem",
    backgroundColor: "$formSelectorBg",
    padding: "0.62rem",
  },
  touchableOpacityContainer: {
    flexGrow: 1,
  },
  buttonView: {
    borderRadius: "5.625rem",
    alignItems: "center",
    padding: "0.62rem",
  },
  selectedButtonView: {
    backgroundColor: "$formSelectorSelectedBg",
  },
  buttonText: {
    fontSize: "1.1rem",
    fontFamily: "$font500",
    lineHeight: "1.4375rem",
    letterSpacing: "-0.01063rem",
    color: "black",
  },
  selectedButtonText: {
    color: "white",
  },
});
