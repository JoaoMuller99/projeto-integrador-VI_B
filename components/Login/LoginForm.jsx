import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Input from "../ui/Input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.container}>
      {/* E-MAIL INPUT */}
      <Input
        label="E-mail"
        textContentType="emailAddress"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Digite seu e-mail"
      />
      {/* SENHA INPUT */}
      <Input
        label="Senha"
        textContentType="password"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />
      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.submitButtonContainer} onPress={() => {}}>
        <Text style={styles.submitButtonText}>Login {">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginTop: "1.5rem",
  },
  submitButtonContainer: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: "#45B8E9",
    alignItems: "center",
    padding: "1.25rem",
    borderRadius: "1.125rem",
  },
  submitButtonText: {
    color: "white",
    fontSize: "1.125rem",
    fontFamily: "$font700",
    lineHeight: "1.125rem",
  },
});
