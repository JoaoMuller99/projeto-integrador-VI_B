import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Path, Svg } from "react-native-svg";
import AlterarCadastro from "../components/RootLayout/AlterarCadastro";
import GerarPedido from "../components/RootLayout/GerarPedido";
import HistoricoPedidos from "../components/RootLayout/HistoricoPedidos";
import Opcoes from "../components/RootLayout/Opcoes";

export default function RootLayout({ userInfo, setUserInfo }) {
  const [pagesHistory, setPagesHistory] = useState(["gerar-pedido"]);

  const currentPage = pagesHistory.at(-1);

  const disableBackButton = currentPage === "gerar-pedido";
  const disableOpcoesButton = currentPage === "opcoes" || currentPage === "alterar-cadastro" || currentPage === "historico-pedidos";

  function backButtonHandler() {
    setPagesHistory((prev) => prev.slice(0, -1));
  }

  function addItemToStack(item) {
    if (currentPage === item) return;
    setPagesHistory((prev) => prev.concat(item));
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={{
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButtonContainer]} disabled={disableBackButton} onPress={backButtonHandler}>
          {!disableBackButton && (
            <>
              <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9.57 5.93005L3.5 12.0001L9.57 18.0701"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M20.4999 12H3.66992"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text>Back</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity disabled={disableOpcoesButton} onPress={() => addItemToStack("opcoes")}>
          {!disableOpcoesButton && (
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M21 10H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M21 6H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M21 14H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M21 18H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          )}
        </TouchableOpacity>
      </View>

      {currentPage === "gerar-pedido" ? (
        <GerarPedido />
      ) : currentPage === "opcoes" ? (
        <Opcoes addItemToStack={addItemToStack} />
      ) : currentPage === "alterar-cadastro" ? (
        <AlterarCadastro />
      ) : currentPage === "historico-pedidos" ? (
        <HistoricoPedidos userInfo={userInfo} />
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = EStyleSheet.create({
  container: {
    padding: "1.20rem",
    marginTop: 60,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
  },
});
