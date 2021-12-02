import Adicional from "@models/adicional";
import Sabor from "@models/sabor";
import { removeSpaces } from "@utils/transformation/string";

export function formatProductId(name: string, id: string, adds: Adicional[], flavors: Sabor[]) {
  const addsIds = adds
    .map((add) => +add.id_adicional)
    .sort((a, b) => a - b)
    .join("-");
  const flavorsIds = flavors
    .map((flavor) => +flavor.id_sabor)
    .sort((a, b) => a - b)
    .join("-");
  return `${removeSpaces(name)}-${addsIds}-${flavorsIds}-${id}`;
}
