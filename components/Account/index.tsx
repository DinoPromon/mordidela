import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Wrapper from "./styled";
import AccountModal from "./AccountModal";
import AccountInfoList from "./AccountInfoList";
import { PURPLE } from "@utils/colors";

const Account: React.FC = () => {
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
      {showModal && <AccountModal onClose={closeModalHandler} />}
      <div>
        <div>
          <FontAwesomeIcon icon={faUser} size="5x" color={PURPLE} />
        </div>
        <h3>| Aristóteles da Silva |</h3>
        <AccountInfoList onClick={openModalHandler} />
      </div>
    </Wrapper>
  );
};

export default Account;
