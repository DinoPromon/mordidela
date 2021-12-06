import Pedido from "@models/pedido";

export function transformDeliveryType(tipo: Pedido["tipo_entrega"]) {
  switch (tipo) {
    case "entrega":
      return "delivery";
    case "balcao":
      return "balcão";
  }
}
