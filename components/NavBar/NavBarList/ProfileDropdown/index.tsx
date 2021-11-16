import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./styled";
import DropdownList from "./DropdownList";

const ProfileDropdown: React.FC = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getDropdownIcon = () => {
    return showDropdown ? faAngleUp : faAngleDown;
  };

  const showDropdownHandler = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <Wrapper onClick={showDropdownHandler}>
      <FontAwesomeIcon icon={faUser} size="lg" color="white" /> Aristóteles{" "}
      {<FontAwesomeIcon icon={getDropdownIcon()} size="lg" color="white" />}
      {showDropdown && <DropdownList isShowingDropdown={showDropdown} setShowDropdown={setShowDropdown} />}
    </Wrapper>
  );
};

export default ProfileDropdown;
