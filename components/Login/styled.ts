import styled from 'styled-components'
import { PINK, ORANGE } from '@utils/colors';

// generalizar esse código

const Wrapper = styled.div`
  display: flex;
  margin: 2rem;
  flex-direction: column;
  background-color: white;
  width: 85%;
  justify-content: center;
  gap: 1.5rem;
  max-width: 400px;

  & > img {
    align-self: center;
    width: 200px;
  }

  & > p {
    width: auto;
    font-size: 18px;
    text-align: center;
    color: ${ORANGE};
    & > a {
      text-decoration: none;
      color: ${PINK};
      padding: 1px 0;
      border-bottom: 1px ${PINK} solid;
    }
  }
`;

export default Wrapper;