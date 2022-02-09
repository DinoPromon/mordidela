import React from "react";
import { PINK } from "@utils/colors";
import { MyUser } from "@my-types/next-auth";
import { RiCoupon3Line } from "react-icons/ri";
import { RelatedUserCupomReq } from "@models/cupom";
import { PageContainer, PageTitle } from "@components/shared";
import { CupomContainer, CupomDataContainer, CupomTitle, CupomData } from "./styled";

type CouponsProps = {
  user: MyUser;
  relatedCoupons: RelatedUserCupomReq;
};

const Coupons: React.FC<CouponsProps> = ({ user, relatedCoupons }) => {
  console.log(relatedCoupons);
  return (
    <PageContainer>
      <PageTitle>Cupons</PageTitle>
      <CupomContainer>
        <CupomTitle>Cupons disponíveis</CupomTitle>
        <CupomDataContainer>
          <RiCoupon3Line size={40} color={PINK} />
          <CupomData>
            <p>CODIGODOCUPOM - 15% de desconto</p>
            <span>Válido até 07/02/2022</span>
          </CupomData>
        </CupomDataContainer>
        <CupomDataContainer>
          <RiCoupon3Line size={40} color={PINK} />
          <CupomData>
            <p>ABCDEFGHIJKLMNOPQRST - 15% de desconto</p>
            <span>Válido até sua utilização</span>
          </CupomData>
        </CupomDataContainer>
        <CupomTitle>Cupons já utilizados</CupomTitle>
        <CupomDataContainer>
          <RiCoupon3Line size={40} color={PINK} />
          <CupomData>
            <p>ABCDEFGHIJKLMNOPQRST - 15% de desconto</p>
            <span>Utilizado no pedido Nº 587</span>
          </CupomData>
        </CupomDataContainer>
        <CupomDataContainer>
          <RiCoupon3Line size={40} color={PINK} />
          <CupomData>
            <p>ABCDEFGHIJKLMNOPQRST - Frete grátis</p>
            <span>Utilizado no pedido Nº 23494</span>
          </CupomData>
        </CupomDataContainer>
      </CupomContainer>
    </PageContainer>
  );
};

export default Coupons;
