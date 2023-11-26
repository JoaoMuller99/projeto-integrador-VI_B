class InterfaceWs {
  constructor() {
    this.url = "https://ws-projeto-integrador-vi-b.vercel.app";
  }

  async comunicar(method, endpoint, requestParams) {
    try {
      const aditionalHeaders = {};

      const response = await fetch(this.url + endpoint, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
          ...aditionalHeaders,
        },
        ...requestParams,
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.error);
      }

      return { temErro: false, retorno: resultado };
    } catch (error) {
      return {
        erro: error instanceof Error ? error.message : typeof error === "string" ? error : "",
        temErro: true,
      };
    }
  }

  async login(dadosLogin) {
    return await this.comunicar("POST", "/api/usuarios/login", { body: JSON.stringify(dadosLogin) });
  }

  async criarUsuario(dadosUsuario) {
    return await this.comunicar("POST", "/api/usuarios", { body: JSON.stringify(dadosUsuario) });
  }

  async atualizaUsuario(idUsuario, dadosUsuario) {
    return await this.comunicar("PATCH", `/api/usuarios/${idUsuario}`, { body: JSON.stringify(dadosUsuario) });
  }

  async historicoPedidos(idUsuario) {
    return await this.comunicar("GET", `/api/pedidos/${idUsuario}`);
  }
}

const ws = new InterfaceWs();

export default ws;
