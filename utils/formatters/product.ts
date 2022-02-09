import IAdicional from "@models/adicional";
import ISabor from "@models/sabor";
import { removeSpaces } from "@utils/transformation";

export function formatProductId(name: string, id: number, adds: IAdicional[], flavors: ISabor[]) {
  const addsIds = adds
    .map((add) => add.id_adicional)
    .sort((a, b) => a - b)
    .join("-");
  const flavorsIds = flavors
    .map((flavor) => flavor.id_sabor)
    .sort((a, b) => a - b)
    .join("-");
  return `${removeSpaces(name)}-${addsIds}-${flavorsIds}-${id}`;
}
