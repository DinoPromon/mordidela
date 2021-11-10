import React, { useState } from "react";

import Wrapper from "./styled";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PURPLE } from "@utils/colors";
import GeneralDataModal from "./GeneralDataModal";

const Account: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  return (
    <Wrapper>
      {showModal && <GeneralDataModal onClose={closeModalHandler} />}
      <div>
        <div>
          <FontAwesomeIcon icon={faUser} size="5x" color={PURPLE} />
        </div>
        <h3>| Aristóteles da Silva |</h3>
        <button onClick={openModalHandler}>Dados gerais</button>
        <button onClick={openModalHandler}>Pedidos</button>
        <button onClick={openModalHandler}>Cupons</button>
        <button onClick={openModalHandler}>Endereços</button>
      </div>
    </Wrapper>
  );
};

export default Account;
