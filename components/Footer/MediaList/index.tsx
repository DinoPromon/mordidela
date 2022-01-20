import React from "react";
import { BsInstagram, BsFacebook, BsWhatsapp } from "react-icons/bs/index";

import { MediaListContainer } from "./styled";

const MediaList: React.FC = () => {
  return (
    <MediaListContainer>
      <li>
        <a
          target="_blank"
          href="https://www.instagram.com/mordidela.goioere/"
          rel="noreferrer"
          className="icon-link"
        >
          <BsInstagram size={30} color="white" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://www.facebook.com/Mordidela-391829198123295"
          rel="noreferrer"
          className="icon-link"
        >
          <BsFacebook size={30} color="white" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://api.whatsapp.com/send/?phone=554497311821&text=Ol%C3%A1%2C+poderia+me+enviar+o+card%C3%A1pio%3F&app_absent=0"
          rel="noreferrer"
          className="icon-link"
        >
          <BsWhatsapp size={30} color="white" />
        </a>
      </li>
    </MediaListContainer>
  );
};

export default MediaList;
