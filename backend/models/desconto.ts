interface IDesconto {
  id_desconto: number;
  porcentagem_desconto: number;
  data_inicio: Date | string | number;
  data_fim: Date | string | number | null;
}

export default IDesconto;
