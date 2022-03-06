import type IDesconto from "./desconto";

interface ICategoria {
  id_categoria: number;
  nome: string;
  id_desconto: IDesconto["id_desconto"] | null;
}

export default ICategoria;
