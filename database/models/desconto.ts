type Desconto = {
  id_desconto: number;
  porcentagem_desconto: number;
  data_inicio: Date;
  data_fim?: Date | null;
};

export default Desconto;