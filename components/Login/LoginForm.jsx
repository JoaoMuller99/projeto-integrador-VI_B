import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { z } from "zod";
import ws from "../../interface_ws/interface";
import Input from "../ui/Input";

const LoginFormSchema = z.object({
  email: z.string().min(1, "Preencha todos os campos").email("O e-mail digitado não é válido"),
  senha: z.string().min(1, "Preencha todos os campos"),
});

export default function LoginForm({ setUserInfo }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitHandler() {
    const validatedData = LoginFormSchema.safeParse({ email, senha });

    if (!validatedData.success) {
      alert(validatedData.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    const resultado = await ws.login({ email, senha });
    setIsLoading(false);

    if (resultado.temErro) {
      alert(resultado.erro);
      return;
    }

    setUserInfo(resultado.retorno);
  }

  return (
    <View style={styles.container}>
      {/* E-MAIL INPUT */}
      <Input
        label="E-mail"
        textContentType="emailAddress"
        onChange={(e) => setEmail(e.nativeEvent.text)}
        value={email}
        placeholder="Digite seu e-mail"
      />
      {/* SENHA INPUT */}
      <Input
        label="Senha"
        textContentType="password"
        onChange={(e) => setSenha(e.nativeEvent.text)}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />
      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[styles.submitButtonContainer, isLoading ? styles.submitButtonContainerDisabled : {}]}
        disabled={isLoading}
        onPress={onSubmitHandler}
      >
        <Text style={styles.submitButtonText}>{isLoading ? "Carregando" : "Login"}</Text>
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
    backgroundColor: "$buttonFormBg",
    alignItems: "center",
    padding: "1.25rem",
    borderRadius: "1.125rem",
  },
  submitButtonContainerDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "white",
    fontSize: "1.125rem",
    fontFamily: "$font700",
    lineHeight: "1.125rem",
  },
});
