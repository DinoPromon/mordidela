import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

type Props = {
  color: string;
};

export const Text = styled.p<Props>`
  font-size: 1rem;
  color: ${props => props.color};
  text-align: center;
`;

export default Wrapper;
