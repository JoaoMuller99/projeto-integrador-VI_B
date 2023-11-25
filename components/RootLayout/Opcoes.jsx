import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default function Opcoes({ addItemToStack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Opções</Text>
      <View>
        <TouchableOpacity onPress={() => addItemToStack("alterar-cadastro")}>
          <Text style={styles.opcoes}>Alterar cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addItemToStack("historico-pedidos")}>
          <Text style={styles.opcoes}>Histórico de pedidos</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  opcoes: {
    fontSize: "1.1rem",
    fontFamily: "$font500",
    letterSpacing: "-0.01063rem",
    marginBottom: "2rem",
  },
});
