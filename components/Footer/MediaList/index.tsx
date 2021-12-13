import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import CustomList from "./styled";

const MediaList: React.FC = () => {
  return (
    <CustomList>
      <li>
        <a target="_blank" href="https://www.instagram.com/mordidela.goioere/" rel="noreferrer" className="icon-link">
          <FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://www.facebook.com/Mordidela-391829198123295"
          rel="noreferrer"
          className="icon-link"
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://api.whatsapp.com/send/?phone=554497311821&text=Ol%C3%A1%2C+poderia+me+enviar+o+card%C3%A1pio%3F&app_absent=0"
          rel="noreferrer"
          className="icon-link"
        >
          <FontAwesomeIcon icon={faWhatsapp} size="2x" color="white" />
        </a>
      </li>
    </CustomList>
  );
};

export default MediaList;
