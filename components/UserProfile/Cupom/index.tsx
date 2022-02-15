import React from "react";
import { PINK } from "@utils/colors";
import { MyUser } from "@my-types/next-auth";
import { RiCoupon3Line } from "react-icons/ri";
import { PageContainer, PageTitle } from "@components/shared";
import { CupomContainer, CupomDataContainer, CupomTitle, CupomData } from "./styled";

import { RelatedUserCoupon, TipoCupom } from "@models/cupom";

type CouponsProps = {
  user: MyUser;
  relatedCoupons: RelatedUserCoupon[];
};

const Coupons: React.FC<CouponsProps> = ({ user, relatedCoupons }) => {

  const usedCoupons = relatedCoupons.filter(
    (relatedCoupon) => Boolean(relatedCoupon.pedido) && relatedCoupon.foi_usado
  );

  function getCouponDiscountText(coupon: RelatedUserCoupon["cupom"]) {
    if (coupon.tipo === TipoCupom.ENTREGA) return "Frete grátis";

    return `${coupon.valor_desconto}% de desconto`;
  }

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
        {usedCoupons.map((usedCoupon) => (
          <CupomDataContainer key={`coupon-${usedCoupon.id_usuario_cupom}`}>
            <RiCoupon3Line size={40} color={PINK} />
            <CupomData>
              <p>
                {usedCoupon.cupom.codigo} - {getCouponDiscountText(usedCoupon.cupom)}
              </p>
              <span>Utilizado no pedido Nº {usedCoupon.pedido?.id_pedido}</span>
            </CupomData>
          </CupomDataContainer>
        ))}
      </CupomContainer>
    </PageContainer>
  );
};

export default Coupons;
