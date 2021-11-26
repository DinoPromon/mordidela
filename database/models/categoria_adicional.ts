import Categoria from "./categoria";
import Adicional from "./adicional";

type CategoriaAdicional = Pick<Categoria, "id_categoria"> & Pick<Adicional, "id_adicional">;

export default CategoriaAdicional;