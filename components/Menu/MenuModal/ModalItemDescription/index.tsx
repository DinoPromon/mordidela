import React from "react";
import Image from "next/image";
import Wrapper from "./styled";

const ModalItemDescription: React.FC = () => {
  return (
    <Wrapper>
        <h2>Caixa de batata</h2>
        <div>
            <Image src="/images/caixa-batata.png" alt="Caixa de Batata" width={200} height={200} layout="intrinsic" />
        </div>
        <p>Porção de batata gourmet com tempero cítrico especial</p>
        <h3>Tamanho</h3>
        <ul>
            <li><input type="radio" /> Caixa média - 600g</li>
            <li><input type="radio" /> Caixa grande - 1kg</li>
        </ul>
        <h3>Sabores</h3>
        <ul>
            <li><input type="radio" /> Nenhum sabor para selecionar</li>
        </ul>
        <h3>Adicionais</h3>
        <ul>
            <li><input type="checkbox" /> Barbecue</li>
            <li><input type="checkbox" /> Mostarda e mel</li>
            <li><input type="checkbox" /> Cheddar cremoso</li>
            <li><input type="checkbox" /> Maionese verde</li>
            <li><input type="checkbox" /> Cheddar cremoso + bacon</li>
            <li><input type="checkbox" /> Pimenta</li>
        </ul>
        
        
    </Wrapper>
  );
};

export default ModalItemDescription;