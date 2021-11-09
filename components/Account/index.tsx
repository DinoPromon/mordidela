import React from "react";
import Wrapper from "./styled";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PURPLE } from "@utils/colors";
import Modal from "./Modal";

const Account: React.FC = () => {
  return (
    <Wrapper>
    <Modal/>
      <div>
        <div>
          <FontAwesomeIcon icon={faUser} size="5x" color={PURPLE} />
        </div>
        <h3>| Aristóteles da Silva |</h3>
        <button>Dados gerais</button>
        <button>Pedidos</button>
        <button>Cupons</button>
        <button>Endereços</button>
      </div>
    </Wrapper>
  );
};

export default Account;