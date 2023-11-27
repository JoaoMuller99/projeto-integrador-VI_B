import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { z } from "zod";
import ws from "../../interface_ws/interface";
import Input from "../ui/Input";

const SignUpFormSchema = z.object({
  email: z.string().min(1, "Preencha todos os campos").email("O e-mail digitado não é válido"),
  nome: z.string().min(1, "Preencha todos os campos"),
  logradouro: z.string().min(1, "Preencha todos os campos"),
  celular: z.string().min(1, "Preencha todos os campos").min(11, "O celular digitado não é válido"),
  senha: z.string().min(1, "Preencha todos os campos").min(4, "Sua senha precisa ter, no mínimo, 4 caracteres"),
});

const cidadeDisponivel = "Porto Alegre";

export default function SignUpForm({ setUserInfo }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitHandler() {
    const validatedData = SignUpFormSchema.safeParse({ email, nome, logradouro, celular, senha });

    if (!validatedData.success) {
      alert(validatedData.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    const resultado = await ws.criarUsuario({ email, nome, logradouro, cidade: cidadeDisponivel, telefone: celular, senha });
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
      {/* NOME INPUT */}
      <Input
        label="Nome completo"
        textContentType="name"
        onChange={(e) => setNome(e.nativeEvent.text)}
        value={nome}
        placeholder="Digite seu nome"
      />
      {/* LOGRADOURO INPUT */}
      <Input
        label="Logradouro"
        textContentType="fullStreetAddress"
        onChange={(e) => setLogradouro(e.nativeEvent.text)}
        value={logradouro}
        placeholder="Digite seu logradouro"
      />
      {/* CIDADE INPUT */}
      <Input label="Cidade (apenas Porto Alegre)" textContentType="addressCity" value={cidadeDisponivel} />
      {/* CELULAR INPUT */}
      <Input
        label="Celular"
        textContentType="telephoneNumber"
        onChange={(e) => setCelular((e.nativeEvent.text || "").replace(/\D/g, ""))}
        value={celular}
        placeholder="(00) 000000000"
      />
      {/* SENHA INPUT */}
      <Input
        label="Criar senha"
        textContentType="password"
        onChange={(e) => setSenha(e.nativeEvent.text)}
        value={senha}
        secureTextEntry
        placeholder="Digite sua senha"
      />
      {/* CADASTRAR BUTTON */}
      <TouchableOpacity
        style={[styles.submitButtonContainer, isLoading ? styles.submitButtonContainerDisabled : {}]}
        disabled={isLoading}
        onPress={onSubmitHandler}
      >
        <Text style={styles.submitButtonText}>{isLoading ? "Carregando" : "Cadastrar"}</Text>
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
    marginBottom: "20rem",
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
