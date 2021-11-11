import React from "react";

import CustomFilter from "./styled";

const MenuFilter: React.FC = () => {
  return (
    <CustomFilter>
        <ul>
            <button>Cones</button>
            <button>Caixas</button>
            <button>Salgados</button>
            <button>Combos</button>
            <button>Pratos executivos</button>
            <button>Lanches</button>
            <button>Cremes gelados</button>
            <button>Bebidas</button>
        </ul>
    </CustomFilter>
  );
};

export default MenuFilter;