import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default function PedidoRealizado({ resetStack }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Seu pedido foi realizado!</Text>
      <Text style={styles.textoTempoEntrega}>Tempo estimado de entrega: 25 minutos</Text>
      <Image
        style={styles.img}
        source={{
          uri: "https://cdn.discordapp.com/attachments/338445905093197825/1178362978937086093/f51fca89d13faa7d983afa0bac6e63f4.png",
        }}
        alt="Frutas"
      />
      <TouchableOpacity style={styles.voltarButtonContainer} onPress={resetStack}>
        <Text style={styles.textoVoltarButton}>Voltar a página inicial</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    marginTop: 60,
  },
  h1: {
    fontFamily: "$font500",
    fontSize: "2.25rem",
    lineHeight: "2.875rem",
    letterSpacing: "-0.045rem",
    marginBottom: "1rem",
  },
  textoTempoEntrega: {
    fontSize: "1.1rem",
    fontFamily: "$font500",
    lineHeight: "1.4375rem",
    letterSpacing: "-0.01063rem",
  },
  img: {
    width: "16.875rem",
    height: "17.3rem",
    alignSelf: "center",
    marginTop: "4rem",
    marginBottom: "4rem",
  },
  voltarButtonContainer: {
    width: "100%",
    padding: "1.25rem",
    alignItems: "center",
    borderRadius: "1.125rem",
    backgroundColor: "$buttonPedidoFinalizado",
  },
  textoVoltarButton: {
    color: "white",
    fontSize: "1.125rem",
    fontFamily: "$font700",
    lineHeight: " 1.125rem",
  },
});
