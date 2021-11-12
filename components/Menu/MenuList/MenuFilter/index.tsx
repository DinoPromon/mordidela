import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { PURPLE } from "@utils/colors";

import CustomFilter from "./styled";

const MenuFilter: React.FC = () => {
  return (
    <CustomFilter>   
      {/* <details>
        <summary>Todas as categorias</summary>   
          <ul>
              <li>Cones</li>
              <li><button>Caixas</button></li>
              <li><button>Salgados</button></li>
              <li><button>Combos</button></li> 
              <li><button>Pratos executivos</button></li>
              <li><button>Lanches</button></li>
              <li><button>Cremes gelados</button></li>
              <li><button>Bebidas</button></li>
              <li><FontAwesomeIcon icon={faChevronRight} size="lg" color={PURPLE}/></li>
          </ul>
        </details> */}
    </CustomFilter>
  );
};

export default MenuFilter;