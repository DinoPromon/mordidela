import React from "react";
import { PINK } from "@utils/colors";
import { RiCoupon3Line } from "react-icons/ri";
import { getFormattedDate } from "@utils/transformation";
import { PageContainer, PageTitle } from "@components/shared";
import { CupomContainer, CupomDataContainer, CupomTitle, CupomData, CupomDataHighlight, UsedCupomTitle } from "./styled";

import { RelatedUserCoupon, TipoCupom } from "@models/cupom";

type CouponsProps = {
  relatedCoupons: RelatedUserCoupon[];
};

const Coupons: React.FC<CouponsProps> = ({ relatedCoupons }) => {
  const usedCoupons = relatedCoupons.filter(
    (relatedCoupon) => Boolean(relatedCoupon.pedido) && relatedCoupon.foi_usado
  );

  const availableCoupons = relatedCoupons.filter((relatedCoupon) => relatedCoupon.pedido === null);

  function getCouponDiscountText(coupon: RelatedUserCoupon["cupom"]) {
    if (coupon.tipo === TipoCupom.ENTREGA) return "Frete grátis";

    return `${coupon.valor_desconto}% de desconto`;
  }

  function getCouponValidDate(coupon: RelatedUserCoupon["cupom"]) {
    if (coupon.data_fim === null) return `Válido até sua utilização`;

    return `Válido até ${getFormattedDate(coupon.data_fim)}`;
  }

  return (
    <PageContainer>
      <PageTitle>Cupons</PageTitle>
      <CupomContainer>
        <CupomTitle>Cupons disponíveis</CupomTitle>
        {availableCoupons.length === 0 && <p>Você não possui cupons!</p>}
        {availableCoupons.map((availabeCoupon) => (
          <CupomDataContainer key={`coupon-${availabeCoupon.data_obtencao}`} whileHover={{scale: 1.1}}>
            <RiCoupon3Line size={40} color={PINK} />
            <CupomData>
              <p>
                <CupomDataHighlight>{availabeCoupon.cupom.codigo}</CupomDataHighlight> - {getCouponDiscountText(availabeCoupon.cupom)}
              </p>
              <p>{getCouponValidDate(availabeCoupon.cupom)}</p>
            </CupomData>
          </CupomDataContainer>
        ))}

        <UsedCupomTitle>Cupons utilizados</UsedCupomTitle>
        {usedCoupons.length === 0 && <p>Você não utilizou cupons!</p>}
        {usedCoupons.map((usedCoupon) => (
          <CupomDataContainer key={`coupon-${usedCoupon.id_usuario_cupom}`} whileHover={{scale: 1.1}}>
            <RiCoupon3Line size={40} color={PINK} />
            <CupomData>
              <p>
                <CupomDataHighlight>{usedCoupon.cupom.codigo}</CupomDataHighlight> - {getCouponDiscountText(usedCoupon.cupom)}
              </p>
              <p>Utilizado no pedido {usedCoupon.pedido?.id_pedido}</p>
            </CupomData>
          </CupomDataContainer>
        ))}
      </CupomContainer>
    </PageContainer>
  );
};

export default Coupons;
