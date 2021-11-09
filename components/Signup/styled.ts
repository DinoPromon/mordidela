import styled from 'styled-components'
import { PINK, ORANGE } from '@utils/colors';

// generalizar esse código


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 1.5rem;
  max-width: 400px;

  & > img {
    align-self: center;
    width: 150px;
    margin-bottom: 1rem;
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
  & > div {
    display: flex;
    margin: 1rem 2px;
    flex-direction: row;
    align-items: center;
    & > p {
      margin-right: auto;
      color: blue;
    }
  }
`;

export default Wrapper;