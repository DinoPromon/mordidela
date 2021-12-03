import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Wrapper from "./styled";
import { PURPLE } from "@utils/colors";
import AccountModal from "./AccountModal";
import AccountInfoList from "./AccountInfoList";
import { ProfileModalContent } from "@my-types/profile";

type Props = {
  nome: string;
  id_usuario: string;
};

const Account: React.FC<Props> = (props) => {
  const { nome, id_usuario } = props;
  // mudar para nome do modal. e.g. displayedModal: 'generalData' | 'address' | 'undefined'
  const [modalContent, setModalContent] = useState<ProfileModalContent>(null);

  function changeModalHandler(content: ProfileModalContent) {
    setModalContent(content);
  }

  function closeModalHandler() {
    setModalContent(null);
  }

  return (
    <Wrapper>
      {modalContent && <AccountModal id_usuario={id_usuario} content={modalContent} onClose={closeModalHandler} />}
      <div>
        <span>
          <FontAwesomeIcon icon={faUser} size="5x" color={PURPLE} />
        </span>
        <h3>{nome}</h3>
        <AccountInfoList onChangeModal={changeModalHandler} />
      </div>
    </Wrapper>
  );
};

export default Account;
