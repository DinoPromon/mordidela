import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import useComponentVisible from "@hooks/useComponenteVisible";
import Aside, { renderAnimation, unmountAnimation, SIDEBAR_ANIMATION_TIME } from "./styled";
import SideBarList from "./SideBarList";

type Props = {
  isShowingSidebar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<Props> = (props) => {
  const [sidebarAnimation, setSidebarAnimation] = useState(renderAnimation);
  const { isShowingSidebar, setShowSideBar } = props;

  const { ref: sidebarRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(
    isShowingSidebar
  );

  const closeHandler = () => {
    if (isComponentVisible) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    setSidebarAnimation(isComponentVisible ? renderAnimation : unmountAnimation);
    const timer = setTimeout(() => {
      setShowSideBar(isComponentVisible);
    }, SIDEBAR_ANIMATION_TIME);

    return () => clearTimeout(timer);
  }, [isComponentVisible, setShowSideBar]);

  return (
    <Aside ref={sidebarRef} animation={sidebarAnimation}>
      <button onClick={closeHandler}>
        <FontAwesomeIcon icon={faTimes} size="lg" color="white" />
      </button>
      <Link href="/" passHref>
        <a>
          <Image src="/images/label_logo.png" alt="Logo do mordidela." width={100} height={80} layout="intrinsic"/>
        </a>
      </Link>
      <SideBarList />
    </Aside>
  );
};

export default SideBar;
