import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Circle, G, Svg } from "react-native-svg";
import ws from "../../interface_ws/interface";
import { formataNumeroParaBRL } from "../../util/helpers";

const valorEntrega = 10;
const paymentOptions = ["PIX", "Dinheiro", "Cartão"];

export default function Carrinho({ itensCarrinho, addItemToStack, userInfo }) {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const valorTotal = itensCarrinho.reduce((somador, item) => somador + item.qtdSelecionada * item.valor, 0) + valorEntrega;

  async function finalizarPedidoHandler() {
    setIsLoading(true);

    const resultado = await ws.criarPedido({
      id_usuario: userInfo.id,
      id_estabelecimento: 1,
      tipo_pagamento: selectedPaymentOption,
      comentarios: "",
      valor: valorTotal,
      status: "Realizado",
      pratos: itensCarrinho,
    });

    setIsLoading(false);

    if (resultado.temErro) {
      alert(resultado.erro);
      return;
    }

    addItemToStack("pedido-realizado");
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Carrinho</Text>
      {itensCarrinho.map((item) => (
        <View style={styles.itemContainer} key={item.id}>
          <View style={styles.itemContainer}>
            <Image
              style={styles.img}
              source={{
                uri: item.img,
              }}
              alt={item.nome}
            />
            <Text style={styles.ingredientes}>{item.ingredientes}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text>
              {item.qtdSelecionada}x {formataNumeroParaBRL(item.valor)}
            </Text>
          </View>
        </View>
      ))}
      <View>
        <Text style={styles.textoEntrega}>Valor da entrega : {formataNumeroParaBRL(valorEntrega)}</Text>
        <Text style={styles.textoTotal}>Total: {formataNumeroParaBRL(valorTotal)}</Text>
      </View>
      <View>
        {paymentOptions.map((option) => (
          <TouchableOpacity style={styles.selectionContainer} key={option} onPress={() => setSelectedPaymentOption(option)}>
            {selectedPaymentOption === option ? (
              <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <Circle cx="14" cy="14" r="13.25" stroke="#292D32" strokeWidth="1.5" />
                <Circle cx="14" cy="14" r="8" fill="#292D32" />
              </Svg>
            ) : (
              <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 36 36" fill="none">
                <G filter="url(#filter0_d_606_3235)">
                  <Circle cx="18" cy="14" r="13.25" stroke="#151719" strokeWidth="1.5" shapeRendering="crispEdges" />
                </G>
              </Svg>
            )}
            <Text style={styles.textoPaymentOptions}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.fazerPedidoContainer, !selectedPaymentOption || isLoading ? styles.fazerPedidoContainerDisabled : {}]}
        disabled={!selectedPaymentOption || isLoading}
        onPress={finalizarPedidoHandler}
      >
        <Text style={styles.textoFazerPedido}>{isLoading ? "Carregando" : "Fazer pedido"}</Text>
      </TouchableOpacity>
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    gap: "1rem",
  },
  img: {
    width: "6.75rem",
    height: "6.3rem",
  },
  ingredientes: {
    fontSize: "1.1rem",
    fontFamily: "$font500",
    lineHeight: "1.4375rem",
    letterSpacing: "-0.01063rem",
    maxWidth: "7rem",
  },
  textoEntrega: {
    fontSize: "0.9rem",
    fontFamily: "$font400",
    lineHeight: "1.4375rem",
    letterSpacing: "-0.01063rem",
    marginBottom: "1rem",
  },
  textoTotal: {
    fontSize: "1.2rem",
    fontFamily: "$font700",
    lineHeight: "1.4375rem",
    letterSpacing: "-0.01063rem",
    marginBottom: "1.5rem",
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  textoPaymentOptions: {
    fontSize: "1.2rem",
    fontFamily: "$font500",
    lineHeight: "1.4375rem",
    letterSpacing: "-0.01063rem",
  },
  fazerPedidoContainer: {
    width: "100%",
    padding: "1.25rem",
    backgroundColor: "$buttonFazerPedidoBg",
    alignItems: "center",
    borderRadius: "1.125rem",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  fazerPedidoContainerDisabled: {
    opacity: 0.2,
  },
  textoFazerPedido: {
    color: "white",
    fontSize: "1.125rem",
    fontFamily: "$font700",
    lineHeight: " 1.125rem",
  },
});
