import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { z } from "zod";
import ws from "../../interface_ws/interface";
import Input from "../ui/Input";

const UpdateUserFormSchema = z.object({
  email: z.string().min(1, "Preencha todos os campos").email("O e-mail digitado não é válido"),
  nome: z.string().min(1, "Preencha todos os campos"),
  logradouro: z.string().min(1, "Preencha todos os campos"),
  celular: z.string().min(1, "Preencha todos os campos").min(11, "O celular digitado não é válido"),
});

export default function AlterarCadastro({ userInfo, setUserInfo }) {
  const [email, setEmail] = useState(userInfo.email || "");
  const [nome, setNome] = useState(userInfo.nome || "");
  const [logradouro, setLogradouro] = useState(userInfo.logradouro || "");
  const [celular, setCelular] = useState(userInfo.telefone || "");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitHandler() {
    const validatedData = UpdateUserFormSchema.safeParse({ email, nome, logradouro, celular });

    if (!validatedData.success) {
      alert(validatedData.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    const resultado = await ws.atualizaUsuario(userInfo.id, { email, nome, logradouro, telefone: celular });
    setIsLoading(false);

    if (resultado.temErro) {
      alert(resultado.erro);
      return;
    }

    setUserInfo(resultado.retorno);
    alert("Salvo com sucesso");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Alterar Cadastro</Text>
      <View>
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
        <Input label="Cidade (apenas Porto Alegre)" textContentType="addressCity" value={userInfo.cidade} />
        {/* CELULAR INPUT */}
        <Input
          label="Celular"
          textContentType="telephoneNumber"
          onChange={(e) => setCelular((e.nativeEvent.text || "").replace(/\D/g, ""))}
          value={celular}
          placeholder="(00) 000000000"
        />

        {/* CADASTRAR BUTTON */}
        <TouchableOpacity
          style={[styles.submitButtonContainer, isLoading ? styles.submitButtonContainerDisabled : {}]}
          disabled={isLoading}
          onPress={onSubmitHandler}
        >
          <Text style={styles.submitButtonText}>{isLoading ? "Carregando" : "Salvar"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginTop: 30,
  },
  h1: {
    fontFamily: "$font500",
    fontSize: "2.25rem",
    lineHeight: "2.875rem",
    letterSpacing: "-0.045rem",
    marginBottom: "2rem",
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
