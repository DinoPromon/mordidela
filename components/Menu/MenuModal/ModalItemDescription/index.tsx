import React from "react";
import Image from "next/image";
import ModalRadio from "../ModalRadio";
import Wrapper from "./styled";
import ModalCheckboxSabor from "../ModalCheckboxSabor";
import ModalCheckboxAdicional from "../ModalCheckboxAdicional";

const ModalItemDescription: React.FC = () => {
  return (
    <Wrapper>
        <h2>Caixa de batata</h2>
        <div>
            <Image src="/images/caixa-batata.png" alt="Caixa de Batata" width={200} height={200} layout="intrinsic" />
        </div>
        <p>Porção de batata gourmet com tempero cítrico especial</p>
        <h3>Tamanho</h3>
        <ModalRadio/>
        <h3>Sabores</h3>
        <ModalCheckboxSabor/>
        <h3>Adicionais</h3>
        <ModalCheckboxAdicional/>      
    </Wrapper>
  );
};

export default ModalItemDescription;