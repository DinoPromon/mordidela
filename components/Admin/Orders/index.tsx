import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { BiUserCircle } from "react-icons/bi/index";
import { HiOutlineLocationMarker } from "react-icons/hi/index";
import CustomAnimatePresence from "@components/shared/CustomAnimatePresence";
import AdminOrderDetailsModal from "./AdminOrderDetailsModal";
import {
  OrdersContainer,
  OrdersButtonContainer,
  OrdersButton,
  OrdersCardContainer,
  ButtonContainer,
  OrdersCard,
  OrdersCardContent,
  OrdersCardContentContainer,
  OrdersCardTitleContainer,
  OrdersCardTitle,
  OrdersUserContainer,
  OrdersUser,
  OrderUserDataContainer,
} from "./styled";
import { PURPLE, PINK } from "@utils/colors";

const Orders: React.FC = () => {
  const [show, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <OrdersContainer>
      <CustomAnimatePresence exitBeforeEnter>
        {show && (
          <AdminOrderDetailsModal
            key="admin-order-relations-modal"
            onClose={closeModal}
          />
        )}
      </CustomAnimatePresence>
      <OrdersButtonContainer>
        <OrdersButton>Pedidos pendentes (10)</OrdersButton>
        <OrdersButton>Pedidos confirmados (5)</OrdersButton>
        <OrdersButton>Pedidos rejeitados (1)</OrdersButton>
        <OrdersButton>Relatório de pedidos</OrdersButton>
      </OrdersButtonContainer>
      <OrdersCardContainer>
        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button onClick={openModal} variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            {/*             <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button> */}
            <p>Confirmado em 11/03/2022 às 21:35</p>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            {/*             <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button> */}
            <p>Rejeitado em 11/03/2022 às 21:40</p>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button>
          </ButtonContainer>
        </OrdersCard>

        <OrdersCard>
          <OrdersCardTitleContainer>
            <OrdersCardTitle>#1987</OrdersCardTitle>
            <OrdersCardTitle>11/03/2022 - 21:34</OrdersCardTitle>
          </OrdersCardTitleContainer>
          <OrdersUserContainer>
            <BiUserCircle size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rafael Hiro Kato Kawakami</p>
              <span>(44) 98765-4321</span>
            </OrdersUser>
          </OrdersUserContainer>
          <OrdersUserContainer>
            <HiOutlineLocationMarker size={40} color={PURPLE} />
            <OrdersUser>
              <p>Rua Vitória de Monte Castelo N° 472, Centro</p>
              <span>Complemento: Casa</span>
            </OrdersUser>
          </OrdersUserContainer>
          <ButtonContainer>
            <Button variant="contained" color="primary" size="small">
              Detalhes do pedido
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button variant="outlined" color="secondary">
              Rejeitar
            </Button>
            <Button variant="contained" color="secondary">
              Confirmar
            </Button>
          </ButtonContainer>
        </OrdersCard>
      </OrdersCardContainer>
    </OrdersContainer>
  );
};

export default Orders;
