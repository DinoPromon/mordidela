import Pedido from "@models/pedido";
import { PINK, PURPLE } from "@utils/colors";
import styled from "styled-components";

type Props = {
  statusPedido: Pedido["status_pedido"];
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > h3 {
    & > span {
      color: ${PURPLE};
      font-weight: normal;
    }
  }
  & > p {
    cursor: pointer;
    font-size: 14px;
    color: ${PURPLE};
  }

  & > span {
   font-weight: bold;
   color: ${PURPLE};
  }

`;

export default Wrapper;
