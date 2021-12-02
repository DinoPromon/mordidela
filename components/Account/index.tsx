import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Wrapper from "./styled";
import AccountModal from "./AccountModal";
import AccountInfoList from "./AccountInfoList";
import { PURPLE } from "@utils/colors";

type Props = {
  nome: string,
  id_usuario: string
};

const Account: React.FC<Props> = (props) => {
  const { nome, id_usuario } = props;
  // mudar para nome do modal. e.g. displayedModal: 'generalData' | 'address' | 'undefined'
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  return (
    <Wrapper>
      {showModal && <AccountModal onClose={closeModalHandler} id_usuario={id_usuario}/>}
      <div>
        <span>
          <FontAwesomeIcon icon={faUser} size="5x" color={PURPLE} />
        </span>
        <h3>{nome}</h3>
        <AccountInfoList onClick={openModalHandler} />
      </div>
    </Wrapper>
  );
};

export default Account;
