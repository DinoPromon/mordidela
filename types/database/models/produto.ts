export type Produto = {
  id_produto: string;
  preco_padrao: number;
  nome: string;
  disponivel: boolean;
  descricao: string;
  tamanho: string;
  qtde_max_sabor: number;
  id_categoria: number;
  id_desconto: number | null;
};
