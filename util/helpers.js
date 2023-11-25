export function formataNumeroParaBRL(numero) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
}

export function formataData(data) {
  if (!data) return "";
  return data.split("T")[0].split("-").reverse().join("/");
}
