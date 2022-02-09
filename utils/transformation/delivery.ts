import IPedido from "@models/pedido";

export function transformDeliveryType(tipo: IPedido["tipo_entrega"]) {
  switch (tipo) {
    case "entrega":
      return "delivery";
    case "balcao":
      return "balcão";
  }
}
