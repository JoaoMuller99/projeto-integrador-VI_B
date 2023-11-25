import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ws from "../../interface_ws/interface";
import { formataData, formataNumeroParaBRL } from "../../util/helpers";

export default function HistoricoPedidos({ userInfo }) {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getHistoricoPedidos() {
      const resultado = await ws.historicoPedidos(userInfo.id);

      setIsLoading(false);

      if (resultado.temErro) {
        alert(resultado.erro);
        return;
      }

      setPedidos(resultado.retorno);
    }

    getHistoricoPedidos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>Histórico de pedidos</Text>
      <View>
        {isLoading ? (
          <Text style={[styles.items, { textAlign: "center", marginTop: 20 }]}>Carregando</Text>
        ) : pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <View style={styles.pedidoContainer} key={pedido.id}>
              <Text style={styles.items}>
                {pedido.prato.map((prato) => prato.nome).join(" + ")} - {formataNumeroParaBRL(pedido.valor || 0)}
              </Text>
              <Text style={styles.items}>{formataData(pedido.created_at)}</Text>
            </View>
          ))
        ) : (
          <Text style={[styles.items, { textAlign: "center", marginTop: 20 }]}>Nenhum pedido realizado</Text>
        )}
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
  pedidoContainer: {
    marginBottom: "4rem",
  },
  items: {
    fontSize: "1.1rem",
    fontFamily: "$font500",
    letterSpacing: "-0.01063rem",
  },
});
