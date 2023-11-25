import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Input from "../ui/Input";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
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
      {/* NOME INPUT */}
      <Input label="Nome completo" textContentType="name" onChange={(e) => setNome(e.target.value)} value={nome} placeholder="Digite seu nome" />
      {/* CELULAR INPUT */}
      <Input
        label="Celular"
        textContentType="telephoneNumber"
        onChange={(e) => setCelular(e.target.value)}
        value={celular}
        placeholder="(00) 000000000"
      />
      {/* SENHA INPUT */}
      <Input
        label="Criar senha"
        textContentType="password"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />
      {/* CADASTRAR BUTTON */}
      <TouchableOpacity style={styles.submitButtonContainer} onPress={() => {}}>
        <Text style={styles.submitButtonText}>Cadastrar {">"}</Text>
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
