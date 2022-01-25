type Cupom = {
  id_cupom: number;
  descricao?: string | null;
  data_criacao: Date;
  quantidade_uso?: number | null;
  tipo: "entrega" | "pedido";
  codigo: string;
  valor_desconto: number;
  qtde_min_pedido: number;
  data_inicio: Date;
  data_fim?: Date | null;
};

export default Cupom;
