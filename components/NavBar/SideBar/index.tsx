import Link from "next/link";
import SideBarList from "./SideBarList";
import { FaTimes } from "react-icons/fa/index";
import React, { useEffect, useState } from "react";
import { MordidelaLogoWithLabel } from "@components/shared";
import useComponentVisible from "@hooks/useComponenteVisible";
import {
  Aside,
  renderAnimation,
  unmountAnimation,
  SIDEBAR_ANIMATION_TIME,
} from "./styled";

type Props = {
  isShowingSidebar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<Props> = (props) => {
  const [sidebarAnimation, setSidebarAnimation] = useState(renderAnimation);
  const { isShowingSidebar, setShowSideBar } = props;

  const {
    ref: sidebarRef,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(isShowingSidebar);

  const closeHandler = () => {
    if (isComponentVisible) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    setSidebarAnimation(
      isComponentVisible ? renderAnimation : unmountAnimation
    );
    const timer = setTimeout(() => {
      setShowSideBar(isComponentVisible);
    }, SIDEBAR_ANIMATION_TIME);

    return () => clearTimeout(timer);
  }, [isComponentVisible, setShowSideBar]);

  return (
    <Aside ref={sidebarRef} animation={sidebarAnimation}>
      <button onClick={closeHandler}>
        <FaTimes size={24} color="white" />
      </button>
      <Link href="/" passHref>
        <a onClick={closeHandler}>
          <MordidelaLogoWithLabel />
        </a>
      </Link>
      <SideBarList onClose={closeHandler} />
    </Aside>
  );
};

export default SideBar;
