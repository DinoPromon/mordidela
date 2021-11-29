type Cupom = {
  id_cupom: string;
  descricao: string;
  data_criacao: string;
  quantidade_uso: number | null;
  tipo: "entrega" | "pedido";
  codigo: string;
  valor_desconto: number;
  qtde_min_pedido: number;
  data_inicio: string;
  data_fim: string | null;
};

export default Cupom;
