import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Path, Svg } from "react-native-svg";
import ws from "../../interface_ws/interface";

export default function GerarPedido({ addItemToStack, setItensCarrinho }) {
  const [pratos, setPratos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPratos() {
      const resultado = await ws.pratos(1); // ? ID do estabelecimento cadastrado;

      setIsLoading(false);

      if (resultado.temErro) {
        alert(resultado.erro);
        return;
      }

      setPratos(resultado.retorno.map((item) => ({ ...item, qtdSelecionada: 0 })));
    }

    getPratos();
  }, []);

  function atualizaQtdSelecionada(index, qtd) {
    setPratos((prev) => {
      const array = [...prev];
      const newValue = array[index].qtdSelecionada + qtd;
      if (newValue < 0) return prev;
      array[index].qtdSelecionada = newValue;
      return array;
    });
  }

  function adicionarItensAoCarrinho() {
    setItensCarrinho(pratos.filter((prato) => prato.qtdSelecionada > 0));
    addItemToStack("carrinho");
  }

  const qtdTotalItens = pratos.reduce((somador, prato) => somador + prato.qtdSelecionada, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Marmita do dia</Text>
      {isLoading ? (
        <Text style={[styles.items, { textAlign: "center", marginTop: 20 }]}>Carregando</Text>
      ) : pratos.length > 0 ? (
        <>
          {pratos.map((prato, index) => (
            <View style={styles.pratoContainer} key={prato.id}>
              <View style={styles.pratoContainer}>
                <Image
                  style={styles.img}
                  source={{
                    uri: prato.img,
                  }}
                  alt={prato.nome}
                />
                <Text style={styles.ingredientes}>{prato.ingredientes}</Text>
              </View>
              <View style={styles.pratoContainer}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => atualizaQtdSelecionada(index, -1)}>
                  <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path d="M5 10H15" stroke="white" strokeWidth="2" strokelinecap="round" strokeLinejoin="round" />
                  </Svg>
                </TouchableOpacity>
                <Text style={styles.ingredientes}>{prato.qtdSelecionada}</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => atualizaQtdSelecionada(index, 1)}>
                  <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path d="M5 10H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M10 15V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={[styles.buttonCarrinhoContainer, qtdTotalItens === 0 ? styles.buttonCarrinhoContainerDisabled : {}]}
            disabled={qtdTotalItens === 0}
            onPress={adicionarItensAoCarrinho}
          >
            <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
              <Path
                d="M17.335 4.88249H16.985L14.0275 1.92499C13.7913 1.68874 13.4062 1.68874 13.1613 1.92499C12.925 2.16124 12.925 2.54624 13.1613 2.79124L15.2525 4.88249H6.7475L8.83875 2.79124C9.075 2.55499 9.075 2.16999 8.83875 1.92499C8.6025 1.68874 8.2175 1.68874 7.9725 1.92499L5.02375 4.88249H4.67375C3.88625 4.88249 2.25 4.88249 2.25 7.12249C2.25 7.97124 2.425 8.53124 2.7925 8.89874C3.0025 9.11749 3.25625 9.23124 3.5275 9.29249C3.78125 9.35374 4.0525 9.36249 4.315 9.36249H17.685C17.9562 9.36249 18.21 9.34499 18.455 9.29249C19.19 9.11749 19.75 8.59249 19.75 7.12249C19.75 4.88249 18.1137 4.88249 17.335 4.88249Z"
                fill="white"
              />
              <Path
                d="M17.1688 10.5H4.76132C4.21882 10.5 3.80757 10.9812 3.89507 11.515L4.63007 16.0125C4.87507 17.5175 5.53132 19.25 8.44508 19.25H13.3538C16.3026 19.25 16.8276 17.7713 17.1426 16.1175L18.0263 11.5412C18.1313 10.9987 17.7201 10.5 17.1688 10.5ZM11.0001 17.0625C8.95258 17.0625 7.28133 15.3913 7.28133 13.3438C7.28133 12.985 7.57882 12.6875 7.93757 12.6875C8.29632 12.6875 8.59382 12.985 8.59382 13.3438C8.59382 14.6737 9.67008 15.75 11.0001 15.75C12.3301 15.75 13.4063 14.6737 13.4063 13.3438C13.4063 12.985 13.7038 12.6875 14.0626 12.6875C14.4213 12.6875 14.7188 12.985 14.7188 13.3438C14.7188 15.3913 13.0476 17.0625 11.0001 17.0625Z"
                fill="white"
              />
            </Svg>
            <Text style={styles.textCarrinho}>Adicionar ao carrinho</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.items, { textAlign: "center", marginTop: 20 }]}>Nenhum prato a ser listado</Text>
      )}
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
  pratoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
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
  buttonContainer: {
    borderRadius: "50%",
    padding: "0.38rem",
    backgroundColor: "$buttonCarrinhoBg",
  },
  buttonCarrinhoContainer: {
    borderRadius: "50%",
    padding: "1.25rem",
    backgroundColor: "$buttonCarrinhoBg",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "0.5rem",
  },
  buttonCarrinhoContainerDisabled: {
    opacity: 0.2,
  },
  textCarrinho: {
    color: "white",
    fontSize: "1.125rem",
    fontFamily: "$font700",
  },
});
