import Desconto from './desconto';

type Categoria = {
  id_categoria: string;
  nome: string;
  id_desconto: Desconto['id_desconto'] | null;
};

export default Categoria;
